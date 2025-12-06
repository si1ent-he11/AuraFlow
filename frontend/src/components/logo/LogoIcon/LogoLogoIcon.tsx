import Star from "../LogoStart/StarLogo"
import cl from "./LogoIcon.module.css"

const Logo = () => {
    return (
        <div className={cl.logo_contaioner}>
          <Star color="#f47e60"/>
          <h1>Aura Flow</h1>
        </div>
    )
}

export default Logo;