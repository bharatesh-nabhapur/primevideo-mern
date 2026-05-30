const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const Subscription = require('../models/Subscription');
const authMiddleware = require('../middleware/auth');

// POST /api/watchlist/add
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { title, genre } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ message: 'Movie title is required.' });
    }

    // Get active subscription
    const subscription = await Subscription.findOne({ user: userId, isActive: true });
    if (!subscription) {
      return res.status(400).json({ message: 'No active subscription found.' });
    }

    // Check if subscription is expired
    if (subscription.expiryDate < new Date()) {
      return res.status(400).json({ message: 'Your subscription has expired. Please renew.' });
    }

    // Get or create watchlist
    let watchlist = await Watchlist.findOne({ user: userId, subscription: subscription._id });
    if (!watchlist) {
      watchlist = new Watchlist({ user: userId, subscription: subscription._id, movies: [] });
    }

    // Check watchlist limit
    if (watchlist.movies.length >= subscription.watchlistLimit) {
      return res.status(400).json({
        message: `Watchlist limit of ${subscription.watchlistLimit} reached for your ${subscription.planName} plan.`,
      });
    }

    // Check for duplicate movie
    const duplicate = watchlist.movies.find(
      (m) => m.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({ message: `"${title}" is already in your watchlist.` });
    }

    watchlist.movies.push({ title, genre: genre || 'Unknown' });
    await watchlist.save();

    res.status(201).json({
      message: `"${title}" added to watchlist!`,
      watchlistCount: watchlist.movies.length,
      watchlist,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/watchlist/remove
router.delete('/remove', authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ user: userId, isActive: true });
    if (!subscription) {
      return res.status(400).json({ message: 'No active subscription found.' });
    }

    const watchlist = await Watchlist.findOne({ user: userId, subscription: subscription._id });
    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found.' });
    }

    const movieIndex = watchlist.movies.findIndex(
      (m) => m.title.toLowerCase() === title.toLowerCase()
    );

    if (movieIndex === -1) {
      return res.status(404).json({ message: `"${title}" not found in watchlist.` });
    }

    watchlist.movies.splice(movieIndex, 1);
    await watchlist.save();

    res.json({
      message: `"${title}" removed from watchlist.`,
      watchlistCount: watchlist.movies.length,
      watchlist,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const subscription = await Subscription.findOne({ user: userId, isActive: true });

    if (!subscription) {
      return res.json({ movies: [], watchlistCount: 0 });
    }

    const watchlist = await Watchlist.findOne({ user: userId, subscription: subscription._id });
    if (!watchlist) {
      return res.json({ movies: [], watchlistCount: 0 });
    }

    res.json({
      movies: watchlist.movies,
      watchlistCount: watchlist.movies.length,
      limit: subscription.watchlistLimit,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
