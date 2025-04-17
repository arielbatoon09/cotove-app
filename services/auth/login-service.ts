import { LoginFormType, LoginSuccessData } from "@/types/auth-types";
import { useMutation } from "@/lib/http-client";
import { UseFormReset } from "react-hook-form";

interface UseLoginOptions {
  reset: UseFormReset<LoginFormType>;
}

export function useLogin({ reset }: UseLoginOptions) {
  const { trigger, isMutating, error, data } = useMutation<LoginSuccessData, LoginFormType>(
    "/api/v1/auth/login",
    {
      onSuccess: (response) => {
        if (response.status === "success") {
          reset();
        }
      },
    }
  );

  const login = async (data: LoginFormType) => {
    return trigger(data);
  };

  return {
    login,
    isMutating,
    error,
    data,
  };
}