import { useCartStore } from '../store/cartStore';
import { Milk, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const navigate = useNavigate();

  const subtotal = total();
  const deliveryFee = 0;
  const finalTotal = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-modern-bg py-32 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div>
            <div className="section-tag mb-4">Logistics Management</div>
            <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase">Cart <span className="text-modern-mint">Inventory.</span></h1>
          </div>
          <div className="flex items-center gap-3 py-2 px-4 bg-modern-surface border border-modern-border rounded-xl">
            <div className="w-2 h-2 bg-modern-mint rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
            <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Registry Session Encrypted</span>
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modern-card py-40 flex flex-col items-center justify-center text-center group"
          >
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-modern-mint/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShoppingBag className="h-10 w-10 text-modern-muted group-hover:text-modern-mint transition-colors" />
            </div>
            <h2 className="text-4xl font-black text-white mb-10 italic">EMPTY MANIFEST.</h2>
            <Link to="/products" className="modern-button !px-12">
              Restore Inventory Session <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="modern-card !p-6 flex flex-col sm:flex-row gap-8 items-start sm:items-center group"
                  >
                    <div className="w-full sm:w-28 h-28 bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative overflow-hidden group-hover:border-modern-mint/30 transition-colors">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-2xl font-black text-white italic truncate pr-4 group-hover:text-modern-mint transition-colors">{item.name}</h3>
                          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-modern-muted">{item.category} / {item.unit}</p>
                        </div>
                        <span className="text-xl font-bold font-mono text-white">₹{item.price * item.quantity}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-1.5 p-1.5 bg-modern-bg/50 rounded-xl border border-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white/5 rounded-lg text-modern-muted hover:text-white transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-bold text-modern-mint font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white/5 rounded-lg text-modern-muted hover:text-white transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2.5 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-xl text-red-500/50 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4">
              <div className="modern-card sticky top-32 !p-8 border border-modern-mint/20 shadow-[0_0_30px_rgba(0,255,148,0.05)]">
                <h3 className="text-2xl font-black text-white italic mb-8 uppercase tracking-tighter">Settlement <span className="text-modern-mint">Matrix.</span></h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-modern-muted">
                    <span>Baseline Clearing</span>
                    <span className="text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-modern-muted">
                    <span>Logistics Allocation</span>
                    <span className="text-modern-mint italic">FREE DISPATCH</span>
                  </div>
                  <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] uppercase font-black tracking-[0.2em] text-white/40 leading-none">Net Settlement</span>
                      <div className="text-right">
                        <span className="text-5xl font-black text-modern-mint italic leading-none block">₹{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="modern-button w-full !text-sm !py-5"
                  >
                    Initialize Dispatch <Truck className="h-5 w-5" />
                  </button>
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <ShieldCheck className="h-3.5 w-3.5 text-modern-mint" />
                    <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em]">Neural Security Protocol Enforced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
