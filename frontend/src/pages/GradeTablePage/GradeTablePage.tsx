import { useEffect, useMemo, useState } from "react";
import GradesTable from "../../components/GradesTable/GradesTable";
import GradeTableBar from "../../components/GradeTableBar/GradeTableBar";
import cl from "./GradeTablePage.module.css";
import type { TaskGroup, UserRow, Grade } from "../../types/task";
import type { MemberType } from "../../types/member";
import useMember from "../../state/useMember";
import { useTaskGroup } from "../../hooks/task/useTaskGroup";
import useActiveSpace from "../../state/useActiveSpace";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader/Loader";

const mockGrades: Grade[] = []; 

const monthsEn: Record<number, string> = {
  1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
  7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
};

const GradeTablePage = () => {
  const spaceId = useActiveSpace(state => state.spaceId);
  const navig = useNavigate();
  
  const { data: taskGroup, isLoading, isError } = useTaskGroup(spaceId);
  
  const [activeGroup, setActiveGroup] = useState<TaskGroup | null>(null);
  const member = useMember(state => state.member);
  const isAdmin = member?.spaceRole === "admin" || member?.spaceRole === "owner";

  useEffect(() => {
    if (taskGroup && !activeGroup) {
      setActiveGroup(taskGroup[0]);
    }
  }, [taskGroup, activeGroup]);

  useEffect(() => {
    if (isError && !isLoading) {
      navig("/error");
    }
  }, [isError, isLoading, navig]);

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const changeMonth = (offset: number) => {
    const now = new Date();
    const todayLimit = new Date(now.getFullYear(), now.getMonth(), 1);

    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      if (offset > 0 && newDate > todayLimit) return prev;
      return newDate;
    });
  };

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    });
  }, [currentDate]);

  const formattedData: UserRow[] = useMemo(() => {
    if (!activeGroup) return [];

    const allMembers: MemberType[] = []; 

    return allMembers.map((m) => {
      const userGradesForGroup = mockGrades.filter(
        (grade) => grade.member_id === m.id && grade.task_group_id === activeGroup.id
      );

      return {
        member_id: m.id,
        username_in_space: m.usernameInSpace, 
        all_grades: userGradesForGroup,
      };
    });
  }, [activeGroup]);


  const isGroupInvalid = activeGroup?.id === -1;

  if (isLoading) return <Loader />;

  if (!activeGroup || isGroupInvalid) {
    return (
      <div className={cl.container}>
        <h1 className={cl.title}>Rating Tables</h1>
        <div className={cl.errorMessage}>
          ⚠️ The task group was not found or was deleted.
        </div>
      </div>
    );
  }

  return (
    <div className={cl.container}>
      <h1 className={cl.title}>Rating Tables</h1>
      
      <GradeTableBar 
        mockGroups={taskGroup ? taskGroup : []} 
        setActiveGroup={setActiveGroup} 
        activeGroup={activeGroup} 
      />

      <h1 className={cl.info}>Table: {activeGroup.task_group_name}</h1>

      <GradesTable
        data={formattedData}
        daysInMonth={daysInMonth} 
        isAdmin={isAdmin} 
        activeGroup={activeGroup} 
      />

      <div className={cl.pagination}>
        <button className={cl.pageBtn} onClick={() => changeMonth(-1)}>{"<"}</button>
        <span className={cl.monthName}>
          {monthsEn[currentDate.getMonth() + 1]} {currentDate.getFullYear()}
        </span>
        <button className={cl.pageBtn} onClick={() => changeMonth(1)}>{">"}</button>
      </div>
    </div>
  );
};

export default GradeTablePage;