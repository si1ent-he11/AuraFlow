import React from "react";
import cl from "./Input.module.css"

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputType>(
  ({ className, ...props }, ref) => {
    const rootCl = [cl.input];
    if (className) rootCl.push(className);

    return <input ref={ref} className={rootCl.join(" ")} type={props.type ?? "text"} {...props} />;
  }
);

export default Input;