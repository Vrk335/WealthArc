import React from 'react';
import { AreaChart, Area, BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyData, mockTransactions, mockBudgets } from '../data';

export function Dashboard() {
  const totalBalance = 142500.20;
  const monthlyIncome = 88320.15;
  const monthlyExpenses = 12410.00;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Grid */}
      <div className="bg-sidebar-bg p-5 rounded-lg shadow-card">
        <div className="text-xs text-text-light uppercase tracking-[0.5px] mb-2 font-semibold">Total Net Worth</div>
        <div className="text-2xl font-bold text-text-dark mb-1">₹{totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        <div className="text-[13px] font-semibold text-success">+4.2% this month</div>
      </div>

      <div className="bg-sidebar-bg p-5 rounded-lg shadow-card">
        <div className="text-xs text-text-light uppercase tracking-[0.5px] mb-2 font-semibold">Investments</div>
        <div className="text-2xl font-bold text-text-dark mb-1">₹{monthlyIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        <div className="text-[13px] font-semibold text-success">+1.8% today</div>
      </div>

      <div className="bg-sidebar-bg p-5 rounded-lg shadow-card">
        <div className="text-xs text-text-light uppercase tracking-[0.5px] mb-2 font-semibold">Cash Balance</div>
        <div className="text-2xl font-bold text-text-dark mb-1">₹{monthlyExpenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        <div className="text-[13px] font-semibold text-text-light">Steady growth</div>
      </div>

      <div className="bg-sidebar-bg p-6 rounded-lg shadow-card md:col-span-2 h-[300px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-text-dark">Portfolio Growth</div>
          <div className="text-xs text-text-light">Last 6 Months</div>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-light)', fontSize: 11 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-light)', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--sidebar-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
                itemStyle={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}
              />
              <Area type="monotone" dataKey="income" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorPrimary)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-sidebar-bg p-6 rounded-lg shadow-card">
        <div className="text-sm font-bold text-text-dark mb-4">Recent Transactions</div>
        <div className="flex flex-col">
          {mockTransactions.slice(0, 4).map((tx, idx) => (
            <div key={tx.id} className={`flex justify-between py-3 ${idx !== 3 ? 'border-b border-border-color' : ''}`}>
              <div>
                <div className="text-sm font-semibold text-text-dark">{tx.merchant}</div>
                <div className="text-xs text-text-light mt-0.5">{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
              </div>
              <div className={`text-sm font-bold ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-sidebar-bg p-6 rounded-lg shadow-card md:col-span-3 h-[300px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-text-dark">Budget Overview</div>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockBudgets} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-light)', fontSize: 11 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-light)', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--sidebar-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
                itemStyle={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}
                cursor={{ fill: 'var(--nav-active)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="allocated" name="Allocated" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" name="Spent" fill="var(--warning)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
