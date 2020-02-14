import { Account } from '../objects/account';
import {Debt} from '../objects/debt';

export abstract class StandardDebtor {
  async abstract getOneAccountDetails(accountId: string): Promise<Account|undefined>;

  async abstract getDebtsForAccount(accountId: string): Promise<Array<Debt>|undefined>;

  async abstract getOneDebt(debtId: string): Promise<Debt|undefined>
}
