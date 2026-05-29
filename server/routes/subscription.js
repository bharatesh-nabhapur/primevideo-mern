const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Watchlist = require('../models/Watchlist');
const authMiddleware = require('../middleware/auth');

// Plan details map
const PLANS = {
  Mini: {
    monthlyCost: 149,
    streamingQuality: 'SD',
    maxDevices: 1,
    watchlistLimit: 2,
  },
  Family: {
    monthlyCost: 299,
    streamingQuality: 'Full HD',
    maxDevices: 3,
    watchlistLimit: 3,
  },
  Ultra: {
    monthlyCost: 599,
    streamingQuality: '4K Ultra HD',
    maxDevices: 6,
    watchlistLimit: 4,
  },
};

// POST /api/subscribe
router.post('/subscribe', authMiddleware, async (req, res) => {
  try {
    const { planName } = req.body;
    const userId = req.user.id;

    if (!PLANS[planName]) {
      return res.status(400).json({ message: 'Invalid plan. Choose Mini, Family, or Ultra.' });
    }

    // Check for duplicate active subscription
    const existing = await Subscription.findOne({ user: userId, isActive: true });
    if (existing) {
      return res.status(400).json({
        message: `You already have an active ${existing.planName} subscription.`,
      });
    }

    const plan = PLANS[planName];

    // Calculate expiry date (30 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const subscription = new Subscription({
      user: userId,
      planName,
      monthlyCost: plan.monthlyCost,
      streamingQuality: plan.streamingQuality,
      maxDevices: plan.maxDevices,
      watchlistLimit: plan.watchlistLimit,
      expiryDate,
    });

    await subscription.save();

    // Create empty watchlist for this subscription
    const watchlist = new Watchlist({ user: userId, subscription: subscription._id, movies: [] });
    await watchlist.save();

    res.status(201).json({
      message: `Successfully subscribed to ${planName} plan!`,
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/subscriptions - get user's subscriptions
router.get('/subscriptions', authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/subscription/renew
router.put('/subscription/renew', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ user: userId, isActive: true });
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found to renew.' });
    }

    // Extend expiry by 30 days from today or from current expiry (whichever is later)
    const base = subscription.expiryDate > new Date() ? subscription.expiryDate : new Date();
    const newExpiry = new Date(base);
    newExpiry.setDate(newExpiry.getDate() + 30);

    subscription.expiryDate = newExpiry;
    subscription.isActive = true;
    await subscription.save();

    res.json({
      message: 'Subscription renewed successfully for 30 days!',
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
