import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth } from '../lib/api';
import { ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  key?: string;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token } = await auth.login(email, password);
      auth.saveToken(token);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md space-y-12 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-display tracking-tighter text-brand-red uppercase">GAMEX</h1>
          <p className="text-[10px] text-gamex-neutral uppercase tracking-[0.5em] font-bold">Admin Portal</p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#151515] border border-white/10 rounded-sm p-8 md:p-10 shadow-2xl text-left"
        >
          <h2 className="text-2xl font-display uppercase tracking-widest text-white mb-8">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#222] border border-gamex-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#222] border border-gamex-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 bg-[#222] border border-gamex-border rounded-sm flex items-center justify-center group-hover:border-gamex-neutral transition-colors">
                  <div className="w-2 h-2 bg-brand-red rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all" />
                </div>
                <span className="text-xs text-gamex-text-secondary">Remember me</span>
              </label>
              <button type="button" className="text-xs text-gamex-neutral hover:text-white transition-colors">Need help?</button>
            </div>

            {error && (
              <div className="px-4 py-3 bg-brand-red/10 border border-brand-red/30 rounded-sm text-xs text-brand-red font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 group transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </motion.div>

        <p className="text-[10px] text-gamex-neutral uppercase tracking-widest max-w-[280px] mx-auto leading-loose">
          This portal is restricted to authorized GAMEX editorial and administrative staff.
        </p>
      </div>
    </div>
  );
}
