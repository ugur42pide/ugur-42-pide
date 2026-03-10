import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Sadece /admin sayfasına girmeye çalışanları denetle
  if (url.pathname.startsWith('/admin')) {
    // Şifre kontrolü (ugur ve 4242 kelimelerinin şifrelenmiş hali)
    if (basicAuth === 'Basic dWd1cjo0MjQy') {
      return NextResponse.next(); // Geçişe izin ver
    }

    // Şifre yoksa veya yanlışsa kapıdan çevir ve şifre sor
    return new NextResponse('Bu alana girmeye yetkiniz yok.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Yonetim Paneli"',
      },
    });
  }
}