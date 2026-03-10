import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminPage() {
  const categories = await prisma.category.findMany();

  // 1. Kategori Kaydetme Motoru
  async function addCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name) return;

    await prisma.category.create({ data: { name } });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  // 2. Ürün Kaydetme Motoru
  async function addItem(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!name || !price || !categoryId) return;

    await prisma.menuItem.create({
      data: { name, price, categoryId },
    });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  // 3. SİHİRLİ MOTOR: Eski Menüyü Tek Tıkla Veritabanına Aktar
  async function seedOldMenu() {
    "use server";

    // Eğer zaten kategori varsa (yanlışlıkla 2 kez basılırsa) işlemi durdur. Çift kayıt olmasın.
    const count = await prisma.category.count();
    if (count > 0) return;

    const oldMenuData = [
      {
        category: "Pideler & Lahmacun",
        items: [
          {
            name: "Etliekmek",
            price: "350 ₺",
            description: "Ustalarımızın özel tarifiyle, çıtır çıtır.",
          },
          {
            name: "Bıçakarası",
            price: "380 ₺",
            description: "Ustalarımızın özel tarifiyle, bol malzemeli.",
          },
          {
            name: "Mevlana",
            price: "350 ₺",
            description: "Ustalarımızın özel tarifiyle.",
          },
          {
            name: "Lahmacun",
            price: "200 ₺",
            description: "Taş fırında pişen çıtır lezzet.",
          },
          {
            name: "Kıymalı Pide",
            price: "300 ₺",
            description: "Ustalarımızın özel tarifiyle.",
          },
          {
            name: "Kıymalı Kaşarlı",
            price: "350 ₺",
            description: "Ustalarımızın özel tarifiyle.",
          },
          {
            name: "Peynirli Pide",
            price: "300 ₺",
            description: "Tam kıvamında peynir şöleni.",
          },
          {
            name: "Töngül Pide",
            price: "200 ₺",
            description: "Özel yöresel lezzet.",
          },
          {
            name: "Kuşbaşılı Pide",
            price: "380 ₺",
            description: "Ustalarımızın özel tarifiyle.",
          },
          {
            name: "Kuşkaş Pide",
            price: "380 ₺",
            description: "Kuşbaşı et ve kaşar uyumu.",
          },
          {
            name: "Pizza Sucuk Kaşar",
            price: "350 ₺",
            description: "Bol malzemeli pide pizza.",
          },
          {
            name: "Pizza Vegan",
            price: "350 ₺",
            description: "Bitkisel içerikli özel lezzet.",
          },
        ],
      },
      {
        category: "Izgaralar & Ekmek Arası",
        items: [
          {
            name: "Ekmek Arası Köfte",
            price: "250 ₺",
            description: "Izgara ateşinde pişmiş leziz köfteler.",
          },
          {
            name: "Ekmek Arası Tavuk",
            price: "200 ₺",
            description: "Özel soslu ızgara tavuk.",
          },
          {
            name: "Ödemiş Köfte",
            price: "350 ₺",
            description: "Tereyağlı, özel pideli Ödemiş köfte.",
          },
          {
            name: "Izgara Köfte",
            price: "350 ₺",
            description: "Porsiyon ızgara köfte, garnitür ile.",
          },
          {
            name: "Kiremitte Köfte",
            price: "350 ₺",
            description: "Kiremitte domates soslu, kaşarlı.",
          },
          {
            name: "Izgara Tavuk Kanat",
            price: "300 ₺",
            description: "Nar gibi kızarmış ızgara kanat.",
          },
          {
            name: "Izgara Tavuk Şiş",
            price: "300 ₺",
            description: "Lokum gibi tavuk şiş.",
          },
          {
            name: "Izgara Tavuk İncik",
            price: "300 ₺",
            description: "Kemiksiz, sulu tavuk incik.",
          },
        ],
      },
      {
        category: "İçecekler",
        items: [
          { name: "Ayran", price: "50 ₺", description: "Soğuk içiniz." },
          {
            name: "Şalgam",
            price: "80 ₺",
            description: "Acılı veya acısız seçenekleriyle.",
          },
          { name: "Kola", price: "80 ₺", description: "Soğuk içiniz." },
          { name: "Fanta", price: "80 ₺", description: "Soğuk içiniz." },
          { name: "Sprite", price: "80 ₺", description: "Soğuk içiniz." },
          {
            name: "Limonata",
            price: "80 ₺",
            description: "Ferahlatıcı lezzet.",
          },
          { name: "Su", price: "20 ₺", description: "Pet şişe." },
        ],
      },
    ];

    // Önce kategoriyi oluştur, sonra içindeki ürünleri o kategoriye bağla
    for (const section of oldMenuData) {
      const createdCategory = await prisma.category.create({
        data: { name: section.category },
      });

      for (const item of section.items) {
        await prisma.menuItem.create({
          data: {
            name: item.name,
            price: item.price,
            description: item.description,
            categoryId: createdCategory.id,
          },
        });
      }
    }

    revalidatePath("/admin");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
        <h1 className="text-3xl font-bold text-white">
          🛠️ Uğur 42 Pide - Yönetim Paneli
        </h1>
        <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-lg font-medium">
          Veritabanı Aktif
        </div>
      </div>

      {/* SİHİRLİ AKTARIM BUTONU EKRANI */}
      {categories.length === 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 p-6 rounded-2xl mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-yellow-500 mb-2">
              Hızlı Kurulum: Eski Menüyü Aktar
            </h2>
            <p className="text-neutral-300">
              Sitenizdeki mevcut eski menüyü (Pideler, İçecekler vb.) tek tıkla
              veritabanına otomatik yükleyin.
            </p>
          </div>
          <form action={seedOldMenu}>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Menüyü Veritabanına Çek 🚀
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kategori Ekleme Kartı */}
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            1. Yeni Kategori Ekle
          </h2>
          <form action={addCategory} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Kategori Adı (Örn: Pideler)"
              className="w-full bg-neutral-800 text-white p-3 rounded-lg border border-neutral-700 outline-none focus:border-red-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Kategoriyi Kaydet
            </button>
          </form>
        </div>

        {/* Ürün Ekleme Kartı */}
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            2. Yeni Ürün Ekle
          </h2>
          <form action={addItem} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Ürün Adı (Örn: Etliekmek)"
              className="w-full bg-neutral-800 text-white p-3 rounded-lg border border-neutral-700 outline-none focus:border-red-500 transition-colors"
            />
            <input
              type="text"
              name="price"
              required
              placeholder="Fiyat (Örn: 350 ₺)"
              className="w-full bg-neutral-800 text-white p-3 rounded-lg border border-neutral-700 outline-none focus:border-red-500 transition-colors"
            />
            <select
              name="categoryId"
              required
              className="w-full bg-neutral-800 text-white p-3 rounded-lg border border-neutral-700 outline-none focus:border-red-500 transition-colors"
            >
              <option value="">Önce Kategori Seçin...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Ürünü Kaydet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
