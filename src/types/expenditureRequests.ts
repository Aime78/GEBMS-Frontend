export interface ExpenditureRequest {
  id: string;
  requestedDate: string;
  department: string;
  requestedBy: string;
  expenditureCategory: string;
  status: string;
  requestedAmount: number;
  // Add other fields as necessary
}

export interface HeaderMapExpenditureRequest {
  [key: string]: string;
}

export interface HeaderExpenditureRequest {
  key: keyof ExpenditureRequestRow;
  display: string;
}

export type ExpenditureRequestRowSummary = Pick<
  ExpenditureRequest,
  "requestedBy" | "requestedAmount"
>;

export interface HeaderExpenditureRequestSummary {
  key: keyof ExpenditureRequestRow;
  display: string;
}

export type ExpenditureRequestRow = Omit<ExpenditureRequest, "id">;
