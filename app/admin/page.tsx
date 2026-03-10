import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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

  // 2. Ürün Kaydetme Motoru (Resim Destekli)
  async function addItem(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !price || !categoryId) return;

    let imageUrl = null;
    // Eğer resim yüklendiyse, onu veritabanına uyumlu metne çevir (Base64)
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
    }

    await prisma.menuItem.create({
      data: { name, price, categoryId, imageUrl },
    });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  // 3. Ürün GÜNCELLEME Motoru (YENİ)
  async function updateItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !price) return;

    let imageUrl = undefined;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
    }

    // Sadece değişenleri güncelle
    await prisma.menuItem.update({
      where: { id },
      data: imageUrl ? { name, price, imageUrl } : { name, price },
    });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  // 4. Ürün Silme Motoru
  async function deleteItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await prisma.menuItem.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/menu");
  }

  // 5. Kategori Silme Motoru
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
            {/* YENİ: RESİM YÜKLEME ALANI */}
            <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
              <label className="block text-sm text-neutral-400 mb-1">
                Ürün Fotoğrafı (İsteğe Bağlı)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="text-white text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Ürünü Kaydet
            </button>
          </form>
        </div>
      </div>

      {/* ALT KISIM: MEVCUT MENÜYÜ LİSTELEME VE GÜNCELLEME */}
      <div className="border-t border-neutral-800 pt-12">
        <h2 className="text-3xl font-bold text-white mb-8">
          📋 Mevcut Menü ve Düzenleme
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
            >
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

              <div className="space-y-4">
                {cat.items.length === 0 ? (
                  <p className="text-neutral-500 text-sm italic">
                    Bu kategoride henüz ürün yok.
                  </p>
                ) : (
                  cat.items.map((item) => (
                    // HTML details etiketi ile tıklanınca açılan akordeon menü yapıyoruz!
                    <details
                      key={item.id}
                      className="bg-neutral-800/40 rounded-lg group border border-neutral-700 overflow-hidden"
                    >
                      <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-neutral-800 transition-colors list-none">
                        <div className="flex items-center gap-4">
                          {/* Ürün resmi varsa burada küçük gösteriyoruz */}
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md border border-neutral-700"
                            />
                          )}
                          <div>
                            <span className="text-white font-medium text-lg block">
                              {item.name}
                            </span>
                            <span className="text-red-400 text-sm font-bold">
                              {item.price}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm bg-neutral-700 px-3 py-1 rounded text-white group-open:hidden">
                          Düzenle ⚙️
                        </span>
                        <span className="text-sm bg-neutral-700 px-3 py-1 rounded text-white hidden group-open:block">
                          Kapat 🔼
                        </span>
                      </summary>

                      {/* AÇILAN GÜNCELLEME FORMU */}
                      <div className="p-4 bg-neutral-800 border-t border-neutral-700">
                        <form action={updateItem} className="space-y-3 mb-6">
                          <input type="hidden" name="id" value={item.id} />
                          <div>
                            <label className="text-xs text-neutral-400 ml-1">
                              Ürün Adı
                            </label>
                            <input
                              type="text"
                              name="name"
                              defaultValue={item.name}
                              required
                              className="w-full bg-neutral-900 text-white p-2 rounded border border-neutral-700 outline-none focus:border-red-500"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-400 ml-1">
                              Fiyat
                            </label>
                            <input
                              type="text"
                              name="price"
                              defaultValue={item.price}
                              required
                              className="w-full bg-neutral-900 text-white p-2 rounded border border-neutral-700 outline-none focus:border-red-500"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-400 ml-1">
                              Resmi Değiştir (İsteğe Bağlı)
                            </label>
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              className="w-full bg-neutral-900 text-white p-2 rounded border border-neutral-700 text-sm"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
                          >
                            Değişiklikleri Kaydet
                          </button>
                        </form>

                        <form
                          action={deleteItem}
                          className="border-t border-red-900/30 pt-4 mt-2"
                        >
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="submit"
                            className="w-full bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white py-2 rounded transition-colors"
                          >
                            Ürünü Tamamen Sil 🗑️
                          </button>
                        </form>
                      </div>
                    </details>
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
