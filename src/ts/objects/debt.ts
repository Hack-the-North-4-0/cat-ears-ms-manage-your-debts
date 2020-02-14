import {TransactionDetails} from './transaction_details';
import {InterestPayments} from './interest_payment';

export interface Debt {
  debt_id: string,
  creditor: string,
  type: string,
  secured: boolean,
  score: number,
  initial_total: number,
  remaining: number,
  payments: Array<TransactionDetails>,
  interest_additions: Array<InterestPayments>,
}
