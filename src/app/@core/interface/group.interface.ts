import {ICareer} from './career.interface';

export interface IGroup {
  _id?: string;
  group_fbid?: string;
  group_fbusername?: string;
  name?: string;
  career_id?: string;
  career_name?: string;
  location_id?: number;
  location_name?: string;
  career?: ICareer[];
  total_member?: number;
  post_per_day?: number;
  total_account_in_group?: number;
  status?: number;
  is_deleted?: boolean;
  lstAccountFb: any[];
  avatar?: string;
}
