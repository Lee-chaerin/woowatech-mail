import { useMutation } from "@tanstack/react-query"
import { getUserByEmail, sendVerifyCode, checkVerifyCode } from "../apis/user"
import type { CheckEmailResponse, VerifyItem } from "../../types/verify"
import type { AxiosError } from "axios"

export const useCheckUserEmail = () => {
  return useMutation<
    CheckEmailResponse,
    AxiosError<{message?: string}>,
    string
  >({
    mutationFn: (email: string) => getUserByEmail(email)
  })
}

export const useSendVerifyCode = () => {
  return useMutation<
    void,
    AxiosError<{message?: string}>,
    string
  >({
    mutationFn: (email: string) => sendVerifyCode(email)
  })
}

export const useCheckVerifyCode = () => {
  return useMutation<
    void,
    AxiosError<{message?: string}>,
    VerifyItem
  >({
    mutationFn: ({ email, code, category_id }: VerifyItem) => 
      checkVerifyCode({email, code, category_id}),
  })
}