import { Account } from '../objects/account';
import {Debt} from '../objects/debt';
import {TransactionDetails} from '../objects/transaction_details';
import {InterestPayments} from '../objects/interest_payment';

export abstract class StandardDebtor {
  async abstract getOneAccountDetails(accountId: string): Promise<Account>;

  async abstract getIncomeForAccount(accountId: string): Promise<Array<TransactionDetails>>;

  async abstract getDebtsForAccount(accountId: string): Promise<Array<Debt>>;

  async abstract getOneDebtFromAccount(accountId: string, debtId: string): Promise<Debt>;

  async abstract getPaymentsMadeOnDebt(accountId: string, debtId: string): Promise<Array<TransactionDetails>>;

  async abstract getInterestPaidOnDebt(accountId: string, debtId: string): Promise<Array<InterestPayments>>;

  async abstract makePaymentOnDebt(accountId: string, debtId: string, amountToPay: number): Promise<Account>;

  // ADMIN
  async abstract pushNewDebt(accountId: string, debt: Debt): Promise<Account>;

  async abstract tickInterest(accountId: string, debtId: string): Promise<Debt>;
}
