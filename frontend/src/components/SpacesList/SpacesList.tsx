import { useNavigate } from "react-router-dom";
import type { SpaceItemDTO } from "../../types/space";
import cl from "./SpacesList.module.css"
import SpaceListItem from "../../ui/SpaceListItem/SpaceListItem";

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
                (item) => <SpaceListItem key={item.id} spaceInfo={item} onClick={
                    () => {
                        navig("/spaces/info/" + item.id)
                    }
                }/>
            )}
        </div>
    )
}

export default SpacesList;