export interface Account {
  account_id: string,
  name: string,
  liquid_assets: number,
  debts: Array<string>,
}
