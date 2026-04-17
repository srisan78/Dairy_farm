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
    <div className="min-h-screen bg-editorial-bg py-24 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-12 mb-24 border-b border-editorial-border pb-12">
          <div>
            <span className="section-title">Catalogue Raisonné</span>
            <h1 className="text-5xl font-serif font-black text-editorial-ink tracking-tight uppercase">Product Registry</h1>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 transition-all ${
                  selectedCategory === cat 
                  ? 'text-editorial-accent bg-editorial-hover' 
                  : 'text-editorial-muted hover:text-editorial-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden bg-editorial-sidebar mb-6 border border-editorial-border">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif font-bold text-lg text-editorial-ink truncate">{product.name}</h3>
                    <p className="font-serif font-bold text-lg text-editorial-ink">₹{product.price}</p>
                  </div>
                  
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-editorial-muted font-bold">
                    <span>{product.category}</span>
                    <span>{product.unit}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-4 text-[11px] uppercase tracking-[0.1em] font-bold transition-all border ${
                      addedIds.has(product.id)
                      ? 'bg-editorial-hover border-editorial-accent text-editorial-accent'
                      : 'bg-editorial-ink border-editorial-ink text-white hover:bg-editorial-accent'
                    }`}
                  >
                    {addedIds.has(product.id) ? (
                      <span className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Finalized</span>
                    ) : (
                      'Append to Cart'
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
