import axios from "axios";
import { useEffect, useState } from "react";
import Api, { getAuthOptions } from "../routes/AppEndpoints";
import { headerMapUser } from "../constants/headerMap";
import { HeaderUser, User, UserRow } from "../types/user";

export const useUsers = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [headers, setHeaders] = useState<HeaderUser[]>([]);
  const [rows, setRows] = useState<UserRow[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${Api.BASE_URL}/${Api.USERS}`,
          getAuthOptions()
        );
        const data: User[] = response.data;

        if (data.length > 0) {
          const headerData: HeaderUser[] = (
            Object.keys(data[0]) as Array<keyof User>
          )
            .filter((key) => key !== "id")
            .map((key) => ({
              key: key as keyof UserRow,
              display: headerMapUser[key] || key,
            }));
          setHeaders(headerData);

          setRows(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [open, openDeleteMenu]);

  return {
    headers,
    rows,
    open,
    setOpen,
    openDeleteMenu, setOpenDeleteMenu
  };
};
