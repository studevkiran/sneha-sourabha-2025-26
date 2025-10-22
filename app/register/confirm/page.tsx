"use client";

import PageHeader from "../../../components/PageHeader";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Image from "next/image";

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

function generateTxnId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SS-${ts}-${rnd}`;
}

export default function ConfirmPage({
  searchParams,
}: {
  searchParams: { type?: string; name?: string; mobile?: string; email?: string; club?: string; meal?: string; spouseName?: string; children?: string };
}) {
  const type = (searchParams?.type || "").toString() as RegType | "";
  const option = useMemo(() => TYPES.find(t => t.key === type), [type]);
  const name = (searchParams?.name || "").toString();
  const mobile = (searchParams?.mobile || "").toString();
  const email = (searchParams?.email || "").toString();
  const club = (searchParams?.club || "").toString();
  const meal = (searchParams?.meal || "").toString();
  const spouseName = (searchParams?.spouseName || "").toString();
  const children = Number((searchParams?.children || "0").toString()) || 0;
  const inr = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);

  // Payment flow state
  const [showQrModal, setShowQrModal] = useState(false);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [upiId, setUpiId] = useState("");
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const UPI_VPA = process.env.NEXT_PUBLIC_UPI_VPA || "";
  const UPI_NAME = process.env.NEXT_PUBLIC_UPI_NAME || "Sneha Sourabha";
  const upiLink = useMemo(() => {
    if (option && UPI_VPA) {
      const amount = (option.amount ?? 0).toFixed(2);
      const note = `Registration ${option.label}${name ? ` - ${name}` : ""}`;
      const params = new URLSearchParams({ pa: UPI_VPA, pn: UPI_NAME, am: amount, cu: "INR", tn: note });
      return `upi://pay?${params.toString()}`;
    }
    return "";
  }, [option, name, UPI_VPA, UPI_NAME]);

  const txnId = useMemo(() => generateTxnId(), []);
  const receiptRef = useRef<HTMLDivElement>(null);
  const downloadTime = useMemo(() => new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }), []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiTransactionId.trim() || !upiId.trim()) {
      alert("Please fill in both UPI Transaction ID and UPI ID");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to database
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          club,
          registration_type: type,
          registration_amount: option?.amount || 0,
          meal_preference: meal,
          spouse_name: spouseName || null,
          children_count: children || 0,
          upi_transaction_id: upiTransactionId.trim(),
          upi_id: upiId.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setRegistrationNumber(result.data.registration_number);
        setPaymentSubmitted(true);
        setShowQrModal(false);
      } else {
        alert(result.error || 'Failed to submit registration. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadImage = async () => {
    if (!receiptRef.current) return;
    const dataUrl = await toPng(receiptRef.current, { cacheBust: true, backgroundColor: "#FFFFFF" });
    const link = document.createElement("a");
    link.download = `SnehaSourabha-Receipt-${txnId}.png`;
    link.href = dataUrl;
    link.click();
  };

  const downloadPdf = async () => {
    if (!receiptRef.current) return;
    const dataUrl = await toPng(receiptRef.current, { cacheBust: true, backgroundColor: "#FFFFFF" });
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Create an image and scale to fit while keeping aspect ratio
    const img = document.createElement('img');
    img.src = dataUrl;
    await new Promise(res => { img.onload = res; });
    const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const x = (pageWidth - w) / 2;
    const y = 40; // top margin
    pdf.addImage(dataUrl, "PNG", x, y, w, h);
    pdf.save(`SnehaSourabha-Receipt-${txnId}.pdf`);
  };

  const title = paymentSubmitted ? "Registration Submission Acknowledgement" : "Review and Pay";

  return (
    <main className="min-h-screen">
      <PageHeader
        title={title}
        subtitle={paymentSubmitted ? "Your registration has been submitted and is pending verification." : (option ? `Review your details for ${option.label} registration.` : "Review your details.")}
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        {!option ? (
          <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
            <div className="panel-surface rounded-2xl p-6">
              <p className="text-white/85">Missing or invalid registration type. Please choose your registration type again.</p>
              <div className="mt-4">
                <Link href="/register/type" className="vibrant-button">Choose Type</Link>
              </div>
            </div>
          </div>
        ) : !paymentSubmitted ? (
          // REVIEW STAGE - show details and Pay button
          <>
            <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface rounded-2xl p-5 sm:p-6">
                <h3 className="text-white font-semibold text-xl mb-4 text-center">Review Your Details</h3>

                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="space-y-3">
                      <div className="text-white/85 text-sm space-y-1 text-center">
                        <div><span className="text-white/60">Registration Type:</span> <span className="font-medium">{option.label}</span></div>
                        <div><span className="text-white/60">Amount:</span> <span className="text-amber-300 font-semibold text-lg">{inr.format(option.amount)}</span></div>
                        <div className="text-xs text-white/50">{option.benefits}</div>
                      </div>
                      <hr className="border-white/10" />
                      <div className="text-white/85 text-sm space-y-1 text-center">
                        <div><span className="text-white/60">Name:</span> {name}</div>
                        <div><span className="text-white/60">Mobile:</span> {mobile}</div>
                        <div><span className="text-white/60">Email:</span> {email}</div>
                        <div><span className="text-white/60">Club:</span> {club}</div>
                        <div><span className="text-white/60">Meal Preference:</span> {meal}</div>
                        {type === "rotarian_spouse" && spouseName && <div><span className="text-white/60">Spouse Name:</span> {spouseName}</div>}
                        {type === "rotarian_spouse" && <div><span className="text-white/60">Children (below 12 years):</span> {children}</div>}
                        
                        {/* Pay Now button vertically below details */}
                        <div className="pt-4">
                          <div className="text-white/70 text-xs mb-2">Click Pay to proceed with payment</div>
                          <button 
                            type="button" 
                            onClick={() => setShowQrModal(true)}
                            className="vibrant-button text-base px-6 py-2.5 w-full"
                          >
                            💳 Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link href={`/register/details?type=${option.key}`} className="text-white/70 hover:text-white underline underline-offset-4">← Back to Edit Details</Link>
            </div>
          </>
        ) : (
          // PAYMENT SUBMITTED - show final receipt
          <>
            <div ref={receiptRef} className="bg-white rounded-2xl p-8 shadow-2xl">
              {/* Header with Logos and Title */}
              <div className="border-b-2 border-gray-800 pb-6 mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* District Logo */}
                    <Image 
                      src="/logos/rotaract-3181-logo.png" 
                      alt="Rotaract District 3181" 
                      width={60} 
                      height={60}
                      className="object-contain"
                    />
                    {/* Event Logo */}
                    <Image 
                      src="/logos/sneha-sourabha-logo.jpeg" 
                      alt="Sneha Sourabha" 
                      width={60} 
                      height={60}
                      className="object-contain rounded-lg"
                    />
                    <div>
                      <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Sneha Sourabha</h1>
                      <p className="text-sm text-gray-600">District Conference 2025-26</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {registrationNumber && (
                      <div className="mb-2">
                        <div className="text-xs text-gray-500">Registration Number</div>
                        <div className="font-mono font-bold text-lg text-gray-900">{registrationNumber}</div>
                      </div>
                    )}
                    <div>Receipt ID: <span className="font-mono font-semibold text-gray-900">{txnId}</span></div>
                    <div className="mt-1">{downloadTime}</div>
                  </div>
                </div>
              </div>

              {/* Acknowledgement Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-semibold">📋 Registration Submission Acknowledgement</span><br />
                  This is a <strong>registration submission receipt only</strong>. Payment and personal details are subject to verification. This does not confirm your registration. A confirmation email/SMS will be sent within 24-48 hours after successful verification.
                </p>
              </div>

              {/* Registration Details */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Submitted Registration Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Registration Type</div>
                    <div className="font-semibold text-gray-900">{option.label}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Registration Amount</div>
                    <div className="font-semibold text-blue-700 text-lg">{inr.format(option.amount)}</div>
                    <div className="text-xs text-gray-500 mt-0.5">(Pending Verification)</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Name</div>
                    <div className="font-medium text-gray-900">{name}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Mobile</div>
                    <div className="font-medium text-gray-900">{mobile}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Email</div>
                    <div className="font-medium text-gray-900">{email}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Club</div>
                    <div className="font-medium text-gray-900">{club}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Meal Preference</div>
                    <div className="font-medium text-gray-900">{meal}</div>
                  </div>
                  {type === "rotarian_spouse" && spouseName && (
                    <div>
                      <div className="text-gray-600">Spouse Name</div>
                      <div className="font-medium text-gray-900">{spouseName}</div>
                    </div>
                  )}
                  {type === "rotarian_spouse" && (
                    <div>
                      <div className="text-gray-600">Children (below 12)</div>
                      <div className="font-medium text-gray-900">{children}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Details */}
              <div className="border-t-2 border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Submitted Payment Information</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">UPI Transaction ID (Submitted)</div>
                    <div className="font-mono font-semibold text-gray-900">{upiTransactionId}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">UPI ID (Submitted)</div>
                    <div className="font-mono font-semibold text-gray-900">{upiId}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-orange-700 bg-orange-50 p-2 rounded">
                  ⚠️ Payment details are pending verification by our team.
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Expected Benefits (Subject to Confirmation)</h3>
                <p className="text-sm text-gray-700">{option.benefits}</p>
              </div>

              {/* Important Notice */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">📌 Important Legal Disclaimer</h3>
                <ul className="text-xs text-blue-800 space-y-1.5 leading-relaxed">
                  <li>• <strong>This is NOT a registration confirmation.</strong> This is only a submission acknowledgement.</li>
                  <li>• Your payment and personal details will be verified within 24-48 hours.</li>
                  <li>• Registration confirmation will be sent via email/SMS only after successful verification.</li>
                  <li>• In case of payment discrepancies or invalid details, you will be contacted for clarification.</li>
                  <li>• Please save this receipt for your records and future reference.</li>
                  <li>• For any queries, contact the organizing committee before the verification period ends.</li>
                </ul>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                <p>Thank you for registering for Sneha Sourabha - District Conference 2025-26!</p>
                <p className="mt-1">For queries, contact the organizing committee.</p>
              </div>
            </div>

            {/* Download Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={downloadPdf} className="vibrant-button px-6 py-3">
                📄 Download PDF
              </button>
              <button type="button" onClick={downloadImage} className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white/90 hover:bg-white/20">
                🖼️ Download Image
              </button>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white/90 hover:bg-white/20">
                🖨️ Print Receipt
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-white/70 hover:text-white underline underline-offset-4">← Back to Home</Link>
            </div>
          </>
        )}
      </section>

      {/* QR CODE MODAL */}
      {showQrModal && option && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="panel-border rounded-2xl p-[1.5px] has-sheen max-w-md w-full">
            <div className="panel-surface rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Scan QR to Pay</h3>
                <button 
                  type="button" 
                  onClick={() => setShowQrModal(false)}
                  className="text-white/60 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-xl p-4">
                  <QRCode 
                    value={upiLink || JSON.stringify({ type: option.key, amount: option.amount })} 
                    size={220} 
                    bgColor="#FFFFFF" 
                    fgColor="#000000" 
                  />
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-white/80 text-sm mb-2">
                  <span className="text-white/60">Pay to:</span> <span className="font-mono font-semibold">{UPI_VPA}</span>
                </div>
                <div className="text-amber-300 font-semibold text-xl">{inr.format(option.amount)}</div>
                {upiLink && (
                  <a href={upiLink} className="vibrant-button mt-3 inline-block">Open in UPI App</a>
                )}
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <label className="block text-white/80 text-sm mb-1">UPI Transaction ID *</label>
                  <input 
                    type="text" 
                    value={upiTransactionId}
                    onChange={(e) => setUpiTransactionId(e.target.value)}
                    placeholder="e.g., 123456789012"
                    className="w-full rounded-lg bg-black/50 border border-white/20 px-4 py-2 text-white placeholder:text-white/40 focus:border-amber-300 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-1">UPI ID (yours) *</label>
                  <input 
                    type="text" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g., yourname@upi"
                    className="w-full rounded-lg bg-black/50 border border-white/20 px-4 py-2 text-white placeholder:text-white/40 focus:border-amber-300 focus:outline-none"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="vibrant-button w-full py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Submitting...' : '✓ Submit Payment Details'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
