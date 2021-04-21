import mongoose, { Document, Model, Schema } from "mongoose";

const schema: Schema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

interface Todo extends Document {
  desc: string;
  completed: boolean;
}

const Todo: Model<Todo> = mongoose.model("Todo", schema);
