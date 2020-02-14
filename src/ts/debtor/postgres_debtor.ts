import {Account} from '../objects/account';
import {StandardDebtor} from './standard_debtor';

export class PostgresDebtor extends StandardDebtor {
  async getOneAccount(accountId: string): Promise<Account> {
    return { name: `Account ${accountId}`, liquid_assets: 0};
  }
}
