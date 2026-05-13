import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, CheckCircle2, Activity } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-lavender/10 blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-pink/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-brand-blue/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-gray-200 text-sm font-medium text-text-secondary mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-lavender animate-pulse" />
              GlowLens AI Engine 2.0 Now Live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1]">
              AI Skin Analysis <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lavender via-brand-pink to-brand-blue">
                That Feels Personal.
              </span>
            </h1>
            
            <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Upload a selfie and receive instant personalized skincare insights powered by AI. Understand your unique skin profile in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="flex items-center gap-2 px-8 py-4 bg-text-primary text-white rounded-full font-medium hover:bg-black transition-all hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                Try Free Scan <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-text-primary border border-gray-200 rounded-full font-medium hover:bg-white transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Play size={12} className="ml-0.5 text-text-secondary" />
                </div>
                Watch Demo
              </button>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-brand-lavender" /> No app required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-brand-lavender" /> 100% private
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Floating Dashboard */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-1000 z-10">
          <motion.div
            initial={{ opacity: 0, rotateY: 15, rotateX: 10, y: 40 }}
            animate={{ opacity: 1, rotateY: -5, rotateX: 5, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative transform-gpu preserve-3d"
          >
            {/* Main App Card */}
            <div className="glass-card rounded-[32px] p-2 pb-6 w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white/80 relative z-20">
              <div className="bg-bg-secondary rounded-[24px] overflow-hidden relative">
                {/* Simulated Face Scan Area */}
                <div className="h-64 bg-gradient-to-b from-blue-50 to-pink-50 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 mix-blend-multiply" />
                  
                  {/* Scan Line Animation */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                    className="absolute left-0 right-0 h-0.5 bg-brand-lavender shadow-[0_0_15px_rgba(139,92,246,0.8)] z-10"
                  />
                  
                  {/* Focus Rectangles */}
                  <div className="absolute border border-brand-pink/60 rounded-xl w-16 h-16 top-1/4 left-1/4 backdrop-blur-[2px]" />
                  <div className="absolute border border-brand-blue/60 rounded-xl w-12 h-12 bottom-1/3 right-1/4 backdrop-blur-[2px]" />
                  
                  <div className="relative z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                    <Sparkles size={16} className="text-brand-lavender" />
                    <span className="text-sm font-medium text-text-primary">Analyzing...</span>
                  </div>
                </div>
                
                {/* Mock UI bottom section */}
                <div className="p-6 bg-white">
                  <div className="h-4 w-1/3 bg-gray-100 rounded-full mb-4" />
                  <div className="h-3 w-full bg-gray-50 rounded-full mb-2" />
                  <div className="h-3 w-2/3 bg-gray-50 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Metric 1 */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-16 glass-card p-4 rounded-2xl flex items-center gap-4 z-30 shadow-lg border border-white"
            >
              <div className="w-10 h-10 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">Glow Score</p>
                <p className="text-lg font-bold text-text-primary">94/100</p>
              </div>
            </motion.div>

            {/* Floating Metric 2 */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-10 bottom-24 glass-card p-4 rounded-2xl flex items-center gap-4 z-30 shadow-lg border border-white"
            >
               <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">Hydration</p>
                <p className="text-lg font-bold text-text-primary">Optimal</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
