const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      return res.status(200).json(updatedPost);
    } else {
      return res.status(404).json("you can update only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await post.delete();
      return res.status(200).json("post has been deleted");
    } else {
      return res.status(404).json("you can delete only your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const username = req.query.username;
    const category = req.query.category;
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = Post.find();
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
