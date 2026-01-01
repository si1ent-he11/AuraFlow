import Logo from "../Applogo/Logo/Logo";
import Button from "../../ui/Button/Button";
import cl from "./Header.module.css"
import type React from "react";

interface HeaderType {
    buttonText: React.ReactNode;
    onClick: () => void;
}

const Header = ({ buttonText, onClick }: HeaderType) => {
    return (
        <header className={cl.header_container}>
            <Logo />
            <Button onClick={onClick} className={cl.header_button}>
                {buttonText}
            </Button>
      </header>
    )
}

export default Header;