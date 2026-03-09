interface MenuItemProps {
  title: string;
  description: string;
  price: string;
}

export default function MenuItem({ title, description, price }: MenuItemProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl hover:border-red-600 transition-all duration-300 group cursor-pointer flex justify-between items-center">
      <div className="flex-1 pr-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-semibold text-white group-hover:text-red-500 transition-colors">
            {title}
          </h3>
          {/* Fiyat Alanı */}
          <span className="text-red-500 font-bold ml-2 whitespace-nowrap bg-red-500/10 px-2 py-1 rounded-md">
            {price}
          </span>
        </div>
        {/* Ürüne özel açıklama alanı */}
        <p className="text-neutral-400 text-sm mt-1">{description}</p>
      </div>

      {/* Artı (Sepete Ekle) Butonu */}
      <div className="h-10 w-10 shrink-0 bg-neutral-950 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
        <span className="text-2xl text-red-600 group-hover:text-white">+</span>
      </div>
    </div>
  );
}
