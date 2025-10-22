"use client";

import QRCode from "react-qr-code";

interface UPIPaymentProps {
  upiLink: string;
  name: string;
  club: string;
  optionKey: string;
  optionLabel: string;
  optionAmount: number;
}

export default function UPIPayment({ upiLink, name, club, optionKey, optionLabel, optionAmount }: UPIPaymentProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(upiLink);
  };

  return (
    <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
      <div className="panel-surface rounded-2xl p-5 sm:p-6">
        <h3 className="text-white font-semibold text-lg">UPI Payment</h3>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <div className="panel-border rounded-xl p-[1px]">
            <div className="bg-black/50 rounded-xl p-3">
              <QRCode 
                value={upiLink || JSON.stringify({ type: optionKey, label: optionLabel, amount: optionAmount, name, club })} 
                size={180} 
                bgColor="transparent" 
                fgColor="#FDE68A" 
              />
            </div>
          </div>
          <div className="text-white/80 text-sm max-w-md space-y-2">
            {upiLink ? (
              <>
                <p>Scan to pay via UPI with amount and note prefilled. On mobile, tap below to open your UPI app.</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={upiLink} className="vibrant-button">Open in UPI app</a>
                  <button 
                    type="button" 
                    onClick={handleCopyLink} 
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10"
                  >
                    Copy UPI link
                  </button>
                </div>
              </>
            ) : (
              <p>UPI VPA is not configured. Please set NEXT_PUBLIC_UPI_VPA to enable direct payment QR.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
