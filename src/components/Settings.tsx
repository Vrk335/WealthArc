import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, Monitor } from 'lucide-react';

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-lg font-bold text-text-dark">Settings</h2>
      </header>

      <div className="bg-sidebar-bg p-6 rounded-lg shadow-card border border-border-color max-w-2xl">
        <h3 className="text-sm font-bold text-text-dark mb-4">Profile Information</h3>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-xs font-semibold text-text-light uppercase tracking-[0.5px] mb-1">Name</label>
            <p className="text-text-dark font-semibold">{user?.name || 'User'}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-light uppercase tracking-[0.5px] mb-1">Email</label>
            <p className="text-text-dark font-semibold">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-text-dark mb-4 border-t border-border-color pt-6">Appearance</h3>
        <div>
          <label className="block text-xs font-semibold text-text-light uppercase tracking-[0.5px] mb-3">Theme Preference</label>
          <div className="flex gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-4 py-2 rounded border ${theme === 'light' ? 'border-primary bg-nav-active text-primary' : 'border-border-color text-text-light hover:bg-bg-hover'} transition-colors font-semibold text-sm`}
            >
              <Sun className="w-4 h-4" /> Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-4 py-2 rounded border ${theme === 'dark' ? 'border-primary bg-nav-active text-primary' : 'border-border-color text-text-light hover:bg-bg-hover'} transition-colors font-semibold text-sm`}
            >
              <Moon className="w-4 h-4" /> Neon Dark
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`flex items-center gap-2 px-4 py-2 rounded border ${theme === 'system' ? 'border-primary bg-nav-active text-primary' : 'border-border-color text-text-light hover:bg-bg-hover'} transition-colors font-semibold text-sm`}
            >
              <Monitor className="w-4 h-4" /> System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
