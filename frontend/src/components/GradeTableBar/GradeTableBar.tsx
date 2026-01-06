import type { TaskGroup } from "../../types/task"
import Button from "../../ui/Button/Button"
import cl from "./GradeTableBar.module.css"

interface GradeTableBarType {
    mockGroups: TaskGroup[]
    setActiveGroup: (group: TaskGroup) => void;
    activeGroup: TaskGroup;
}

const GradeTableBar = ({mockGroups, setActiveGroup, activeGroup}: GradeTableBarType) => {
    return (
        <nav className={cl.navbar}>
            {mockGroups.map((group, index) => (
                <Button 
                    key={`${group.id}-${index}`}
                    onClick={() => setActiveGroup(group)}
                    className={cl.button}
                    style={{
                        backgroundColor: activeGroup.id === group.id ? '' : '#e6e4d7',
                        color: activeGroup.id === group.id ? 'white' : '#2e2e2e',
                    }}
                >
                    {group.task_group_name}
                </Button>
            ))}
        </nav>
    )
}

export default GradeTableBar;

