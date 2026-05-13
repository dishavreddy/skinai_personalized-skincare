import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DashboardSection from './components/DashboardSection';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary font-sans text-text-primary selection:bg-brand-lavender/20">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DashboardSection />
        <BeforeAfter />
        <Testimonials />
        <Pricing />
        
        {/* Final CTA Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-8 tracking-tight">
              Start Your Personalized Skin Journey Today
            </h2>
            <button className="px-10 py-5 bg-text-primary text-white rounded-full font-medium hover:bg-black transition-all hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-lg">
              Scan Your Skin Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
