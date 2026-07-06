/**
 * Email Service using Resend
 * Set RESEND_API_KEY in .env.local to enable
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "AlphaBreeze <noreply@alphabreeze.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@alphabreeze.com";

export const isEmailConfigured = !!RESEND_API_KEY;

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!RESEND_API_KEY) {
    console.log("[Email] Resend not configured. Skipping email to:", to, "Subject:", subject);
    return null;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[Email] Failed to send:", err);
    return null;
  }

  return await response.json();
}

// ============================================
// ORDER CONFIRMATION (to customer)
// ============================================
export async function sendOrderConfirmation(order: any) {
  const itemsHtml = (order.items || [])
    .map(
      (item: any) =>
        `<tr>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:right">${item.product_name}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:left">${item.total_price} ج.م</td>
        </tr>`
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head><meta charset="UTF-8"></head>
    <body style="font-family:'Segoe UI',Tahoma,sans-serif;background:#f8fafc;padding:20px;margin:0">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05)">
        <div style="background:linear-gradient(135deg,#0ea5e9,#0f1642);padding:30px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">AlphaBreeze</h1>
          <p style="color:rgba(255,255,255,0.8);margin:5px 0 0">شكراً لطلبك! 🎉</p>
        </div>
        <div style="padding:30px">
          <h2 style="color:#0f1642;margin:0 0 20px">تأكيد الطلب #${order.order_number}</h2>
          <p style="color:#64748b">عزيزنا <strong>${order.full_name}</strong>،</p>
          <p style="color:#64748b">تم استلام طلبك بنجاح وسيتم مراجعته في أقرب وقت.</p>
          
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <thead>
              <tr style="background:#f1f5f9">
                <th style="padding:12px;text-align:right;color:#334155">المنتج</th>
                <th style="padding:12px;text-align:center;color:#334155">الكمية</th>
                <th style="padding:12px;text-align:left;color:#334155">المبلغ</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <div style="background:#f8fafc;border-radius:12px;padding:16px;margin:20px 0">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:#64748b">المجموع الفرعي:</span>
              <strong>${order.subtotal} ج.م</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:#64748b">الشحن:</span>
              <strong>${order.shipping_cost || 0} ج.م</strong>
            </div>
            <hr style="border:0;border-top:1px solid #e2e8f0;margin:12px 0">
            <div style="display:flex;justify-content:space-between">
              <span style="color:#0f1642;font-size:18px;font-weight:bold">الإجمالي:</span>
              <strong style="color:#0ea5e9;font-size:18px">${order.total} ج.م</strong>
            </div>
          </div>

          <div style="background:#f0f9ff;border-radius:12px;padding:16px;border:1px solid #bae6fd">
            <h3 style="color:#0369a1;margin:0 0 8px">📍 عنوان التوصيل</h3>
            <p style="color:#334155;margin:4px 0">${order.full_name}</p>
            <p style="color:#334155;margin:4px 0">${order.phone}</p>
            <p style="color:#334155;margin:4px 0">${order.address}, ${order.city}, ${order.governorate}</p>
          </div>
        </div>
        <div style="background:#f8fafc;padding:20px;text-align:center;border-top:1px solid #e2e8f0">
          <p style="color:#94a3b8;margin:0;font-size:13px">لأي استفسار تواصل معنا: 01119446474</p>
          <p style="color:#94a3b8;margin:5px 0 0;font-size:12px">© ${new Date().getFullYear()} AlphaBreeze</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to customer (if they provided an email)
  if (order.email) {
    await sendEmail({ to: order.email, subject: `تأكيد الطلب #${order.order_number} - AlphaBreeze`, html });
  }

  return html;
}

// ============================================
// ADMIN NOTIFICATION (new order)
// ============================================
export async function sendAdminOrderNotification(order: any) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head><meta charset="UTF-8"></head>
    <body style="font-family:'Segoe UI',Tahoma,sans-serif;background:#f8fafc;padding:20px">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05)">
        <div style="background:linear-gradient(135deg,#059669,#047857);padding:24px;text-align:center">
          <h2 style="color:#fff;margin:0">🛒 طلب جديد!</h2>
        </div>
        <div style="padding:24px">
          <p style="color:#334155;font-size:16px"><strong>رقم الطلب:</strong> ${order.order_number}</p>
          <p style="color:#334155"><strong>العميل:</strong> ${order.full_name}</p>
          <p style="color:#334155"><strong>الهاتف:</strong> ${order.phone}</p>
          <p style="color:#334155"><strong>المبلغ:</strong> <span style="color:#059669;font-weight:bold">${order.total} ج.م</span></p>
          <p style="color:#334155"><strong>طريقة الدفع:</strong> ${order.payment_method === "cod" ? "دفع عند الاستلام" : order.payment_method}</p>
          <p style="color:#334155"><strong>العنوان:</strong> ${order.address || ""}, ${order.city || ""}, ${order.governorate || ""}</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://alphabreeze.com"}/admin/orders" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">عرض الطلب في لوحة التحكم</a>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: `🛒 طلب جديد #${order.order_number} - ${order.total} ج.م`, html });
}

// ============================================
// ADMIN NOTIFICATION (new contact message)
// ============================================
export async function sendAdminContactNotification(message: any) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head><meta charset="UTF-8"></head>
    <body style="font-family:'Segoe UI',Tahoma,sans-serif;background:#f8fafc;padding:20px">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05)">
        <div style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:24px;text-align:center">
          <h2 style="color:#fff;margin:0">📩 رسالة جديدة</h2>
        </div>
        <div style="padding:24px">
          <p><strong>الاسم:</strong> ${message.full_name}</p>
          <p><strong>الهاتف:</strong> ${message.phone || "-"}</p>
          <p><strong>البريد:</strong> ${message.email || "-"}</p>
          <p><strong>الموضوع:</strong> ${message.subject || "-"}</p>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;margin:16px 0;border-right:4px solid #f59e0b">
            <p style="color:#334155;white-space:pre-wrap">${message.message}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://alphabreeze.com"}/admin/messages" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none">الرد من لوحة التحكم</a>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: `📩 رسالة جديدة من ${message.full_name}`, html });
}

// ============================================
// ADMIN NOTIFICATION (new manufacturing request)
// ============================================
export async function sendAdminManufacturingNotification(request: any) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head><meta charset="UTF-8"></head>
    <body style="font-family:'Segoe UI',Tahoma,sans-serif;background:#f8fafc;padding:20px">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.05)">
        <div style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);padding:24px;text-align:center">
          <h2 style="color:#fff;margin:0">🏭 طلب تصنيع جديد</h2>
        </div>
        <div style="padding:24px">
          <p><strong>الاسم:</strong> ${request.full_name}</p>
          <p><strong>الشركة:</strong> ${request.company_name || "-"}</p>
          <p><strong>الهاتف:</strong> ${request.phone}</p>
          <p><strong>نوع المنتج:</strong> ${request.product_type || "-"}</p>
          <p><strong>الكمية المتوقعة:</strong> ${request.expected_quantity || "-"}</p>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;margin:16px 0;border-right:4px solid #8b5cf6">
            <p style="color:#334155;white-space:pre-wrap">${request.project_details || "لم يتم إضافة تفاصيل"}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://alphabreeze.com"}/admin/manufacturing" style="display:inline-block;background:#0ea5e9;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none">عرض في لوحة التحكم</a>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject: `🏭 طلب تصنيع جديد من ${request.full_name}`, html });
}
