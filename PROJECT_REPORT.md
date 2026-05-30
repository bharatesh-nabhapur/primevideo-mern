# Karnatak University, Dharwad
## Sidhu Vidya Samsthe's
# NALANDA BCA COLLEGE
### AICTE Approved | Govt. of Karnataka Recognized | KUD Affiliated

---

# Amazon Prime Video — Subscription & Watchlist Management System

## A Project Report

### Submitted by
**Bharatesh Nabhapur** — 01FE24BCS308

### Under the Guidance of
**Siddhartha Nabhapur**
Bachelor of Computer Application
Academic Year 2025-26

---
Vidyaranya Campus, Gadag Road, Near Bhandiwad, Hubballi – 580 023

---

---

# CERTIFICATE

This is to certify that Mr. BHARATESH NABHAPUR bearing
Reg No: 01FE24BCS308, student of 2nd Semester has submitted a
project and successfully presented the said report for the partial
fulfilment of the BCA Degree.

**Guide** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **HOD** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Internal Examiner** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **External Examiner** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Principal**

---

---

# ABSTRACT

The Amazon Prime Video Subscription and Watchlist Management System is a
comprehensive web-based application developed using the MERN stack (MongoDB,
Express.js, React.js, Node.js). The system is designed to simulate a real-world
streaming platform subscription model with complete user authentication, plan
management, and watchlist functionality.

The application features three subscription plans — Mini, Family, and Ultra —
each with different streaming quality, device limits, and watchlist capacities.
Key functionalities include JWT-based user authentication, duplicate subscription
validation, automatic expiry date calculation, watchlist limit enforcement per
plan, and visual highlighting of expired subscriptions in red color.

The frontend is built using React.js with useState hooks for state management,
React Router for navigation, and Axios for API communication. The backend uses
Node.js with Express.js REST APIs, and MongoDB Atlas serves as the cloud
database with three collections: Users, Subscriptions, and Watchlists, linked
using ObjectId references. The application is deployed on Vercel (frontend) and
Render (backend) with MongoDB Atlas as the cloud database.

---

---

# ACKNOWLEDGEMENTS

I would like to express my heartfelt gratitude to all those who supported and
guided me throughout the development of the Amazon Prime Video Subscription
and Watchlist Management System project.

First and foremost, I am deeply thankful to Nalanda BCA College for providing
me with the opportunity to work on this project as part of my academic
curriculum. This project has been a significant learning experience, helping me
bridge theoretical knowledge with real-world application in full-stack web
development.

I extend my sincere appreciation to my project supervisor, Shri Siddhartha
Nabhapur, for their invaluable guidance, continuous encouragement, and
constructive feedback. Their expertise and mentorship played a crucial role in
shaping this project and enhancing my technical skills.

I am also grateful to Principal Ms. Manjula S Rottimath, for their unwavering
support and encouragement. Their insights and academic guidance helped me
navigate challenges and refine my work.

Lastly, I wish to thank my family and friends for their constant moral support,
motivation, and patience throughout this journey.

**Bharatesh Nabhapur**

---

---

# TABLE OF CONTENTS

1. Introduction ............................................................. 2
2. Proposed System .......................................................... 4
   - 2.1 Description of Proposed System ..................................... 4
   - 2.2 Description of Target Users ........................................ 4
   - 2.3 Advantages of the Proposed System .................................. 4
   - 2.4 Scope of the Project ............................................... 4
3. Software Requirement Specification (SRS) ................................. 6
   - 3.1 Overview ........................................................... 6
   - 3.2 Functional Requirements ............................................ 6
   - 3.3 Use Case Diagram ................................................... 6
   - 3.4 Non-Functional Requirements ........................................ 7
4. Graphical User Interface (GUI) ........................................... 9
5. System Design ............................................................ 12
   - 5.1 Architecture Diagram ............................................... 12
   - 5.2 Database Schema Design ............................................. 13
   - 5.3 ER Diagram ......................................................... 14
6. Implementation Details ................................................... 15
7. Testing Strategy ......................................................... 20
8. Results and Discussion ................................................... 22
9. Conclusion ............................................................... 24
10. Future Enhancements ..................................................... 26
11. Bibliography ............................................................ 28

---

---

# CHAPTER 1 — INTRODUCTION

## 1.1 Background

The rapid growth of digital streaming platforms has transformed the entertainment
industry. Platforms like Amazon Prime Video, Netflix, and Disney+ have millions
of subscribers worldwide. Managing subscriptions, user accounts, and personalized
watchlists efficiently requires a robust backend system and an intuitive frontend
interface.

