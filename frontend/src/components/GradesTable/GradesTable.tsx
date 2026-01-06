import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import type { TaskGroup, UserRow } from '../../types/task';
import { useTableColumns } from '../../hooks/table/useTableColumn';
import { useModal } from '../../state/useModal';
import type { GradeModalProps } from '../modals/TableModal/TableModal';
import cl from './GradesTable.module.css';

interface GradesTableProps {
  data: UserRow[];
  daysInMonth: string[];
  isAdmin: boolean;
  activeGroup: TaskGroup;
}

const GradesTable = ({ data, daysInMonth, isAdmin, activeGroup }: GradesTableProps) => {
  const openModal = useModal(state => state.openModal)
  const columns = useTableColumns({
    daysInMonth,
    isAdmin,
    onCellClick: (member, date, grade) => {
      if (isAdmin) {
        openModal("grade", {
          member,
          date,
          grade,
          group: activeGroup,
          onClose: () => {},
        } as GradeModalProps);
      }
    },
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cl.tableContainer}>
      <table className={cl.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={cl.headerCell}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={cl.row}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={cl.bodyCell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradesTable;