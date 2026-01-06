import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import type { Grade, UserRow } from '../../types/task';

const columnHelper = createColumnHelper<UserRow>();

interface ColumnProps {
  daysInMonth: string[];
  isAdmin: boolean;
  onCellClick: (user: UserRow, date: string, grade?: Grade) => void;
}

export const useTableColumns = ({ daysInMonth, isAdmin, onCellClick }: ColumnProps) => {
  return useMemo(() => [
    columnHelper.accessor('usernameInSpace', { 
      header: 'members',
      cell: (info) => <b>{info.getValue()}</b>,
    }),

    ...daysInMonth.map((date) =>
      columnHelper.display({
        id: date,
        header: date,
        cell: (info) => {
          const user = info.row.original;
          const grade = user.allGrades.find((g) => g.date === date);

          return (
            <div
              style={{ 
                cursor: isAdmin ? 'pointer' : 'default', 
                textAlign: 'center',
                width: '100%',
                height: '100%' 
              }}
              onClick={() => onCellClick(user, date, grade)}
            >
              {grade?.score ?? '-'}
            </div>
          );
        },
      })
    ),
  ], [daysInMonth, isAdmin, onCellClick]);
};