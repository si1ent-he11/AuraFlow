import { refresh } from "../../api/auth";
import useUserStore from "../../state/useUser";
import Loader from "../../ui/Loader/Loader";

const feacthing = async () => {
    const obj = await refresh()
    console.log(obj.accessToken)
} 

const HomePage = () => {
    const user = useUserStore((state) => state.user)
    const logout = useUserStore((state) => state.logout)
    const access = useUserStore((state) => state.accessToken)
    console.log(access)
    console.log(user)

    return (
        <div>
            {!user ? <Loader /> : null}
                <button onClick={() => {
                    feacthing()
                }
            }>
                REFRESH
            </button>
                <button onClick={() => {
                    logout()
                }
            }>
                LOGOUT
            </button>
        </div>
    )
}

export default HomePage;