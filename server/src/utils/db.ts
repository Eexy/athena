import mongoose from "mongoose";

const connect = async () => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/athena', {
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


