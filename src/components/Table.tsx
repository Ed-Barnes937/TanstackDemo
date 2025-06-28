import type { ReactNode } from "react"

interface TableProps {
  children: ReactNode
  className?: string
}
const Table = ({ children, className }: TableProps) => {
  return (
    <table className={`w-full border-collapse border border-gray-300 ${className}`}>
      {children}
    </table>
  )
}

const TableHeader = ({ children }: TableProps) => {
  return (
    <thead>
      {children}
    </thead>
  )
}

const TableHeaderCell = ({children}: TableProps) => {
  return (
    <th>
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
    <tr>
      {children}
    </tr>
  )
}

const TableCell = ({ children }: TableProps) => {
  return (
    <td className="text-center">
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