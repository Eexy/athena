import { Response } from "express";

export const sendToken = (res: Response, token: string) => {
  res.cookie('jid', token);
  res.send({token})
}