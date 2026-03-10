import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  // 1. Sadece ortam değişkenlerinden (.env veya Railway) alıyoruz. Yedek şifre YOK!
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  // 2. Çok Önemli Güvenlik Önlemi: Eğer şifreler ayarlanmamışsa sistemi kilitle!
  if (!username || !password) {
    return new NextResponse('Sistem Hatası: Yönetici giriş bilgileri sunucuda tanımlanmamış.', { 
      status: 500 
    });
  }

  // 3. Bilgileri birleştirip Base64 formatına çeviriyoruz
  const expectedAuth = `Basic ${btoa(`${username}:${password}`)}`;

  // 4. Şifre kontrolü
  if (basicAuth === expectedAuth) {
    return NextResponse.next(); // Şifre doğru, kapıyı aç
  }

  // Şifre yanlışsa veya yoksa anında şifre ekranını fırlat
  return new NextResponse('Uğur 42 Pide Yönetim Paneline girmek için yetkiniz yok.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Yonetim Paneli"',
    },
  });
}

// DİKKAT: Sistemin bu kilidi sadece /admin sayfasında kullanmasını zorunlu kılıyoruz
export const config = {
  matcher: ['/admin/:path*'],
};