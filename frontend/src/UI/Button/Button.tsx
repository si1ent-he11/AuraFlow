import type React from "react";
import cl from "./Button.module.css"

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    background?: string;
    children?: React.ReactNode; 
}

const Button = ({color = "#f2f0e3", background = "#2e2e2e", children, className, onClick, ...props}: ButtonType) => {
    const rootCl = [cl.button]
    if (className) {
        rootCl.push(className!)
    }
    
    return <button
        className={rootCl.join(" ")}
        style={{color: color, background: background}}
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
}

export default Button;