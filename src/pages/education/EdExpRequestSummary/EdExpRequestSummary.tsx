import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ExpenditureRequest,
  HeaderMapExpenditureRequest,
} from "../../../types/expenditureRequests";
import axios from "axios";
import Api from "../../../routes/AppEndpoints";
import { formatCurrency } from "../../../lib/formatCurrency";

const headerMap: HeaderMapExpenditureRequest = {
  requestedBy: "Requested By",
  requestedAmount: "Amount (RWF)",
};

type ExpenditureRequestRow = Pick<
  ExpenditureRequest,
  "requestedBy" | "requestedAmount"
>;

interface HeaderExpenditureRequest {
  key: keyof ExpenditureRequestRow;
  display: string;
}

const EdExpRequestSummary = () => {
  const [headers, setHeaders] = useState<HeaderExpenditureRequest[]>([]);
  const [rows, setRows] = useState<ExpenditureRequestRow[]>([]);

  useEffect(() => {
    const fetchExpensesRequests = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST}`
        );
        const data: ExpenditureRequest[] = response.data;
     

        if (data.length > 0) {
          const desiredHeaders: Array<
            keyof Pick<ExpenditureRequest, "requestedBy" | "requestedAmount">
          > = ["requestedBy", "requestedAmount"];

          const headerData: HeaderExpenditureRequest[] = desiredHeaders.map(
            (key) => ({
              key,
              display: headerMap[key] || key,
            })
          );

          setHeaders(headerData);

          const rowsData: Pick<
            ExpenditureRequest,
            "requestedBy" | "requestedAmount"
          >[] = data
            .slice(0, 5) // Keep only first 5 rows
            .map(({ requestedBy, requestedAmount }) => ({
              requestedBy,
              requestedAmount,
            }));

          setRows(rowsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpensesRequests();
  }, []);

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
          <Link to="/education/expenditure-requests">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
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

export default EdExpRequestSummary;
