const express=require("express");
const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getBlogController, userBlogController } = require("../controllers/blogController");

// router object

const router=express.Router();

// get || all blogs
router.get("/all-blog",getAllBlogsController)

//post 
router.post("/create-blog",createBlogController)

// put ||  update

router.put("/update-blog/:id",updateBlogController)


// delete 
router.delete("/delete-blog/:id",deleteBlogController)


// get||single blog
router.get("/get-blog/:id",getBlogController)

//  egt || router blogs
router.get('/user-blog/:id',userBlogController)

module.exports=router;