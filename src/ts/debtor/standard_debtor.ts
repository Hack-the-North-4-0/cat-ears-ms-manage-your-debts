import { Account } from '../objects/account';
import {Debt} from '../objects/debt';

export abstract class StandardDebtor {
  async abstract getOneAccountDetails(accountId: string): Promise<Account>;

  async abstract getDebtsForAccount(accountId: string): Promise<Array<Debt>>;

  async abstract getOneDebtFromAccount(accountId: string, debtId: string): Promise<Debt>;
}
