import type { ReactNode } from "react";
import cl from "./WorkflowList.module.css"
import { useNavigate } from "react-router-dom";
import { useModal } from "../../state/useModal";
import useMember from "../../state/useMember";
import useActiveSpace from "../../state/useActiveSpace";

interface WrapperButtonType {
    onClick?: () => void;
    children: ReactNode;
}

const WorkflowButton = ({children, onClick}: WrapperButtonType) => (
    <button className={cl.workflow_button} onClick={onClick}>
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
            {children}
        </svg>
    </button>
)

const WorkflowList = () => {
    const navig = useNavigate()
    const openModal = useModal(state => state.openModal)
    const spaceId = useActiveSpace(state => state.spaceId)
    const { member } = useMember()

    return (
        <div className={cl.workflow_list_container}>
            {/* Tasks */}
            <WorkflowButton onClick={() => {
                navig("/spaces/task-group-list")
            }}>
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </WorkflowButton>

            {/* Grades
            <WorkflowButton onClick={
                () => {
                    navig("/spaces/grade")
                }
            }>
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
            </WorkflowButton> */}

            {/* Urgent tasks */}
            <WorkflowButton onClick={
                () => navig(`/spaces/${spaceId}/tasks/`)
            }>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
                {/* <circle cx="18" cy="18" r="4" fill="#e74c3c" stroke="none"></circle> */}
            </WorkflowButton>

            {/* Timetable
            <WorkflowButton>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </WorkflowButton> */}

            {/* Members */}
            <WorkflowButton onClick={() => navig("/spaces/members")}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </WorkflowButton>
            
            {/* Teachers */}
            <WorkflowButton onClick={() => navig("/spaces/admins")}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <circle cx="12" cy="8" r="3"></circle>
                <path d="M8 13c0-1 1-2 4-2s4 1 4 2"></path>
            </WorkflowButton>
                
            {/* Settings */}
            <WorkflowButton onClick={
                () => {
                    if (member?.spaceRole == 'owner') {
                        navig("/spaces/setting")
                        return 
                    }
                    openModal("changeProfile", {})
                }
            }>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </WorkflowButton>
        </div>
    )
}

export default WorkflowList;