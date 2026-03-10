import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Kategorileri ve içindeki ürünleri çekiyoruz
  const categories = await prisma.category.findMany({
    include: { items: true },
  });

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

  // 3. Ürün Silme Motoru
  async function deleteItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await prisma.menuItem.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  // 4. Kategori Silme Motoru
  async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
        <h1 className="text-3xl font-bold text-white">
          🛠️ Uğur 42 Pide - Yönetim Paneli
        </h1>
        <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-lg font-medium">
          Sistem Aktif
        </div>
      </div>

      {/* ÜST KISIM: EKLEME KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

      {/* ALT KISIM: MEVCUT MENÜYÜ LİSTELEME VE SİLME */}
      <div className="border-t border-neutral-800 pt-12">
        <h2 className="text-3xl font-bold text-white mb-8">
          📋 Mevcut Menü Listesi
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
            >
              {/* Kategori Başlığı ve Kategori Sil Butonu */}
              <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
                <h3 className="text-2xl font-bold text-red-500">{cat.name}</h3>
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <button
                    type="submit"
                    className="text-xs bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white py-2 px-3 rounded transition-colors"
                  >
                    Kategoriyi Sil
                  </button>
                </form>
              </div>

              {/* Kategori İçindeki Ürünler */}
              <div className="space-y-3">
                {cat.items.length === 0 ? (
                  <p className="text-neutral-500 text-sm italic">
                    Bu kategoride henüz ürün yok.
                  </p>
                ) : (
                  cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-neutral-800/40 hover:bg-neutral-800 transition-colors p-3 rounded-lg"
                    >
                      <div>
                        <span className="text-white font-medium text-lg">
                          {item.name}
                        </span>
                        <span className="text-neutral-400 ml-4">
                          {item.price}
                        </span>
                      </div>
                      <form action={deleteItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="text-sm text-neutral-500 hover:text-red-500 transition-colors p-2 font-bold"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
