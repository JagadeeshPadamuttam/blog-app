const blogModel= require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose=require("mongoose");



// get  blogs
exports.getAllBlogsController =async(req,res)=>{
    try {
        const blogs=await blogModel.find({}).populate("user")
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"no blogs found",
                error,
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount: blogs.length,
            message:" all blogs list",
            blogs,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in get all blogs",
            error,
        })
        
    }
}

//create  blog 

exports.createBlogController = async (req, res) => {
    try {
      const { title, description, image, user } = req.body;
      //validation
      if (!title || !description || !image || !user) {
        return res.status(400).send({
          success: false,
          message: "Please Provide ALl Fields",
        });
      }
      const exisitingUser = await userModel.findById(user);
      //validaton
      if (!exisitingUser) {
        return res.status(404).send({
          success: false,
          message: "unable to find user",
        });
      }
  
      const newBlog = new blogModel({ title, description, image, user });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({ session });
      exisitingUser.blogs.push(newBlog);
      await exisitingUser.save({ session });
      await session.commitTransaction();
      await newBlog.save();
      return res.status(201).send({
        success: true,
        message: "Blog Created!",
        newBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error WHile Creting blog",
        error,
      });
    }
  };

// put ||  update blog 

exports.updateBlogController=async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,description,image}=req.body;
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(201).send({
            success:true,
            message:"succesfully updated blog",
            blog,

        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:" error while updating blog",
            error,
        })
        
    }
}


// delete  blog
exports.deleteBlogController = async (req, res) => {
    try {
      const blog = await blogModel
        // .findOneAndDelete(req.params.id)
        .findByIdAndDelete(req.params.id)
        .populate("user");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
      return res.status(200).send({
        success: true,
        message: "Blog Deleted!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Erorr WHile Deleteing BLog",
        error,
      });
    }
  };


// get||single blog
exports.getBlogController=async(req,res)=>{
    try {
        const {id}=req.params;
        const blog=await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                message:" blog not found",
                error
            })
        }
        return res.status(200).send({
            success:true,
            message:" fetched succesfully",
            blog,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:" error in fetching single blog",
            error,
        })
        
    }
}


// user blog 
exports.userBlogController=async(req,res)=>{
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
          return res.status(404).send({
            success: false,
            message: "blogs not found with this id",
          });
        }
        return res.status(200).send({
          success: true,
          message: "user blogs",
          userBlog,
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).ssend({
            success:false,
            message:"error in getting user blogs",
            error,
        })
        
    }

}