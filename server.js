const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./config/passport");
const googleAuthRoutes = require("./routes/googleAuth");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/users");
const quizRoutes = require("./routes/quizzes");
const responseRoutes = require("./routes/responses");
const adaptiveRoutes = require("./routes/adaptive");
const careerRoutes = require("./routes/careerPrediction");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Body parser
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`DB Connection Error: ${err}`));

// Routes
app.use("/api/users", userRoutes);          // User registration/login/profile
app.use("/api/quizzes", quizRoutes);        // Quiz CRUD (teacher)
// app.use("/api/responses", responseRoutes);  // User responses
app.use("/api/adaptive", adaptiveRoutes);   // Adaptive quiz controller
app.use("/api/career-prediction", careerRoutes); // AI career prediction
app.use("/auth", googleAuthRoutes);


// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
