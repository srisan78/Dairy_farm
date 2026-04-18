import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { Package, Clock, MapPin, ChevronRight, Milk, LogOut, User, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

export function Dashboard() {
  const { user, signOut } = useAuthStore();
  const { orders: allOrders } = useOrderStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load orders for this specific mock user
    const userOrders = allOrders.filter(o => o.userId === user.uid);
    setOrders(userOrders);
    setLoading(false);
  }, [user, navigate, allOrders]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-modern-bg flex flex-col lg:flex-row pt-24 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-modern-mint/5 blur-[150px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto custom-scrollbar relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <div className="section-tag mb-4">Distribution Portal</div>
              <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">Order <span className="text-modern-mint">Registry.</span></h2>
            </div>
            <div className="flex items-center gap-3 py-2.5 px-5 bg-modern-surface border border-modern-border rounded-xl">
              <div className="w-2.5 h-2.5 bg-modern-mint rounded-full animate-pulse shadow-[0_0_12px_rgba(0,255,148,0.6)]" />
              <span className="text-[11px] uppercase font-black tracking-widest text-white/60">Live Satellite Uplink Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Volume', val: `₹${orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)}`, icon: Package },
              { label: 'Completed', val: orders.filter(o => o.status === 'delivered').length, icon: Check },
              { label: 'Pending Dispatch', val: orders.filter(o => o.status !== 'delivered').length, icon: Clock },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="modern-card group !p-8 border border-white/5 hover:border-modern-mint/30"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-modern-mint group-hover:bg-modern-mint/20 transition-all">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Metric.0{i+1}</span>
                </div>
                <div className="text-4xl font-black text-white italic tracking-tighter mb-1">{stat.val}</div>
                <div className="text-[10px] text-modern-muted uppercase font-black tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="modern-card !p-0 overflow-hidden border border-white/5">
            <div className="bg-white/5 border-b border-white/10 px-8 py-6 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-widest text-white/60">Registry Entries</h3>
              <div className="h-1.5 w-12 bg-modern-border rounded-full" />
            </div>
            
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center py-32">
                  <div className="w-10 h-10 border-4 border-modern-border border-t-modern-mint rounded-full animate-spin" />
                </div>
              ) : orders.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">
                      <th className="px-8 py-6">Identity Hash</th>
                      <th className="px-8 py-6">Timestamp</th>
                      <th className="px-8 py-6">Coordinate</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 font-mono font-bold text-modern-mint text-xs">#{order.id.slice(-8).toUpperCase()}</td>
                        <td className="px-8 py-6 text-sm text-modern-muted font-bold tracking-tight">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </td>
                        <td className="px-8 py-6 text-sm text-white/70 font-bold max-w-[200px] truncate">{order.address}</td>
                        <td className="px-8 py-6">
                           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${
                              order.status === 'delivered' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                              order.status === 'paid' ? 'bg-modern-mint/10 border-modern-mint/30 text-modern-mint' :
                              'bg-white/5 border-white/10 text-white/40'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                order.status === 'delivered' ? 'bg-blue-400' :
                                order.status === 'paid' ? 'bg-modern-mint' :
                                'bg-white/20'
                              } animate-pulse`} />
                              {order.status}
                            </div>
                        </td>
                        <td className="px-8 py-6 text-right font-black text-white italic tracking-tighter">₹{order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-40 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Milk className="h-8 w-8 text-white/10" />
                  </div>
                  <h3 className="text-2xl font-black text-white/20 italic mb-8">NO DISPATCH HISTORY.</h3>
                  <Link to="/products" className="modern-button !inline-flex">Initiate First Distribution <ArrowRight className="h-5 w-5" /></Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar area */}
      <div className="w-full lg:w-[400px] p-6 md:p-12 lg:p-16 relative z-10 border-l lg:border-l border-white/5 bg-modern-surface/30 backdrop-blur-3xl">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
        >
          <div className="section-tag mb-8 bg-modern-accent/10 text-modern-accent border-modern-accent/20">System Intelligence</div>
          
          <div className="modern-card mb-8 border-modern-accent/20">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Profile Analysis</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-modern-mint to-modern-accent flex items-center justify-center">
                <User className="h-4 w-4 text-modern-bg" />
              </div>
            </div>
            <h4 className="text-xl font-black text-white italic mb-1 truncate">{user.displayName || 'Anonymous'}</h4>
            <p className="text-[10px] font-mono text-modern-mint opacity-60 truncate mb-6">{user.email}</p>
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-black tracking-widest rounded-2xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Terminate Session
            </button>
          </div>

          <div className="modern-card border-white/5 !bg-transparent">
            <h5 className="text-[10px] uppercase font-black text-white tracking-[0.2em] mb-6">System Logs</h5>
            <div className="space-y-4">
              {[
                { label: 'Neural Security', val: 'Active', color: 'text-modern-mint' },
                { label: 'Cold-Chain Sync', val: 'Synchronized', color: 'text-modern-mint' },
                { label: 'Identity Protocol', val: 'Verifed', color: 'text-white/40' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{log.label}</span>
                  <span className={`text-[9px] font-mono font-bold ${log.color}`}>{log.val}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[9px] text-white/20 font-mono leading-relaxed">
              Last registry access detected at <br /> {new Date().toLocaleString()} <br /> Request ID: {Math.random().toString(36).slice(2, 10).toUpperCase()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
