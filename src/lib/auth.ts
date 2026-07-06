/**
 * Auth utility — simple but secure enough for a demo/self-hosted admin panel.
 * Passwords are hashed with SHA-256 (via Web Crypto) before storage.
 */

const ADMIN_KEY = "alphabreeze_admin_credentials";
const SESSION_KEY = "alphabreeze_current_user";

/** SHA-256 hash (browser native, no deps) */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Initialise default credentials on first run (async — hashes the password properly) */
export async function initCredentials(): Promise<void> {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(ADMIN_KEY);
  if (!existing) {
    const defaultHash = await hashPassword("Admin@2024");
    localStorage.setItem(
      ADMIN_KEY,
      JSON.stringify({
        email: "admin@alphabreeze.com",
        passwordHash: defaultHash,
        name: "المدير العام",
        role: "super_admin",
      })
    );
  }
}

/** Attempt login — returns user object or null */
export async function attemptLogin(
  email: string,
  password: string
): Promise<{ name: string; email: string; role: string } | null> {
  if (typeof window === "undefined") return null;

  await initCredentials();

  const stored = localStorage.getItem(ADMIN_KEY);
  if (!stored) return null;

  const creds = JSON.parse(stored);
  if (creds.email !== email) return null;

  const hash = await hashPassword(password);
  if (hash !== creds.passwordHash) return null;

  return { name: creds.name, email: creds.email, role: creds.role };
}

/** Change password — verifies old password first */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; message: string }> {
  if (typeof window === "undefined") return { ok: false, message: "غير متاح" };

  const stored = localStorage.getItem(ADMIN_KEY);
  if (!stored) return { ok: false, message: "لم يتم العثور على بيانات المستخدم" };

  const creds = JSON.parse(stored);
  const currentHash = await hashPassword(currentPassword);

  if (currentHash !== creds.passwordHash) {
    return { ok: false, message: "كلمة المرور الحالية غير صحيحة" };
  }

  if (newPassword.length < 8) {
    return { ok: false, message: "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل" };
  }

  const newHash = await hashPassword(newPassword);
  localStorage.setItem(ADMIN_KEY, JSON.stringify({ ...creds, passwordHash: newHash }));
  return { ok: true, message: "تم تغيير كلمة المرور بنجاح ✓" };
}

/** Get stored credentials (without hash) */
export function getAdminInfo(): { email: string; name: string; role: string } | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(ADMIN_KEY);
  if (!stored) return null;
  const { email, name, role } = JSON.parse(stored);
  return { email, name, role };
}

/** Update admin name / email */
export function updateAdminProfile(updates: { name?: string; email?: string }) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(ADMIN_KEY);
  if (!stored) return;
  const creds = JSON.parse(stored);
  const updated = { ...creds, ...updates };
  localStorage.setItem(ADMIN_KEY, JSON.stringify(updated));

  // Also update session
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    const user = JSON.parse(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, ...updates }));
  }
}

/** Reset password to a new value WITHOUT verifying old (super-admin only) */
export async function resetPassword(newPassword: string) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(ADMIN_KEY);
  if (!stored) return;
  const creds = JSON.parse(stored);
  const newHash = await hashPassword(newPassword);
  localStorage.setItem(ADMIN_KEY, JSON.stringify({ ...creds, passwordHash: newHash }));
}
