import mongoose from "mongoose";


let url = "mongodb://127.0.0.1:27017/athena"
if((process.env.NODE_ENV!) === "production"){
  url = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PWD}@cluster0.51prx.mongodb.net/athena?retryWrites=true&w=majority`
}

const connect = async () => {
  try{
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }catch(e){
    console.log(e)
  }
};

connect();


