import Base from "./base";

import {
  CreateTransaction,
  UpdateTransaction,
} from "@ts-types/transactions-type";

class Transaction extends Base<CreateTransaction, UpdateTransaction> {}

export default new Transaction();
