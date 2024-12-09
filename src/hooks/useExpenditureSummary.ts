import axios from "axios";
import Api, { AuthOptions } from "../routes/AppEndpoints";
import { ExpenditureRequest } from "../types/expenditureRequests";
import { useEffect, useState } from "react";
import { formatToBillions } from "../lib/formatBillion";

export const useExpenditureSummary = (
    budget: number,
  ) => {
    const [summaryExp, setSummaryExp] = useState(0);
  
    useEffect(() => {
      const fetchExpenditures = async () => {
        try {
          const response = await axios.get(
            `
                      ${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST}
                      
                      `,
            AuthOptions
          );
          const data: ExpenditureRequest[] = response.data;
          const sum = data.reduce((acc, curr) => acc + curr.requestedAmount, 0);
          setSummaryExp(sum);
        } catch (error) {
          console.log(error);
        }
      };
      fetchExpenditures();
    }, []);
  
    const remainingBudget = formatToBillions(budget - summaryExp);
  
    return remainingBudget;
  };

export const useExpenditureSummaryByDepartment = (
  departmentBudget: number,
  department: string
) => {
  const [summaryExp, setSummaryExp] = useState(0);

  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get(
          `
                    ${Api.BASE_URL}/${Api.EXPENDITURE_REQUEST}?department=${department}
                    
                    `,
          AuthOptions
        );
        const data: ExpenditureRequest[] = response.data;
        const sum = data.reduce((acc, curr) => acc + curr.requestedAmount, 0);
        setSummaryExp(sum);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenditures();
  }, []);

  const remainingBudget = formatToBillions(departmentBudget - summaryExp);

  return remainingBudget;
};

