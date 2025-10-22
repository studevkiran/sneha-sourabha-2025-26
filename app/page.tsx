"use client";

import { ArrowRight, Calendar, MapPin, Sparkles, Award, Users, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* VIBRANT Animated Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-600 via-cyan-500 to-teal-400 opacity-70 animate-pulse"></div>
        <div className="absolute inset-0">
          {/* Floating Colorful Orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full filter blur-3xl opacity-50 animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-400 to-red-500 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "1.5s" }}></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Logos */}
        <header className="text-center mb-8 animate-slide-down">
          <div className="flex items-center justify-center gap-8 mb-6">
            {/* Rotaract 3181 Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logos/rotaract-3181-logo.png" 
                  alt="Rotaract District 3181" 
                  width={120} 
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Event Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="relative bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logos/sneha-sourabha-logo.jpeg" 
                  alt="Sneha Sourabha 2025-26" 
                  width={120} 
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-[2px] rounded-full mb-4 animate-shimmer">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full">
              <p className="text-white font-bold text-lg flex items-center gap-2 animate-glow">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
                Rotary District 3181 Conference
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
              </p>
            </div>
          </div>
        </header>

        {/* Main Hero with VIBRANT Colors */}
        <div className="max-w-6xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-playfair font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4 leading-tight drop-shadow-2xl animate-scale-in">
            Sneha Sourabha
          </h1>
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 mb-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            2025-26
          </h2>
          <p className="text-2xl md:text-3xl text-white font-bold mb-6 drop-shadow-lg animate-slide-up" style={{ animationDelay: "0.3s" }}>
            ✨ A Grand Celebration of Service & Unity ✨
          </p>
          
          {/* Event Details with Vibrant Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-3 bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl border-2 border-white/30 transform hover:scale-105 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-yellow-300 animate-bounce" />
                <span className="font-bold text-white text-lg">30th & 31st Jan, 01st Feb 2026</span>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-3 bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl border-2 border-white/30 transform hover:scale-105 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-yellow-300 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <span className="font-bold text-white text-lg">Silent Shores, Hebbal, Mysore</span>
              </div>
            </div>
          </div>

          {/* VIBRANT CTA Button */}
          <Link 
            href="/register"
            className="group relative inline-flex items-center gap-4 px-12 py-6 text-2xl font-bold text-white overflow-hidden rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-shimmer"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-4">
              <Sparkles className="w-7 h-7" />
              Register Now
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
          
          <p className="mt-6 text-lg text-white/90 font-semibold animate-pulse">
            🎊 Limited Slots Available - Register Today! 🎊
          </p>
        </div>

        {/* VIBRANT Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {/* Card 1 */}
          <div className="group relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300 border-4 border-white">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-3">Easy Registration</h3>
              <p className="text-gray-700 font-medium text-lg">Simple 3-step process to secure your spot at this grand celebration!</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 border-4 border-white">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce" style={{ animationDelay: "0.2s" }}>
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">3 Days of Excellence</h3>
              <p className="text-gray-700 font-medium text-lg">Networking, learning, awards, and unforgettable celebrations!</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300 border-4 border-white">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce" style={{ animationDelay: "0.4s" }}>
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">Premium Venue</h3>
              <p className="text-gray-700 font-medium text-lg">Silent Shores Convention Hall - Where memories are made!</p>
            </div>
          </div>
        </div>

        {/* Registration Categories Teaser */}
        <div className="max-w-4xl mx-auto mt-16 mb-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative bg-white/20 backdrop-blur-lg p-10 rounded-3xl border-2 border-white/40">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                <Users className="w-10 h-10 inline-block mr-3 animate-pulse" />
                Multiple Registration Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="bg-white/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50 transform hover:scale-110 transition-transform">
                  <p className="text-white font-bold">Rotarian</p>
                </div>
                <div className="bg-white/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50 transform hover:scale-110 transition-transform">
                  <p className="text-white font-bold">Ann/Annet</p>
                </div>
                <div className="bg-white/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50 transform hover:scale-110 transition-transform">
                  <p className="text-white font-bold">Guest</p>
                </div>
                <div className="bg-white/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50 transform hover:scale-110 transition-transform">
                  <p className="text-white font-bold">Sponsor</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-3 rounded-xl border-2 border-white transform hover:scale-110 transition-transform animate-pulse">
                  <p className="text-white font-bold">Patron</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-white font-bold text-lg mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              Rotary District 3181 | Service Above Self
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </p>
            <p className="text-white/80 text-sm">
              © 2025 Sneha Sourabha Conference. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}