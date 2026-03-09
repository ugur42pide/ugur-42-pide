import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uğur 42 Pide | Lezzetin Adresi",
  description:
    "İzmir'in en lezzetli pide, lahmacun ve ızgara çeşitleri Uğur 42 Pide'de.",
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
