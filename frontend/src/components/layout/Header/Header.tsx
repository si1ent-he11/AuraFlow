import lineLogo from "../../../images/line.svg";
import Logo from "../../logo/LogoIcon/LogoLogoIcon";
import Button from "../../../UI/Button/Button";
import cl from "./Header.module.css"

const Header = () => {
    return (
        <header className={cl.header_container}>
            <Logo />
            <img src={lineLogo} className={cl.header_line_logo}/>
            <Button>
                <h1>Get Started &nbsp;&nbsp;➺</h1>
            </Button>
      </header>
    )
}

export default Header;