import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { ShieldCheck, CreditCard, MapPin, Phone, ArrowLeft, Loader2, Check, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    address: '',
    phone: '',
    paymentMethod: 'card'
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      try {
        const newOrder = {
          id: Math.random().toString(36).slice(2, 12).toUpperCase(),
          userId: user.uid,
          items: items.map(i => ({
            ...i
          })),
          total: total(),
          address: formData.address,
          phone: formData.phone,
          status: 'paid' as const,
          createdAt: Date.now()
        };

        addOrder(newOrder);
        setSuccess(true);
        clearCart();
        setTimeout(() => navigate('/dashboard'), 3000);
      } catch (err) {
        console.error(err);
        alert('Order processing failed. Local storage error.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-editorial-bg flex flex-col items-center justify-center p-6 text-center">
        <span className="section-title">Logistics Error</span>
        <h2 className="text-4xl font-serif text-editorial-ink mb-8">Manifest Empty</h2>
        <Link to="/products" className="editorial-button">Return to Catalogue</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-editorial-bg flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="w-24 h-24 bg-editorial-security rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-editorial-security/20">
            <Check className="h-12 w-12 text-white" />
          </div>
          <span className="section-title uppercase">Transaction Authenticated</span>
          <h2 className="text-5xl font-serif font-black text-editorial-ink mb-6">Clearing Complete</h2>
          <p className="text-editorial-muted font-bold tracking-widest text-[11px] uppercase">Redirecting to Secure Dashboard Registry...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modern-bg py-32 px-6 sm:px-12 lg:px-16 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-modern-mint/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-modern-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Side */}
          <div className="flex-1 space-y-8">
            <div className="mb-12">
              <div className="section-tag mb-4">Financial Protocol</div>
              <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">Settlement <span className="text-modern-mint">Gateway.</span></h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="modern-card !p-8 md:!p-10 space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-modern-mint opacity-20 group-hover:opacity-100 transition-opacity" />
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] ml-1">Entity Name</label>
                    <div className="relative group/field">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-modern-muted group-focus-within/field:text-modern-mint transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-modern-mint/50 focus:bg-modern-mint/5 transition-all text-sm font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] ml-1">Communication Link</label>
                    <div className="relative group/field">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-modern-muted group-focus-within/field:text-modern-mint transition-colors" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-modern-mint/50 focus:bg-modern-mint/5 transition-all text-sm font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em] ml-1">Coordinate Destination</label>
                  <div className="relative group/field">
                    <MapPin className="absolute left-4 top-5 h-4 w-4 text-modern-muted group-focus-within/field:text-modern-mint transition-colors" />
                    <textarea
                      required
                      placeholder="Coordinates or Physical Address..."
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-modern-mint/50 focus:bg-modern-mint/5 transition-all text-sm font-bold resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="modern-card !p-8">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 bg-modern-mint/10 rounded-lg"><CreditCard className="h-5 w-5 text-modern-mint" /></div>
                   <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">Clearing Methods</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'card', label: 'NEURAL CREDIT', balance: 'SECURE TUNNEL' },
                    { id: 'cod', label: 'DESTINATION SETTLEMENT', balance: 'ON ARRIVAL' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: method.id})}
                      className={`relative p-5 rounded-2xl border transition-all text-left group overflow-hidden ${
                        formData.paymentMethod === method.id 
                        ? 'bg-modern-mint/10 border-modern-mint shadow-[0_0_15px_rgba(0,255,148,0.1)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-2 h-2 rounded-bl-xl transition-colors ${formData.paymentMethod === method.id ? 'bg-modern-mint' : 'bg-transparent'}`} />
                      <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${formData.paymentMethod === method.id ? 'text-modern-mint' : 'text-white/60'}`}>{method.label}</p>
                      <p className="text-[10px] font-mono text-white/30 group-hover:text-white/50">{method.balance}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={loading}
                className="modern-button w-full !py-6 !text-lg shadow-[0_0_30px_rgba(0,255,148,0.2)]"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Validating Transaction...
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    Execute Secure Settlement: ₹{total().toFixed(2)} <ShieldCheck className="h-6 w-6" />
                  </span>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-3 text-white/20 text-[10px] font-black uppercase tracking-[0.3em] pt-4">
                 <div className="w-1.5 h-1.5 bg-modern-mint rounded-full animate-pulse" />
                 End-to-End Encryption Protocol Active
              </div>
            </form>
          </div>

          {/* Summary Side */}
          <div className="w-full lg:w-[450px]">
            <div className="modern-card !p-0 overflow-hidden border border-modern-mint/10 bg-gradient-to-br from-modern-surface to-modern-bg">
              <div className="p-8 border-b border-white/5">
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-1">Manifest <span className="text-modern-mint">Summary.</span></h3>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Registry ID: {Math.random().toString(36).slice(2, 9).toUpperCase()}</p>
              </div>
              
              <div className="p-8 max-h-[400px] overflow-y-auto custom-scrollbar space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 overflow-hidden relative">
                      <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate uppercase italic italic tracking-tighter">{item.name}</h4>
                      <p className="text-[10px] font-black text-modern-mint opacity-60 mt-0.5">{item.quantity} units @ ₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white font-mono">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-black/20 border-t border-white/5">
                <div className="space-y-4">
                  <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-white/40">
                    <span>Sub-Clearing</span>
                    <span className="text-white">₹{total().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-white/40">
                    <span>Dispatch Allocation</span>
                    <span className="text-modern-mint italic">CREDITED</span>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] uppercase font-black tracking-[0.2em] text-white leading-none">Net Total</span>
                      <span className="text-4xl font-black text-modern-mint italic leading-none block">₹{total().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
