import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  // Şifre kontrolü (ugur ve 4242)
  if (basicAuth === 'Basic dWd1cjo0MjQy') {
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