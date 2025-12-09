const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadControllers");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/banner", upload.single("file"), uploadController.uploadBanner);

module.exports = router;
