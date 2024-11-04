export interface Expenditure {
    id: string;
    year: number;
    department: string;
    subcategory: string;
    expenditureCategory: string;
    amountSpent: number;
    projectName: string;
    // Add other fields as necessary
  }
  
  export interface HeaderMapExpenditure {
    [key: string]: string;
  }
  
 export interface HeaderExpenditure {
    key: keyof ExpenditureRow;
    display: string;
  }

  export type ExpenditureRow = Omit<Expenditure, 'id'>;

  type Summary = string | number
  export type ExpenditureSummary = Summary[];