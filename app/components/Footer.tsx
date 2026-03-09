import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          {/* Yazı yerine Logo eklendi */}
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo.jpg"
              alt="Uğur 42 Pide Logo"
              width={240}
              height={80}
              className="w-auto h-16 object-contain"
              priority
            />
          </Link>
          <p className="text-neutral-400 text-sm">
            Geleneksel lezzetler, modern hizmet anlayışıyla kapınızda.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Hızlı Menü</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/menu"
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                Lezzetlerimiz
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                Bize Ulaşın
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">İletişim</h4>
          <ul className="space-y-2 text-neutral-400">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-600" /> 0232 724 78 85
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-600" /> 0546 215 42 35
              (WhatsApp)
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" /> İzmir, Türkiye
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10 text-neutral-600 text-sm">
        © {new Date().getFullYear()} Uğur 42 Pide. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
