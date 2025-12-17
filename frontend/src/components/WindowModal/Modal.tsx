import cl from "./Modal.module.css";
import type { ReactNode } from "react";

interface ModalType {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({children, isOpen = false, onClose}: ModalType) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className={cl.modal_container}>
            <div className={cl.modal_content}>
                {children}
            </div>
            <button className={cl.modal_button} onClick={onClose}>✖️</button>
        </div>
    )
}

export default Modal;