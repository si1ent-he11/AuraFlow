import type React from "react";
import cl from "./Input.module.css"

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
}

const Input = ({className, ...props}: InputType) => {
    const rootCl = [cl.input]
    if (className) {
        rootCl.push(className!)
    }
    
    return <input className={rootCl.join(" ")} type="text" {...props} />
}

export default Input;