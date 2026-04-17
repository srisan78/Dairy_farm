import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Package, Clock, MapPin, ChevronRight, Milk, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-96px)] bg-editorial-bg flex flex-col md:flex-row divide-x divide-editorial-border overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 p-12 lg:p-20 overflow-y-auto custom-scrollbar">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
          <span className="section-title">Active Distribution</span>
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="text-4xl font-serif text-editorial-ink uppercase tracking-tight">Order Registry</h2>
            <div className="flex items-center gap-2 text-editorial-security text-[10px] uppercase font-bold tracking-widest">
              <div className="w-1.5 h-1.5 bg-editorial-security rounded-full animate-pulse" />
              Live Connection Secure
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-editorial-border border-t-editorial-ink rounded-full animate-spin" />
            </div>
          ) : orders.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-editorial-border text-[10px] uppercase tracking-widest text-editorial-muted font-bold">
                  <th className="pb-4 pt-4 px-2">ID</th>
                  <th className="pb-4 pt-4 px-2">Date</th>
                  <th className="pb-4 pt-4 px-2">Destination</th>
                  <th className="pb-4 pt-4 px-2">Status</th>
                  <th className="pb-4 pt-4 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial-border">
                {orders.map((order) => (
                  <tr key={order.id} className="group hover:bg-editorial-hover transition-colors cursor-pointer">
                    <td className="py-6 px-2 text-[13px] font-bold text-editorial-ink">#{order.id.slice(-4).toUpperCase()}</td>
                    <td className="py-6 px-2 text-[13px] text-editorial-muted">
                      {new Date(order.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-6 px-2 text-[13px] text-editorial-ink font-medium max-w-[200px] truncate">{order.address}</td>
                    <td className="py-6 px-2">
                       <span className={`text-[9px] px-2 py-0.5 border rounded-[2px] uppercase font-bold tracking-wider ${
                          order.status === 'delivered' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                          order.status === 'paid' ? 'bg-editorial-hover border-editorial-accent text-editorial-accent' :
                          'bg-gray-50 border-gray-200 text-gray-500'
                        }`}>
                          {order.status}
                        </span>
                    </td>
                    <td className="py-6 px-2 text-right font-serif font-bold text-lg">₹{order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-32 text-center border-2 border-dashed border-editorial-border">
              <span className="section-title">Registry Empty</span>
              <Link to="/products" className="text-editorial-accent font-serif italic hover:underline">Initiate first distribution</Link>
            </div>
          )}

          <div className="mt-24 pt-8 border-t border-editorial-border flex justify-between items-center opacity-50">
            <div className="text-[10px] uppercase tracking-widest font-bold">Authorized Access Only &copy; 2024 VRS Dairy Systems</div>
            <button onClick={handleLogout} className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-red-700 transition-colors">Terminate Session</button>
          </div>
        </motion.div>
      </div>

      {/* Sidebar area */}
      <div className="w-full md:w-96 bg-editorial-sidebar p-12 lg:p-16">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
        >
          <span className="section-title">Financial Clearing</span>
          <div className="editorial-card mb-12">
            <span className="text-[10px] uppercase tracking-widest font-bold text-editorial-muted block mb-4">Account Balance</span>
            <div className="text-4xl font-serif font-black text-editorial-ink mb-8">
              ₹{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
            <button className="editorial-button">Request Statement</button>
          </div>

          <span className="section-title">Recent Activity</span>
          <div className="space-y-6">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-baseline pb-4 border-b border-dotted border-editorial-border">
                <div className="text-[13px] text-editorial-ink font-medium">Order #{order.id.slice(-4).toUpperCase()}</div>
                <div className="text-[14px] font-serif font-bold">-₹{order.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <span className="section-title">Security Protocols</span>
            <p className="text-[12px] leading-relaxed text-editorial-muted font-medium">
              Your account is protected with 256-bit encryption. Multi-factor authentication is active. Last registry access detected at {new Date().toLocaleTimeString()}.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
