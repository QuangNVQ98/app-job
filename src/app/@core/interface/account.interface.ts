export interface IAccount {
  _id?: string;
  full_name?: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  position?: string;
  role: number;
  is_super?: boolean;
  status: number;
  modified?: number;
  created?: number;
  acl?: String[];
}
