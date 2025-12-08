import cl from "./Main.module.css"
import Button from "../../ui/Button/Button"
import { useNavigate } from "react-router-dom"

const Main = () => {
  const navig = useNavigate()
  const toTheNextPage = () => {
    navig("/signup")
  }

  const toHelpPage = () => {
    navig("/support")
  }

  return (
      <main className={cl.main_container}>
        <h1 className={cl.main_title}>
          welcome to <br />
          your <span style={{fontStyle: "italic", color:"#f47e60"}}>calm </span>space
        </h1>
        <p className={cl.main_content}>
          Your haven to grow a cozy place to learn and explore.<br />
          Discover new skills at your own pace, connect with ideas that inspire.
        </p>
        <div className={cl.main_button_bar}>
          <Button onClick={toTheNextPage}>
            Explore now for free &nbsp;&nbsp;➺
          </Button>
          <Button background="#e6e4d7" color="#2e2e2e" onClick={toHelpPage}>
            Support &nbsp;❤️
          </Button>
        </div>
      </main>
  )
}

export default Main;