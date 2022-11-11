import { Injectable } from '@angular/core';
import {IAccount} from '../interface/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  account: IAccount;
  token: String;
  constructor() { }
}
