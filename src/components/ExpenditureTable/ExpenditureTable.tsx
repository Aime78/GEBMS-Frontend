import { FC } from "react";
import { formatCurrency } from "../../lib/formatCurrency";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatToDayMonthYear } from "../../lib/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Trash } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface ITableProps {
  // eslint-disable-next-line
  headers?: any;
  // eslint-disable-next-line
  rows?: any;
  width?: string;
}
const ExpenditureTable: FC<ITableProps> = ({
  headers = [],
  rows = [],
  width = "400px",
}) => {
  // eslint-disable-next-line
  const renderCellContent = (header: any, row: any) => {
    switch (header.key) {
      case "amountSpent":
      case "requestedAmount":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100">
            {formatCurrency(row[header.key])}
          </span>
        );
      case "department":
        return typeof row[header.key] === "object" ? row[header.key]?.name : row[header.key]; // Safely access department name or show fallback
      case "status":
        return (
          <span
            className={`px-3 py-1 rounded-full ${
              row[header.key].toLowerCase() === "approved"
                ? "bg-green-100 text-green-800"
                : row[header.key] === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {row[header.key]}
          </span>
        );
      case "createdAt":
        return row[header.key] ? formatToDayMonthYear(row[header.key]) : "-";
      case "phoneNumbers":
        //eslint-disable-next-line
        return row[header.key].map((item: any) => (
          <span className="px-3 py-1 rounded-full bg-gray-100">
            {item.phone}
          </span>
        ));
      case "action":
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsHorizontalIcon className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer disabled:opacity-10 hover:cursor-not-allowed"
                  disabled
                >
                  <Edit className="h-4 w-4" />
                  <span className="ml-2">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={row.action.onDelete}
                >
                  <Trash className="h-4 w-4" />
                  <span className="ml-2">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      default:
        return row[header.key as keyof typeof row];
    }
  };

  return (
    <div className="rounded-md border">
      <ScrollArea className={`w-[${width}]`}>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(
                // eslint-disable-next-line
                (header: any, index: any) => (
                  <TableHead
                    key={index}
                    className="whitespace-nowrap pr-4 py-2 text-left font-semibold bg-gray-100"
                  >
                    {header.display}
                  </TableHead>
                )
              )}
              <TableHead className="whitespace-nowrap pr-4 py-2 text-left font-semibold bg-gray-100"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map(
              // eslint-disable-next-line
              (row: any, rowIndex: any) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50">
                  {headers.map(
                    // eslint-disable-next-line
                    (header: any, cellIndex: any) => (
                      <TableCell
                        key={cellIndex}
                        className="whitespace-nowrap pr-4 py-2 border-t"
                      >
                        {renderCellContent(header, row)}

                        {/* {header.key === "amountSpent" || header.key === "requestedAmount"
                          ? formatCurrency(row[header.key])
                          : row[header.key as keyof typeof row]} */}
                      </TableCell>
                    )
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ExpenditureTable;
