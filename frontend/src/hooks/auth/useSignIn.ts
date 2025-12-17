import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserLoginRequestDTO } from "../../types/user";
import type { AccessToken } from "../../types/api";
import { signIn } from "../../api/auth";

const useSignIn = () => {
    const client = useQueryClient()
    return useMutation<AccessToken, Error, UserLoginRequestDTO>({
        mutationFn: signIn,
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["user"]})
        },
        onError: (error) => {
            console.log(error)
        }
    })
}

export default useSignIn;