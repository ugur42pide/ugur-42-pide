import { Phone, MapPin, MessageCircle } from "lucide-react";

export default function IletisimPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Bize <span className="text-red-600">Ulaşın</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          Siparişleriniz veya sorularınız için buradayız.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* İletişim Bilgileri */}
        <div className="space-y-8 bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
          <div className="flex items-start gap-4">
            <div className="bg-neutral-800 p-3 rounded-full">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Sabit Hat (Hemen Ara)
              </h3>
              <a
                href="tel:02327247885"
                className="text-neutral-300 hover:text-red-500 transition-colors text-lg"
              >
                0232 724 78 85
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-neutral-800 p-3 rounded-full">
              <MessageCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                WhatsApp Sipariş Hattı
              </h3>
              <a
                href="https://wa.me/905462154235"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300 hover:text-green-500 transition-colors text-lg"
              >
                0546 215 42 35
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-neutral-800 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Adresimiz</h3>
              <p className="text-neutral-300 text-lg">İzmir, Türkiye</p>
              <p className="text-neutral-500 text-sm mt-1">
                (Detaylı açık adresinizi buraya yazabilirsiniz)
              </p>
            </div>
          </div>
        </div>

        {/* Harita Alanı (Placeholder) */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden flex items-center justify-center min-h-100 relative group">
          {/* Gelecekte buraya Google Maps Iframe kodunu yapıştırabilirsiniz */}
          <div className="absolute inset-0 bg-neutral-800 flex flex-col items-center justify-center">
            <MapPin className="h-12 w-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-neutral-400 font-medium">
              Google Haritalar Görünümü (Placeholder)
            </p>
            <p className="text-neutral-600 text-sm mt-2">
              Iframe kodunuzu buraya ekleyin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
