import { Info } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  return (
    <div className="mx-3 mt-3 bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-6 h-6 rounded-full bg-[#c23743] flex items-center justify-center text-white text-xs font-bold">
          1
        </div>
        <h2 className="ml-2 text-sm font-medium text-[#404756]">Login</h2>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Insira o ID do jogador aqui"
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#54b6d0] mb-3"
        />
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none mb-3">
          <Info className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <button
        onClick={onLogin}
        className="bg-[#c23743] text-white py-2 px-4 rounded-md text-sm font-medium w-full"
      >
        Login
      </button>
      <p className="mt-3 text-center">
        <span className="text-sm font-bold text-[#c23743] px-2 py-1 bg-[#fff9f9] rounded border border-[#c23743] inline-block">
          Faça login inserindo o seu ID para resgatar seu desconto!
        </span>
      </p>
    </div>
  );
}
