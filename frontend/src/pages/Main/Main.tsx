import cl from "./Main.module.css"
import Button from "../../UI/Button/Button"
import Modal from "../../components/Modal/Modal"
import { useState } from "react"
import Header from "../../components/layout/Header/Header"

const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={cl.main_page_container}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Header />
        <div className={cl.main_page_modal}>
          <h1 className={cl.modal_titile}>Support the<br />Creator</h1>
          <p className={cl.modal_content}>
            Aura Flow is built by a small team with care and intention.<br/>
            If this space helps you focus, learn, and grow, your support truly makes a difference.
          </p>
          <a className={cl.modal_link}>https://help-me-pls</a>
        </div>
      </Modal>
      <Header />
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
          <Button>
            <h1>Explore now for free &nbsp;&nbsp;➺</h1>
          </Button>
          <Button background="#e6e4d7" color="#2e2e2e" onClick={() => {setIsOpen(true)}}>
            <h1>Support &nbsp;❤️</h1>
          </Button>
        </div>
      </main>
      <footer className={cl.footer_container}>
        <h3>© 2025 Aura Flow — Your calm space to learn and grow | Contact: hello@auraflow.app</h3>
      </footer>
    </div>
  )
}

export default Main;