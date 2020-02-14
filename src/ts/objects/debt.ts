export interface Debt {
  debt_id: string,
  creditor: string,
  type: string,
  secured: boolean,
  score: number,
  initial_total: number,
  remaining: number,
}
