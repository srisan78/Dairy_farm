import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Milk, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Orders', path: '/dashboard' },
  ];

  return (
    <nav className="bg-editorial-bg border-b border-editorial-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex justify-between h-24 items-baseline pt-8 pb-4">
          <Link to="/" className="flex items-center gap-4 group">
            <span className="font-serif font-bold text-3xl tracking-tight text-editorial-ink uppercase">VRS <span className="text-editorial-accent">Dairy</span></span>
          </Link>
          
          <div className="hidden md:flex space-x-12 items-baseline">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-editorial-muted text-[11px] uppercase tracking-[0.1em] font-semibold hover:text-editorial-ink transition-colors relative group"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/cart" className="relative p-1 text-editorial-ink hover:text-editorial-accent transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-editorial-accent text-white text-[9px] font-bold rounded-[2px] px-1.5 py-0.5"
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-6 ml-4 border-l pl-8 border-editorial-border">
                <Link to="/dashboard" className="p-1 text-editorial-ink hover:text-editorial-accent transition-colors">
                   <User className="h-5 w-5" />
                </Link>
                <div className="flex items-center gap-2 text-editorial-security text-[10px] uppercase font-bold tracking-widest hidden lg:flex">
                  <div className="w-1.5 h-1.5 bg-editorial-security rounded-full" />
                  ID #{user.uid.slice(0, 4)}
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-editorial-muted hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[11px] uppercase tracking-[0.2em] font-bold text-editorial-ink hover:text-editorial-accent transition-colors">
                Registry
              </Link>
            )}

            <button 
              className="md:hidden p-2 text-editorial-ink"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-emerald-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-emerald-800 font-medium hover:bg-emerald-50 rounded-xl"
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-emerald-600 font-bold"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
