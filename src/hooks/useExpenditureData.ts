import axios from "axios";
import Api, { AuthOptions } from "../routes/AppEndpoints";
import {
  Expenditure,
  ExpenditureRow,
  HeaderExpenditure,
} from "../types/expenditure";
import { useEffect, useState } from "react";
import {
  headerMap,
  headerMapExpenditureReq,
  headerMapSummary,
} from "../constants/headerMap";
import {
  ExpenditureRequest,
  ExpenditureRequestRow,
  ExpenditureRequestRowSummary,
  HeaderExpenditureRequest,
  HeaderExpenditureRequestSummary,
} from "../types/expenditureRequests";
import { ChartConfig, ChartDataItem } from "../types/chart";
import { formatToBillions } from "../lib/formatBillion";

export const useExpenditure = (department: string) => {
  const [headers, setHeaders] = useState<HeaderExpenditure[]>([]);
  const [rows, setRows] = useState<ExpenditureRow[]>([]);

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE}?department=${department}`,
          AuthOptions
          
        );
        const data: Expenditure[] = response.data;

        if (data.length > 0) {
          const headerData: HeaderExpenditure[] = (
            Object.keys(data[0]) as Array<keyof Expenditure>
          )
            .filter((key) => key !== "id")
            .map((key) => ({
              key: key as keyof ExpenditureRow,
              display: headerMap[key] || key,
            }));
          setHeaders(headerData);

          const rowsData: ExpenditureRow[] = data.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ id, ...rest }) => rest
          );
          setRows(rowsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenditures();
  }, []);
  return {
    headers,
    rows,
  };
};

export const useExpenditureRequest = (department: string) => {
  const [headers, setHeaders] = useState<HeaderExpenditureRequest[]>([]);
  const [rows, setRows] = useState<ExpenditureRequestRow[]>([]);

  useEffect(() => {
    const fetchExpensesRequests = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST}?department=${department}`,
          AuthOptions
        );
        const data: ExpenditureRequest[] = response.data;

        if (data.length > 0) {
          const headerData: HeaderExpenditureRequest[] = (
            Object.keys(data[0]) as Array<keyof ExpenditureRequest>
          )
            .filter((key) => key !== "id")
            .map((key) => ({
              key: key as keyof ExpenditureRequestRow,
              display: headerMapExpenditureReq[key] || key,
            }));
          setHeaders(headerData);

          const rowsData: ExpenditureRequestRow[] = data.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ id, ...rest }) => rest
          );
          setRows(rowsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpensesRequests();
  }, []);

  return {
    headers,
    rows,
  };
};
export const useExpenditureRequestSummary = (department: string) => {
  const [headers, setHeaders] = useState<HeaderExpenditureRequestSummary[]>([]);
  const [rows, setRows] = useState<ExpenditureRequestRowSummary[]>([]);

  useEffect(() => {
    const fetchExpenditureRequests = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST}?department=${department}`
          , AuthOptions
        );
        const data: ExpenditureRequest[] = response.data;

        if (data.length > 0) {
          const desiredHeaders: Array<
            keyof Pick<ExpenditureRequest, "requestedBy" | "requestedAmount">
          > = ["requestedBy", "requestedAmount"];

          const headerData: HeaderExpenditureRequestSummary[] =
            desiredHeaders.map((key) => ({
              key,
              display: headerMapSummary[key] || key,
            }));

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
    fetchExpenditureRequests();
  }, []);

  return {
    headers,
    rows,
  };
};

export const useExpenditureChart = (department: string) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const selectedCategories = [
    "Infrastructure",
    "Salaries",
    "Supplies",
    "Technology",
  ];

  const categoryColorVariables: Record<string, string> = {
    Infrastructure: "--chart-1",
    Salaries: "--chart-2",
    Supplies: "--chart-3",
    Technology: "--chart-4",
  };

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE}?department=${department}`
          , AuthOptions
        );
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
            const capitalizedCategory =
              category.charAt(0).toUpperCase() + category.slice(1);
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

  return {
    chartData,
    chartConfig,
  };
};

export const useExpenditureDonutChartDepartment = (department: string) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const selectedCategories = [
    "Infrastructure",
    "Salaries",
    "Supplies",
    "Technology",
  ];

  const categoryColorVariables: Record<string, string> = {
    Infrastructure: "--chart-1",
    Salaries: "--chart-2",
    Supplies: "--chart-3",
    Technology: "--chart-4",
  };

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.EXPENDITURE}?department=${department}`,
         AuthOptions
        );
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
            const capitalizedCategory =
              category.charAt(0).toUpperCase() + category.slice(1);
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

  const totalAmount = formatToBillions(
    chartData.reduce((acc, curr) => acc + curr.amount, 0)
  );

  return {
    chartData,
    chartConfig,
    totalAmount,
  };
};
