export type ChartDataItem = {
  category: string;
  amount: number;
  fill: string;
};

export type ChartDataItemDashboard = {
  department: string;
  amount: number;
  fill: string;
};



export type ChartConfigItem = {
  label: string;
  color: string;
};

export type ExpSummary = {
  department: string;
  expenditure: number;
  expenditureReq: number;
}

export type ChartConfig = Record<string, ChartConfigItem>;
