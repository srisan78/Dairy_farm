import { motion } from 'motion/react';
import { Milk, ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="bg-modern-bg min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-20">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 modern-card bg-gradient-to-br from-modern-surface to-modern-bg min-h-[500px] flex flex-col justify-center relative group"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-modern-mint/5 blur-[120px] -z-10 group-hover:bg-modern-mint/10 transition-all duration-700" />
            
            <div className="section-tag mb-8">System Status: Operational</div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white italic mb-8">
              ORGANIC <br />
              <span className="text-modern-mint not-italic">ENGINEERING.</span>
            </h1>
            <p className="text-modern-muted max-w-lg text-lg mb-10 leading-relaxed">
              VRS Dairy revolutionizes organic production through computational precision and ethical heritage. Pure nutrients, delivered at the speed of light.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="modern-button">
                Exploration Inventory <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                Security Gateway
              </Link>
            </div>
          </motion.div>

          {/* Side Bento Card 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 modern-card flex flex-col justify-between group"
          >
            <div className="p-4 bg-modern-mint/10 w-fit rounded-2xl mb-6">
              <ShieldCheck className="text-modern-mint h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2 italic">BIO-SECURITY</h3>
              <p className="text-modern-muted text-sm leading-relaxed">Every batch is cataloged with 40+ biological indicators in our secure registry.</p>
            </div>
            <div className="mt-8 pt-8 border-t border-modern-border flex justify-between items-center">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Module 01</span>
              <div className="h-1 w-12 bg-modern-mint/30 rounded-full" />
            </div>
          </motion.div>

          {/* Side Bento Card 2 (Image) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 modern-card p-0 group overflow-hidden h-[300px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              alt="The Source"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-modern-surface to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6">
              <span className="section-tag bg-white/10 border-white/20 text-white">Registry Loc: 42.01N</span>
            </div>
          </motion.div>

          {/* Bottom Bento Card (Delivery) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-8 modern-card flex items-center gap-10 group"
          >
            <div className="hidden sm:flex h-32 w-32 bg-modern-mint/5 border border-modern-mint/10 rounded-3xl items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-modern-mint/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <Truck className="h-12 w-12 text-modern-mint relative z-10" />
            </div>
            <div className="flex-1">
               <h3 className="text-2xl font-black text-white italic mb-2">DYNAMIC LOGISTICS</h3>
               <p className="text-modern-muted text-sm leading-relaxed max-w-md">Our neural dispatch network ensures delivery within 12 hours of extraction, maintaining an unbroken 4°C chain.</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-modern-mint/20">99.8%</span>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Accuracy</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Metric Section */}
      <section className="bg-modern-surface py-24 relative overflow-hidden border-y border-modern-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-12">
            <div>
              <h2 className="text-5xl font-black text-white italic mb-4">THE QUALITY <span className="text-modern-mint">INDEX.</span></h2>
              <p className="text-modern-muted max-w-sm">Quantifiable excellence through every extraction cycle.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 w-full md:w-auto">
              {[
                { label: 'Protien Score', val: '9.2' },
                { label: 'Mineral Density', val: '98%' },
                { label: 'Farm Origin', val: '100%' },
                { label: 'Bio-Safety', val: 'Grade A' },
              ].map((m, i) => (
                <div key={i}>
                  <p className="text-4xl font-black text-white font-mono mb-1">{m.val}</p>
                  <p className="text-[10px] text-modern-mint font-black uppercase tracking-[0.2em]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Animated Background Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none">
          <span className="text-[200px] font-black italic whitespace-nowrap leading-none select-none">VRS SYSTEMS CO. ARTISAN DAIRY</span>
        </div>
      </section>
    </div>
  );
}
