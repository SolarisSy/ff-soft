import Image from "next/image";
import { useState } from "react";
import { BottomPaymentBar } from "./bottom-payment-bar";

// Ofertas especiais disponíveis
const specialOffers = [
  {
    id: "assinatura-semanal",
    name: "Assinatura Semanal",
    image: "/images/assinatura-semanal.png",
    originalPrice: 12.90,
    price: 8.99,
    discount: 30,
  },
  {
    id: "assinatura-mensal",
    name: "Assinatura Mensal",
    image: "/images/assinatura-mensal.png",
    originalPrice: 29.90,
    price: 19.99,
    discount: 33,
  },
  {
    id: "level-up-pass",
    name: "Level Up Pass",
    image: "/images/level-up-pass.png",
    originalPrice: 24.90,
    price: 15.99,
    discount: 36,
  },
  {
    id: "trilha-evolucao-3",
    name: "Trilha da Evolução - 3 dias",
    image: "/images/trilha-evolucao-3.png",
    originalPrice: 14.90,
    price: 9.99,
    discount: 33,
  },
  {
    id: "trilha-evolucao-7",
    name: "Trilha da Evolução - 7 dias",
    image: "/images/trilha-evolucao-7.png",
    originalPrice: 19.90,
    price: 12.99,
    discount: 35,
  },
  {
    id: "trilha-evolucao-30",
    name: "Trilha da Evolução - 30 dias",
    image: "/images/trilha-evolucao-30.png",
    originalPrice: 39.90,
    price: 24.99,
    discount: 37,
  },
  {
    id: "semanal-economica",
    name: "Semanal Econômica",
    image: "/images/semanal-economica.png",
    originalPrice: 9.90,
    price: 6.99,
    discount: 29,
  },
];

export function LoggedInPayment() {
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);

  // Função para alternar a seleção de uma oferta
  const toggleOffer = (offerId: string) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers(selectedOffers.filter(id => id !== offerId));
    } else {
      setSelectedOffers([...selectedOffers, offerId]);
    }
  };

  // Calcular o preço total
  const basePrice = 36.90;
  const additionalPrice = selectedOffers.reduce((total, offerId) => {
    const offer = specialOffers.find(o => o.id === offerId);
    return total + (offer?.price || 0);
  }, 0);
  const totalPrice = basePrice + additionalPrice;

  // <<< INÍCIO DA ADIÇÃO: Obter detalhes das ofertas selecionadas >>>
  const selectedOfferDetails = selectedOffers
    .map(offerId => {
      const offer = specialOffers.find(o => o.id === offerId);
      // Retorna apenas nome e preço para simplificar
      return offer ? { name: offer.name, price: offer.price } : null;
    })
    .filter(Boolean); // Remove quaisquer nulos caso um ID não corresponda
  // <<< FIM DA ADIÇÃO >>>

  // Constantes para a barra de pagamento
  const diamondsAmount = 5600;
  const bonusDiamonds = 1120;

  return (
    <div className="mx-3 mt-3 bg-white rounded-lg p-3 shadow-sm pb-20">
      <div className="flex items-center mb-3">
        <div className="w-6 h-6 rounded-full bg-[#c23743] flex items-center justify-center text-white text-xs font-bold">
          2
        </div>
        <h2 className="ml-2 text-sm font-medium text-[#404756]">Método de pagamento</h2>
      </div>

      <div className="border border-[#c23743] bg-[#fff9f9] rounded-md p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 relative flex-shrink-0 mr-3">
            <Image
              src="/images/diamante.png"
              alt="Diamante"
              width={32}
              height={32}
              unoptimized
            />
          </div>
          <div>
            <div className="text-base font-bold text-[#404756]">
              5.600 <span className="text-sm font-normal">Diamantes</span>
              <div className="text-sm font-medium text-[#c23743]">
                + 1.120 <span className="text-xs font-normal">Diamantes Bônus por PIX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-[#404756]">Adicione ao seu pedido</h3>
          <span className="text-xs text-[#c23743] font-bold">OFERTAS COM DESCONTO!</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {specialOffers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => toggleOffer(offer.id)}
              className={`border ${selectedOffers.includes(offer.id) ? 'border-[#c23743] bg-[#fff9f9]' : 'border-gray-300'} rounded-md p-2 relative overflow-hidden cursor-pointer`}
            >
              <div className="hot-badge">Hot</div>
              {offer.discount > 0 && (
                <div className="absolute top-8 left-0 bg-[#c23743] text-white text-xs py-1 px-2 rounded-r-md font-bold">
                  -{offer.discount}%
                </div>
              )}
              <Image
                src={offer.image}
                alt={offer.name}
                width={140}
                height={80}
                className="mb-1"
                unoptimized
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#404756]">{offer.name}</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500 line-through mr-1">R$ {offer.originalPrice.toFixed(2)}</span>
                <span className="text-xs font-bold text-[#c23743]">R$ {offer.price.toFixed(2)}</span>
              </div>

              {selectedOffers.includes(offer.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#c23743] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-6 h-6 mr-2 relative flex-shrink-0">
            <Image
              src="https://ext.same-assets.com/1245660031/2376517584.png"
              alt="pix"
              width={24}
              height={24}
              className="object-contain w-full h-full"
              unoptimized
            />
          </div>
          <div>
            <div className="text-sm text-[#404756] font-medium">Pix</div>
            <div className="text-xs text-[#6d7584]">+1.120 diamantes de bônus!</div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#c23743] rounded-full" />
        </div>
      </div>

      <div className="mt-4 p-3 border border-gray-300 rounded-md flex items-center justify-between bg-[#f9f9f9]">
        <div className="flex items-center">
          <Image
            src="/images/diamante.png"
            alt="Diamante"
            width={20}
            height={20}
            className="mr-2"
            unoptimized
          />
          <div>
            <div className="text-sm text-[#404756] font-medium">5.600 + 1.120</div>
            {selectedOffers.length > 0 && (
              <div className="text-xs text-[#6d7584]">+ {selectedOffers.length} ofertas especiais</div>
            )}
          </div>
        </div>
        <div>
          <div className="text-xs text-[#6d7584]">Total:</div>
          <div className="text-sm text-[#404756] font-bold">R$ {totalPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-3 text-xs text-center text-[#6d7584]">
        <span className="font-medium text-[#c23743]">Parabéns!</span> Você economizou 71% nesta oferta exclusiva.
      </div>

      <BottomPaymentBar
        totalPrice={totalPrice}
        diamondsAmount={diamondsAmount}
        bonusDiamonds={bonusDiamonds}
        hasSpecialOffers={selectedOffers.length > 0}
        selectedOfferDetails={selectedOfferDetails}
      />
    </div>
  );
}
