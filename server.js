const express=require("express")
const cors=require("cors")
const morgan=require("morgan")
const colors=require("colors")
const dotenv=require("dotenv")
const connectDB = require("./config/db")
const path=require("path")




// env config 
dotenv.config();

//route import
const userRoutes=require("./routes/userRoutes");
const blogRoutes=require("./routes/blogRoutes");


//mongodb connection
connectDB();
//rest object 
const app=express();

//middleware
app.use(cors({
  origin:["https://mern-blog-rr8b.onrender.com"],
  methods:["POST","GET"],
  credentials:true
  }));
app.use(express.json())
app.use(morgan('dev'))


// routes
//
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);
app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
});

const PORT=process.env.PORT || 8080;

app.listen(PORT,(req,res)=>{
  console.log(`server running on port ${PORT}`.bgCyan.white);
})