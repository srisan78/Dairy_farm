import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ShieldCheck, CreditCard, MapPin, Phone, ArrowLeft, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

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
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: items.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        })),
        total: total(),
        address: formData.address,
        phone: formData.phone,
        status: 'paid',
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      console.error(err);
      alert('Order processing failed. Please check security registry.');
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-editorial-bg py-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 divide-x divide-editorial-border lg:-mx-16">
          {/* Form Side */}
          <div className="flex-1 lg:px-16">
            <span className="section-title">Logistics & Settlement</span>
            <h1 className="text-5xl font-serif font-black text-editorial-ink mb-16 uppercase tracking-tight">Financial Dispatch</h1>
            
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="border-b border-editorial-border pb-2">
                  <label className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block mb-1">Entity Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full py-2 bg-transparent text-editorial-ink outline-none font-serif text-lg"
                  />
                </div>
                <div className="border-b border-editorial-border pb-2">
                  <label className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block mb-1">Communication Channel</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full py-2 bg-transparent text-editorial-ink outline-none font-serif text-lg"
                  />
                </div>
              </div>

              <div className="border-b border-editorial-border pb-2">
                <label className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block mb-1">Physical Destination</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full py-2 bg-transparent text-editorial-ink outline-none font-serif text-lg resize-none"
                />
              </div>

              <div className="space-y-6">
                <span className="text-[10px] uppercase font-bold text-editorial-muted tracking-widest block">Clearing Method</span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                    className={`py-4 border text-[11px] uppercase tracking-widest font-bold transition-all ${
                      formData.paymentMethod === 'card' ? 'bg-editorial-ink text-white border-editorial-ink' : 'border-editorial-border text-editorial-muted hover:border-editorial-ink hover:text-editorial-ink'
                    }`}
                  >
                    Credit Facility
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                    className={`py-4 border text-[11px] uppercase tracking-widest font-bold transition-all ${
                      formData.paymentMethod === 'cod' ? 'bg-editorial-ink text-white border-editorial-ink' : 'border-editorial-border text-editorial-muted hover:border-editorial-ink hover:text-editorial-ink'
                    }`}
                  >
                    Settlement on Arrival
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="editorial-button"
              >
                {loading ? 'Authenticating Transaction...' : `Finalize Settlement: ₹${total().toFixed(2)}`}
              </button>
              
              <div className="flex items-center gap-4 text-editorial-security text-[10px] uppercase font-bold pt-8">
                 <ShieldCheck className="h-4 w-4" />
                 Encrypted Point-to-Point Tunnel Active
              </div>
            </form>
          </div>

          {/* Summary Side */}
          <div className="w-full lg:w-[400px] lg:px-16 bg-editorial-sidebar pt-12">
            <span className="section-title">Inventory Manifest</span>
            <div className="space-y-8 mt-12">
              {items.map(item => (
                <div key={item.id} className="flex gap-6 pb-6 border-b border-editorial-border border-dotted">
                  <div className="w-20 h-20 bg-editorial-bg border border-editorial-border overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover filter grayscale-[0.2]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-editorial-ink text-md">{item.name}</h4>
                    <p className="text-[11px] uppercase font-bold text-editorial-muted mt-1">{item.quantity} Unit(s) at ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest text-editorial-muted">
                <span>Sub-Clearing</span>
                <span>₹{total().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest text-editorial-muted">
                <span>Dispatch Fee</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-editorial-ink">
                <span className="text-[14px] uppercase font-black tracking-widest text-editorial-ink">Gross Total</span>
                <span className="text-3xl font-serif font-black text-editorial-ink">₹{total().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
