import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { mockBudgets, mockInvestments, monthlyData } from '../data';
import { Sparkles, TrendingUp, Target, Lightbulb, Loader2 } from 'lucide-react';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type AIResponse = {
  trends: string[];
  budgetAdjustments: string[];
  investmentOpportunities: string[];
};

export function AIAdvisor() {
  const [insights, setInsights] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      // Prepare data summary
      const totalIncome = monthlyData.reduce((acc, curr) => acc + curr.income, 0);
      const totalExpenses = monthlyData.reduce((acc, curr) => acc + curr.expenses, 0);
      const savings = totalIncome - totalExpenses;
      
      const budgetSummary = mockBudgets.map(b => `${b.name}: Allocated ₹${b.allocated}, Spent ₹${b.spent}`).join('; ');
      const investmentSummary = mockInvestments.map(i => `${i.symbol} (${i.type}): ${i.shares} shares @ ₹${i.currentPrice}`).join('; ');

      const prompt = `
        Analyze the following user financial data and provide personalized insights.
        
        Financial Summary (Last 6 Months):
        - Total Income: ₹${totalIncome}
        - Total Expenses: ₹${totalExpenses}
        - Savings: ₹${savings}
        
        Current Budgets:
        ${budgetSummary}
        
        Current Investments:
        ${investmentSummary}
        
        Provide 3 actionable trends, 3 personalized budget adjustments, and 3 tailored investment opportunities based on this data.
        Make the insights specific, actionable, and concise. Use ₹ for currency.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              trends: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Actionable trends identified from the financial data."
              },
              budgetAdjustments: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Personalized budget adjustments to save money."
              },
              investmentOpportunities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Tailored investment opportunities based on current portfolio and savings."
              }
            },
            required: ["trends", "budgetAdjustments", "investmentOpportunities"]
          }
        }
      });

      const jsonStr = response.text?.trim();
      if (jsonStr) {
        const parsed = JSON.parse(jsonStr) as AIResponse;
        setInsights(parsed);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInsights();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-dark">AI Financial Advisor</h2>
          <p className="text-sm text-text-light mt-1">Personalized insights powered by Gemini AI.</p>
        </div>
        <button 
          onClick={generateInsights}
          disabled={loading}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-semibold shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </header>

      {error && (
        <div className="bg-danger/10 text-danger p-4 rounded-lg text-sm font-semibold border border-danger/20">
          {error}
        </div>
      )}

      {loading && !insights ? (
        <div className="bg-sidebar-bg p-12 rounded-lg shadow-card flex flex-col items-center justify-center text-text-light">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="font-semibold text-text-dark">Analyzing your financial data...</p>
          <p className="text-sm mt-2 text-center max-w-md">Identifying trends, budget adjustments, and investment opportunities tailored to your portfolio.</p>
        </div>
      ) : insights ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trends */}
          <div className="bg-sidebar-bg p-6 rounded-lg shadow-card flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-dark">Financial Trends</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {insights.trends.map((trend, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-text-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{trend}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Budget Adjustments */}
          <div className="bg-sidebar-bg p-6 rounded-lg shadow-card flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-dark">Budget Adjustments</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {insights.budgetAdjustments.map((adj, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-text-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{adj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Investment Opportunities */}
          <div className="bg-sidebar-bg p-6 rounded-lg shadow-card flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-dark">Investment Opportunities</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {insights.investmentOpportunities.map((opp, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-text-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
