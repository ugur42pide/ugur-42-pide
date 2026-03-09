"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Alanı Güncellendi */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Uğur 42 Pide Logo"
              className="w-auto h-12 sm:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Masaüstü Menü */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/menu"
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              Menü
            </Link>
            <Link
              href="/iletisim"
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              İletişim
            </Link>
            <a
              href="https://wa.me/905462154235"
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105"
            >
              Sipariş Ver
            </a>
          </div>

          {/* Mobil Hamburger Butonu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-8 w-8 text-red-600" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü İçeriği */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 absolute w-full">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col text-center">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-lg text-white hover:text-red-500"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/menu"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-lg text-white hover:text-red-500"
            >
              Menü
            </Link>
            <Link
              href="/iletisim"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-lg text-white hover:text-red-500"
            >
              İletişim
            </Link>
            <a
              href="https://wa.me/905462154235"
              target="_blank"
              rel="noreferrer"
              className="block mx-4 mt-4 bg-red-600 text-white px-3 py-3 rounded-md font-bold"
            >
              WhatsApp Sipariş
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
