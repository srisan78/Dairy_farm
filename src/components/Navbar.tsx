import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Milk, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { user, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/products' },
    { name: 'My Orders', path: '/dashboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-modern-glass backdrop-blur-xl border-b border-modern-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-modern-mint rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(0,255,148,0.4)]">
              <Milk className="h-6 w-6 text-modern-bg" />
            </div>
            <span className="font-sans font-extrabold text-2xl tracking-tighter text-white uppercase italic">VRS <span className="text-modern-mint not-italic">DAIRY</span></span>
          </Link>
          
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-white/60 text-[11px] uppercase tracking-[0.2em] font-bold hover:text-modern-mint transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-modern-mint transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative p-2.5 bg-white/5 hover:bg-modern-mint/20 border border-white/10 rounded-xl text-white transition-all duration-300 group">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-modern-mint text-modern-bg text-[10px] font-black rounded-lg px-2 py-0.5 shadow-[0_0_10px_rgba(0,255,148,0.5)] animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l border-white/10 pl-6 h-10">
                <Link to="/dashboard" className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all">
                   <User className="h-5 w-5" />
                </Link>
                <div className="hidden lg:flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none mb-1">Authenticated</span>
                  <span className="text-[11px] text-modern-mint font-mono leading-none">#{user.uid.slice(0, 4)}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-500 transition-all"
                  title="Disconnect"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex modern-button !py-2.5 !px-6 !text-[11px] uppercase !rounded-xl">
                Access Gateway
              </Link>
            )}

            <button 
              className="md:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-white h-10 w-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ originY: 0 }}
            className="md:hidden bg-modern-surface border-b border-modern-border overflow-hidden mt-4"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl text-white font-bold group"
                >
                  {link.name}
                  <Milk className="h-5 w-5 text-modern-mint opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="modern-button !w-full"
                >
                  Enter Gateway
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
