import React, { useState } from 'react';
import { mockInvestments } from '../data';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

export function Investments() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredInvestments = mockInvestments.filter(inv => {
    if (activeTab === 'all') return true;
    if (activeTab === 'stock') return inv.type === 'stock' || inv.type === 'etf';
    if (activeTab === 'mutual_fund') return inv.type === 'mutual_fund';
    if (activeTab === 'index') return inv.type === 'index';
    if (activeTab === 'commodity') return inv.type === 'commodity';
    if (activeTab === 'crypto') return inv.type === 'crypto';
    return true;
  });

  const totalValue = filteredInvestments.reduce((acc, curr) => acc + (curr.shares * curr.currentPrice), 0);
  const totalCost = filteredInvestments.reduce((acc, curr) => acc + (curr.shares * curr.avgPrice), 0);
  const totalReturn = totalValue - totalCost;
  const returnPercentage = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;

  const tabs = [
    { id: 'all', label: 'All Assets' },
    { id: 'index', label: 'Nifty/Sensex' },
    { id: 'mutual_fund', label: 'Mutual Funds' },
    { id: 'commodity', label: 'Gold' },
    { id: 'stock', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-dark">Portfolio</h2>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm">
          <Plus className="w-4 h-4" />
          Add Asset
        </button>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-sm' 
                : 'bg-sidebar-bg text-text-light hover:text-text-dark border border-border-color'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="bg-sidebar-bg p-6 rounded-lg shadow-card">
        <div className="text-xs text-text-light uppercase tracking-[0.5px] mb-2 font-semibold">Total Portfolio Value</div>
        <div className="flex items-end gap-4">
          <p className="text-3xl font-bold text-text-dark">₹{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <div className={`flex items-center gap-1 mb-1 px-2 py-0.5 rounded text-sm font-bold ${
            totalReturn >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}>
            {totalReturn >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}%</span>
          </div>
        </div>
        <p className="text-sm text-text-light mt-2 font-semibold">
          Total Return: <span className={totalReturn >= 0 ? 'text-success' : 'text-danger'}>
            {totalReturn >= 0 ? '+' : ''}₹{totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>
      </div>

      {/* Assets List */}
      <div className="bg-sidebar-bg rounded-lg shadow-card overflow-hidden">
        <div className="p-5 border-b border-border-color">
          <h3 className="text-sm font-bold text-text-dark">Your Assets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-color text-xs uppercase tracking-[0.5px] text-text-light bg-bg-hover">
                <th className="px-6 py-3 font-semibold">Asset</th>
                <th className="px-6 py-3 font-semibold text-right">Price</th>
                <th className="px-6 py-3 font-semibold text-right">Holdings</th>
                <th className="px-6 py-3 font-semibold text-right">Total Value</th>
                <th className="px-6 py-3 font-semibold text-right">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredInvestments.map((inv) => {
                const value = inv.shares * inv.currentPrice;
                const cost = inv.shares * inv.avgPrice;
                const ret = value - cost;
                const retPct = (ret / cost) * 100;
                
                return (
                  <tr key={inv.id} className="hover:bg-bg-hover transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-border-color flex items-center justify-center text-text-dark font-bold text-xs">
                          {inv.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-text-dark text-sm">{inv.symbol}</p>
                          <p className="text-xs text-text-light">{inv.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-text-dark">
                      ₹{inv.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <p className="font-semibold text-text-dark">{inv.shares}</p>
                      <p className="text-xs text-text-light">Avg: ₹{inv.avgPrice.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-bold text-text-dark">
                      ₹{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <p className={`font-bold ${ret >= 0 ? 'text-success' : 'text-danger'}`}>
                        {ret >= 0 ? '+' : ''}₹{ret.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className={`text-xs font-semibold ${ret >= 0 ? 'text-success' : 'text-danger'}`}>
                        {retPct >= 0 ? '+' : ''}{retPct.toFixed(2)}%
                      </p>
                    </td>
                  </tr>
                );
              })}
              {filteredInvestments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-light text-sm">
                    No assets found in this category.
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
