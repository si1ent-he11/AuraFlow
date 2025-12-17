import useUserStore from "../../state/useUser";

export const useAuthStatus = () => {
    const user = useUserStore((state) => state.user)
    return !!user;
};