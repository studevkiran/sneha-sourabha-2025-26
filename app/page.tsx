"use client";

import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rotary-blue-dark via-rotary-blue to-rotary-blue-light">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-rotary-gold rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rotary-gold-light rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-slide-down">
          <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-4">
            <p className="text-rotary-gold font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Rotary District 3181
            </p>
          </div>
        </header>

        {/* Main Hero */}
        <div className="max-w-5xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 leading-tight">
            Sneha Sourabha
            <span className="block text-rotary-gold mt-2">2025-26</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            District Conference Celebration
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/80 mb-12">
            <div className="flex items-center gap-2 glass-effect px-6 py-3 rounded-full">
              <Calendar className="w-5 h-5 text-rotary-gold" />
              <span className="font-medium">30th & 31st Jan, 01st Feb 2026</span>
            </div>
            <div className="flex items-center gap-2 glass-effect px-6 py-3 rounded-full">
              <MapPin className="w-5 h-5 text-rotary-gold" />
              <span className="font-medium">Silent Shores, Hebbal, Mysore</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            href="/register"
            className="inline-flex items-center gap-3 premium-button text-lg animate-glow"
          >
            Register Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Registration Types Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20">
          <div className="celebration-card animate-slide-up text-center" style={{ animationDelay: "0.1s" }}>
            <div className="w-16 h-16 bg-rotary-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-rotary-blue mb-2">Easy Registration</h3>
            <p className="text-gray-600">Simple 3-step process to secure your spot</p>
          </div>

          <div className="celebration-card animate-slide-up text-center" style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 bg-rotary-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-rotary-blue mb-2">3 Days of Excellence</h3>
            <p className="text-gray-600">Networking, learning, and celebration</p>
          </div>

          <div className="celebration-card animate-slide-up text-center" style={{ animationDelay: "0.3s" }}>
            <div className="w-16 h-16 bg-rotary-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-rotary-blue mb-2">Premium Venue</h3>
            <p className="text-gray-600">Silent Shores Convention Hall</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 text-white/60 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm">
            Rotary District 3181 | Service Above Self
          </p>
          <p className="text-xs mt-2">
            © 2025 Sneha Sourabha Conference. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}