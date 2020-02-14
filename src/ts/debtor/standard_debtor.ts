import { Account } from "../objects/account";

export abstract class StandardDebtor {
  abstract getOneAccount(accountId: string): Promise<Account>;
}
