"use client";

import { ArrowRight, Calendar, MapPin, User, Users, HeartHandshake, Sparkles, Shield, HandCoins, Award, Gem, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type RegType =
  | "rotarian"
  | "rotarian_spouse"
  | "ann"
  | "annet"
  | "guest"
  | "rotaractor"
  | "silver_donor"
  | "silver_sponsor"
  | "gold_sponsor"
  | "platinum_sponsor"
  | "patron_sponsor";

type RegOption = { key: RegType; label: string; amount: number; benefits: string };

const TYPES: RegOption[] = [
  { key: "rotarian", label: "Rotarian", amount: 4500, benefits: "Admission, Food & 1 Memento" },
  { key: "rotarian_spouse", label: "Rotarian with Spouse", amount: 7500, benefits: "Admission with spouse + 2 children below 12 years, Food & 1 Memento" },
  { key: "ann", label: "Ann", amount: 3500, benefits: "Admission & Food" },
  { key: "annet", label: "Annet", amount: 2000, benefits: "Admission & Food" },
  { key: "guest", label: "Guest", amount: 4500, benefits: "Admission, Food & 1 Memento" },
  { key: "rotaractor", label: "Rotaractor", amount: 25000, benefits: "Admission & Food" },
  { key: "silver_donor", label: "Silver Donor", amount: 20000, benefits: "Admission with spouse + 2 children below 12 years, Food & 2 Mementos" },
  { key: "silver_sponsor", label: "Silver Sponsor", amount: 25000, benefits: "Admission with spouse + 2 children below 12 years, Food & 1 Memento, Double Room at venue (no extra beds)" },
  { key: "gold_sponsor", label: "Gold Sponsor", amount: 50000, benefits: "Admission with spouse + 2 children below 12 years, Food & special Memento, Double Room at venue (no extra beds)" },
  { key: "platinum_sponsor", label: "Platinum Sponsor", amount: 75000, benefits: "Admission with spouse + 2 children below 12 years, Food & special Memento, Premium Room at venue (no extra beds)" },
  { key: "patron_sponsor", label: "Patron Sponsor", amount: 100000, benefits: "Admission with spouse + 2 children below 12 years, Food & special Memento, Suite Room at venue (no extra beds)" },
];

const getIcon = (key: RegType) => {
  const iconProps = { className: "w-5 h-5 text-amber-300" };
  switch (key) {
    case 'rotarian': return <User {...iconProps} />;
    case 'rotarian_spouse': return <HeartHandshake {...iconProps} />;
    case 'ann': return <Users {...iconProps} />;
    case 'annet': return <Sparkles {...iconProps} />;
    case 'guest': return <Shield {...iconProps} />;
    case 'rotaractor': return <Users {...iconProps} />;
    case 'silver_donor': return <HandCoins {...iconProps} />;
    case 'silver_sponsor': return <Award {...iconProps} />;
    case 'gold_sponsor': return <Gem {...iconProps} />;
    case 'platinum_sponsor': return <Crown {...iconProps} />;
    case 'patron_sponsor': return <Crown {...iconProps} />;
  }
};

export default function Home() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<RegType | null>(null);
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const [shake, setShake] = useState(false);
  const inr = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);
  const selectedOption = useMemo(() => TYPES.find(t => t.key === selectedType) || null, [selectedType]);

  const handleRegisterClick = () => {
    if (!showTypeSelection) {
      // First click: shake animation + show type selection
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setShowTypeSelection(true);
      }, 600);
    } else if (!selectedType) {
      // Clicked Register but no type selected: shake again as warning
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } else {
      // Type selected: navigate to details
      router.push(`/register/details?type=${selectedType}`);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <style jsx global>{`
        @keyframes earthquake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-8px, 2px) rotate(-1deg); }
          20% { transform: translate(8px, -2px) rotate(1deg); }
          30% { transform: translate(-8px, -3px) rotate(-1deg); }
          40% { transform: translate(8px, 3px) rotate(1deg); }
          50% { transform: translate(-6px, -2px) rotate(-0.5deg); }
          60% { transform: translate(6px, 2px) rotate(0.5deg); }
          70% { transform: translate(-4px, -1px) rotate(-0.5deg); }
          80% { transform: translate(4px, 1px) rotate(0.5deg); }
          90% { transform: translate(-2px, -1px) rotate(0deg); }
        }
        .earthquake {
          animation: earthquake 0.6s ease-in-out;
        }
      `}</style>
      {/* Backgrounds per theme */}
      {/* Vibrant background (amber/gold) */}
      <div className="absolute inset-0 bg-vibrant">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800/90 to-orange-900 animate-gradient-x"></div>
        <div className="pointer-events-none absolute -top-20 -right-10 w-[720px] h-[720px] bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-32 -left-10 w-[680px] h-[680px] bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-orange-400/20 rounded-full blur-[90px]"></div>
      </div>
      {/* Luxury dark background */}
      <div className="absolute inset-0 bg-luxury">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.08), transparent 70%)' }}></div>
        <div className="pointer-events-none absolute -bottom-24 -left-10 w-[520px] h-[520px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(closest-side, rgba(253,224,71,0.08), transparent 70%)' }}></div>
        <div className="luxury-light absolute inset-0 pointer-events-none"></div>
      </div>


      {/* LUXURY Content Container - Optimized Padding */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 md:py-12 lg:py-16 xl:py-20 max-w-7xl">
        
        {/* Header with Logos - Responsive Luxury Style */}
  <header className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-5 sm:mb-7 md:mb-8">
            {/* Rotaract 3181 Logo - Premium Frame */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-[3px] sm:p-1 rounded-2xl ring-1 ring-white/15 group-hover:ring-white/30 transition-all duration-300">
                <div className="bg-white p-2 sm:p-3 md:p-4 rounded-xl shadow-lg shadow-black/10 transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/logos/rotaract-3181-logo.png" 
                    alt="Rotaract District 3181" 
                    width={140} 
                    height={90}
                    className="object-contain w-24 h-16 sm:w-32 sm:h-20 md:w-36 md:h-24 lg:w-40 lg:h-28"
                  />
                </div>
              </div>
            </div>

            {/* Event Logo - Premium Frame */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-[3px] sm:p-1 rounded-2xl ring-1 ring-white/15 group-hover:ring-white/30 transition-all duration-300">
                <div className="bg-white p-2 sm:p-3 md:p-4 rounded-xl shadow-lg shadow-black/10 transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/logos/sneha-sourabha-logo.jpeg" 
                    alt="Sneha Sourabha 2025-26" 
                    width={140} 
                    height={90}
                    className="object-contain w-24 h-16 sm:w-32 sm:h-20 md:w-36 md:h-24 lg:w-40 lg:h-28"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtitle Badge - Responsive & Elegant */}
          <div className="inline-block bg-white/10 px-4 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-white/15 mb-2 sm:mb-3 md:mb-4 lg:mb-5 animate-slide-down">
            <p className="text-white/90 font-medium text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider uppercase">
              Rotary District Conference 2025-26
            </p>
          </div>
        </header>

        {/* Main Hero - Premium Centered Design */}
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 animate-scale-in">
          {/* Main Title - Vibrant Gradient Text */}
          <h1 className="relative mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
            <span className="title-gradient relative block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-extrabold leading-tight drop-shadow-[0_6px_30px_rgba(255,170,255,0.15)] animate-gradient-x" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.12)' }}>
              Sneha Sourabha
            </span>
          </h1>
          
          {/* Register Button & Type Selection - With Earthquake Effect */}
          <div className={`mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-3 sm:px-4 md:px-6 mb-6 sm:mb-8 md:mb-10 animate-fade-in ${shake ? 'earthquake' : ''}`} style={{ animationDelay: "0.15s" }}>
            <div className="panel-border relative rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface relative rounded-2xl backdrop-blur-md border">
                <div className="flex flex-col divide-y divide-white/10">

                  {/* Register - Top Section with Tagline & Type Selection */}
                  <div className="px-5 sm:px-6 py-4 sm:py-5 flex flex-col items-center justify-center gap-3 sm:gap-3.5">
                    {/* Tagline */}
                    <p className="text-[11px] sm:text-sm md:text-base text-white/90 tracking-tight">
                      <span className="bg-gradient-to-r from-amber-200 via-fuchsia-200 to-emerald-200 bg-clip-text text-transparent">Join the district's grand celebration</span>
                      <span className="text-white/70"> — be part of the legacy.</span>
                    </p>
                    
                    {/* Registration Type Selection (shows after first click) */}
                    {showTypeSelection && (
                      <div className="w-full animate-fade-in">
                        <p className="text-amber-300 text-sm font-semibold mb-3 text-center">👇 Please select your registration type</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                          {TYPES.map((t) => (
                            <button
                              key={t.key}
                              onClick={() => setSelectedType(t.key)}
                              className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                selectedType === t.key
                                  ? 'bg-amber-500 text-black ring-2 ring-amber-300 scale-105'
                                  : 'bg-white/10 text-white/90 hover:bg-white/20'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                        
                        {/* Selected Type Details - Dynamic Display */}
                        {selectedOption && (
                          <div className="bg-black/30 rounded-xl p-4 border border-amber-500/30 animate-fade-in">
                            <div className="flex items-start gap-3">
                              <div className="vibrant-icon-ring flex-shrink-0">
                                {getIcon(selectedOption.key)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold text-base mb-1">{selectedOption.label}</h4>
                                <p className="text-amber-300 font-extrabold text-2xl mb-2">{inr.format(selectedOption.amount)}</p>
                                <p className="text-white/80 text-xs leading-relaxed">{selectedOption.benefits}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Register Now Button */}
                    <button 
                      onClick={handleRegisterClick}
                      className="group vibrant-button overflow-hidden"
                    >
                      {/* Shimmer */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                      <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="relative z-10 text-sm sm:text-base md:text-lg font-bold tracking-tight">
                        {showTypeSelection && selectedType ? 'Continue' : 'Register Now'}
                      </span>
                    </button>
                  </div>

                  {/* Date & Venue - Combined Row */}
                  <div className="px-5 sm:px-6 py-4 sm:py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {/* Dates */}
                      <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-0 pr-0 sm:pr-4">
                        <div className="vibrant-icon-ring">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">Dates</p>
                          <p className="text-sm sm:text-base md:text-lg font-medium text-white/90">30–31 Jan • 1 Feb 2026</p>
                        </div>
                      </div>
                      {/* Venue */}
                      <a
                        href="https://maps.app.goo.gl/y8xdiWCaKbsANWtc8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 sm:gap-4 py-2 sm:py-0 mt-2 sm:mt-0 sm:pl-4 sm:border-l sm:border-white/10 hover:bg-white/0"
                      >
                        <div className="vibrant-icon-ring">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">Venue</p>
                          <p className="text-sm sm:text-base md:text-lg font-medium text-white/90">Silent Shores, Mysore</p>
                        </div>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Registration Instructions - Premium Panel */}
          <section className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6 mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="panel-border relative rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface relative rounded-2xl backdrop-blur-md border">
                <div className="px-5 sm:px-7 md:px-8 py-5 sm:py-7 md:py-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 tracking-tight">
                    How to Register
                  </h2>
                  <ol className="list-decimal list-inside text-white/90 text-xs sm:text-sm md:text-base leading-relaxed space-y-2 sm:space-y-2.5 md:space-y-3">
                    <li>Click <strong>"Register Now"</strong> button above to see registration types.</li>
                    <li>Select your registration type from the options displayed.</li>
                    <li>Fill in all participant details: Full Name, Mobile (10 digits), Email, Club Name, and Meal Preference.</li>
                    <li>Review all your details carefully on the review page.</li>
                    <li>Click <strong>"Pay Now"</strong> to see the UPI QR code and payment details.</li>
                    <li>Complete the payment via UPI and note your Transaction ID.</li>
                    <li>Enter your UPI Transaction ID and UPI ID in the form and submit.</li>
                    <li>Download your <strong>acknowledgement receipt</strong> (this is NOT a confirmation).</li>
                    <li>Your payment and details will be <strong>verified within 24–48 hours</strong>.</li>
                    <li>You will receive a <strong>confirmation email/SMS</strong> after successful verification.</li>
                    <li>Bring the confirmation and a valid ID to the venue registration desk.</li>
                  </ol>
                  <div className="mt-4 sm:mt-5 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs sm:text-sm text-amber-300 font-semibold mb-1">⚠️ Important:</p>
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                      The receipt you download is only an acknowledgement of submission. It is NOT a registration confirmation. 
                      Wait for official confirmation via email/SMS before considering your registration complete.
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-white/60 text-center">
                    Need help? Contact your Club coordinator.
                  </div>
```
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer - Fully Responsive */}
        <footer className="text-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 pb-4 sm:pb-6 md:pb-7 lg:pb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-white/10 rounded-lg sm:rounded-xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 max-w-2xl mx-2 sm:mx-auto border border-white/10">
            <p className="text-white/80 font-medium text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
              Rotary District 3181 | Service Above Self
            </p>
            <p className="text-white/60 text-[9px] sm:text-[10px] md:text-xs">
              © 2025 Sneha Sourabha Conference
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
