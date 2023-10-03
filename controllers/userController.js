const userModel= require("../models/userModel")
const bcrypt=require("bcrypt")
//create user register contro
exports.registerController=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        // validation 
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:"please fill all fields",

            })
        }
        // existing user
        const exisitingUser=await userModel.findOne({email})
        if(exisitingUser){
            return res.status(401).send({
                success:false,
                message:"user exists already"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        
        // save new use
        const user=new userModel({username,email,password:hashedPassword})
        await user.save();
        return res.status(201).send({
           success:true,
           message:"new user registered" ,
           user
        })
    } catch (error) {
       console.log(error);
       return res.status(500).send({
        message:"Error in Register callback",
        success:false,
        error
       })
        
    }
};


// get all users 
exports.getAllUsers=async(req,res)=>{
    try {
        const users=await userModel.find({})
        return res.status(200).send({
            userCount:users.length,
            success: true,
            message:" all users data",
            users,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in  get all users callback",
            error,
        })
        
    }
};



//login 
exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //validation 
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:"plaese enter email or password",
                // error,
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"email not registered",
                // error,
                })
        }
        // password
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"invalid email or password",
                // error,
            })
        }
        return res.status(200).send({
            success:true,
            message:"login succesfully",
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in login callback",
            error,
        })
        
    }
};