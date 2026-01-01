import React from "react";
import cl from "./Input.module.css"

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputType>(({ className = " ", ...props }, ref) => {
    const rootCl = [cl.input, className].join(" ");

    return <input ref={ref} className={rootCl} type={props.type ?? "text"} {...props} />;
  }
);

export default Input;