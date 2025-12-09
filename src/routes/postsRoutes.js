const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/:id/like", postController.likePost);
router.post("/:id/dislike", postController.dislikePost);

module.exports = router;
