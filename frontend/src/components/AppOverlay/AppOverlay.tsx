import cl from "./AppOverlay.module.css";
import type { ReactNode } from "react";

interface ModalType {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const AppOverlay = ({children, isOpen = false, onClose}: ModalType) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className={cl.modal_container}>
            <div className={cl.modal_content}>
                {children}
            </div>
            <button className={cl.modal_button} onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <line x1="0" y1="0" x2="16" y2="16" stroke="black" strokeWidth="3"/>
                    <line x1="16" y1="0" x2="0" y2="16" stroke="black" strokeWidth="3"/>
                </svg>
            </button>
        </div>
    )
}

export default AppOverlay;