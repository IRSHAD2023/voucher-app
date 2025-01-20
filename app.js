require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Middleware for handling POST requests
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session handling
app.use(session({
  secret: 'your-secret-key',  // Use a secret for the session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }   // For development, set 'secure: false' (change to 'true' in production with HTTPS)
}));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (for generated PDFs and other static assets)
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const voucherRouter = require('./routes/voucher');

// Use routes
app.use('/auth', authRouter);         // Handle authentication routes like login
app.use('/dashboard', dashboardRouter); // Handle the dashboard route
app.use('/voucher', voucherRouter);    // Handle voucher-related routes

// Default route to render login page if the root URL is accessed
app.get('/', (req, res) => {
  res.redirect('/auth/login'); // Redirect root to login page
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
