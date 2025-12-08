import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import cl from "./MainPageLayout.module.css"

const MainPageLayout = () => {
    const navig = useNavigate()
    const toTheNextPage = () => {
        navig("/signup")
    }
    return (
        <div className={cl.main_page_container}>
            <Header onClick={toTheNextPage} buttonText={<>Get Started &nbsp;&nbsp;➺</>}/>
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainPageLayout;

