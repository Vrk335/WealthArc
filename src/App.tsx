/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Budget } from './components/Budget';
import { Investments } from './components/Investments';
import { AIAdvisor } from './components/AIAdvisor';
import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Settings } from './components/Settings';
import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-main flex relative overflow-hidden">
      {/* Modern Glass Ambient Blobs (visible in dark mode primarily due to contrast) */}
      <div className="hidden dark:block fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 mix-blend-screen blur-[120px] pointer-events-none z-0"></div>
      <div className="hidden dark:block fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-success/10 mix-blend-screen blur-[120px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 ml-[240px] flex flex-col min-h-screen">
          <header className="h-[70px] bg-sidebar-bg/80 backdrop-blur-xl border-b border-border-color px-8 flex justify-between items-center shrink-0 sticky top-0 z-20">
            <div className="text-lg font-semibold text-text-dark capitalize">{activeTab}</div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-text-dark">{user?.name || 'User'}</div>
                <div className="text-xs text-text-light">Premium Plan</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-success"></div>
            </div>
          </header>

          <div className="p-6 md:p-8 flex-1 overflow-auto z-10">
            <div className="max-w-6xl mx-auto">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'transactions' && <Transactions />}
              {activeTab === 'budget' && <Budget />}
              {activeTab === 'investments' && <Investments />}
              {activeTab === 'advisor' && <AIAdvisor />}
              {activeTab === 'settings' && <Settings />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-bg-main"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
