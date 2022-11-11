import {ICareer} from './career.interface';

export interface IAccountFb {
  _id?: string;
  full_name?: string;
  fbid?: string;
  password?: string;
  fa?: string;
  email?: string;
  email_password?: string;
  careers?: string[];
  ranking?: number;
  status?: number;
  created?: number;
  lstCareer?: ICareer[];
  groups_auto_join?: any;
  groups_auto_post?: any;
  totalGroupJoin?: any;
  lstGroup?: any[];
}
