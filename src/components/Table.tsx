import type { ReactNode } from "react"

interface TableProps {
  children: ReactNode
  className?: string
}
const Table = ({ children, className }: TableProps) => {
  return (
    <table className={`p-6 w-full border-collapse rounded-lg overflow-hidden ${className}`}>
      {children}
    </table>
  )
}

const TableHeader = ({ children }: TableProps) => {
  return (
    <thead className="bg-[#002B36]">
      {children}
    </thead>
  )
}

const TableHeaderCell = ({children}: TableProps) => {
  return (
    <th className="font-semibold text-left text-[#B58900] py-2 px-6">
      {children}
    </th>
  )
}

const TableBody = ({ children }: TableProps) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

const TableRow = ({ children }: TableProps) => {
  return (
    <tr className="not-last:border-b border-gray-200">
      {children}
    </tr>
  )
}

const TableCell = ({ children }: TableProps) => {
  return (
    <td className="text-left py-2 px-6">
      {children}
    </td>
  )
}

Table.Header = TableHeader
TableHeader.displayName = 'TableHeader'
Table.HeaderCell = TableHeaderCell
TableHeaderCell.displayName = 'TableHeaderCell'
Table.Body = TableBody
TableBody.displayName = 'TableBody'
Table.Row = TableRow
TableRow.displayName = 'TableRow'
Table.Cell = TableCell
TableCell.displayName = 'TableCell'

export default Table