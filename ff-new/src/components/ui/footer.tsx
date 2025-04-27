export function Footer() {
  return (
    <footer className="p-4 text-center text-xs text-[#6d7584] mt-6 mb-20">
      <p className="mb-2">© Garena Online. Todos os direitos reservados.</p>
      <div className="flex justify-center gap-4">
        <a href="/faq" className="hover:underline">FAQ</a>
        <a href="/termos" className="hover:underline">Termos e condições</a>
        <a href="/privacidade" className="hover:underline">Política de privacidade</a>
      </div>
    </footer>
  );
}
