interface MenuItemProps {
  title: string;
  description: string;
  price: string;
  imageUrl?: string | null; // Resim özelliği eklendi
}

export default function MenuItem({
  title,
  description,
  price,
  imageUrl,
}: MenuItemProps) {
  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-600 transition-colors group">
      {/* Eğer resim varsa üst tarafta gösteriyoruz */}
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-lg font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
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
