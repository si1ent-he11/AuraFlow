import type { SpaceItemDTO } from "../../types/space";
import { useState } from "react";
import { useModal } from "../../state/useModal";
import type { DeleteProps } from "../../components/modals/DeleteSpace/DeleteSpace";
import cl from "./SpaceListItem.module.css"

interface SpaceItemType {
    spaceInfo: SpaceItemDTO;
    onClick: () => void; 
} 

const SpaceListItem = ({spaceInfo, onClick}: SpaceItemType) => {
    const [isHovered, setIsHovered] = useState(false);
    const {openModal} = useModal()
    const deleteProps: DeleteProps = { spaceId: spaceInfo.id };
    
    return (
        <div
            className={[cl.space_item_container, isHovered ? cl.space_item_container_hover : ""].join(" ")} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <p className={cl.space_item_title}>{spaceInfo.spaceName}</p>
            <button className={cl.delete_space_button} onClick={() => openModal("delete", deleteProps)}>
                <svg
                    className={isHovered ? cl.svg_visible : cl.svg_hidden}
                    width="10" height="10" viewBox="0 0 10 10"
                >
                    <line x1="0" y1="0" x2="10" y2="10" stroke="#2f3035" strokeWidth="2"/>
                    <line x1="10" y1="0" x2="0" y2="10" stroke="#2f3035" strokeWidth="2"/>
                </svg>
            </button>
        </div>
    )
}

export default SpaceListItem;