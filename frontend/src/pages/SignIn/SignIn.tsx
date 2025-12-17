import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import cl from "./SignIn.module.css"
import SignInForm from "../../components/SignInForm/SignInForm";
import { useEffect } from "react";
import { useAuthStatus } from "../../hooks/auth/useAuthStatus";

const SignIn = () => {
    const navig = useNavigate()
    const isLoggedIn = useAuthStatus()
    useEffect(()=>{
        if (isLoggedIn) navig("/home")
    }, [navig, isLoggedIn])
    
    const toTheNextPage = () => {
        navig("/signup")
    }

    return (
        <div className={cl.sign_in_container}>
            <Header onClick={toTheNextPage} buttonText={<>Sign up &nbsp;➺</>}/>
            <h1 className={cl.sign_in_title}>sign <span style={{fontStyle: "italic", color:"#f47e60"}}>in</span></h1>
            <div className={cl.sign_in_form_container}>
                <SignInForm />
            </div>
        </div> 
    )
}

export default SignIn;