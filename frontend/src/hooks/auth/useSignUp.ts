import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../../types/user";
import type { SignUpResponse } from "../../types/api";
import { signUp } from "../../api/auth";

const useSignUp = () => {
    const client = useQueryClient()
    return useMutation<SignUpResponse, Error, UserType>({
        mutationFn: signUp,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["user"]})
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export default useSignUp;