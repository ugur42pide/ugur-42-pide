import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Uğur 42 Pide | Dalyan Pide, Etliekmek ve Konya Usulü Pide",
  description:
    "Dalyan'ın en meşhur pidecisi Uğur 42 Pide! Odun ateşinde gerçek Konya usulü etliekmek, bıçakarası, lahmacun ve çıtır pideler. Paket servisimiz vardır.",
  keywords:
    "Dalyan pide, etliekmek, Konya usulü pide, lahmacun, bıçakarası, mevlana pide, pide siparişi, Uğur 42 pide, en iyi pideci, İzmir Dalyan pideci",
  openGraph: {
    title: "Uğur 42 Pide | Odun Ateşinde Lezzet",
    description:
      "Gerçek Konya usulü etliekmek ve çıtır pideler için doğru adres.",
    url: "https://ugur42pide.com",
    siteName: "Uğur 42 Pide",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* Koyu siyah arka plan ve beyaz metin rengini tüm siteye uyguluyoruz */}
      <body
        className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        {/* Main etiketi içeriğin arasına esneklik katar, footer'ı aşağı iter */}
        <main className="grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
