import { User } from "../entity/user";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { ConnectResponse } from "../entity/connect-response";
import { User as UModel } from "../models/user";
import { Todo as TModel } from "../models/todo";
import { generateAuthToken } from "../utils/generate-auth-token";
import { Context } from "../utils/types";
import { auth } from "../middlewares/auth";
import { sendRegistrationEmail } from "../utils/email";

@Resolver(User)
export class UserResolver {
  @UseMiddleware(auth)
  @Query((_) => User)
  async me(@Ctx() { userId }: Context): Promise<User> {
    const user = await UModel.findById(userId);

    if (!user) {
      throw new Error("Unable to fetch current user");
    }

    return user;
  }

  @Mutation((_) => ConnectResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<ConnectResponse> {
    const loginResponse: ConnectResponse = { ok: false };
    try {
      const user = await UModel.findUser(email, password);
      loginResponse.ok = true;
      loginResponse.token = generateAuthToken({
        id: user.id,
        date: Date.now(),
      });
    } catch (e) {
      loginResponse.error = e.message;
    }
    return loginResponse;
  }

  @UseMiddleware(auth)
  @Mutation((_) => Boolean)
  logout() {
    return true;
  }

  @UseMiddleware(auth)
  @Mutation((_) => Boolean)
  async changePassword(
    @Ctx() { userId }: Context,
    @Arg("password") password: string
  ): Promise<Boolean> {
    const user = await UModel.findById(userId);

    if (!user) {
      throw new Error("Unable to fetch current user");
    }

    try {
      user.password = password;
      await user.save();
    } catch (e) {
      throw new Error("Unable to update password");
    }

    return true;
  }

  @UseMiddleware(auth)
  @Mutation((_) => Boolean)
  async deleteMe(@Ctx() { userId }: Context): Promise<Boolean> {
    await UModel.findByIdAndDelete(userId);
    await TModel.deleteMany({ owner: userId });
    return true;
  }

  @Mutation((_) => ConnectResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<ConnectResponse> {
    const exist = await UModel.findOne({ email });
    const registerResponse: ConnectResponse = { ok: false };

    if (exist) {
      registerResponse.error = "User already exist";
      return registerResponse;
    }

    const user = new UModel({ email, password });

    try {
      await user.save();
      registerResponse.ok = true;
      registerResponse.token = generateAuthToken({
        id: user.id,
        date: Date.now(),
      });

      sendRegistrationEmail(user.email);
    } catch (e) {
      if (e.message.includes("`password` is required")) {
        registerResponse.error = "password is required";
      } else if (e.message.includes("`email` is required")) {
        registerResponse.error = "email is required";
      }
    }

    return registerResponse;
  }
}
