import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { auth } from './firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-editorial-bg">
      <div className="w-8 h-8 border-2 border-editorial-border border-t-editorial-ink rounded-full animate-spin" />
    </div>
  );
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-editorial-bg border-t border-editorial-border py-24 px-6 sm:px-12 lg:px-16 overflow-hidden relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-24 items-baseline relative z-10">
              <div className="col-span-2 space-y-12">
                <h2 className="text-6xl font-serif font-black text-editorial-ink uppercase tracking-tighter leading-none">VRS <br /><span className="text-editorial-accent italic font-normal">Dairy Systems.</span></h2>
                <p className="text-editorial-muted text-[13px] font-bold tracking-[0.05em] leading-relaxed max-w-sm">
                  A high-fidelity dairy distribution network providing laboratory-grade organic sustenance. Cataloged and secure since 1984.
                </p>
              </div>
              
              <div className="space-y-8">
                <span className="section-title">Operations</span>
                <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-editorial-ink">
                  <Link to="/products" className="hover:text-editorial-accent">Registry Index</Link>
                  <Link to="/login" className="hover:text-editorial-accent">Personnel Access</Link>
                  <Link to="/dashboard" className="hover:text-editorial-accent">Active Logistics</Link>
                </div>
              </div>

              <div className="space-y-8">
                <span className="section-title">Connectivity</span>
                <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-editorial-ink">
                  <span>Terminal: +91 98402 34567</span>
                  <span>Grid: info@vrs-dairy.com</span>
                  <span>HQ: Tamil Nadu, IN</span>
                </div>
              </div>
            </div>

            <div className="mt-48 pt-12 border-t border-editorial-border flex flex-col sm:flex-row justify-between items-center gap-12 opacity-40 grayscale">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold">&copy; 2024 VRS Systems Corporation. All rights reserved.</div>
              <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
                 <span>Security: AES-256</span>
                 <span>SSL Protocol: v1.3</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 opacity-5 select-none pointer-events-none">
             <span className="text-[20vw] font-serif font-black uppercase text-editorial-ink">VRS</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
