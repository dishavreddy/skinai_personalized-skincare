import React from 'react';
import { Sparkles, MessageCircle, Camera, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-lavender to-brand-pink flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <span className="font-semibold text-lg tracking-tight text-text-primary">GlowLens</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-brand-lavender transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-brand-pink transition-colors">
              <Camera size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-brand-blue transition-colors">
              <Globe size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 text-sm text-text-muted gap-4">
          <p>© {new Date().getFullYear()} GlowLens Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Contact</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
