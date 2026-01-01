import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation<void, Error, void>({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear()
            navigate('/')
        },
        onError: (error) => {
            console.error("Ошибка при выходе:", error);
        }
    });
};