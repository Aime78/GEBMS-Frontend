const Api = {
  // BASE_URL: 'http://localhost:4400',
  BASE_URL: "https://gebms-backend.onrender.com",
  EXPENDITURE_REQUEST: "expenditure-request",
  EXPENDITURE: "expenditure",
  EXPENDITURE_SUMMARY: "expenditure-summary",
  EXPENDITURE_REQUEST_SUMMARY: "expenditure-request-summary",
  USERS: "users",
  DEPARTMENTS: "departments",
  AUTH_LOGIN: "auth/login",
  AUTH_LOGOUT: "auth/logout",
};

// export const getAuthOptions() =   {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   }

export const getAuthOptions = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export default Api;
