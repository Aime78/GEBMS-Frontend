import { ExpenditureRequest } from "../../../components";
import { useExpenditureRequest } from "../../../hooks/useExpenditureData";

const EdExpRequests = () => {
  const { headers, rows } = useExpenditureRequest("education");
  return (
    <ExpenditureRequest
      headers={headers}
      rows={rows}
      link="/education"
      title="Education Expenditure Requests"
      linkTitle="Education"
    />
  );
};

export default EdExpRequests;
