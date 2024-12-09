import { useState } from "react";
import { ExpenditureTable } from "../../components";
import { Button } from "../../components/ui/button";
import { useUsers } from "../../hooks/useUsers";
import UserMenu from "./UserMenu/UserMenu";
import DeleteMenu from "./DeleteMenu/DeleteMenu";

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const { rows } = useUsers();

  const modifiedHeader = [
    {
      key: "firstName",
      display: "First Name",
    },
    {
      key: "lastName",
      display: "Last Name",
    },
    {
      key: "email",
      display: "Email",
    },
    {
      key: "role",
      display: "Role",
    },
    {
      key: "department",
      display: "Department",
    },
    {
      key: "createdAt",
      display: "Created At",
    },
    {
      key: "action",
      display: "Action",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Employees</h2>
        <Button onClick={() => setOpen(true)}>Invite new user</Button>
      </div>

      <div className="w-[calc(100vw-426px)] xxl:w-full mt-4">
        <ExpenditureTable
          headers={modifiedHeader}
          rows={rows.map((row) => ({
            ...row,
            action: {
              onDelete: () => {
                setUserId(row.id);
                setOpenDeleteMenu(true);
              },
            },
          }))}
          width="full"
        />
      </div>
      <UserMenu open={open} setOpen={setOpen} />
      <DeleteMenu open={openDeleteMenu} setOpen={setOpenDeleteMenu} id={userId} />
    </div>
  );
};

export default UsersPage;
