import { useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/TextInput/Input";
import cl from "./ConfirmationInput.module.css";

interface ConfirmationInputType {
    value?: string;
    className?: string;
    setValue?: (value: string) => void;
    onClick?: () => void;
    validate?: (value: string) => string | null;
}

const ConfirmationInput = ({value, className, setValue, onClick, validate}: ConfirmationInputType) => {
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = () => {
        if (validate) {
            const errorText = validate(value!)
            if (errorText) {
                setError(errorText)
                return
            }
        }
        setError(null)
        onClick!()
    }

    return (
        <div className={`${cl.container} ${className || ""}`}>
            <Input className={error ? cl.input_error : ""} value={value ?? ""} onChange={(e) => setValue?.(e.target.value)}/>
            <Button onClick={handleConfirm}>Confirm</ Button>
        </div>
    )
}

export default ConfirmationInput;