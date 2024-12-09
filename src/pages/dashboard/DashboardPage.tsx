import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Progress } from "../../components/ui/progress";
import { TrendingUp } from "lucide-react";

import {
  useExpenditureBarChart,
  useExpenditureDonutChart,
  useExpenditureRequestDonutChart,
} from "../../hooks/useChartData";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import DonutChart from "../../components/DonutChart/DonutChart";
import { useExpenditureSummary } from "../../hooks/useExpenditureSummary";
import { useEffect, useRef } from "react";
// Donut chart
export const description = "A donut chart with text";

// Bar chart
export const descriptionBar = "A multiple bar chart";

const DashboardPage = () => {
  const { chartData, chartConfig, totalAmount } =
    useExpenditureDonutChart(2023);
  const { chartDataExpReq, chartConfigExpReq, totalAmountExpReq } =
    useExpenditureRequestDonutChart();
  const { chartDataBar, chartDataBarConfig } = useExpenditureBarChart();
  const remainingBudget = useExpenditureSummary(5690100000000);
  const hasReloaded = useRef(false);
  
  useEffect(() => {
    if (!hasReloaded.current) {
      window.location.reload();
      hasReloaded.current = true;
    }
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="grid lg:grid-cols-[400px_400px] gap-4 my-4 ">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This year's budget</CardDescription>
            <CardTitle className="text-4xl">RF5,690.1B</CardTitle>
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
            <CardTitle>Expenditures</CardTitle>
            <CardDescription>June - July 2023</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <DonutChart
              chartData={chartData}
              chartConfig={chartConfig}
              totalAmount={totalAmount}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Expenditures from last year <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total expenditures for the previous year
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Expenditures requests</CardTitle>
            <CardDescription>June - October 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <DonutChart
              chartData={chartDataExpReq}
              chartConfig={chartConfigExpReq}
              totalAmount={totalAmountExpReq}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Expenditures from previous months{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total expenditures from the previous months
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Expenditures - Expenditure requests</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartDataBarConfig}>
              <BarChart accessibilityLayer data={chartDataBar}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="department"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="expenditure"
                  fill="var(--color-expenditure)"
                  radius={4}
                />
                <Bar
                  dataKey="expenditureReq"
                  fill="var(--color-expenditureReq)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Expenditures (2023) and expenditure requests (2024){" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total expenditures from the previous year to the current
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
