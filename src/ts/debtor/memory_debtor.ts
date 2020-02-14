import {Account} from '../objects/account';
import {Debt} from '../objects/debt';
import {StandardDebtor} from './standard_debtor';

export class MemoryDebtor extends StandardDebtor {
  debts: Array<Debt> = [
    {
      debt_id: '1111',
      secured: true,
      creditor: 'Halifax',
      type: 'Mortgage',
      score: 72,
      initial_total: 12000.00,
      remaining: 3894.33,
    }
  ];

  accounts: Array<Account> = [
    {
      account_id: '1234567890',
      name: 'Joe Bloggs',
      liquid_assets: 129.92,
      debts: [ '1111' ]
    }
  ];

  async getOneAccountDetails(accountId: string): Promise<Account | undefined> {
    const foundAccount: Array<Account> = this.accounts.filter((acct: Account) => acct.account_id === accountId);
    if (foundAccount.length > 0) {
      return foundAccount.pop();
    } else {
      return undefined;
    }
  }

  async getDebtsForAccount(accountId: string): Promise<Array<Debt> | undefined> {
    const foundAccount: Array<Account> = this.accounts.filter((acct: Account) => acct.account_id === accountId);
    if (foundAccount.length > 0) {
      const debtsForAccount: Array<Debt> = [];
      (foundAccount.pop() as Account).debts.forEach((debtId) => {
        this.debts.forEach((debt) => {
          if (debt.debt_id === debtId) {
            debtsForAccount.push(debt);
          }
        })
      });
      return debtsForAccount;
    } else {
      return undefined;
    }
  }

  async getOneDebt(debtId: string): Promise<Debt | undefined> {
    const foundDebt: Array<Debt> = this.debts.filter((debt: Debt) => debt.debt_id === debtId);
    if (foundDebt.length > 0) {
      return foundDebt.pop();
    } else {
      return undefined;
    }
  }
}
