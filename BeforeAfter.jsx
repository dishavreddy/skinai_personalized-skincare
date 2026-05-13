import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Real Results, Visualized
          </h2>
          <p className="text-text-muted text-lg">
            See the difference a personalized, AI-driven routine can make. Drag the slider to compare.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] md:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onMouseMove={handleDrag}
            onTouchMove={handleDrag}
          >
            {/* After Image (Background) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580870059868-faa65d7e8b94?auto=format&fit=crop&q=80&w=1200')` }}
            >
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold text-text-primary">
                Week 12
              </div>
            </div>

            {/* Before Image (Foreground overlay) */}
            <div 
              className="absolute inset-y-0 left-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1200')`,
                width: `${sliderPosition}%` 
              }}
            >
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold text-text-primary">
                Week 1
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center justify-center z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-1 h-3 rounded-full bg-gray-300" />
                  <div className="w-1 h-3 rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default BeforeAfter;
