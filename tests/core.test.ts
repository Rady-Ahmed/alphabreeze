import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { signSessionToken, verifySessionToken } from "../src/lib/session.ts";
import { calculateShipping, generateOrderNumber, formatPrice } from "../src/lib/constants.ts";
import {
  contactFormSchema,
  checkoutFormSchema,
  manufacturingFormSchema,
  loginFormSchema,
} from "../src/lib/validations.ts";

describe("Session HMAC signing & verification", () => {
  it("signs and verifies a valid session token", async () => {
    const token = await signSessionToken({
      email: "admin@alphabreeze.com",
      name: "Admin",
      role: "super_admin",
    });
    const payload = await verifySessionToken(token);
    assert.ok(payload);
    assert.equal(payload.email, "admin@alphabreeze.com");
    assert.equal(payload.role, "super_admin");
  });

  it("rejects a tampered or malformed token", async () => {
    const token = await signSessionToken({
      email: "admin@alphabreeze.com",
      name: "Admin",
      role: "super_admin",
    });
    const tampered = token.slice(0, -4) + "AAAA";
    assert.equal(await verifySessionToken(tampered), null);
    assert.equal(await verifySessionToken("invalid-token"), null);
    assert.equal(await verifySessionToken(null), null);
  });
});

describe("Shipping & order helpers", () => {
  it("calculates free shipping for orders >= 1000 EGP", () => {
    assert.equal(calculateShipping("القاهرة", 1000), 0);
    assert.equal(calculateShipping("أسوان", 1500), 0);
  });

  it("calculates regional shipping tiers accurately", () => {
    assert.equal(calculateShipping("القاهرة", 500), 45);
    assert.equal(calculateShipping("الإسكندرية", 500), 55);
    assert.equal(calculateShipping("أسيوط", 500), 70);
  });

  it("generates valid AB- prefixed order numbers and formats price", () => {
    const orderNo = generateOrderNumber();
    assert.match(orderNo, /^AB-[A-Z0-9]+$/);
    assert.ok(formatPrice(500).includes("ج.م"));
  });
});

describe("Zod validation schemas", () => {
  it("validates contact form inputs", () => {
    const valid = contactFormSchema.safeParse({
      full_name: "أحمد محمد",
      phone: "01012345678",
      email: "ahmed@example.com",
      message: "أحتاج عرض سعر لخامة هيالورونيك أسيد",
    });
    assert.equal(valid.success, true);

    const invalid = contactFormSchema.safeParse({
      full_name: "أ",
      phone: "123",
      message: "قصير",
    });
    assert.equal(invalid.success, false);
  });

  it("validates checkout and manufacturing schemas", () => {
    const checkout = checkoutFormSchema.safeParse({
      full_name: "مصنع النور",
      phone: "01019946409",
      governorate: "القاهرة",
      city: "مدينة نصر",
      address: "المنطقة الصناعية قطعة 14",
      payment_method: "cod",
    });
    assert.equal(checkout.success, true);

    const mfg = manufacturingFormSchema.safeParse({
      full_name: "سارة علي",
      phone: "01119446474",
      company_name: "معمل أمل",
    });
    assert.equal(mfg.success, true);

    const badLogin = loginFormSchema.safeParse({
      email: "not-an-email",
      password: "123",
    });
    assert.equal(badLogin.success, false);
  });
});
