import Image from "next/image";
import { Info } from "lucide-react";

export function FreeItem() {
  return (
    <div className="mx-3 mt-3 bg-white rounded-lg p-3 relative overflow-hidden shadow-sm">
      <div className="relative z-10">
        <h2 className="text-sm font-medium text-[#404756] mb-1">Você ganhou 71% de desconto!</h2>
        <div className="flex items-center mt-2">
          <Image
            src="/images/diamante.png"
            alt="Diamante"
            width={20}
            height={20}
            className="mr-2"
            unoptimized
          />
          <span className="text-sm font-bold text-[#404756]">5.600</span>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 opacity-20">
        <Image
          src="/images/freeitem-bg.png"
          alt="Item Grátis Background"
          width={120}
          height={80}
          unoptimized
        />
      </div>
      <div className="absolute bottom-1 right-2 flex items-center text-[#6d7584] text-xs">
        <Info className="w-3 h-3 mr-1" />
        <span>Recife de Abrantes</span>
      </div>
    </div>
  );
}
