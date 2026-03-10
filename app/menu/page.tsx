import MenuItem from "../components/MenuItem";
import { prisma } from "@/lib/prisma";

// Sayfanın her zaman en güncel veriyi çekmesi için önbelleği (cache) kapatıyoruz
export const dynamic = "force-dynamic";

export default async function MenuPage() {
  // Veritabanından kategorileri ve o kategorilere ait tüm ürünleri (items) çekiyoruz
  const categories = await prisma.category.findMany({
    include: {
      items: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Lezzet <span className="text-red-600">Menümüz</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          Özenle hazırladığımız menümüzden seçiminizi yapın.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map(
          (section) =>
            // Eğer bir kategorinin içi boşsa (ürün yoksa) başlığını ekranda gösterme
            section.items.length > 0 && (
              <div key={section.id}>
                <h2 className="text-2xl font-bold text-red-600 border-b border-neutral-800 pb-2 mb-6 inline-block">
                  {section.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item) => (
                    <MenuItem
                      key={item.id}
                      title={item.name}
                      description={item.description || ""}
                      price={item.price}
                    />
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
