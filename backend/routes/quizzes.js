const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const teacher = require("../middlewares/teacher");

const {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionById
} = require("../controllers/quizController");

// Teacher only CRUD
router.post("/", auth, teacher, addQuestion);
router.put("/:id", auth, teacher, updateQuestion);
router.delete("/:id", auth, teacher, deleteQuestion);

// Anyone logged in can fetch question by ID
router.get("/:id", auth, getQuestionById);

module.exports = router;
