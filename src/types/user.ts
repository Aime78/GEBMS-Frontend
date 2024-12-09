export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: string
}

export interface HeaderUser {
    key: keyof UserRow;
    display: string;
  }

export type UserRow = User;