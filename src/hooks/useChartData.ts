import { useEffect, useState } from "react";
import { ChartConfig, ChartDataItemDashboard, ExpSummary } from "../types/chart";
import axios from "axios";
import Api, { AuthOptions } from "../routes/AppEndpoints";
import { Expenditure, ExpenditureSummary } from "../types/expenditure";
import { formatToBillions } from "../lib/formatBillion";
import { ExpenditureRequest } from "../types/expenditureRequests";

export const useExpenditureDonutChart = (year: number) => {
  const [chartData, setChartData] = useState<ChartDataItemDashboard[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const departments = ["Infrastructure", "Education", "Defense", "Health"];

  const departmentColorVariables: Record<string, string> = {
    Infrastructure: "--chart-1",
    Education: "--chart-2",
    Defense: "--chart-3",
    Health: "--chart-4",
  };

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE}?year=${year}`,
         AuthOptions
        );
        const data: Expenditure[] = response.data;

        const groupedData = data.reduce((acc, item) => {
          if (departments.includes(item.department)) {
            if (!acc[item.department]) {
              acc[item.department] = 0;
            }
            acc[item.department] += item.amountSpent;
          }
          return acc;
        }, {} as Record<string, number>);

        const chartDataModified = Object.entries(groupedData).map(
          ([department, amount]) => {
            const capitalizedDepartment =
              department.charAt(0).toUpperCase() + department.slice(1);
            return {
              department: capitalizedDepartment,
              amount,
              fill: `var(--color-${capitalizedDepartment})`,
            };
          }
        );

        setChartData(chartDataModified);

        const chartConfigModified = Object.fromEntries(
          departments.map((department) => [
            department,
            {
              label: department,
              color: `hsl(var(${departmentColorVariables[department]}))`,
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

  const totalAmount = formatToBillions(
    chartData.reduce((acc, curr) => acc + curr.amount, 0)
  );

  return {
    chartData,
    chartConfig,
    totalAmount,
  };
};

export const useExpenditureRequestDonutChart = () => {
  const [chartDataExpReq, setChartDataExpReq] = useState<
    ChartDataItemDashboard[]
  >([]);
  const [chartConfigExpReq, setChartConfigExpReq] = useState<ChartConfig>({});
  const departments = ["Infrastructure", "Education", "Defense", "Health"];

  const departmentColorVariables: Record<string, string> = {
    Infrastructure: "--chart-1",
    Education: "--chart-2",
    Defense: "--chart-3",
    Health: "--chart-4",
  };

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST}`
          ,AuthOptions
        );
        const data: ExpenditureRequest[] = response.data;
      

        const groupedData = data.reduce((acc, item) => {
          if (departments.includes(item.department)) {
            if (!acc[item.department]) {
              acc[item.department] = 0;
            }
            acc[item.department] += item.requestedAmount;
          }
          return acc;
        }, {} as Record<string, number>);

        const chartDataModified = Object.entries(groupedData).map(
          ([department, amount]) => {
            const capitalizedDepartment =
              department.charAt(0).toUpperCase() + department.slice(1);
            return {
              department: capitalizedDepartment,
              amount,
              fill: `var(--color-${capitalizedDepartment})`,
            };
          }
        );

        setChartDataExpReq(chartDataModified);

        const chartConfigModified = Object.fromEntries(
          departments.map((department) => [
            department,
            {
              label: department,
              color: `hsl(var(${departmentColorVariables[department]}))`,
            },
          ])
        );

        setChartConfigExpReq(chartConfigModified);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenditures();
  }, []);

  const totalAmountExpReq = formatToBillions(
    chartDataExpReq.reduce((acc, curr) => acc + curr.amount, 0)
  );

  return {
    chartDataExpReq,
    chartConfigExpReq,
    totalAmountExpReq,
  };
};

export const useExpenditureBarChart = () => {
    const [chartDataBar, setChartBar] = useState<
      ExpSummary[]
    >([]);
    const [chartConfigExpReq, setChartConfigExpReq] = useState<ChartConfig>({});
    const labels = ["expenditure", "expenditureReq"]
  
    const labelColorVariables: Record<string, string> = {
      expenditure: "--chart-1",
      expenditureReq: "--chart-2",
    };
  
    useEffect(() => {
      const fetchExpenditures = async () => {
        try {
          const responseExp = await axios.get(
            `${Api.BASE_URL}/${Api.EXPENDITURE_SUMMARY}`,
            AuthOptions
          );
          const dataExp: ExpenditureSummary[] = responseExp.data;

          const responseReq = await axios.get(
            `${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST_SUMMARY}`
            ,AuthOptions
          );
          const dataReq: ExpenditureSummary[] = responseReq.data;

          // Combining the summary data
          const data: ExpSummary[] = dataExp.map(([department, expenditure]) => {
            const matchingItem = dataReq.find(item => item[0] === department);
            const expenditureReq = matchingItem ? matchingItem[1] : 0;
          
            return {
              department: department as string,
              expenditure: Number(expenditure),
              expenditureReq: Number(expenditureReq)
            };
          });

          console.log(data)
  
        //   const groupedData = data.reduce((acc, item) => {
        //     if (departments.includes(item.department)) {
        //       if (!acc[item.department]) {
        //         acc[item.department] = 0;
        //       }
        //       acc[item.department] += item.requestedAmount;
        //     }
        //     return acc;
        //   }, {} as Record<string, number>);
  
        //   const chartDataModified = Object.entries(groupedData).map(
        //     ([department, amount]) => {
        //       const capitalizedDepartment =
        //         department.charAt(0).toUpperCase() + department.slice(1);
        //       return {
        //         department: capitalizedDepartment,
        //         amount,
        //         fill: `var(--color-${capitalizedDepartment})`,
        //       };
        //     }
        //   );
  
          setChartBar(data);
  
          const chartConfigModified = Object.fromEntries(
            labels.map((labelName) => [
              labelName,
              {
                label: labelName,
                color: `hsl(var(${labelColorVariables[labelName]}))`,
              },
            ])
          );
  
          setChartConfigExpReq(chartConfigModified);
        } catch (error) {
          console.log(error);
        }
      };
      fetchExpenditures();
    }, []);
  
    return {
      chartDataBar,
      chartDataBarConfig: chartConfigExpReq,
   
    };
  };
  