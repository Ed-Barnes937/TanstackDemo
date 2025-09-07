import type { ReactNode } from "react";
import { IndeterminateProgress } from "./IndeterminateProgress";

interface TableProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}
const Table = ({ children, className, isLoading }: TableProps) => {
  return (
    <>
      <table
        className={`p-6 w-full table-fixed border-collapse rounded-lg overflow-hidden ${className}`}
      >
        {children}
      </table>
      {isLoading && <IndeterminateProgress />}
    </>
  );
};

const TableHeader = ({ children }: TableProps) => {
  return <thead className="bg-blue">{children}</thead>;
};

interface TableHeaderCellProps extends TableProps {
  onClick?: () => void;
  isSorting?: boolean;
  direction?: "asc" | "desc";
}
const TableHeaderCell = ({
  children,
  className,
  onClick,
  isSorting = false,
  direction,
}: TableHeaderCellProps) => {
  return (
    <th
      className={`font-semibold text-left text-yellow py-2 px-6 ${className}`}
      onClick={onClick}
    >
      <div className="flex">
        {children}
        <p
          className="ml-2 data-[hidden=true]:opacity-0 data-[asc=true]:rotate-180 transition-all duration-200"
          data-hidden={!isSorting}
          data-asc={direction === "asc"}
        >
          ▲
        </p>
      </div>
    </th>
  );
};

const TableBody = ({ children }: TableProps) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children }: TableProps) => {
  return <tr className="not-last:border-b border-gray-200">{children}</tr>;
};

const TableCell = ({ children }: TableProps) => {
  return <td className="text-left py-2 px-6">{children}</td>;
};

Table.Header = TableHeader;
TableHeader.displayName = "TableHeader";
Table.HeaderCell = TableHeaderCell;
TableHeaderCell.displayName = "TableHeaderCell";
Table.Body = TableBody;
TableBody.displayName = "TableBody";
Table.Row = TableRow;
TableRow.displayName = "TableRow";
Table.Cell = TableCell;
TableCell.displayName = "TableCell";

export default Table;
