import { PieChart, Pie } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent } from "../ui/chart";
import { ChartConfig, ChartDataItem } from "../../types/chart";

interface IChartCustomizedProps {
  chartData: ChartDataItem[];
  chartConfig: ChartConfig;
}

const ChartCustomized = ({ chartData, chartConfig }: IChartCustomizedProps) => {
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

export default ChartCustomized;
