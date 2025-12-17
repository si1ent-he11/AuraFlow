import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import cl from "./SignUp.module.css"
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useEffect } from "react";
import { useAuthStatus } from "../../hooks/auth/useAuthStatus";

const SignUp = () => {
    const navig = useNavigate()
    const isLoggedIn = useAuthStatus()
    useEffect(()=>{
        if (isLoggedIn) navig("/home")
    }, [navig, isLoggedIn])

    const toTheNextPage = () => {
        navig("/signin")
    }

    return (
        <div className={cl.sign_up_container}>
            <Header onClick={toTheNextPage} buttonText={<>Sign in &nbsp;&nbsp;➺</>}/>
            <h1 className={cl.sign_up_title}>sign <span style={{fontStyle: "italic", color:"#f47e60"}}>up</span></h1>          
            <div className={cl.sign_up_form_container}>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp;