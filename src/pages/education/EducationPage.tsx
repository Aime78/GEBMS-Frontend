import { ExpenditureRequestSummary, ExpenditureTable } from "../../components";
import DonutChartDepartment from "../../components/DonutChartDepartment/DonutChartDepartment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Progress } from "../../components/ui/progress";
import {
  useExpenditure,
  useExpenditureDonutChartDepartment,
  useExpenditureRequestSummary,
} from "../../hooks/useExpenditureData";
import { useExpenditureSummaryByDepartment } from "../../hooks/useExpenditureSummary";

const EducationPage = () => {
  const { headers, rows } = useExpenditure("education");
  const { headers: headersSummary, rows: rowsSummary } =
    useExpenditureRequestSummary("education");
  const { chartData, chartConfig, totalAmount } =
    useExpenditureDonutChartDepartment("education");
  const remainingBudget = useExpenditureSummaryByDepartment(
    1108500000000,
    "education"
  );
  
  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold">Education</h2>
      <div className="grid lg:grid-cols-[400px_400px] gap-4 my-4 ">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This year's budget</CardDescription>
            <CardTitle className="text-4xl">RF1,108.5B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +15% from last year
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={15} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Remaining</CardDescription>
            <CardTitle className="text-4xl">RF{remainingBudget}B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last year
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Expenditures by categories</CardTitle>
            <CardDescription>June 2021 - July 2023</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <DonutChartDepartment
              chartData={chartData}
              chartConfig={chartConfig}
              totalAmount={totalAmount}
            />
          </CardContent>
        </Card>
        <ExpenditureRequestSummary
          headers={headersSummary}
          rows={rowsSummary}
          navigateTo="/education/expenditure-requests"
        />

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Expenditures</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenditureTable headers={headers} rows={rows} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducationPage;
