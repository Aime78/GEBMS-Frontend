import { ExpenditureRequest } from "../../../components";
import { useExpenditureRequest } from "../../../hooks/useExpenditureData";

const InfrastructureExpRequest = () => {
  const { headers, rows } = useExpenditureRequest("infrastructure");
  return (
    <div>
      <ExpenditureRequest
        headers={headers}
        rows={rows}
        link="/infrastructure"
        title="Infrastructure Expenditure Requests"
        linkTitle="Infrastructure"
      />
    </div>
  );
};

export default InfrastructureExpRequest;
