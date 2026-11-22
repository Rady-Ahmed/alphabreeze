// Decode new Supabase sb_publishable_ keys to extract project reference
const keys = [
  'sb_publishable_kjvW3WGGrLUJ33u7_hPYZQ_A32Nvg1E',
  'sb_publishable_WtnXYkS_3kpYaZXtnSzcyQ_p8S4SWGY'
];

console.log('🔍 تحليل المفاتيح الجديدة...\n');

for (const key of keys) {
  const payload = key.replace('sb_publishable_', '');
  // Convert base64url to base64
  const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  try {
    const decoded = Buffer.from(b64, 'base64').toString('utf8');
    console.log(`Key: ${key}`);
    console.log(`Decoded (utf8): ${decoded}`);
    console.log(`Decoded (hex): ${Buffer.from(b64, 'base64').toString('hex')}`);
    console.log('---');
  } catch(e) {
    console.log(`Key: ${key} → decode error: ${e.message}`);
  }
}
