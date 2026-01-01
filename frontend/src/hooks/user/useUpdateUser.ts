import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../../api/user"
import type { Error } from "../../types/api"
import type { UserDTO, UserType } from "../../types/user"
import useUserStore from "../../state/useUser"
import { useModal } from "../../state/useModal"

const getUpdatedUser = (currentUser: UserType, updates: UserDTO): UserType => {
    return {
        ...currentUser,
        email: updates.email ?? currentUser.email,
        username: updates.username ?? currentUser.username,
    };
}

export const useUpdateUser = () => {
    const client = useQueryClient();
    const access = useUserStore(state => state.accessToken)
    const currentUserProfile = useUserStore(state => state.user)
    const setUser = useUserStore(state => state.setUser)
    const {openModal} = useModal()

    return useMutation<UserDTO, Error, UserDTO>({
        mutationFn: updateUser,
        onSuccess: (data) => {
            client.setQueryData(["user", access], data);
            if (currentUserProfile) {
                const updatedUser = getUpdatedUser(currentUserProfile, data);
                setUser(updatedUser);
            }

            client.invalidateQueries({ queryKey: ["user"] });
        },
        onError: () => {
            openModal("error", {})
        }
    })
}