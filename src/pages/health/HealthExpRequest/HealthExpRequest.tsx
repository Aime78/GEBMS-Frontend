import { ExpenditureRequest } from "../../../components";
import { useExpenditureRequest } from "../../../hooks/useExpenditureData";

const HealthExpRequest = () => {
  const { headers, rows } = useExpenditureRequest("health");
  return (
    <ExpenditureRequest
      headers={headers}
      rows={rows}
      link="/health"
      title="Health Expenditure Requests"
      linkTitle="Health"
    />
  );
};

export default HealthExpRequest;
