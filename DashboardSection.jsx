import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const DashboardSection = () => {
  return (
    <section id="results" className="py-24 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Mock Dashboard */}
          <div className="flex-1 w-full relative perspective-1000">
             <motion.div
              initial={{ opacity: 0, rotateY: -10, x: -30 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="glass-card rounded-[32px] p-6 shadow-xl bg-white/60 backdrop-blur-xl border border-white/80"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h4 className="text-xl font-bold text-text-primary">Analysis Results</h4>
                  <p className="text-sm text-text-muted">Scanned 2 mins ago</p>
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium flex items-center gap-1.5">
                  <ShieldCheck size={14} /> High Confidence
                </div>
              </div>

              {/* Grid of Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Overall Score", value: "88", color: "text-brand-lavender", icon: TrendingUp },
                  { label: "Hydration", value: "64%", color: "text-brand-blue", icon: Activity },
                  { label: "Texture", value: "Smooth", color: "text-brand-pink", icon: Zap },
                  { label: "Redness", value: "Low", color: "text-green-500", icon: ShieldCheck },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white shadow-sm border border-gray-50 flex flex-col gap-2 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-muted">{stat.label}</span>
                      <stat.icon size={16} className={stat.color} />
                    </div>
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Progress Chart Mock */}
              <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-text-primary">Acne Improvement</span>
                  <span className="text-sm text-brand-lavender font-medium">+12% this week</span>
                </div>
                <div className="h-24 flex items-end gap-2">
                  {[40, 55, 45, 60, 75, 85, 90].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-brand-lavender/40 to-brand-lavender rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

            </motion.div>
            
            {/* Decorative blurs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Side: Copy */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold tracking-wider text-brand-lavender uppercase mb-3">
              Your Personal Dashboard
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-tight">
              Actionable insights, <br/> beautiful analytics.
            </h3>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Dive deep into your skin's unique metrics. GlowLens tracks your progress over time, showing you exactly which products are working and what needs adjusting in your routine.
            </p>
            
            <ul className="space-y-4">
              {[
                "Track 8 different skin health metrics daily",
                "Understand product ingredient compatibility",
                "Visualize your progress with beautiful charts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary">
                  <div className="w-6 h-6 rounded-full bg-brand-lavender/10 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-brand-lavender" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
