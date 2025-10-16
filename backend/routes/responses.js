const express = require("express");
const router = express.Router();
const { submitResponse, getUserResponses } = require("../controllers/responseController");

router.post("/", submitResponse);
router.get("/:userId", getUserResponses);

module.exports = router;
