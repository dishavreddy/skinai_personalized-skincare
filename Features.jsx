import React from 'react';
import { motion } from 'framer-motion';
import { ScanFace, Sparkles, Droplets, LineChart, ShieldCheck, Sun } from 'lucide-react';

const features = [
  {
    icon: ScanFace,
    title: 'AI Skin Detection',
    description: 'Pinpoint acne, fine lines, and pigmentation with clinical precision.',
    color: 'text-brand-lavender',
    bg: 'bg-brand-lavender/10'
  },
  {
    icon: Sparkles,
    title: 'Personalized Routine',
    description: 'Get a step-by-step regimen tailored exactly to your skin profile.',
    color: 'text-brand-pink',
    bg: 'bg-brand-pink/10'
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Watch your skin transform with detailed visual analytics.',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10'
  },
  {
    icon: Droplets,
    title: 'Hydration Analysis',
    description: 'Monitor moisture levels and learn how to maintain a healthy barrier.',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10'
  },
  {
    icon: Sun,
    title: 'Glow Score',
    description: 'Our proprietary metric to measure your overall skin radiance.',
    color: 'text-brand-pink',
    bg: 'bg-brand-pink/10'
  },
  {
    icon: ShieldCheck,
    title: 'Smart Recommendations',
    description: 'Product suggestions based on ingredients that actually work for you.',
    color: 'text-brand-lavender',
    bg: 'bg-brand-lavender/10'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-semibold tracking-wider text-brand-lavender uppercase mb-3">
              Intelligent Analysis
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Everything you need to understand your skin.
            </h3>
            <p className="text-text-muted text-lg">
              GlowLens uses advanced machine learning to analyze your face and provide insights previously only available at a dermatologist.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-8 transition-all duration-300 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={feature.color} size={24} />
                </div>
                <h4 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h4>
                <p className="text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
