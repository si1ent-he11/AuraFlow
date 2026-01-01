import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/user/useUser"
import useUserStore from "../state/useUser"
import { useEffect, type ReactNode } from "react"

interface AuthProviderType {
    children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderType) => {
    const navigate = useNavigate()

    const accessToken = useUserStore((state) => state.accessToken)
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const {data, isError, error} = useUser(accessToken)
    
    useEffect(() => {
        if (accessToken === null) return
        if (isError) { 
            console.log(error)
            navigate("/error", {replace: true})
        }
        if (data && (!user || user.id !== data.id)) {
            setUser(data);
        }
    }, [data, isError, accessToken, user]);

    return (<>{children}</>)
}

export default AuthProvider;