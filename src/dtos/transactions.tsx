export interface ITransactionItem {
  _id: string;
  name: string;
  description?: string;
  category: string;
  subType: string;
  amount: number;
  transactionDate: Date;
}

export type ICategoryType = "Income" | "Expense" | "Savings";
