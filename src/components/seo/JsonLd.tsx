export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alpha Breeze Chemicals",
    "alternateName": ["AlphaBreeze", "ألفا بريز للمواد الخام الكيميائية"],
    "url": "https://alphabreeze.vercel.app",
    "logo": "https://alphabreeze.vercel.app/logo.png",
    "description": "شركة رائدة في توريد وتوزيع المواد الخام الكيميائية ومكونات مستحضرات التجميل والزيوت والمستخلصات الطبيعية في مصر والشرق الأوسط.",
    "telephone": "+201119446474",
    "email": "info@alphabreeze.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس",
      "addressLocality": "القاهرة",
      "addressCountry": "EG"
    },
    "sameAs": [
      "https://wa.me/201019946409"
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Alpha Breeze Chemicals",
    "url": "https://alphabreeze.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://alphabreeze.vercel.app/shop?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
