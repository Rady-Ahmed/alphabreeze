import { MetadataRoute } from "next";
import { getProducts } from "@/lib/db";
import { B2B_CATEGORIES } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://alphabreeze.vercel.app";
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = B2B_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/shop?category=${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // Dynamic Product Pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    if (products && products.length > 0) {
      productPages = products.map((p: any) => ({
        url: `${baseUrl}/shop/${p.id}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error("Error generating product sitemap entries:", e);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
