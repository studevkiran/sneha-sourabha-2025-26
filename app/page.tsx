"use client";

import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* LUXURY Black Background with Subtle Shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Subtle Metallic Shine Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-800 via-transparent to-transparent rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-800 via-transparent to-transparent rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        </div>
        {/* Luxury Gold Accent Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-yellow-900/20 via-yellow-700/10 to-yellow-900/20 rounded-full filter blur-3xl animate-pulse"></div>
      </div>


      {/* LUXURY Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl">
        
        {/* Header with Logos - Luxury Style */}
        <header className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8">
            {/* Rotaract 3181 Logo - Classy Frame (Rectangle) */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-yellow-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-1 rounded-2xl">
                <div className="bg-white p-3 sm:p-4 rounded-xl transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/logos/rotaract-3181-logo.png" 
                    alt="Rotaract District 3181" 
                    width={120} 
                    height={80}
                    className="object-contain w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-24"
                  />
                </div>
              </div>
            </div>
            
            {/* Event Logo - Classy Frame (Rectangle) */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-yellow-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-1 rounded-2xl">
                <div className="bg-white p-3 sm:p-4 rounded-xl transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/logos/sneha-sourabha-logo.jpeg" 
                    alt="Sneha Sourabha 2025-26" 
                    width={120} 
                    height={80}
                    className="object-contain w-24 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-24"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtitle Badge - Minimal & Elegant */}
          <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-full border border-gray-700 mb-4 sm:mb-6 animate-slide-down">
            <p className="text-gray-300 font-medium text-xs sm:text-sm lg:text-base tracking-wider uppercase">
              Rotary District Conference
            </p>
          </div>
        </header>

        {/* Main Hero - Optimized Title Size */}
        <div className="max-w-5xl mx-auto text-center mb-10 sm:mb-16 animate-scale-in">
          {/* Title - Proper Sizing for All Devices */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-3 sm:mb-4 leading-tight tracking-tight">
            Sneha Sourabha
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6 sm:mb-10 tracking-wide">
            2025-26
          </h2>
          
          {/* Event Details - Clean & Minimal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="group relative w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center sm:justify-start gap-3 bg-gradient-to-br from-gray-900 to-black px-5 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-800 transform hover:scale-105 transition-transform duration-300">
                <Calendar className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="font-medium text-gray-200 text-sm sm:text-base">30-31 Jan, 01 Feb 2026</span>
              </div>
            </div>
            
            <div className="group relative w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <a 
                href="https://maps.app.goo.gl/y8xdiWCaKbsANWtc8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative flex items-center justify-center sm:justify-start gap-3 bg-gradient-to-br from-gray-900 to-black px-5 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-800 transform hover:scale-105 transition-transform duration-300"
              >
                <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="font-medium text-gray-200 text-sm sm:text-base">Silent Shores, Mysore</span>
              </a>
            </div>
          </div>

          {/* CTA Button - Luxury Gold */}
          <Link 
            href="/register"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg lg:text-xl font-semibold text-black overflow-hidden rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 animate-shimmer"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-3 z-10">
              Register Now
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Footer - Minimalist */}
        <footer className="text-center mt-12 sm:mt-20 pb-6 sm:pb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl px-6 py-4 sm:py-5 max-w-2xl mx-auto border border-gray-800">
            <p className="text-gray-400 font-medium text-xs sm:text-sm mb-2">
              Rotary District 3181 | Service Above Self
            </p>
            <p className="text-gray-600 text-xs">
              © 2025 Sneha Sourabha Conference
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}