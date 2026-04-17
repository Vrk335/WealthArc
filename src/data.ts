import { Transaction, BudgetCategory, Investment } from './types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-24', amount: 3200, category: 'Salary', merchant: 'Tech Corp', type: 'income' },
  { id: '2', date: '2023-10-23', amount: 45.5, category: 'Food', merchant: 'Whole Foods', type: 'expense' },
  { id: '3', date: '2023-10-21', amount: 120, category: 'Utilities', merchant: 'Electric Co', type: 'expense' },
  { id: '4', date: '2023-10-20', amount: 15, category: 'Entertainment', merchant: 'Netflix', type: 'expense' },
  { id: '5', date: '2023-10-18', amount: 250, category: 'Transport', merchant: 'Uber', type: 'expense' },
  { id: '6', date: '2023-10-15', amount: 85, category: 'Food', merchant: "Trader Joe's", type: 'expense' },
  { id: '7', date: '2023-10-12', amount: 1200, category: 'Housing', merchant: 'Apartment Complex', type: 'expense' },
];

export const mockBudgets: BudgetCategory[] = [
  { id: '1', name: 'Housing', allocated: 1500, spent: 1200, color: '#4f46e5' },
  { id: '2', name: 'Food', allocated: 600, spent: 450, color: '#10b981' },
  { id: '3', name: 'Transport', allocated: 300, spent: 250, color: '#f59e0b' },
  { id: '4', name: 'Entertainment', allocated: 200, spent: 180, color: '#ec4899' },
  { id: '5', name: 'Utilities', allocated: 250, spent: 120, color: '#8b5cf6' },
];

export const mockInvestments: Investment[] = [
  { id: '1', symbol: 'NIFTY', name: 'Nifty 50 Index', shares: 10, avgPrice: 19500, currentPrice: 22000, type: 'index' },
  { id: '2', symbol: 'SENSEX', name: 'BSE Sensex', shares: 5, avgPrice: 65000, currentPrice: 72000, type: 'index' },
  { id: '3', symbol: 'GOLD', name: 'Physical Gold (10g)', shares: 2, avgPrice: 55000, currentPrice: 63000, type: 'commodity' },
  { id: '4', symbol: 'HDFCSML', name: 'HDFC Small Cap Fund', shares: 500, avgPrice: 75.5, currentPrice: 95.2, type: 'mutual_fund' },
  { id: '5', symbol: 'BTC', name: 'Bitcoin', shares: 0.1, avgPrice: 2000000, currentPrice: 3500000, type: 'crypto' },
  { id: '6', symbol: 'RELIANCE', name: 'Reliance Industries', shares: 50, avgPrice: 2400, currentPrice: 2950, type: 'stock' },
];

export const monthlyData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 4000, expenses: 2100 },
  { name: 'Mar', income: 4200, expenses: 2800 },
  { name: 'Apr', income: 4200, expenses: 2600 },
  { name: 'May', income: 4500, expenses: 2900 },
  { name: 'Jun', income: 4500, expenses: 2300 },
];
