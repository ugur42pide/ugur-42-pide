import MenuItem from "../components/MenuItem";

// Ürünler, fiyatlar ve özel açıklamalar objelere ayrıldı
const menuData = [
  {
    category: "Pideler & Lahmacun",
    items: [
      {
        name: "Etliekmek",
        price: "180 ₺",
        description: "Ustalarımızın özel tarifiyle, çıtır çıtır.",
      },
      {
        name: "Bıçakarası",
        price: "200 ₺",
        description: "Ustalarımızın özel tarifiyle, bol malzemeli.",
      },
      {
        name: "Mevlana",
        price: "190 ₺",
        description: "Ustalarımızın özel tarifiyle.",
      },
      {
        name: "Lahmacun",
        price: "80 ₺",
        description: "Taş fırında pişen çıtır lezzet.",
      },
      {
        name: "Kıymalı Pide",
        price: "170 ₺",
        description: "Ustalarımızın özel tarifiyle.",
      },
      {
        name: "Kıymalı Kaşarlı",
        price: "190 ₺",
        description: "Ustalarımızın özel tarifiyle.",
      },
      {
        name: "Peynirli Pide",
        price: "160 ₺",
        description: "Tam kıvamında peynir şöleni.",
      },
      {
        name: "Töngül Pide",
        price: "180 ₺",
        description: "Özel yöresel lezzet.",
      },
      {
        name: "Kuşbaşılı Pide",
        price: "210 ₺",
        description: "Ustalarımızın özel tarifiyle.",
      },
      {
        name: "Kuşkaş Pide",
        price: "230 ₺",
        description: "Kuşbaşı et ve kaşar uyumu.",
      },
      {
        name: "Pizza Sucuk Kaşar",
        price: "200 ₺",
        description: "Bol malzemeli pide pizza.",
      },
      {
        name: "Pizza Vegan",
        price: "190 ₺",
        description: "Bitkisel içerikli özel lezzet.",
      },
    ],
  },
  {
    category: "Izgaralar & Ekmek Arası",
    items: [
      {
        name: "Ekmek Arası Köfte",
        price: "140 ₺",
        description: "Izgara ateşinde pişmiş leziz köfteler.",
      },
      {
        name: "Ekmek Arası Tavuk",
        price: "120 ₺",
        description: "Özel soslu ızgara tavuk.",
      },
      {
        name: "Ödemiş Köfte",
        price: "180 ₺",
        description: "Tereyağlı, özel pideli Ödemiş köfte.",
      },
      {
        name: "Izgara Köfte",
        price: "170 ₺",
        description: "Porsiyon ızgara köfte, garnitür ile.",
      },
      {
        name: "Kiremitte Köfte",
        price: "190 ₺",
        description: "Kiremitte domates soslu, kaşarlı.",
      },
      {
        name: "Izgara Tavuk Kanat",
        price: "160 ₺",
        description: "Nar gibi kızarmış ızgara kanat.",
      },
      {
        name: "Izgara Tavuk Şiş",
        price: "150 ₺",
        description: "Lokum gibi tavuk şiş.",
      },
      {
        name: "Izgara Tavuk İncik",
        price: "160 ₺",
        description: "Kemiksiz, sulu tavuk incik.",
      },
    ],
  },
  {
    category: "İçecekler",
    items: [
      { name: "Ayran", price: "25 ₺", description: "Soğuk içiniz." },
      {
        name: "Şalgam",
        price: "30 ₺",
        description: "Acılı veya acısız seçenekleriyle.",
      },
      { name: "Kola", price: "35 ₺", description: "Soğuk içiniz." },
      { name: "Fanta", price: "35 ₺", description: "Soğuk içiniz." },
      { name: "Sprite", price: "35 ₺", description: "Soğuk içiniz." },
      { name: "Limonata", price: "35 ₺", description: "Ferahlatıcı lezzet." },
      { name: "Su", price: "10 ₺", description: "Pet şişe." },
    ],
  },
];

export default function MenuPage() {
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
        {menuData.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-red-600 border-b border-neutral-800 pb-2 mb-6 inline-block">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, itemIdx) => (
                <MenuItem
                  key={itemIdx}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
