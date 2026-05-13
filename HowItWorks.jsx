import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Upload Selfie",
    description: "Take a clear photo of your face in natural light. No makeup, no filters.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our engine scans 100+ facial points to detect underlying skin conditions.",
  },
  {
    number: "03",
    title: "Get Recommendations",
    description: "Receive a personalized, dermatologist-grade routine and product matches.",
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Clinical Insights in 3 Steps
          </h2>
          <p className="text-text-muted text-lg">
            A seamless experience designed to give you professional-grade analysis without leaving your home.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6 relative z-10"
                >
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-lavender to-brand-pink">
                    {step.number}
                  </span>
                  
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-brand-lavender/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                
                <h4 className="text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h4>
                <p className="text-text-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
