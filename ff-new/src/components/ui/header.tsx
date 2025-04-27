import Image from "next/image";
import { CircleUser } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white w-full p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-white text-sm">G</span>
        </div>
        <span className="text-sm font-medium text-[#404756]">Canal Oficial de Recarga</span>
      </div>
      <CircleUser className="w-6 h-6 text-gray-400" />
    </header>
  );
}
