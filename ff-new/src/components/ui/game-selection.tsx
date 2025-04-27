import Image from "next/image";

const games = [
  {
    id: "freefire",
    name: "Free Fire",
    icon: "/images/free-fire-icon.png",
    selected: true,
  },
  {
    id: "blackclover",
    name: "Black Clover M",
    icon: "/images/black-clover-icon.png",
    selected: false,
  },
  {
    id: "deltaforce",
    name: "Delta Force",
    icon: "/images/delta-force-icon.png",
    selected: false,
  },
];

export function GameSelection() {
  return (
    <div className="p-3 bg-white">
      <h2 className="text-sm font-medium text-[#404756] mb-2">Seleção de jogos</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {games.map((game) => (
          <div
            key={game.id}
            className={`flex flex-col items-center min-w-16 ${game.selected ? "opacity-100" : "opacity-60"}`}
          >
            <div className="w-14 h-14 relative mb-1">
              <Image
                src={game.icon}
                alt={game.name}
                width={56}
                height={56}
                className="rounded-md"
                unoptimized
              />
            </div>
            <span className="text-xs text-center text-[#404756] whitespace-nowrap max-w-16 truncate">
              {game.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
