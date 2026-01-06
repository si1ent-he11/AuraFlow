import { useState } from "react";
import type { Grade, TaskGroup, UserRow } from "../../../types/task";
import cl from "./TableModal.module.css";
import Input from "../../../ui/TextInput/Input";
import Button from "../../../ui/Button/Button";

export interface GradeModalProps {
  member: UserRow;
  date: string;
  grade?: Grade;
  group: TaskGroup;
  onClose: () => void;
}

const GradeModal = ({ member, date, grade, group, onClose }: GradeModalProps) => {
  const [score, setScore] = useState<number>(grade?.score ?? group.min_score);

  const handleSave = async () => {
    const payload = {
      memberId: member.member_id,
      groupId: group.id,
      date: date,
      score: score
    };
    console.log("Saving to Go backend:", payload);
    onClose();
  };

  return (
    <div className={cl.overlay}>
      <h2 className={cl.title}>Grade</h2>
      <p className={cl.dateText}>Date: {date}</p>

      <div className={cl.formGroup}>
        <label className={cl.label}>
          Баллы ({group.min_score} - {group.max_score})
        </label>
        <Input
          type="number"
          min={group.min_score}
          max={group.max_score}
          value={score}
          placeholder=""
          onChange={(e) => setScore(Number(e.target.value))}
        />
      </div>

      <div className={cl.actions}>
        <Button onClick={onClose} className={cl.btnCancel}>Отмена</Button>
        <Button onClick={handleSave} className={cl.btnSave}>Сохранить</Button>
      </div>
    </div>
  );
};

export default GradeModal;