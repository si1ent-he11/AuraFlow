import { useNavigate } from "react-router-dom";
import type { SpaceItemDTO } from "../../types/space";
import SpaceItem from "../../ui/SpaceItem/SpaceItem";
import cl from "./SpacesList.module.css"

interface SpacesList {
    list: SpaceItemDTO[];
    className?: string;
}

const SpacesList = ({list, className = ""}: SpacesList) => {    
    const navig = useNavigate()
    const listClasses = [cl.space_list, className].join(" ")
    
    if (list === undefined) {
        return (
            <div className={cl.empty_list}>
                : )
            </div>
        )
    }

    if (list.length == 0) {
        return (
            <div className={cl.empty_list}>
                : )
            </div>
        )
    }

    return (
        <div className={listClasses}>
            {list.map(
                (item) => <SpaceItem key={item.id} spaceInfo={item} onClick={
                    () => {
                        navig("/spaces/" + item.id)
                    }
                }/>
            )}
        </div>
    )
}

export default SpacesList;