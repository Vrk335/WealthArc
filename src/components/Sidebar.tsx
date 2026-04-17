import React from 'react';
import { LayoutDashboard, ReceiptText, PieChart, TrendingUp, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'advisor', label: 'AI Advisor', icon: Sparkles },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-[240px] bg-sidebar-bg border-r border-border-color flex flex-col h-screen fixed left-0 top-0 py-6">
      <div className="px-6 pb-8 text-xl font-bold text-primary flex items-center gap-2">
        <div className="w-6 h-6 bg-primary rounded shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
        WealthArc
      </div>

      <nav className="flex-1 flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors text-sm font-semibold ${
                isActive 
                  ? 'bg-nav-active text-primary border-r-[3px] border-primary' 
                  : 'text-text-light hover:bg-bg-hover'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-6 py-3 transition-colors text-sm font-semibold ${
            activeTab === 'settings' 
              ? 'bg-nav-active text-primary border-r-[3px] border-primary' 
              : 'text-text-light hover:bg-bg-hover'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-3 text-text-light hover:bg-bg-hover transition-colors text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

