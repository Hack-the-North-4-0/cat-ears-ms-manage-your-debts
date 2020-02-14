import {TransactionDetails} from './transaction_details';

export interface Debt {
  debt_id: string,
  creditor: string,
  type: string,
  secured: boolean,
  score: number,
  initial_total: number,
  remaining: number,
  payments: Array<TransactionDetails>,
}
