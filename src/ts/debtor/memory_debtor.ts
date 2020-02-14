import {Account} from '../objects/account';
import {Debt} from '../objects/debt';
import {StandardDebtor} from './standard_debtor';
import {TransactionDetails} from '../objects/transaction_details';
import {InterestPayments} from '../objects/interest_payment';

const moment = require('moment');

export class MemoryDebtor extends StandardDebtor {
  private readonly accounts: Array<Account>;

  constructor () {
    super();
    this.accounts = [
      {
        account_id: '1234567890',
        name: 'Joe Bloggs',
        liquid_assets: 129.92,
        income: [
          {
            date: "2020-01-01 00:00:00.000 UTC",
            amount: 1000.00,
          }
        ],
        debts: [
          {
            debt_id: '1111',
            secured: true,
            creditor: 'Halifax',
            type: 'Mortgage',
            score: 72,
            initial_total: 12000.00,
            remaining: 3894.33,
            payments: [
              {
                amount: 250.00,
                date: "2020-01-01 12:00:00.000 UTC",
              }
            ],
            interest_additions: [
              {
                amount: 100.00,
                date: "2020-01-05 00:00:00.000 UTC",
                initial_amount: 3794.33,
                interest_at_time: 1.76,
              },
            ],
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

  async getIncomeForAccount(accountId: string): Promise<Array<TransactionDetails>> {
    return (await this.getAccountOfId(accountId)).income;
  }

  async getDebtsForAccount(accountId: string): Promise<Array<Debt>> {
    return (await this.getAccountOfId(accountId)).debts;
  }

  async getOneDebtFromAccount(accountId: string, debtId: string): Promise<Debt> {
    const account = await this.getAccountOfId(accountId);
    return this.getDebtOfId(debtId, account.debts);
  }

  async getInterestPaidOnDebt(accountId: string, debtId: string): Promise<Array<InterestPayments>> {
    const account = await this.getAccountOfId(accountId);
    return (await this.getDebtOfId(debtId, account.debts)).interest_additions;
  }

  async getPaymentsMadeOnDebt(accountId: string, debtId: string): Promise<Array<TransactionDetails>> {
    const account = await this.getAccountOfId(accountId);
    return (await this.getDebtOfId(debtId, account.debts)).payments;
  }

  async makePaymentOnDebt(accountId: string, debtId: string, amountToPay: number): Promise<Account> {
    const account = await this.getAccountOfId(accountId);
    const debt = await this.getDebtOfId(debtId, account.debts);
    account.liquid_assets -= amountToPay;
    debt.payments.push({
      date: moment().format('YYYY-MM-DD hh:mm:dd.zzz'),
      amount: amountToPay,
    });
    debt.remaining -= amountToPay;
    return account;
  }
}
