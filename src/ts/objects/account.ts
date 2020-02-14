import {Debt} from './debt';
import {TransactionDetails} from './transaction_details';

export interface Account {
  account_id: string,
  name: string,
  liquid_assets: number,
  debts: Array<Debt>,
  income: Array<TransactionDetails>,
}
