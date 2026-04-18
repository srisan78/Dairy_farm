import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { useAuthStore } from './store/authStore';
import React, { useState, useEffect } from 'react';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-modern-bg flex flex-col font-sans">
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
        <footer className="bg-[#050608] border-t border-white/5 py-24 px-6 sm:px-12 lg:px-16 overflow-hidden relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-24 items-baseline relative z-10">
              <div className="col-span-2 space-y-12">
                <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">VRS <br /><span className="text-modern-mint not-italic font-sans">Systems.</span></h2>
                <p className="text-white/40 text-[13px] font-bold tracking-[0.05em] leading-relaxed max-w-sm italic">
                  "A high-fidelity dairy distribution network providing laboratory-grade organic sustenance. Cataloged and secure since 1984."
                </p>
              </div>
              
              <div className="space-y-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">Operations</span>
                <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
                  <Link to="/products" className="hover:text-modern-mint transition-colors">Registry Index</Link>
                  <Link to="/login" className="hover:text-modern-mint transition-colors">Personnel Access</Link>
                  <Link to="/dashboard" className="hover:text-modern-mint transition-colors">Active Logistics</Link>
                </div>
              </div>

              <div className="space-y-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">Connectivity</span>
                <div className="flex flex-col gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
                  <span>Terminal: +91 98402 34567</span>
                  <span>Grid: info@vrs-systems.com</span>
                  <span>HQ: Tamil Nadu, IN</span>
                </div>
              </div>
            </div>

            <div className="mt-48 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-12 opacity-40">
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/60">&copy; 2026 VRS Systems Corporation. All rights reserved.</div>
              <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-black text-white/60">
                 <span>Security: AES-256</span>
                 <span>SSL Protocol: v1.3</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 opacity-[0.02] select-none pointer-events-none">
             <span className="text-[20vw] font-black uppercase text-white">VRS</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
