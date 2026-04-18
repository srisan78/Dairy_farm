import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Milk, Plus, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Full Cream Milk',
    category: 'Milk',
    price: 68,
    unit: '1L',
    image: 'https://images.unsplash.com/photo-1563636619-e910ef2a855f?auto=format&fit=crop&q=80&w=800',
    description: 'Fresh cow milk with zero preservatives. High in protein and vitamins.'
  },
  {
    id: '2',
    name: 'Pure Cow Ghee',
    category: 'Ghee',
    price: 650,
    unit: '500ml',
    image: 'https://images.unsplash.com/photo-1631709497146-a239ef373cf1?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional Bilona method ghee. Pure, aromatic and healthy.'
  },
  {
    id: '3',
    name: 'Fresh Paneer',
    category: 'Cheese',
    price: 120,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    description: 'Soft and fresh malai paneer, made daily from pure milk.'
  },
  {
    id: '4',
    name: 'Organic Curd',
    category: 'Curd',
    price: 45,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&q=80&w=800',
    description: 'Creamy and thick curd with active probiotics.'
  },
  {
    id: '5',
    name: 'Butter Milk',
    category: 'Beverage',
    price: 25,
    unit: '500ml',
    image: 'https://images.unsplash.com/photo-1556276082-9658b100778f?auto=format&fit=crop&q=80&w=800',
    description: 'Classic spiced buttermilk. Perfect for digestion.'
  },
  {
    id: '6',
    name: 'Fresh Butter',
    category: 'Butter',
    price: 85,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=800',
    description: 'Unsalted white butter, straight from the churn.'
  },
  {
    id: '7',
    name: 'Saffron Badam Milk',
    category: 'Beverage',
    price: 60,
    unit: '200ml',
    image: 'https://images.unsplash.com/photo-1590402444527-080164777ef2?auto=format&fit=crop&q=80&w=800',
    description: 'Rich milk infused with pure saffron and almond slivers.'
  },
  {
    id: '8',
    name: 'Artisanal Greek Yogurt',
    category: 'Curd',
    price: 110,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1516102148416-d71649779dfc?auto=format&fit=crop&q=80&w=800',
    description: 'Strained yogurt with an exceptionally thick and creamy texture.'
  }
];

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const addItem = useCartStore((state) => state.addItem);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setAddedIds(prev => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-modern-bg py-32 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div>
            <div className="section-tag mb-4">Inventory Manifest</div>
            <h1 className="text-6xl font-black text-white italic tracking-tighter">Product <span className="text-modern-mint">Registry.</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-modern-surface border border-modern-border rounded-2xl backdrop-blur-xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] uppercase tracking-[0.1em] font-black px-6 py-2.5 rounded-xl transition-all ${
                  selectedCategory === cat 
                  ? 'bg-modern-mint text-modern-bg shadow-[0_0_15px_rgba(0,255,148,0.3)]' 
                  : 'text-modern-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-0 group"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-modern-surface via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-modern-bg/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="text-modern-mint font-mono font-bold">₹{product.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-white truncate group-hover:text-modern-mint transition-colors italic uppercase">{product.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] uppercase font-black tracking-widest text-modern-muted">{product.category}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-modern-muted">{product.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-4 text-[11px] uppercase tracking-[0.2em] font-black transition-all rounded-2xl flex items-center justify-center gap-2 ${
                      addedIds.has(product.id)
                      ? 'bg-modern-mint text-modern-bg'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-modern-mint hover:text-modern-bg hover:border-modern-mint'
                    }`}
                  >
                    {addedIds.has(product.id) ? (
                      <>
                        <Check className="h-4 w-4" /> 
                        Manifested
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Append to Cart
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
