"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export default function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}

      {/* Meta (Facebook) Pixel */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* TikTok Pixel */}
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}

// ============================================
// Tracking Helper Functions
// ============================================

/** Track a purchase event across all platforms */
export function trackPurchase(orderData: {
  value: number;
  currency?: string;
  orderId: string;
  items?: any[];
}) {
  const currency = orderData.currency || "EGP";

  // Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "purchase", {
      transaction_id: orderData.orderId,
      value: orderData.value,
      currency,
      items: orderData.items?.map((item) => ({
        item_name: item.product_name,
        quantity: item.quantity,
        price: item.unit_price,
      })),
    });
  }

  // Meta Pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Purchase", {
      value: orderData.value,
      currency,
      content_ids: orderData.items?.map((item) => item.product_id),
      content_type: "product",
    });
  }

  // TikTok Pixel
  if (typeof window !== "undefined" && (window as any).ttq) {
    (window as any).ttq.track("CompletePayment", {
      value: orderData.value,
      currency,
      contents: orderData.items?.map((item) => ({
        content_id: item.product_id,
        content_name: item.product_name,
        quantity: item.quantity,
        price: item.unit_price,
      })),
    });
  }
}

/** Track add to cart */
export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}) {
  if (typeof window === "undefined") return;

  if ((window as any).gtag) {
    (window as any).gtag("event", "add_to_cart", {
      items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: product.quantity || 1 }],
    });
  }

  if ((window as any).fbq) {
    (window as any).fbq("track", "AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      value: product.price,
      currency: "EGP",
    });
  }

  if ((window as any).ttq) {
    (window as any).ttq.track("AddToCart", {
      contents: [{ content_id: product.id, content_name: product.name, quantity: product.quantity || 1, price: product.price }],
      value: product.price,
      currency: "EGP",
    });
  }
}

/** Track contact form submission */
export function trackContact() {
  if (typeof window === "undefined") return;
  if ((window as any).gtag) (window as any).gtag("event", "generate_lead");
  if ((window as any).fbq) (window as any).fbq("track", "Contact");
  if ((window as any).ttq) (window as any).ttq.track("Contact");
}

/** Track page view (for SPA navigation) */
export function trackPageView(url: string) {
  if (typeof window === "undefined") return;
  if ((window as any).gtag) (window as any).gtag("config", GA_ID, { page_path: url });
  if ((window as any).fbq) (window as any).fbq("track", "PageView");
  if ((window as any).ttq) (window as any).ttq.page();
}
