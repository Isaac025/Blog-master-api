const router = require("express").Router();
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
} = require("../controllers/blogController");
const { isLoggedIn, requirePermissions } = require("../middleware/auth");

router.post("/add", isLoggedIn, requirePermissions("admin"), addBlog);
router.get("/all", isLoggedIn, getAllBlogs);
router.get("/:id", isLoggedIn, getBlogById);
router.delete("/:id", isLoggedIn, requirePermissions("admin"), deleteBlogById);
router.patch("/:id", isLoggedIn, requirePermissions("admin"), togglePublish);

module.exports = router;
