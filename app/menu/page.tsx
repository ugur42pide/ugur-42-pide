import MenuItem from "../components/MenuItem";

const menuData = [
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
      { name: "Limonata", price: "80 ₺", description: "Ferahlatıcı lezzet." },
      { name: "Su", price: "20 ₺", description: "Pet şişe." },
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
