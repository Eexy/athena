import { User } from "../entity/user";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { ConnectResponse } from "../entity/connect-response";
import { User as UModel } from "../models/user";
import { generateAuthToken } from "../utils/generate-auth-token";
import { Context } from "../utils/types";
import { sendToken } from "../utils/send-token";

@Resolver(User)
export class UserResolver {
  @Query((_) => ConnectResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<ConnectResponse> {
    const loginResponse: ConnectResponse = { ok: false };
    try {
      const user = await UModel.findUser(email, password);
      loginResponse.ok = true;
      sendToken(res, generateAuthToken({ id: user.id, date: Date.now() }));
    } catch (e) {
      loginResponse.message = e.message;
    }
    return loginResponse;
  }

  @Mutation((_) => ConnectResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<ConnectResponse> {
    const exist = await UModel.findOne({ email });
    const registerResponse: ConnectResponse = { ok: false };

    if (exist) {
      registerResponse.message = "User already exist";
      return registerResponse;
    }

    const user = new UModel({ email, password });

    try {
      await user.save();
      registerResponse.ok = true;
      sendToken(res, generateAuthToken({ id: user.id, date: Date.now() }));
    } catch (e) {
      if (e.message.includes("`password` is required")) {
        registerResponse.message = "password is required";
      } else if (e.message.includes("`email` is required")) {
        registerResponse.message = "email is required";
      }
    }

    return registerResponse;
  }
}
