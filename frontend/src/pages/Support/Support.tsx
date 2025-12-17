import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import cl from "./Support.module.css"
import { useEffect } from "react"
import { useAuthStatus } from "../../hooks/auth/useAuthStatus"

const Support = () => {
    const navig = useNavigate()
    const isLoggedIn = useAuthStatus()
    useEffect(()=>{
        if (isLoggedIn) navig("/home")
    }, [navig, isLoggedIn])
    
    const toTheNextPage = () => {
        navig("/signup")
    }
    return (
        <div className={cl.support_page_modal}>
            <Header onClick={toTheNextPage} buttonText={<>Get Started &nbsp;&nbsp;➺</>}/>
            <h1 className={cl.support_titile}>support the<br />creator</h1>
            <p className={cl.support_content}>
                Aura Flow is built by a small team with care and intention.<br/>
                If this space helps you focus, learn, and grow, your support truly makes a difference.
            </p>
            <a className={cl.support_link}>https://help-me-pls</a>
        </div>
    )
}

export default Support;