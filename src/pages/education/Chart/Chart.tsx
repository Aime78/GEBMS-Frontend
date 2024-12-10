import { useEffect, useState } from "react";
import {
//   ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "../../../components/ui/chart";
import { Pie, PieChart } from "recharts";
import axios from "axios";
import Api from "../../../routes/AppEndpoints";
import { Expenditure } from "../../../types/expenditure";

// const chartData = [
//   { category: "infrastructure", visitors: 275, fill: "var(--color-infrastructure)" },
//   { category: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { category: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { category: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { category: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
// //   visitors: {
// //     label: "Expenditures",
// //   },
//   infrastructure: {
//     label: "Infrastructure",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;



const selectedCategories = ["Infrastructure", "Salaries", "Supplies", "Technology"];



const categoryColorVariables: Record<string, string> = {
    'Infrastructure': '--chart-1',
    'Salaries': '--chart-2',
    'Supplies': '--chart-3',
    'Technology': '--chart-4',
  };
  
const Chart = () => {
const [chartData, setChartData] = useState<unknown[]>([]);
const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(`${Api.BASE_URL}/${Api.EXPENDITURE}`);
        const data: Expenditure[] = response.data;

        const groupedData = data.reduce((acc, item) => {
          if (selectedCategories.includes(item.expenditureCategory)) {
            if (!acc[item.expenditureCategory]) {
              acc[item.expenditureCategory] = 0;
            }
            acc[item.expenditureCategory] += item.amountSpent;
          }
          return acc;
        }, {} as Record<string, number>);

        const chartDataModified = Object.entries(groupedData).map(
            ([category, amount]) => {
              const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
              return {
                category: capitalizedCategory,
                amount,
                fill: `var(--color-${capitalizedCategory})`,
              };
            }
          );

        setChartData(chartDataModified);

        const chartConfigModified = Object.fromEntries(
            selectedCategories.map((category) => [
              category,
              {
                label: category,
                color: `hsl(var(${categoryColorVariables[category]}))`,
              },
            ])
          );
        setChartConfig(chartConfigModified);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenditures();
  }, []);
  
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <Pie data={chartData} dataKey="amount" />
        <ChartLegend
          content={<ChartLegendContent nameKey="category" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
};

export default Chart;
