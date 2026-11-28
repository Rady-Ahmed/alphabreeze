import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/session';

// ── In-Memory Sliding Window Rate Limiter ─────────────────────────
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up old entries every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function isRateLimited(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();

  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
    lastCleanup = now;
  }

  const record = rateLimitStore.get(ip);
  if (!record || record.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  record.count += 1;
  return record.count > maxRequests;
}

// ── Suspicious Patterns & Bot Detection ────────────────────────────
const BLOCKED_USER_AGENTS = [
  'sqlmap', 'nikto', 'wpscan', 'acunetix', 'masscan', 'zgrab',
  'nmap', 'nessus', 'openvas', 'havij', 'dirbuster', 'gobuster'
];

const SUSPICIOUS_PATHS = [
  '.env', 'wp-login', 'wp-admin', 'phpinfo', 'eval(', 'union select',
  '/etc/passwd', 'cmd.exe', '..', '.git', 'xmlrpc.php', 'cgi-bin'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  
  // Get Client IP (Vercel / Cloudflare / Standard Forwarded)
  const clientIp = 
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  // 1. Block Malicious Scanners & Bots
  for (const bot of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(bot)) {
      return new NextResponse(
        JSON.stringify({ error: 'Access denied: Automated security scanner detected' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 2. Block Path Traversal & Common Exploit Probes
  const lowerPath = pathname.toLowerCase();
  for (const pattern of SUSPICIOUS_PATHS) {
    if (lowerPath.includes(pattern)) {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden request path' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 3. High-Traffic / DDoS Rate Limiting
  // - API routes & mutation endpoints: max 30 req / minute
  // - Static and general pages: max 150 req / minute
  const isApi = pathname.startsWith('/api/');
  const maxLimit = isApi ? 30 : 150;
  const windowTime = 60 * 1000; // 1 minute

  if (isRateLimited(`${clientIp}:${isApi ? 'api' : 'web'}`, maxLimit, windowTime)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests. Please slow down.',
        retryAfter: 60,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }

  // 4. CSRF / Origin Verification for Mutations (POST, PUT, DELETE, PATCH)
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method) && isApi) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    if (origin) {
      try {
        const originHost = new URL(origin).host;
        const isAllowed = 
          originHost === host ||
          originHost.includes('vercel.app') ||
          originHost.includes('alphabreeze') ||
          originHost.includes('localhost');

        if (!isAllowed) {
          return new NextResponse(
            JSON.stringify({ error: 'Invalid origin or cross-site request forgery detected' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch {
        return new NextResponse(
          JSON.stringify({ error: 'Malformed origin header' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  }

  // 5. Admin Authentication Guard (Verified HMAC Session Token)
  const sessionCookie = request.cookies.get('alphabreeze_session');
  const isAdminRoute = pathname.startsWith('/admin');
  if (isAdminRoute) {
    const session = await verifySessionToken(sessionCookie?.value);
    if (!pathname.startsWith('/admin/login') && !session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (pathname.startsWith('/admin/login') && session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 6. Security Headers Injection on All Responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, svgs (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