This project simulates the core subscription and watchlist management
functionality of Amazon Prime Video using the MERN stack — a modern, full-stack
JavaScript technology combination widely used in the industry.

## 1.2 Problem Statement

Traditional subscription management systems lack:
- Real-time validation of duplicate subscriptions
- Automatic expiry date calculation
- Per-plan watchlist limits
- Visual indicators for expired subscriptions
- Secure user authentication

## 1.3 Objectives

The main objectives of this project are:

1. To design and develop a full-stack web application using MERN stack
2. To implement JWT-based secure user authentication
3. To create subscription plans with different features and limits
4. To validate duplicate subscriptions and prevent multiple active plans
5. To implement watchlist management with plan-based limits
6. To highlight expired subscriptions visually in red color
7. To deploy the application on cloud platforms (Vercel + Render)
8. To store data in MongoDB Atlas with proper schema design

## 1.4 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6, Axios |
| Backend | Node.js v24, Express.js 4 |
| Database | MongoDB Atlas (Cloud) |
| Authentication | JWT (JSON Web Tokens), bcryptjs |
| Styling | CSS3, Custom CSS |
| Deployment | Vercel (Frontend), Render (Backend) |
| Version Control | Git, GitHub |

---

---

# CHAPTER 2 — PROPOSED SYSTEM

## 2.1 Description of Proposed System

The Amazon Prime Video Subscription and Watchlist Management System is a
web-based application that allows users to:

- Register and login securely using JWT authentication
- Browse three subscription plans (Mini, Family, Ultra)
- Subscribe to a plan with automatic 30-day expiry calculation
- Add movies to their personal watchlist
- View movies categorized by genre (Kids, Horror, Drama, Action)
- Renew expired subscriptions
- View subscription status with color-coded indicators

## 2.2 Description of Target Users

**Primary Users:**
- Students and individuals learning MERN stack development
- College project demonstrations
- Streaming platform simulation users

**Secondary Users:**
- Faculty evaluating full-stack web development projects
- Developers studying subscription management systems

## 2.3 Advantages of the Proposed System

1. **Secure Authentication** — JWT tokens with bcrypt password hashing
2. **Real-time Validation** — Duplicate subscription and watchlist limit checks
3. **Cloud Deployment** — Accessible from anywhere via Vercel and Render
4. **Responsive Design** — Works on desktop and mobile browsers
5. **MongoDB Atlas** — Cloud database with real-time data visibility
6. **Auto Expiry** — Subscription expiry calculated automatically (30 days)
7. **Visual Indicators** — Expired subscriptions highlighted in red

## 2.4 Scope of the Project

**In Scope:**
- User registration and login
- Three subscription plans with different features
- Watchlist management with limits
- Subscription renewal
- Movie categories (Kids, Horror, Drama, Action)
- MongoDB Atlas integration
- Cloud deployment

**Out of Scope:**
- Actual video streaming
- Payment gateway integration
- Admin panel
- Email notifications

---

---

# CHAPTER 3 — SOFTWARE REQUIREMENT SPECIFICATION (SRS)

## 3.1 Overview

The system requires a modern web browser, internet connection, and MongoDB
Atlas account. The backend runs on Node.js and the frontend on React.js with
Vite as the build tool.

## 3.2 Functional Requirements

### FR1 — User Authentication
- Users shall be able to register with name, email, and password
- Users shall be able to login with email and password
- Passwords shall be hashed using bcryptjs
- JWT tokens shall be issued on successful login/register
- Token shall expire after 7 days

### FR2 — Subscription Management
- System shall offer three plans: Mini (₹149), Family (₹299), Ultra (₹599)
- System shall prevent duplicate active subscriptions
- System shall automatically calculate expiry date (30 days from subscription)
- Users shall be able to renew subscriptions
- Expired subscriptions shall be highlighted in red color

### FR3 — Watchlist Management
- Users shall be able to add movies to their watchlist
- System shall enforce watchlist limits per plan:
  - Mini: 2 movies
  - Family: 3 movies
  - Ultra: 4 movies
- System shall prevent duplicate movies in watchlist
- System shall return error if watchlist limit is exceeded

### FR4 — Movie Categories
- Home page shall display movies in 4 categories:
  - Kids, Horror, Drama, Action
- Each category shall show 6 movies with poster images

## 3.3 Use Case Diagram

