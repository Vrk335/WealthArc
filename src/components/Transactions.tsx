import React, { useState } from 'react';
import { mockTransactions } from '../data';
import { Search, Filter, Plus } from 'lucide-react';

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockTransactions.filter(tx => 
    tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-dark">Transactions</h2>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm">
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </header>

      <div className="bg-sidebar-bg rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-border-color flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-text-light absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-bg-hover border border-border-color rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border-color rounded text-sm font-semibold text-text-dark hover:bg-bg-hover transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-color text-xs uppercase tracking-[0.5px] text-text-light bg-bg-hover">
                <th className="px-6 py-3 font-semibold">Transaction</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-bg-hover transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-text-dark text-sm">{tx.merchant}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-border-color text-text-dark">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-light">
                    {new Date(tx.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-light text-sm">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
