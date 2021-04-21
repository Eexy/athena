import mongoose, { Document, Model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

const schema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validator: (v: string) => {
        if(!isEmail(v)){
          throw new Error("Invalid email");
        }
      }
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre<IUser>('save', async function(next){
  const user = this;

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

interface IUser extends Document{
  id: string;
  email: string;
  password: string;
}

export const User: Model<IUser> = mongoose.model("User", schema);
