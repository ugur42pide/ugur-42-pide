interface MenuItemProps {
  title: string;
  description: string;
  price: string;
  imageUrl?: string | null;
}

export default function MenuItem({
  title,
  description,
  price,
  imageUrl,
}: MenuItemProps) {
  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-600 transition-colors group">
      {/* GÜNCELLEDİĞİMİZ RESİM ALANI */}
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden bg-neutral-800/50 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={title}
            // object-cover (kırp) yerine object-contain (sığdır) kullandık.
            // Böylece ayran şişesi kesilmeden tam görünecek.
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-lg font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
            {price}
          </span>
        </div>
        {description && (
          <p className="text-neutral-400 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
