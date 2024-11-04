import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  ExpenditureRequestRow,
  HeaderExpenditureRequest,
} from "../../types/expenditureRequests";
import ExpenditureTable from "../ExpenditureTable/ExpenditureTable";

interface IExpenditureRequestProps {
  headers: HeaderExpenditureRequest[];
  rows: ExpenditureRequestRow[];
  title: string;
  link: string;
  linkTitle: string;
}
const ExpenditureRequest = ({
  title,
  link,
  linkTitle,
  ...rest
}: IExpenditureRequestProps) => {
  return (
    <div>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={link}>{linkTitle}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-lg font-semibold mb-2 mt-4">Expenditure Requests</h2>
      <div className="w-[calc(100vw-426px)] xxl:w-full">
        <ExpenditureTable {...rest} width="full" />
      </div>
    </div>
  );
};

export default ExpenditureRequest;
