import {
  Book,
  HeartPulse,
  Home,
  Landmark,
  LogOut,
  Snowflake,
  Wallet,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";

const AppLayout = () => {
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="border-r ">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 font-bold">
          <span>GEBMS</span>
        </div>
        <div className="flex flex-col h-[calc(100vh-70px)] text-sm font-medium">
          <nav className="flex flex-1 flex-col gap-2 px-4 py-4 lg:px-3">
            <Link
              to={"/"}
              className="hover:bg-muted px-3 py-2 rounded flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to={"/expenditure"}
              className="hover:bg-muted px-3 py-2 rounded flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Expenditure Management
            </Link>
            <Link
              to={"/education"}
              className="hover:bg-muted px-3 py-2 rounded flex items-center gap-2"
            >
              <Book className="w-4 h-4" />
              Education
            </Link>
            <Link
              to={"/health"}
              className="hover:bg-muted px-3 py-2 rounded flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4" />
              Health
            </Link>
            <Link
              to={"/defense"}
              className="hover:bg-muted px-3 py-2 rounded flex items-center gap-2"
            >
              <Snowflake className="w-4 h-4" />
              Defense
            </Link>
            <Link
              to={"/infrastructure"}
              className="hover:bg-muted px-3 py-2 rounded flex items-center gap-2"
            >
              <Landmark className="w-4 h-4" />
              Infrastructure
            </Link>
          </nav>
          <Link
            to={"/login"}
            className="mx-4 py-2 lg:mx-3 lg:px-3 flex items-center gap-2 hover:bg-muted rounded"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      <ScrollArea className="mx-auto">
        <div className=" h-14 lg:h-[60px] mx-8 flex items-center">Header</div>
        <div className="h-[calc(100vh-70px)] px-8 py-2 mx-auto border-2 border-red-600"><Outlet/></div>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
