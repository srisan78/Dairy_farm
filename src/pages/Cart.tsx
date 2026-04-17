import { useCartStore } from '../store/cartStore';
import { Milk, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const navigate = useNavigate();

  const subtotal = total();
  const deliveryFee = 0;
  const finalTotal = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-editorial-bg py-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-12 mb-24 border-b border-editorial-border pb-12">
          <div>
            <span className="section-title">Logistics Management</span>
            <h1 className="text-5xl font-serif font-black text-editorial-ink tracking-tight uppercase">Cart Inventory</h1>
          </div>
          <div className="flex items-center gap-4 text-editorial-security text-[10px] uppercase font-bold tracking-widest">
            <div className="w-1.5 h-1.5 bg-editorial-security rounded-full" />
            Active Session Encrypted
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-48 border-2 border-dashed border-editorial-border"
          >
            <span className="section-title uppercase block mb-8">Manifest Empty</span>
            <h2 className="text-4xl font-serif font-black text-editorial-ink mb-12">No inventory selected for dispatch.</h2>
            <Link to="/products" className="editorial-button inline-block min-w-[250px]">
              Initialize Inventory Search
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-24 divide-x divide-editorial-border lg:-mx-16">
            <div className="flex-1 lg:px-16 space-y-12">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-8 pb-12 border-b border-dotted border-editorial-border group"
                  >
                    <div className="w-32 h-40 bg-editorial-sidebar border border-editorial-border overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-2xl font-serif font-bold text-editorial-ink leading-tight">{item.name}</h3>
                        <p className="text-xl font-serif font-bold text-editorial-ink">₹{item.price * item.quantity}</p>
                      </div>
                      
                      <div className="text-[11px] uppercase tracking-widest text-editorial-muted font-bold">
                        {item.category} &bull; {item.unit}
                      </div>

                      <div className="flex items-center justify-between pt-8">
                        <div className="flex items-center gap-6 border border-editorial-border p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-editorial-accent transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-serif font-bold text-lg text-editorial-ink">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-editorial-accent transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-editorial-muted hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="w-full lg:w-[400px] lg:px-16 bg-editorial-sidebar pt-12">
              <div className="sticky top-32">
                <span className="section-title">Settlement Summary</span>
                
                <div className="space-y-6 mt-12 mb-12">
                  <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest text-editorial-muted">
                    <span>Baseline Clearing</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest text-editorial-muted">
                    <span>Logistics Allocation</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-8 border-t border-editorial-ink mt-8">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[14px] uppercase font-black tracking-widest text-editorial-ink">Net Settlement</span>
                      <span className="text-4xl font-serif font-black text-editorial-ink leading-none">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="editorial-button"
                  >
                    Proceed to Dispatch
                  </button>
                  <p className="text-[10px] text-center font-bold uppercase tracking-widest text-editorial-muted pt-4">
                    Secure Clearing Protocol Enforced
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
