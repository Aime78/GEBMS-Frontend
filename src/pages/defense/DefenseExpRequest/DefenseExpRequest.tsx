import { ExpenditureRequest } from "../../../components";
import { useExpenditureRequest } from "../../../hooks/useExpenditureData";

const DefenseExpRequest = () => {
  const { headers, rows } = useExpenditureRequest("defense");
  return (
    <ExpenditureRequest
      headers={headers}
      rows={rows}
      link="/defense"
      title="Defense Expenditure Requests"
      linkTitle="Defense"
    />
  );
};

export default DefenseExpRequest;
