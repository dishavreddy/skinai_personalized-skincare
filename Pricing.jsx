import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-lavender/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-muted text-lg">
            Invest in your skin health. Start for free, upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-2">Basic Scan</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-text-primary">$0</span>
              <span className="text-text-muted">/mo</span>
            </div>
            <p className="text-sm text-text-muted mb-8">Perfect for getting to know your skin.</p>
            
            <ul className="space-y-4 mb-8">
              {['1 AI Scan per month', 'Basic Skin Score', 'Generic Product Recs'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-gray-300" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3 rounded-full border border-gray-200 text-text-primary font-medium hover:bg-gray-50 transition-colors">
              Get Started
            </button>
          </motion.div>

          {/* Pro Tier (Highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl border-2 border-brand-lavender bg-white shadow-xl relative transform md:-translate-y-4"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lavender text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              Most Popular
            </div>
            
            <h3 className="text-xl font-semibold text-text-primary mb-2">Glow Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-text-primary">$12</span>
              <span className="text-text-muted">/mo</span>
            </div>
            <p className="text-sm text-text-muted mb-8">For those serious about their skincare routine.</p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Unlimited AI Scans', 
                'Detailed Hydration & Acne Tracking', 
                'Personalized Routine Builder',
                'Before/After Timeline',
                'Ingredient Compatibility Checker'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                  <CheckCircle2 size={16} className="text-brand-lavender" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3 rounded-full bg-text-primary text-white font-medium hover:bg-black transition-colors shadow-md">
              Start Free Trial
            </button>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-2">Premium AI+</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-text-primary">$29</span>
              <span className="text-text-muted">/mo</span>
            </div>
            <p className="text-sm text-text-muted mb-8">Dermatologist-grade insights at home.</p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Everything in Pro', 
                '1-on-1 Dermatologist Review (Monthly)', 
                'Early access to new features',
                'Priority Support'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-brand-pink" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3 rounded-full border border-gray-200 text-text-primary font-medium hover:bg-gray-50 transition-colors">
              Upgrade to Premium
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