```
                    +------------------+
                    |      USER        |
                    +------------------+
                           |
          +----------------+----------------+
          |                |                |
    [Register/Login]  [Subscribe]    [Manage Watchlist]
          |                |                |
    JWT Token        Select Plan      Add/View Movies
                     Auto Expiry      Check Limits
                     Renew Plan       Duplicate Check
```

## 3.4 Non-Functional Requirements

| Requirement | Description |
|-------------|-------------|
| Performance | API response time < 2 seconds |
| Security | JWT authentication, bcrypt hashing |
| Scalability | MongoDB Atlas scales automatically |
| Availability | 99% uptime on Render and Vercel |
| Usability | Responsive design for all screen sizes |
| Maintainability | Modular code structure (MVC pattern) |

---

---

# CHAPTER 4 — GRAPHICAL USER INTERFACE (GUI)

## 4.1 Home Page

The home page features:
- **Navbar** — Prime Video logo, navigation links, Sign In / Start Free Trial buttons
- **Hero Section** — Title, subtitle, CTA buttons, animated floating cards, statistics (200M+ subscribers, 50K+ titles, 240+ countries)
- **Plans Section** — Three plan cards (Mini, Family, Ultra) with features and pricing
- **Categories Section** — Four movie categories (Kids, Horror, Drama, Action) with 6 movies each
- **Features Section** — Why Prime Video (Watch on any device, Download, No Ads, Cancel Anytime)
- **Footer** — Logo, copyright, links

## 4.2 Login Page

- Split layout — left panel with branding, right panel with form
- Email and password fields
- JWT token stored in localStorage on success
- Error toast notifications for invalid credentials
- Link to Register page

## 4.3 Register Page

- Split layout — left panel with features list, right panel with form
- Name, email, password fields
- Password minimum 6 characters validation
- Redirects to Dashboard on success

## 4.4 Dashboard Page

- **Welcome Banner** — User name, total watchlist count badge
- **Subscription Status Bar** — Green (active) or Red (expired) with plan details
- **Plans Section** — Select and subscribe to Mini/Family/Ultra plans
- **Watchlist Section** — Add movies with title and genre, view list with count

---

---

# CHAPTER 5 — SYSTEM DESIGN

## 5.1 Architecture Diagram

```
+------------------+         +-------------------+        +------------------+
|   REACT FRONTEND |  HTTP   |  EXPRESS BACKEND  |  ODM   |  MONGODB ATLAS   |
|   (Vercel)       | <-----> |  (Render)         | <----> |  (Cloud DB)      |
|                  |  Axios  |                   | Mongoose|                  |
| - Home.js        |         | - /api/auth       |        | - users          |
| - Login.js       |         | - /api/subscribe  |        | - subscriptions  |
| - Register.js    |         | - /api/watchlist  |        | - watchlists     |
| - Dashboard.js   |         | - JWT Middleware   |        |                  |
+------------------+         +-------------------+        +------------------+
```

## 5.2 Database Schema Design

### User Schema
```javascript
{
  name:      { type: String, required: true, minlength: 2 },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true, minlength: 6 },
  createdAt: Date,  // auto timestamp
  updatedAt: Date   // auto timestamp
}
```

### Subscription Schema
```javascript
{
  user:             { type: ObjectId, ref: 'User', required: true },
  planName:         { type: String, enum: ['Mini','Family','Ultra'] },
  monthlyCost:      { type: Number },
  streamingQuality: { type: String, enum: ['SD','HD','Full HD','4K Ultra HD'] },
  maxDevices:       { type: Number },
  watchlistLimit:   { type: Number },
  startDate:        { type: Date, default: Date.now },
  expiryDate:       { type: Date, required: true },
  isActive:         { type: Boolean, default: true },
  createdAt:        Date,
  updatedAt:        Date
}
```

### Watchlist Schema
```javascript
{
  user:         { type: ObjectId, ref: 'User', required: true },
  subscription: { type: ObjectId, ref: 'Subscription', required: true },
  movies: [{
    title:   { type: String, required: true },
    genre:   { type: String, default: 'Unknown' },
    addedAt: { type: Date, default: Date.now }
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 5.3 ER Diagram

```
+----------+          +----------------+          +-----------+
|  USER    |  1    N  | SUBSCRIPTION   |  1    1  | WATCHLIST |
|----------|--------->|----------------|--------->|-----------|
| _id (PK) |          | _id (PK)       |          | _id (PK)  |
| name     |          | user (FK)      |          | user (FK) |
| email    |          | planName       |          | sub (FK)  |
| password |          | monthlyCost    |          | movies[]  |
+----------+          | streamQuality  |          +-----------+
                      | maxDevices     |
                      | watchlistLimit |
                      | expiryDate     |
                      | isActive       |
                      +----------------+
