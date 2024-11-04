import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ExpenditureRequestRowSummary,
  HeaderExpenditureRequestSummary,
} from "../../types/expenditureRequests";
import { formatCurrency } from "../../lib/formatCurrency";

interface ExpenditureRequestSummaryProps {
  headers: HeaderExpenditureRequestSummary[];
  rows: ExpenditureRequestRowSummary[];
  navigateTo: string;
}
const ExpenditureRequestSummary = ({
  headers,
  rows,
  navigateTo,
}: ExpenditureRequestSummaryProps) => {
  return (
    <Card className="" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent requests</CardTitle>
          <CardDescription>
            Recent requests from your department.
          </CardDescription>
        </div>

        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to={`${navigateTo}`}>
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border ">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead
                    key={index}
                    className="whitespace-nowrap pr-4 py-2 text-left font-semibold bg-gray-100"
                  >
                    {header.display}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {headers.map((header, index) => (
                    <TableCell key={index} className="whitespace-nowrap pr-4">
                      {header.key === "requestedAmount"
                        ? formatCurrency(row[header.key])
                        : row[header.key as keyof typeof row]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenditureRequestSummary;
