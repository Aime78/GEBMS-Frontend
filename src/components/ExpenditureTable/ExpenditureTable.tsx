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




interface ITableProps {
  // eslint-disable-next-line
  headers: any;
  // eslint-disable-next-line
  rows: any;
  width?: string;
}
const ExpenditureTable: FC<ITableProps> = ({
  headers = [],
  rows = [],
  width = "400px",
}) => {
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
                        {header.key === "amountSpent"
                          ? formatCurrency(row[header.key])
                          : row[header.key as keyof typeof row]}
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
