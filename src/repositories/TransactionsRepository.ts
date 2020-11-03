import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.sumTransactionValue('income');
    const outcome = this.sumTransactionValue('outcome');
    const total = income - outcome;

    const balance: Balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  private sumTransactionValue(type: 'income' | 'outcome'): number {
    let value = 0;

    this.transactions
      .filter(transaction => transaction.type === type)
      .forEach(transaction => {
        value += transaction.value;
      });

    return value;
  }
}

export default TransactionsRepository;