```

## 5.4 REST API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/subscribe | Subscribe to plan | Yes |
| GET | /api/subscriptions | Get user subscriptions | Yes |
| PUT | /api/subscription/renew | Renew subscription | Yes |
| POST | /api/watchlist/add | Add movie to watchlist | Yes |
| GET | /api/watchlist | Get user watchlist | Yes |

---

---

# CHAPTER 6 — IMPLEMENTATION DETAILS

## 6.1 Frontend Implementation

### React Components Structure
```
src/
├── App.js              — Router setup, protected routes
├── api.js              — Axios instance with JWT interceptor
├── index.css           — Global styles
└── pages/
    ├── Home.js         — Landing page with categories
    ├── Home.css        — Home page styles
    ├── Login.js        — Login form
    ├── Register.js     — Registration form
    ├── Auth.css        — Shared auth styles
    ├── Dashboard.js    — Main user dashboard
    └── Dashboard.css   — Dashboard styles
```

### Key React Features Used
- **useState** — Store selected plan, watchlist, form data
- **useEffect** — Fetch subscription and watchlist on mount
- **React Router v6** — Navigation between pages
- **Protected Routes** — Dashboard requires JWT token
- **React Toastify** — Toast notifications for success/error

### useState Example
```javascript
const [selectedPlan, setSelectedPlan] = useState(null);
const [watchlist, setWatchlist] = useState([]);
const [watchlistCount, setWatchlistCount] = useState(0);
```

## 6.2 Backend Implementation

### Duplicate Subscription Validation
```javascript
// POST /api/subscribe
const existing = await Subscription.findOne({ user: userId, isActive: true });
if (existing) {
  return res.status(400).json({
    message: `You already have an active ${existing.planName} subscription.`
  });
}
```

### Auto Expiry Date Calculation
```javascript
const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from today
```

### Watchlist Limit Validation
```javascript
if (watchlist.movies.length >= subscription.watchlistLimit) {
  return res.status(400).json({
    message: `Watchlist limit of ${subscription.watchlistLimit} reached for your ${subscription.planName} plan.`
  });
}
```

### JWT Middleware
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

## 6.3 Expired Subscription Highlight (Red Color)

```javascript
// Dashboard.js
const isExpired = subscription && new Date(subscription.expiryDate) < new Date();

