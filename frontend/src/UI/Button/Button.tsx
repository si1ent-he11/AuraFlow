import type React from "react";
import cl from "./Button.module.css"

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode; 
}

const Button = ({ children, className = "", onClick, ...props}: ButtonType) => {    
    const buttonClasses = [cl.button, className].join(" ");

    return <button
        className={buttonClasses}
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
}

export default Button;