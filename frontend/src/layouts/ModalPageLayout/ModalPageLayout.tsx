import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import cl from "./ModalPageLayout.module.css"

const AuthLayout = () => {
    const navig = useNavigate()
    const onClose = () => {
        navig("/")
    }

    return (
        <div className={cl.auth_container}>
            <Modal isOpen={true} onClose={onClose}>
                <Outlet />
            </Modal>
        </div>
    )
}

export default AuthLayout;