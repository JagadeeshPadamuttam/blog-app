const mongoose=require("mongoose");
const colors=require("colors");
const connectDB=async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`succesfully connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`mongodb error ${error}`.bgRed.white);

        
    }

}
module.exports= connectDB;