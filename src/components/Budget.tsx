import React from 'react';
import { mockBudgets } from '../data';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function Budget() {
  const totalAllocated = mockBudgets.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = mockBudgets.reduce((acc, curr) => acc + curr.spent, 0);
  const remaining = totalAllocated - totalSpent;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-lg font-bold text-text-dark">Budgets</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Card */}
        <div className="bg-sidebar-bg p-6 rounded-lg shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-text-dark mb-6">Monthly Budget</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-light uppercase tracking-[0.5px] font-semibold">Total Spent</p>
                <p className="text-2xl font-bold text-text-dark mt-1">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="pt-4 border-t border-border-color">
                <p className="text-xs text-text-light uppercase tracking-[0.5px] font-semibold">Remaining</p>
                <p className="text-xl font-bold mt-1 text-success">₹{remaining.toLocaleString()}</p>
              </div>
              <div className="pt-4 border-t border-border-color">
                <p className="text-xs text-text-light uppercase tracking-[0.5px] font-semibold">Total Allocated</p>
                <p className="text-lg font-bold mt-1 text-text-light">₹{totalAllocated.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 h-2 bg-border-color rounded overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min((totalSpent / totalAllocated) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-sidebar-bg p-6 rounded-lg shadow-card lg:col-span-2">
          <h3 className="text-sm font-bold text-text-dark mb-6">Categories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={mockBudgets}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="spent"
                    stroke="none"
                  >
                    {mockBudgets.map((entry, index) => {
                      const colors = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--text-light)', 'var(--danger)'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `₹${value}`}
                    contentStyle={{ backgroundColor: 'var(--sidebar-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-5">
              {mockBudgets.map((budget, index) => {
                const percentage = (budget.spent / budget.allocated) * 100;
                const isOver = percentage > 100;
                const colors = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--text-light)', 'var(--danger)'];
                const color = colors[index % colors.length];
                
                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-sm font-semibold text-text-dark">{budget.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${isOver ? 'text-danger' : 'text-text-dark'}`}>
                          ₹{budget.spent}
                        </span>
                        <span className="text-xs text-text-light ml-1">/ ₹{budget.allocated}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-border-color rounded overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isOver ? 'bg-danger' : ''}`}
                        style={{ 
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOver ? undefined : color
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
