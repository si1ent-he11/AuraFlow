import lineLogo from "../../images/line.svg";
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
            <img src={lineLogo} alt="Logo" className={cl.header_line_logo}/>
            <Button onClick={onClick}>
                {buttonText}
            </Button>
      </header>
    )
}

export default Header;