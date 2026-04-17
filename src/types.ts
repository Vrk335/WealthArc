export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  merchant: string;
  type: 'income' | 'expense';
};

export type BudgetCategory = {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
};

export type Investment = {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  type: 'stock' | 'crypto' | 'etf' | 'mutual_fund' | 'commodity' | 'index';
};
