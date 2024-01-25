const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    return res.status(200).json(savedCategory);
  } catch (err) {
    return res.status(200).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(200).json(err);
  }
});

module.exports = router;
