import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function GameCard() {
  return (
    <div className="mx-3 mt-3 bg-[#2c2c42] rounded-lg overflow-hidden">
      <div className="flex items-center p-3">
        <div className="w-10 h-10 relative mr-2">
          <Image
            src="/images/free-fire-icon.png"
            alt="Free Fire"
            width={40}
            height={40}
            className="rounded-md"
            unoptimized
          />
        </div>
        <span className="text-white text-sm font-medium">Free Fire</span>
        <div className="ml-auto flex items-center text-white text-xs">
          <ShieldCheck className="w-4 h-4 mr-1 text-[#54b6d0]" />
          <span>Pagamento 100% Seguro</span>
        </div>
      </div>
    </div>
  );
}
