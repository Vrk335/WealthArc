import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 relative overflow-hidden">
      {/* Modern Glass Ambient Blobs */}
      <div className="hidden dark:block absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-primary/20 mix-blend-screen blur-[120px] pointer-events-none z-0"></div>
      <div className="hidden dark:block absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-success/10 mix-blend-screen blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-sidebar-bg p-8 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-border-color w-full max-w-md relative overflow-hidden z-10 backdrop-blur-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
        <h2 className="text-3xl font-bold text-text-dark mb-2">Create Account</h2>
        <p className="text-text-light mb-8">Join WealthArc and master your finances</p>

        {error && <div className="bg-danger/10 text-danger p-3 rounded mb-4 text-sm font-semibold border border-danger/20">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 bg-bg-hover border border-border-color rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-bg-hover border border-border-color rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-dark mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-bg-hover border border-border-color rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-dark"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded font-bold shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all flex justify-center items-center gap-2 mt-4"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-text-light">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
