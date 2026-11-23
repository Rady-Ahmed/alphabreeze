import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\RADY\\.gemini\\antigravity\\brain\\b17b89bb-36f3-4783-a06b-0096d60f9b4c';
const TARGET_URL = 'https://alphabreeze.vercel.app';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'tablet', width: 768, height: 1024, isMobile: true },
  { name: 'mobile_large', width: 390, height: 844, isMobile: true },
  { name: 'mobile_small', width: 375, height: 812, isMobile: true },
];

async function runAudit() {
  console.log('🚀 Starting Comprehensive UI/UX Responsiveness & Visual Audit on:', TARGET_URL);
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const auditReport = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`📱 Auditing Viewport: ${vp.name.toUpperCase()} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.isMobile
    });

    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleMessages.push(msg.text());
    });

    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
      console.warn('Navigation note (timed out or slow):', e.message);
    }

    // Wait a brief moment for animations/fonts to settle
    await new Promise(r => setTimeout(r, 2000));

    // 1. Check Horizontal Overflow
    const overflowInfo = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const bodyScrollW = document.body.scrollWidth;
      const hasOverflow = scrollW > docW || bodyScrollW > docW;

      const overflowingElements = [];
      if (hasOverflow) {
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docW + 1) {
            overflowingElements.push({
              tag: el.tagName,
              id: el.id,
              className: el.className ? String(el.className).substring(0, 50) : '',
              right: Math.round(rect.right),
              excess: Math.round(rect.right - docW)
            });
          }
        });
      }

      return {
        clientWidth: docW,
        scrollWidth: Math.max(scrollW, bodyScrollW),
        hasHorizontalOverflow: hasOverflow,
        overflowingCount: overflowingElements.length,
        samples: overflowingElements.slice(0, 5)
      };
    });

    console.log(`- Document Width: ${overflowInfo.clientWidth}px | Scroll Width: ${overflowInfo.scrollWidth}px`);
    console.log(`- Horizontal Page Overflow: ${overflowInfo.hasHorizontalOverflow ? '❌ YES (Defect!)' : '✅ NO (Perfect)'}`);
    if (overflowInfo.hasHorizontalOverflow) {
      console.log('  ⚠️ Overflowing Elements samples:', JSON.stringify(overflowInfo.samples, null, 2));
    }

    // 2. Check Text Overlaps and Heading Heights
    const typographyAudit = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      const textIssues = [];

      headings.forEach(h => {
        const rect = h.getBoundingClientRect();
        const style = window.getComputedStyle(h);
        const fontSize = parseFloat(style.fontSize);
        const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.2;

        // Check if element has zero or negative height or clipped
        if (rect.height < fontSize * 0.8 && rect.width > 0) {
          textIssues.push({
            tag: h.tagName,
            text: h.innerText.substring(0, 30),
            issue: 'Height smaller than font size (possible overlap/clip)',
            height: rect.height,
            fontSize: fontSize
          });
        }
      });

      return {
        totalHeadingsChecked: headings.length,
        issuesFound: textIssues.length,
        issues: textIssues
      };
    });

    console.log(`- Headings Audited: ${typographyAudit.totalHeadingsChecked}`);
    console.log(`- Typography Collisions / Clip Issues: ${typographyAudit.issuesFound === 0 ? '✅ NONE (Clean)' : `❌ ${typographyAudit.issuesFound} Issues`}`);

    // 3. Check Mobile Menu Toggle if mobile
    let mobileMenuWorking = null;
    if (vp.isMobile) {
      try {
        const menuBtn = await page.$('header button[aria-label="القائمة الرئيسية"]');
        if (menuBtn) {
          await menuBtn.click();
          await new Promise(r => setTimeout(r, 500));
          const navDrawer = await page.$('header div.lg\\:hidden');
          mobileMenuWorking = !!navDrawer;
          console.log(`- Mobile Navigation Menu Toggle: ${mobileMenuWorking ? '✅ Works (Drawer opened)' : '❌ Failed to open'}`);
          // Close menu
          await menuBtn.click();
          await new Promise(r => setTimeout(r, 300));
        } else {
          console.log('- Mobile Menu Button: Not found');
        }
      } catch (e) {
        console.warn('Mobile menu test error:', e.message);
      }
    }

    // 4. Capture Screenshot
    const screenshotPath = path.join(ARTIFACT_DIR, `audit-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Captured Viewport Screenshot: audit-${vp.name}.png`);

    auditReport.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      overflow: overflowInfo.hasHorizontalOverflow,
      scrollWidth: overflowInfo.scrollWidth,
      clientWidth: overflowInfo.clientWidth,
      typographyIssues: typographyAudit.issuesFound,
      mobileMenu: mobileMenuWorking,
      screenshot: screenshotPath
    });

    await page.close();
  }

  await browser.close();

  console.log('\n========================================');
  console.log('🏁 FINAL AUDIT SUMMARY');
  console.log('========================================');
  console.log(JSON.stringify(auditReport, null, 2));

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'responsiveness_audit_results.json'),
    JSON.stringify(auditReport, null, 2)
  );
}

runAudit().catch(console.error);
