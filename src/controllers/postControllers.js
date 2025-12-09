const { Post } = require("../../models");

exports.createPost = async (req, res) => {
  try {
    const { title, description, authorName, bannerImageUrl } = req.body;

    const post = await Post.create({
      title,
      description,
      authorName,
      bannerImageUrl,
      likesCount: 0,
      dislikesCount: 0,
    });

    return res.status(201).json({ success: true, data: post });
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllPosts = async (_, res) => {
  try {
    const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.json({ success: true, data: post });
  } catch (err) {
    console.error("Error fetching post:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    post.likesCount += 1;
    await post.save();

    return res.json({ success: true, data: post });
  } catch (err) {
    console.error("Error liking post:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    post.dislikesCount += 1;
    await post.save();

    return res.json({ success: true, data: post });
  } catch (err) {
    console.error("Error disliking post:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
