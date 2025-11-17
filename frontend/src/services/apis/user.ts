import type { VerifyItem } from "../../types/verify";
import { requestAPI } from "../../utils/fetch"

export const getUserByEmail = async (email: string) => {
  const data = await requestAPI().post("/users/email", {email});
  return data;
}

export const sendVerifyCode = async (email: string) => {
  const data = await requestAPI().post("/users/sendcode", {email});
  return data;
}

export const checkVerifyCode = async ({email, code, category_id}: VerifyItem) => {
  const data = await requestAPI().post("/users/checkcode", {email, code, category_id});
  return data;
}