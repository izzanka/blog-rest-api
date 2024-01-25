const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      return res.status(200).json(updatedUser);
    } else {
      return res.status(401).json("you can update only your account");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json("user not found");
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("user has been deleted");
    } else {
      return res.status(401).json("you can delete only your account");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const {password, ...others} = user._doc
    return res.status(200).json(others)
  }catch (err) {
    return res.status(500).json(err);
  }
})

module.exports = router;
