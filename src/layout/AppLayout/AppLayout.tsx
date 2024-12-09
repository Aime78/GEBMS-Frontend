import {
  Book,
  HeartPulse,
  Home,
  Landmark,
  LogOut,
  Snowflake,
  Users,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Toaster } from "../../components/ui/toaster";
const AppLayout = () => {
  const navigate = useNavigate();
  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded flex items-center gap-2 ${
      isActive
        ? "text-primary font-semibold hover:bg-muted hover:text-primary"
        : "hover:bg-muted"
    }`;

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="border-r">
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 font-bold">
          <span>GEBMS</span>
        </div>
        <div className="flex flex-col h-[calc(100vh-70px)] lg:span-1 text-sm font-medium">
          <nav className="flex flex-1 flex-col gap-2 px-4 py-4 lg:px-3">
            <NavLink to={"/dashboard"} className={getLinkClassName}>
              <Home className="w-4 h-4" />
              Dashboard
            </NavLink>
            <NavLink to={"/users"} className={getLinkClassName}>
              <Users className="w-4 h-4" />
              Users
            </NavLink>

            <NavLink to={"/education"} className={getLinkClassName}>
              <Book className="w-4 h-4" />
              Education
            </NavLink>
            <NavLink to={"/health"} className={getLinkClassName}>
              <HeartPulse className="w-4 h-4" />
              Health
            </NavLink>
            <NavLink to={"/defense"} className={getLinkClassName}>
              <Snowflake className="w-4 h-4" />
              Defense
            </NavLink>
            <NavLink to={"/infrastructure"} className={getLinkClassName}>
              <Landmark className="w-4 h-4" />
              Infrastructure
            </NavLink>
          </nav>
          <div
            onClick={logout}
            className="mx-4 py-2 lg:mx-3 lg:px-3 flex items-center gap-2 hover:bg-muted rounded cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <ScrollArea className="mx-auto">
        <div className="h-[calc(100vh-70px)] px-8 py-4">
          <Outlet />
          <Toaster />
        </div>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
