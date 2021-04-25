import { Error } from "mongoose";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../utils/types";
import {verify} from "jsonwebtoken";
import { User } from "../models/user";
import {Payload} from "../utils/generate-auth-token";

export const auth : MiddlewareFn<Context> = async ({context}, next) => {
  const authCookie = context.req.cookies.jid;
  console.log(context.req.headers);
  if(!authCookie){
    throw new Error("not authenticated");
  }

  try{
    const payload: any = verify(authCookie, process.env.JWT_KEY!);
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