import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured =
  !!supabaseUrl &&
  !!supabaseKey &&
  !supabaseUrl.includes("your-project") &&
  !supabaseKey.includes("your-anon-key");

function createServerSupabase() {
  if (!isConfigured) return null;

  return createClient(supabaseUrl!, supabaseKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function isUuid(value: unknown) {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

export async function createOrderForDashboard(orderData: any, items: any[]) {
  const supabase = createServerSupabase();
  if (!supabase) {
    throw new Error("Supabase غير مهيأ على السيرفر");
  }

  let customerId = null;
  const { data: existingCustomer, error: customerLookupError } = await supabase
    .from("customers")
    .select("id, total_orders, total_spent")
    .eq("phone", orderData.phone)
    .maybeSingle();

  if (customerLookupError) {
    throw new Error(customerLookupError.message);
  }

  if (existingCustomer) {
    customerId = existingCustomer.id;
    const { error } = await supabase
      .from("customers")
      .update({
        full_name: orderData.full_name,
        governorate: orderData.governorate,
        city: orderData.city,
        address: orderData.address,
        total_orders: (existingCustomer.total_orders || 0) + 1,
        total_spent: Number(existingCustomer.total_spent || 0) + Number(orderData.total || 0),
        updated_at: new Date().toISOString(),
      })
      .eq("id", customerId);

    if (error) throw new Error(error.message);
  } else {
    const { data: newCustomer, error } = await supabase
      .from("customers")
      .insert({
        full_name: orderData.full_name,
        phone: orderData.phone,
        email: orderData.email || null,
        governorate: orderData.governorate,
        city: orderData.city,
        address: orderData.address,
        total_orders: 1,
        total_spent: orderData.total,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    customerId = newCustomer?.id || null;
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ ...orderData, customer_id: customerId })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: isUuid(item.product_id) ? item.product_id : null,
    product_name: item.product_name,
    product_image: item.product_image || null,
    quantity: Number(item.quantity || 1),
    unit_price: Number(item.unit_price || 0),
    total_price: Number(item.total_price ?? Number(item.unit_price || 0) * Number(item.quantity || 1)),
  }));

  if (orderItems.length > 0) {
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw new Error(itemsError.message);

    // Auto-deduct stock for products that have a valid UUID
    for (const item of items) {
      if (isUuid(item.product_id)) {
        try {
          const { data: prod } = await supabase
            .from("products")
            .select("stock_quantity")
            .eq("id", item.product_id)
            .single();

          if (prod && typeof prod.stock_quantity === "number") {
            const currentStock = prod.stock_quantity;
            const deduction = Number(item.quantity || 1);
            const updatedStock = Math.max(0, currentStock - deduction);

            await supabase
              .from("products")
              .update({
                stock_quantity: updatedStock,
                updated_at: new Date().toISOString(),
              })
              .eq("id", item.product_id);
          }
        } catch (stockErr) {
          console.warn("Could not decrement stock for product:", item.product_id, stockErr);
        }
      }
    }
  }

  return { ...order, items: orderItems };
}

export async function createMessageForDashboard(message: any) {
  const supabase = createServerSupabase();
  if (!supabase) {
    throw new Error("Supabase غير مهيأ على السيرفر");
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      full_name: message.full_name,
      email: message.email || null,
      phone: message.phone || null,
      subject: message.subject || null,
      message: message.message,
      is_read: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createManufacturingRequestForDashboard(request: any) {
  const supabase = createServerSupabase();
  if (!supabase) {
    throw new Error("Supabase غير مهيأ على السيرفر");
  }

  const { data, error } = await supabase
    .from("manufacturing_requests")
    .insert({
      full_name: request.full_name,
      company_name: request.company_name || null,
      phone: request.phone,
      product_type: request.product_type || null,
      expected_quantity: request.expected_quantity || null,
      project_details: request.project_details || null,
      status: "new",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
