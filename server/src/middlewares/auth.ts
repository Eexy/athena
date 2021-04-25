import { Error } from "mongoose";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../utils/types";
import {verify} from "jsonwebtoken";
import { User } from "../models/user";
import {Payload} from "../utils/generate-auth-token";

export const auth : MiddlewareFn<Context> = async ({context}, next) => {
  const authorization = context.req.headers["authorization"];

  if(!authorization){
    throw new Error("not authenticated");
  }

  try{
    const token = authorization.split(" ")[1];
    const payload: any = verify(token, process.env.JWT_KEY!);
    const user = await User.findById(payload.id);

    if(!user){
      throw new Error("not authenticated");
    }

    context.userId = user.id;
  }catch(e){
    throw new Error("not authenticated");
  }

  return next();
}