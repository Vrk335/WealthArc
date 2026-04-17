import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-bg-main text-text-dark overflow-hidden flex flex-col">
      <header className="px-8 py-6 flex justify-between items-center z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-primary flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-primary rounded shadow-[0_0_15px_rgba(0,243,255,0.5)]"></div>
          WealthArc
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4"
        >
          <Link to="/login" className="px-5 py-2 text-sm font-semibold hover:text-primary transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded shadow-card hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all">
            Get Started
          </Link>
        </motion.div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 relative">
        {/* Modern Glass Ambient Background Glows */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-success/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-tight"
        >
          Master Your Wealth with <span className="text-primary drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">AI Precision</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-text-light max-w-2xl"
        >
          Experience the future of personal finance. Track, analyze, and grow your net worth with intelligent insights and a stunning neon-dark interface.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all hover:-translate-y-1">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left"
        >
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Real-time syncing and instant AI-driven financial insights.' },
            { icon: Shield, title: 'Bank-Grade Security', desc: 'Your data is encrypted and secured with JWT authentication.' },
            { icon: TrendingUp, title: 'Smart Investments', desc: 'Discover tailored investment opportunities powered by Gemini AI.' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-sidebar-bg p-6 rounded-xl shadow-card border border-border-color hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-nav-active rounded-lg flex items-center justify-center text-primary mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-text-light">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
