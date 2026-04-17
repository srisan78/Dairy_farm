import { motion } from 'motion/react';
import { Milk, ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="overflow-hidden bg-editorial-bg">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center border-b border-editorial-border overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-20 grayscale brightness-125 transition-transform duration-[10s] hover:scale-105"
            alt="Farm Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-editorial-bg via-transparent to-editorial-bg opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 container relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="section-title">Established 1984 &bull; Farm Origin</div>
              <h1 className="text-7xl lg:text-9xl font-serif font-black text-editorial-ink leading-[0.85] mb-12 tracking-tight">
                Purity <br />
                <span className="italic font-normal text-editorial-accent">Distilled.</span>
              </h1>
              <p className="text-lg text-editorial-muted font-sans max-w-md mb-12 leading-relaxed font-medium">
                VRS Dairy remains committed to the artisanal production of organic dairy. Ethically sourced, scientifically verified, and delivered with surgical precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-8">
                <Link to="/products" className="editorial-button text-center min-w-[200px]">
                  View Inventory
                </Link>
                <Link to="/login" className="text-[11px] uppercase tracking-[0.2em] font-bold py-4 hover:text-editorial-accent transition-all flex items-center gap-4 group">
                  Register Session <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative aspect-[4/5] bg-editorial-sidebar overflow-hidden border border-editorial-border p-8 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&q=80&w=800"
                alt="Artisanal Milk"
                className="w-full h-full object-cover filter grayscale-[0.2] transition-transform duration-[2s] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-12 left-12 flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mix-blend-difference">Registry.01</span>
                <span className="w-8 h-px bg-white mix-blend-difference" />
              </div>
              <div className="absolute bottom-16 -right-12 rotate-90 origin-right">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white mix-blend-difference">VRS SYSTEMS CO.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-editorial-sidebar relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid md:grid-cols-3 divide-x divide-editorial-border -mx-16">
            {[
              { 
                title: 'Organic Lineage', 
                desc: 'Heritage breeds raised on volcanic soil, yielding superior fat content and mineral profiles.',
                id: '01'
              },
              { 
                title: 'Nocturnal Delivery', 
                desc: 'Harvested at dawn, dispatched by midnight. We maintain an unbroken cold chain of 4°C.',
                id: '02'
              },
              { 
                title: 'Verified Safety', 
                desc: 'Real-time biological monitoring. Every batch is cataloged in our secure registry.',
                id: '03'
              }
            ].map((feature) => (
              <div key={feature.id} className="px-16 py-8 hover:bg-editorial-bg transition-colors duration-500">
                <span className="text-4xl font-serif italic text-editorial-accent mb-8 block">{feature.id}</span>
                <h3 className="text-xl font-serif font-bold text-editorial-ink mb-4">{feature.title}</h3>
                <p className="text-[14px] text-editorial-muted leading-relaxed leading-[1.6] font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Visual Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1547448415-e9f5b28e570d?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover filter grayscale brightness-50"
            alt="Heritage Farm"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-editorial-ink/40 mix-blend-multiply" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="section-title text-white border-white/30">The Source</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-white tracking-widest uppercase italic">The Heritage.</h2>
            <p className="text-white/70 max-w-xl mx-auto font-bold uppercase tracking-[0.2em] text-[10px]">Unbroken Tradition &bull; Scientific Excellence &bull; Ethical Custodianship</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
