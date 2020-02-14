import {TransactionDetails} from './transaction_details';

export interface InterestPayments extends TransactionDetails{
  interest_at_time: number,
  initial_amount: number,
}
