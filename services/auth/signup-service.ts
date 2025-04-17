import { SignupFormType, SignupSuccessData } from "@/types/auth-types";
import { useMutation } from "@/lib/http-client";
import { UseFormReset } from "react-hook-form";

interface UseSignupOptions {
  reset: UseFormReset<SignupFormType>;
}

export function useSignup({ reset }: UseSignupOptions) {
  const { trigger, isMutating, error, data } = useMutation<SignupSuccessData, SignupFormType>(
    "/api/v1/auth/signup",
    {
      onSuccess: (response) => {
        if (response.status === "success") {
          reset();
        }
      },
    }
  );

  const signup = async (data: SignupFormType) => {
    return trigger(data);
  };

  return {
    signup,
    isMutating,
    error,
    data,
  };
}