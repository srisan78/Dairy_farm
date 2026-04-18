import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Milk, Mail, Lock, User, ArrowRight, Chrome } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation of a realistic login delay
    setTimeout(() => {
      try {
        // Mock authentication logic
        if (password.length < 6) {
          throw new Error('Access token must be at least 6 characters for sync integrity.');
        }

        const mockUser = {
          uid: Math.random().toString(36).slice(2, 12).toUpperCase(),
          email: email,
          displayName: isLogin ? (email.split('@')[0]) : name
        };

        setUser(mockUser);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        uid: `G-${Math.random().toString(36).slice(2, 12).toUpperCase()}`,
        email: 'google.user@example.com',
        displayName: 'Google Partner Entity'
      };
      setUser(mockUser);
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-modern-bg flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Branding Side - Hidden on mobile, prominent on desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-20 overflow-hidden bg-[#050608]">
        {/* Background Tech Visuals */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(0,255,148,0.1)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(255,148,0,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Floating Milk Silhouette Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-modern-mint/5 blur-[120px] rounded-full animate-pulse" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-modern-mint/20 rounded-2xl border border-modern-mint/30 shadow-[0_0_15px_rgba(0,255,148,0.3)]">
              <Milk className="h-8 w-8 text-modern-mint" />
            </div>
            <span className="text-3xl font-black text-white italic tracking-tighter uppercase">VRS <span className="text-modern-mint">Systems.</span></span>
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 bg-modern-mint rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Secure Connection Active</span>
            </div>
            <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Secure <br />
              <span className="text-modern-mint">Logistics</span> <br />
              Network.
            </h1>
            <p className="max-w-md text-lg text-white/40 font-medium leading-relaxed italic">
              "Synchronizing artisanal quality with decentralized distribution matrices for the modern biological supply chain."
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-12">
          <div>
            <div className="text-4xl font-black text-white italic">0.02ms</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-modern-muted">Neural Latency</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white italic">100%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-modern-muted">Chain Integrity</div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20 relative bg-modern-bg">
        {/* Background Grid for Mobile */}
        <div className="lg:hidden absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:30px_30px] opacity-20" />
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="modern-card !p-8 md:!p-12 border border-white/5 shadow-2xl">
            <div className="mb-12">
              <div className="section-tag mb-4">Member Access</div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                {isLogin ? 'User' : 'Member'} <span className="text-modern-mint">Sign In.</span>
              </h2>
              <p className="text-[10px] text-white/30 mt-4 uppercase font-black tracking-[0.3em] font-mono leading-relaxed">
                Enter your credentials to access <br /> your personalized dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] ml-1">Full Name</label>
                  <div className="relative group/field">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-modern-muted group-focus-within/field:text-modern-mint transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-modern-mint/50 focus:bg-modern-mint/5 transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative group/field">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-modern-muted group-focus-within/field:text-modern-mint transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-modern-mint/50 focus:bg-modern-mint/5 transition-all text-sm font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] ml-1">Account Password</label>
                <div className="relative group/field">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-modern-muted group-focus-within/field:text-modern-mint transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-modern-mint/50 focus:bg-modern-mint/5 transition-all text-sm font-bold"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-500/5 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/10 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              <button
                disabled={loading}
                className="modern-button w-full !py-5 shadow-[0_0_20px_rgba(0,255,148,0.15)]"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-modern-bg/30 border-t-modern-bg rounded-full animate-spin" />
                    Validating...
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    {isLogin ? 'Sign In Now' : 'Create Account'} <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </button>
            </form>

            <div className="relative my-10">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
               <div className="relative flex justify-center text-[9px] uppercase"><span className="bg-modern-surface px-4 text-white/20 font-black tracking-[0.4em]">Social Sign In</span></div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-[0.2em] font-black rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
            >
              <Chrome className="h-5 w-5 text-modern-accent group-hover:scale-110 transition-transform" />
              Sign in with Google
            </button>

            <p className="text-center mt-10 text-[10px] text-white/30 font-black uppercase tracking-widest">
              {isLogin ? "Need an account?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-modern-mint hover:text-white transition-colors ml-2 underline underline-offset-4"
              >
                {isLogin ? 'Create one here' : 'Back to login'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
