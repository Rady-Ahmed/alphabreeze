import { NextResponse } from "next/server";
import { createOrderForDashboard } from "@/lib/db-server";
import { generateOrderNumber, calculateShipping } from "@/lib/constants";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.unit_price) || 0) * (Number(item.quantity) || 1), 0);
    const shippingCost = calculateShipping(customer.governorate, subtotal);
    const total = subtotal + shippingCost;

    const orderData = {
      order_number: orderNumber,
      full_name: customer.full_name,
      phone: customer.phone,
      governorate: customer.governorate,
      city: customer.city,
      address: customer.address,
      notes: customer.notes || "",
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_method: paymentMethod || "cod",
      status: "new",
    };

    const orderItems = items.map((item: any) => ({
      product_id: item.product_id || null,
      product_name: item.product_name,
      product_image: item.product_image || "",
      quantity: Number(item.quantity || 1),
      unit_price: Number(item.unit_price || 0),
      total_price: (Number(item.unit_price) || 0) * (Number(item.quantity) || 1),
    }));

    const order = await createOrderForDashboard(orderData, orderItems);

    // Send notification emails directly
    try {
      const fullOrder = { ...order, items: orderItems };
      await sendOrderConfirmation(fullOrder);
      await sendAdminOrderNotification(fullOrder);
    } catch (e) {
      console.warn("Failed to send email notifications:", e);
    }

    return NextResponse.json({ success: true, order: { ...order, order_number: orderNumber } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "حدث خطأ" }, { status: 500 });
  }
}
