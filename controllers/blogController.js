const BLOG = require("../models/blog");

const addBlog = async (req, res) => {
  const { title, subTitle, description, category, isPublished } = req.body;
  try {
    //check if all fields are present
    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const blog = await BLOG.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
    });

    res
      .status(201)
      .json({ success: true, message: "Blog added successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BLOG.find({ isPublished: true });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BLOG.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    await BLOG.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const togglePublish = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Missing blog ID" });
    const blog = await BLOG.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({ success: true, message: "Blog status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
};
