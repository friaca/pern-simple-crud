export interface User extends UserInfo {
  id: number;
}

export interface UserInfo {
  name: string;
  age: number;
  email: string;
  phone: string;
}
