import { Outlet, useNavigate } from "react-router-dom";

import cl from "./ModalPageLayout.module.css"
import Modal from "../../components/WindowModal/Modal";

const ModalPageLayout = () => {
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

export default ModalPageLayout;