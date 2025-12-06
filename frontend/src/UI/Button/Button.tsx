import type React from "react";
import cl from "./Button.module.css"

interface ButtonType {
    color?: string;
    background?: string;
    children: React.ReactNode;
    className?: string; 
    onClick?: () => void;
}

const Button = ({onClick, color = "#f2f0e3", background = "#2e2e2e", className, children}: ButtonType) => {
    const rootCl = [cl.button]
    if (className) {
        rootCl.push(className!)
    }
    
    return <button className={rootCl.join(" ")} style={{color: color, background: background}} onClick={onClick}>
        {children}
    </button>
}

export default Button;