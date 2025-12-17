import { Outlet } from "react-router-dom";
import AuthProvider from "../../providers/AuthProvider";

const HomeLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export default HomeLayout;