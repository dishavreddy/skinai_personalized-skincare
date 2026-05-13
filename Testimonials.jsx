import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "College Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    text: "GlowLens completely changed how I look at skincare. I used to buy random viral products, but now I only buy what the AI says matches my skin profile. My acne is gone.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Young Professional",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    text: "The hydration tracking is next level. It's like having a dermatologist in your pocket. The UI is incredibly clean and easy to understand.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Skincare Enthusiast",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    text: "I've tried every app out there. GlowLens is the only one that feels premium, doesn't try to sell me junk, and actually tracks my skin's progress accurately.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Loved by Skincare Enthusiasts
          </h2>
          <p className="text-text-muted text-lg">
            Join thousands of users who have transformed their skin health with GlowLens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-8 rounded-3xl relative flex flex-col group"
            >
              {/* Subtle top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-lavender to-brand-pink opacity-0 group-hover:opacity-100 rounded-t-3xl transition-opacity duration-300" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-pink text-brand-pink" />
                ))}
              </div>
              
              <p className="text-text-secondary leading-relaxed mb-8 flex-1 italic">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-semibold text-text-primary">{t.name}</h4>
                  <p className="text-sm text-text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
