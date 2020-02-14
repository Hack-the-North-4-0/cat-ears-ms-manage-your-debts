import {Account} from '../objects/account';
import {Debt} from '../objects/debt';
import {StandardDebtor} from './standard_debtor';

export class MemoryDebtor extends StandardDebtor {
  private readonly accounts: Array<Account>;

  constructor () {
    super();
    this.accounts = [
      {
        account_id: '1234567890',
        name: 'Joe Bloggs',
        liquid_assets: 129.92,
        income: [],
        debts: [
          {
            debt_id: '1111',
            secured: true,
            creditor: 'Halifax',
            type: 'Mortgage',
            score: 72,
            initial_total: 12000.00,
            remaining: 3894.33,
            payments: [],
          }
        ],
      }
    ]
  }

  async getAccountOfId(accountId: string): Promise<Account> {
    const foundAccount: Array<Account> = this.accounts.filter((acct: Account) => acct.account_id === accountId);
    if (foundAccount.length > 0) {
      return (foundAccount.pop() as Account);
    } else {
      throw new Error(`Account of id ${accountId} wsa not found`);
    }
  }

  async getDebtOfId(debtId: string, debtList: Array<Debt>): Promise<Debt> {
    const foundDebt: Array<Debt> = debtList.filter((debt: Debt) => debt.debt_id === debtId);
    if (foundDebt.length > 0) {
      return (foundDebt.pop() as Debt);
    } else {
      throw new Error(`Debt of id ${debtId} wsa not found`);
    }
  }

  async getOneAccountDetails(accountId: string): Promise<Account> {
    return this.getAccountOfId(accountId);
  }

  async getDebtsForAccount(accountId: string): Promise<Array<Debt>> {
    return (await this.getAccountOfId(accountId)).debts;
  }

  async getOneDebtFromAccount(accountId: string, debtId: string): Promise<Debt> {
    const account = await this.getAccountOfId(accountId);
    return this.getDebtOfId(debtId, account.debts);
  }
}
