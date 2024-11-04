const Api = {
    BASE_URL: 'http://localhost:8080',
    EXPENDITURE_REQUEST: 'expenditure-request',
    EXPENDITURE: 'expenditure',
    EXPENDITURE_SUMMARY: 'expenditure-summary',
    EXPENDITURE_REQUEST_SUMMARY: 'expenditure-request-summary',
    AUTH_LOGIN: 'auth/login',
    AUTH_LOGOUT: 'auth/logout',
}

export const AuthOptions =   {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }

export default Api;