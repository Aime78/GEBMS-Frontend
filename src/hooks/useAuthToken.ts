import { useState } from "react";

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
    }
    return {token, setToken};
};