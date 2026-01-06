import { Outlet, useNavigate } from "react-router-dom";
import AuthProvider from "../../providers/AuthProvider";
import cl from "./SpaceLayout.module.css"
import useActiveSpace from "../../state/useActiveSpace";
import ModalRoot from "../../components/modals/ModalRoot/ModalRoot";
import WorkflowList from "../../components/WorkflowList/WorkflowList";

const SpaceLayout = () => {
    const clearState = useActiveSpace(state => state.clearCurrentSpace)
    const navig = useNavigate()

    return (
       <AuthProvider>
            <main className={cl.space_container}>
                <ModalRoot />
                <div className={cl.space_bar}>
                    <div className={cl.bar_header}>
                        <button 
                            className={cl.return_button}
                            onClick={() => {
                                navig("/home")
                                clearState()
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className={cl.icon}
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div className={cl.bar_separator}></div>
                    <div className={cl.list_container}>
                        <WorkflowList/>
                    </div>
                    <div className={cl.bar_separator}></div>
                </div>
                <div className={cl.page_separator}></div>
                <div className={cl.home_space_info}><Outlet /></div>
            </main>
       </AuthProvider>
    )
}

export default SpaceLayout;