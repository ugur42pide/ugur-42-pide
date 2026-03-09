import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Gerçek Lezzet, <br />
          <span className="text-red-600">Sıcak Teslimat.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
          Odun ateşinde pişen çıtır pideler, leziz lahmacunlar ve tam kıvamında
          ızgaralar. Siparişinizi verin, lezzet kapınıza gelsin.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
          >
            Menüyü İncele <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="https://wa.me/905462154235"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 border border-neutral-700 hover:border-red-600"
          >
            <MessageCircle className="h-5 w-5 text-green-500" /> WhatsApp'tan
            Sipariş
          </a>
        </div>
      </div>
    </div>
  );
}
