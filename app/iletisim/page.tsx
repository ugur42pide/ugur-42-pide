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
              <p className="text-neutral-300 text-lg">
                Dalyan, 4218. Sk. No:59A
              </p>
              <p className="text-neutral-500 text-sm mt-1">
                35900 Çeşme / İzmir
              </p>
            </div>
          </div>
        </div>

        {/* Google Harita Alanı */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative min-h-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186!2d26.3106875!3d38.3556734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bb7bebcc20590d%3A0x2e323f75411b256c!8m2!3d38.3560724!4d26.310707!16s%2Fg%2F11v0m_8qxb?hl=tr"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
