import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
     try {
       const provider = new GoogleAuthProvider();
       await signInWithPopup(auth, provider);
       navigate('/dashboard');
     } catch (err: any) {
       setError(err.message || 'Google login failed');
     }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-editorial-bg flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white border border-editorial-border p-12">
          <div className="text-center mb-12">
            <span className="section-title">Security Gateway</span>
            <h2 className="text-3xl font-serif font-black text-editorial-ink uppercase tracking-tight">{isLogin ? 'VRS Session' : 'New Registry'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="border-b border-editorial-border pb-2">
                <label className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block mb-1">Personnel Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 bg-transparent text-editorial-ink outline-none font-serif text-lg"
                />
              </div>
            )}
            <div className="border-b border-editorial-border pb-2">
              <label className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block mb-1">Electronic Mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 bg-transparent text-editorial-ink outline-none font-serif text-lg"
              />
            </div>
            <div className="border-b border-editorial-border pb-2">
              <label className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block mb-1">Access Token</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 bg-transparent text-editorial-ink outline-none font-serif text-lg"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wider border border-red-100">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="editorial-button"
            >
              {loading ? 'Validating...' : (isLogin ? 'Initiate Session' : 'Commit Registry')}
            </button>
          </form>

          <div className="relative my-12">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-editorial-border"></div></div>
             <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-4 text-editorial-muted font-bold tracking-widest">Federated Access</span></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full py-4 border border-editorial-ink text-editorial-ink text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-editorial-sidebar transition-all flex items-center justify-center gap-4"
          >
            <Chrome className="h-4 w-4" />
            Google Authorization
          </button>

          <p className="text-center mt-12 text-[11px] text-editorial-muted font-bold uppercase tracking-wider">
            {isLogin ? "Unregistered?" : "Already Cataloged?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-editorial-accent hover:underline underline-offset-4"
            >
              {isLogin ? 'Apply for Account' : 'Return to Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
