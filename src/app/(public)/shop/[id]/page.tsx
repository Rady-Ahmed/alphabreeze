"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Minus, Plus, CreditCard, Truck, Shield, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { getProduct, getProducts } = await import("@/lib/db");
        const data = await getProduct(resolvedParams.id);
        if (data) {
          const mapped = {
            ...data,
            id: String(data.id),
            name: data.name_ar || data.name,
            category: typeof data.category === 'object' && data.category ? data.category.name_ar : data.category,
            price: data.price,
            oldPrice: null, // Update this if you have oldPrice in DB
            discount: 0,
            description: data.description_ar || data.description,
            usage: "", // Add to DB if needed
            specs: {},
            images: data.images?.length > 0 ? data.images.map((img: any) => img.image_url) : [data.og_image_url || data.image || (data.sku ? data.sku.split('-')[0] : "📦")],
            emoji: data.sku ? data.sku.split('-')[0] : data.emoji || "📦",
            sku: data.sku,
            inStock: data.stock_quantity > 0,
          };
          setProduct(mapped);

          // load related products
          const allProducts = await getProducts();
          if (allProducts) {
            const mappedRelated = allProducts
              .filter((p: any) => p.id !== data.id)
              .slice(0, 4)
              .map((p: any) => ({
                id: String(p.id),
                name: p.name_ar || p.name,
                price: p.price,
                emoji: p.sku ? p.sku.split('-')[0] : p.emoji || "📦",
                image: p.og_image_url || p.image || null,
              }));
            setRelatedProducts(mappedRelated);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (resolvedParams.id) {
      loadProduct();
    }
  }, [resolvedParams.id]);

  const handleAddToCart = (redirect: boolean = false) => {
    if (!product) return;
    try {
      const cart = JSON.parse(localStorage.getItem('alphabreeze_cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        existingItem.qty += quantity;
      } else {
        cart.push({ ...product, qty: quantity, image: product.images[0] });
      }
      
      localStorage.setItem('alphabreeze_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart_updated'));
      
      if (redirect) {
        router.push('/checkout');
      } else {
        toast.success(`تم إضافة ${quantity} من ${product.name} إلى السلة بنجاح`);
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء إضافة المنتج للسلة");
    }
  };

  if (loading) return <div className="flex justify-center items-center py-40"><div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!product) return <div className="text-center py-40 text-xl font-bold text-gray-500">المنتج غير موجود</div>;

  return (
    <section className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-sky-500">الرئيسية</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-sky-500">المتجر</Link>
          <span>/</span>
          <span className="text-navy-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center mb-4 border border-gray-100 overflow-hidden relative">
              {product.images[selectedImage]?.startsWith('http') ? (
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              ) : (
                <span className="text-8xl">{product.images[selectedImage]}</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 shrink-0 rounded-xl bg-sky-50 flex items-center justify-center border-2 transition-all overflow-hidden ${selectedImage === i ? "border-sky-500" : "border-transparent"}`}
                  >
                    {img?.startsWith('http') ? (
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">{img}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-navy-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-400">كود: {product.sku}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-sky-600">{product.price} ج.م</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{product.oldPrice} ج.م</span>
                  <Badge variant="destructive">-{product.discount}%</Badge>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-12 shrink-0 bg-white w-full sm:w-auto">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-navy-900">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 h-full flex items-center justify-center font-bold text-navy-900 border-x border-gray-100">{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-navy-900">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-3 w-full">
                <Button size="lg" variant="outline" onClick={() => handleAddToCart(false)} className="flex-1 h-12 border-sky-200 text-sky-700 bg-sky-50/50 hover:bg-sky-100">
                  <ShoppingBag className="w-5 h-5 ml-2" />
                  أضف للسلة
                </Button>
                <Button size="lg" onClick={() => handleAddToCart(true)} className="flex-1 h-12 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40">
                  <CreditCard className="w-5 h-5 ml-2" />
                  اطلب الآن
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Truck className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                <p className="text-xs text-navy-900 font-medium">شحن سريع</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Shield className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                <p className="text-xs text-navy-900 font-medium">جودة مضمونة</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <RotateCcw className="w-6 h-6 text-sky-500 mx-auto mb-2" />
                <p className="text-xs text-navy-900 font-medium">إرجاع سهل</p>
              </div>
            </div>

            {/* Specs */}
            <div className="pt-4">
              <h3 className="font-bold text-navy-900 mb-3">المواصفات الفنية</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium text-navy-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage */}
            <div className="pt-2">
              <h3 className="font-bold text-navy-900 mb-3">طريقة الاستخدام</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.usage}</p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-navy-900 mb-8 border-b border-gray-100 pb-4">منتجات قد تعجبك</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`} className="block h-full">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group h-full flex flex-col">
                  <div className="aspect-square bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center">
                    {p.image && p.image.startsWith('http') ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => (e.currentTarget.style.display = "none")} />
                    ) : (
                      <span className="text-5xl group-hover:scale-110 transition-transform">{p.emoji}</span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-navy-900 text-sm mb-1 line-clamp-1">{p.name}</h3>
                    <span className="font-bold text-sky-600 text-sm mt-auto pt-2">{p.price} ج.م</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
