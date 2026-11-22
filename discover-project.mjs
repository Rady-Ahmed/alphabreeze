// Try to discover Supabase project URL by testing the new sb_publishable_ keys
// against Supabase's global auth API and common project ref patterns
import https from 'https';

const ANON_KEY = 'sb_publishable_kjvW3WGGrLUJ33u7_hPYZQ_A32Nvg1E';
const SERVICE_KEY = 'sb_publishable_WtnXYkS_3kpYaZXtnSzcyQ_p8S4SWGY';

function request(hostname, path, key) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      port: 443,
      path,
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

async function main() {
  console.log('🔍 محاولة اكتشاف Project URL...\n');

  // Test 1: Try Supabase global API with the new key format
  // The new sb_ keys work with api.supabase.com
  try {
    const r = await request('api.supabase.com', '/v1/projects', ANON_KEY);
    console.log(`api.supabase.com/v1/projects (anon): HTTP ${r.status}`);
    if (r.status === 200) console.log(r.body.substring(0, 500));
    else console.log(r.body.substring(0, 200));
  } catch(e) {
    console.log(`api.supabase.com: ${e.message}`);
  }

  // Test 2: Try with service key
  try {
    const r = await request('api.supabase.com', '/v1/projects', SERVICE_KEY);
    console.log(`\napi.supabase.com/v1/projects (service): HTTP ${r.status}`);
    if (r.status === 200) {
      const data = JSON.parse(r.body);
      console.log('✅ Projects found!');
      data.forEach(p => {
        console.log(`  - ID: ${p.id} | Name: ${p.name} | Region: ${p.region} | Status: ${p.status}`);
        console.log(`    URL: https://${p.id}.supabase.co`);
      });
    } else {
      console.log(r.body.substring(0, 300));
    }
  } catch(e) {
    console.log(`api.supabase.com (service): ${e.message}`);
  }

  // Test 3: Try supabase.com management API
  try {
    const r = await request('api.supabase.com', '/v1/profile', SERVICE_KEY);
    console.log(`\n/v1/profile: HTTP ${r.status}: ${r.body.substring(0, 200)}`);
  } catch(e) {
    console.log(`/v1/profile: ${e.message}`);
  }
}

main().catch(console.error);
