import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import cl from "./ErrorPage.module.css"

const ErrorPage = () => {
    const navig = useNavigate()
    const toMainPage = () => {
        navig("/")
    }

    return (
        <div>
            <Header onClick={toMainPage} buttonText={<>Main</>}/>
            <div className={cl.error_page_container}>
                <h1 className={cl.error_page_title}>error</h1>
                <p className={cl.error_page_content}>Something went wrong, please try again later or check your data.</p>
            </div>
        </div>
    )
}

export default ErrorPage;