// JSX
<div className={`sub-status ${isExpired ? 'expired' : 'active'}`}>
```

```css
/* Dashboard.css */
.sub-status.expired {
  background: rgba(255, 68, 68, 0.05);
  border-color: rgba(255, 68, 68, 0.3);  /* RED border */
}
.status-dot.red {
  background: #ff4444;  /* RED dot */
}
```

---

---

# CHAPTER 7 — TESTING STRATEGY

## 7.1 Unit Testing

| Test Case | Input | Expected Output | Result |
|-----------|-------|-----------------|--------|
| Register new user | Valid name, email, password | JWT token returned, user saved | PASS |
| Register duplicate email | Existing email | "User already exists" error | PASS |
| Login valid credentials | Correct email/password | JWT token returned | PASS |
| Login invalid password | Wrong password | "Invalid email or password" | PASS |

## 7.2 Subscription Testing

| Test Case | Input | Expected Output | Result |
|-----------|-------|-----------------|--------|
| Subscribe to Mini plan | planName: "Mini" | Subscription created, expiry +30 days | PASS |
| Duplicate subscription | Subscribe again | "Already have active subscription" error | PASS |
| Renew subscription | Active subscription | Expiry extended by 30 days | PASS |
| Renew expired subscription | Expired subscription | New expiry from today +30 days | PASS |

## 7.3 Watchlist Testing

| Test Case | Input | Expected Output | Result |
|-----------|-------|-----------------|--------|
| Add movie (Mini plan) | 1st movie | Movie added, count = 1 | PASS |
| Add movie at limit | 3rd movie on Mini | "Watchlist limit of 2 reached" error | PASS |
| Add duplicate movie | Same title twice | "Already in watchlist" error | PASS |
| Add without subscription | No active plan | "No active subscription" error | PASS |

## 7.4 UI Testing

| Test Case | Expected Result | Result |
|-----------|-----------------|--------|
| Expired subscription display | Red border and red dot shown | PASS |
| Active subscription display | Green border and green dot shown | PASS |
| Watchlist count badge | Updates dynamically on add | PASS |
| Plan selection highlight | Selected plan shows checkmark | PASS |

---

---

# CHAPTER 8 — RESULTS AND DISCUSSION

## 8.1 Achieved Results

The Amazon Prime Video Subscription and Watchlist Management System was
successfully developed and deployed with all required features:

1. **User Authentication** — JWT-based register/login working correctly
2. **Subscription Plans** — Mini, Family, Ultra plans with correct pricing and features
3. **Duplicate Validation** — System correctly prevents multiple active subscriptions
4. **Auto Expiry** — 30-day expiry calculated automatically on subscription
5. **Watchlist Limits** — Plan-based limits (2/3/4) enforced correctly
6. **Red Highlight** — Expired subscriptions displayed with red color
7. **Renewal** — Subscription renewal extends expiry by 30 days
8. **Movie Categories** — Kids, Horror, Drama, Action categories on home page
9. **MongoDB Atlas** — All data stored in cloud with 3 collections
10. **Deployment** — Live on Vercel + Render

## 8.2 Plan Comparison

| Feature | Mini | Family | Ultra |
|---------|------|--------|-------|
| Monthly Cost | ₹149 | ₹299 | ₹599 |
| Streaming Quality | SD | Full HD | 4K Ultra HD |
| Max Devices | 1 | 3 | 6 |
| Watchlist Limit | 2 | 3 | 4 |

## 8.3 Deployment Details

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | Vercel | https://primevideo-mern-he8q.vercel.app |
| Backend | Render | https://primevideo-mern.onrender.com |
| Database | MongoDB Atlas | cluster0.bjw8ldz.mongodb.net |
| Source Code | GitHub | https://github.com/bharatesh-nabhapur/primevideo-mern |

---

---

# CHAPTER 9 — CONCLUSION

The Amazon Prime Video Subscription and Watchlist Management System was
successfully designed, developed, and deployed using the MERN stack. The project
demonstrates the practical application of modern full-stack web development
technologies in building a real-world subscription management system.

Key achievements of this project:

1. Successfully implemented all required features from the project specification
2. Demonstrated proper use of React.js with useState and useEffect hooks
3. Built RESTful APIs with Express.js following MVC architecture
4. Designed MongoDB schemas with proper ObjectId references and timestamps
5. Implemented JWT authentication with bcrypt password hashing
6. Deployed the application on cloud platforms accessible worldwide

The project provided hands-on experience with the complete software development
lifecycle — from requirement analysis and system design to implementation,
testing, and deployment. The MERN stack proved to be an excellent choice for
building scalable, modern web applications.

---

---

# CHAPTER 10 — FUTURE ENHANCEMENTS

1. **Payment Gateway** — Integrate Razorpay/Stripe for actual subscription payments
2. **Video Streaming** — Add actual video playback using HLS streaming
3. **Admin Panel** — Dashboard for managing users, plans, and content
4. **Email Notifications** — Send expiry reminders via NodeMailer
5. **Search Functionality** — Search movies across all categories
6. **User Profiles** — Profile pictures, preferences, viewing history
7. **Rating System** — Allow users to rate and review movies
8. **Multiple Languages** — Support for regional language content
9. **Download Feature** — Offline viewing capability
10. **Recommendation Engine** — AI-based movie recommendations

---

---

# BIBLIOGRAPHY

1. MongoDB Documentation — https://www.mongodb.com/docs/
2. Express.js Documentation — https://expressjs.com/
3. React.js Documentation — https://react.dev/
4. Node.js Documentation — https://nodejs.org/docs/
5. JWT Documentation — https://jwt.io/introduction/
6. Mongoose ODM — https://mongoosejs.com/docs/
7. Vite Build Tool — https://vitejs.dev/guide/
8. React Router v6 — https://reactrouter.com/
9. Axios HTTP Client — https://axios-http.com/docs/intro/
10. Render Deployment — https://render.com/docs/
11. Vercel Deployment — https://vercel.com/docs/
12. MongoDB Atlas — https://www.mongodb.com/atlas/database
13. bcryptjs — https://www.npmjs.com/package/bcryptjs
14. React Toastify — https://fkhadra.github.io/react-toastify/

---

*Submitted in partial fulfilment of the requirements for the degree of*
*Bachelor of Computer Application*
*Nalanda BCA College, Hubballi*
*Karnatak University, Dharwad*
*Academic Year 2025-26*
