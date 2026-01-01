import { useModal } from "../../state/useModal";
import Button from "../../ui/Button/Button";
import cl from "./Home.module.css"

const HomePage = () => {
    const {openModal} = useModal()
    return (
        <div className={cl.home_page_container}>
            <p className={cl.home_page_info}><span style={{fontStyle: "italic", color:"#f47e60"}}>choose</span> your <br/>space</p>
            <h1 className={cl.divider}>or</h1>
            <Button onClick={() => openModal("add", {})}>Create your own</Button>
        </div>
    )
}

export default HomePage;