import {IGroup} from './group.interface';
import {ICareer} from './career.interface';

export interface IPost {
  _id?: string;
  title?: string;
  content: string;
  career_id: string;
  career_name?: string;
  career?: ICareer[];
  location_id?: number;
  location_name?: string;
  groups: any[];
  lstGroup?: IGroup[];
  group_success?: number;
  group_waiting?: number;
  group_pending?: number;
  send_at: number;
  link?: string;
  created?: number;
  status?: number;
}
