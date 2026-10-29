const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateSample6Buttons() {
  const width = 2500;
  const height = 1686;
  
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#334155" stop-opacity="0.9" />
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Grid Divider Lines -->
    <line x1="833" y1="0" x2="833" y2="1686" stroke="#475569" stroke-width="6" />
    <line x1="1667" y1="0" x2="1667" y2="1686" stroke="#475569" stroke-width="6" />
    <line x1="0" y1="843" x2="2500" y2="843" stroke="#475569" stroke-width="6" />

    <!-- Button 1: โปรโมชั่น -->
    <g transform="translate(416, 421)">
      <circle r="140" fill="#f43f5e" opacity="0.2"/>
      <circle r="100" fill="#f43f5e"/>
      <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-size="80" fill="#ffffff" text-anchor="middle" font-weight="bold">%</text>
      <text x="0" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="75" fill="#f8fafc" text-anchor="middle" font-weight="bold">โปรโมชั่น</text>
      <text x="0" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="45" fill="#94a3b8" text-anchor="middle">Special Deals</text>
    </g>

    <!-- Button 2: สินค้าทั้งหมด -->
    <g transform="translate(1250, 421)">
      <circle r="140" fill="#06b6d4" opacity="0.2"/>
      <circle r="100" fill="#06b6d4"/>
      <text x="0" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="70" fill="#ffffff" text-anchor="middle">🛍️</text>
      <text x="0" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="75" fill="#f8fafc" text-anchor="middle" font-weight="bold">สินค้าทั้งหมด</text>
      <text x="0" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="45" fill="#94a3b8" text-anchor="middle">Products</text>
    </g>

    <!-- Button 3: เว็บไซต์ -->
    <g transform="translate(2083, 421)">
      <circle r="140" fill="#3b82f6" opacity="0.2"/>
      <circle r="100" fill="#3b82f6"/>
      <text x="0" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="70" fill="#ffffff" text-anchor="middle">🌐</text>
      <text x="0" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="75" fill="#f8fafc" text-anchor="middle" font-weight="bold">เว็บไซต์</text>
      <text x="0" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="45" fill="#94a3b8" text-anchor="middle">Visit Website</text>
    </g>

    <!-- Button 4: สะสมแต้ม -->
    <g transform="translate(416, 1264)">
      <circle r="140" fill="#eab308" opacity="0.2"/>
      <circle r="100" fill="#eab308"/>
      <text x="0" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="70" fill="#ffffff" text-anchor="middle">⭐</text>
      <text x="0" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="75" fill="#f8fafc" text-anchor="middle" font-weight="bold">สะสมแต้ม</text>
      <text x="0" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="45" fill="#94a3b8" text-anchor="middle">Rewards &amp; Point</text>
    </g>

    <!-- Button 5: ติดต่อเจ้าหน้าที่ -->
    <g transform="translate(1250, 1264)">
      <circle r="140" fill="#10b981" opacity="0.2"/>
      <circle r="100" fill="#10b981"/>
      <text x="0" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="70" fill="#ffffff" text-anchor="middle">💬</text>
      <text x="0" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="75" fill="#f8fafc" text-anchor="middle" font-weight="bold">ติดต่อเจ้าหน้าที่</text>
      <text x="0" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="45" fill="#94a3b8" text-anchor="middle">Contact Admin</text>
    </g>

    <!-- Button 6: คำถามที่พบบ่อย -->
    <g transform="translate(2083, 1264)">
      <circle r="140" fill="#8b5cf6" opacity="0.2"/>
      <circle r="100" fill="#8b5cf6"/>
      <text x="0" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-size="70" fill="#ffffff" text-anchor="middle">❓</text>
      <text x="0" y="230" font-family="DejaVu Sans, Arial, sans-serif" font-size="75" fill="#f8fafc" text-anchor="middle" font-weight="bold">คำถามพบบ่อย</text>
      <text x="0" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-size="45" fill="#94a3b8" text-anchor="middle">FAQ &amp; Help</text>
    </g>
  </svg>
  `;

  const outputPath = path.join(outputDir, 'sample_6_buttons.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ สร้างรูปภาพสำเร็จ: ${outputPath} (ขนาด 2500 x 1686 px)`);
}

async function generateSampleCompact3() {
  const width = 2500;
  const height = 843;
  
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bgGrad2)" />

    <!-- Grid Divider Lines -->
    <line x1="833" y1="0" x2="833" y2="843" stroke="#475569" stroke-width="6" />
    <line x1="1667" y1="0" x2="1667" y2="843" stroke="#475569" stroke-width="6" />

    <!-- Button 1: โปรโมชั่น -->
    <g transform="translate(416, 421)">
      <circle r="120" fill="#f43f5e" opacity="0.2"/>
      <circle r="85" fill="#f43f5e"/>
      <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-size="65" fill="#ffffff" text-anchor="middle" font-weight="bold">%</text>
      <text x="0" y="200" font-family="DejaVu Sans, Arial, sans-serif" font-size="65" fill="#f8fafc" text-anchor="middle" font-weight="bold">โปรโมชั่น</text>
    </g>

    <!-- Button 2: เว็บไซต์ -->
    <g transform="translate(1250, 421)">
      <circle r="120" fill="#3b82f6" opacity="0.2"/>
      <circle r="85" fill="#3b82f6"/>
      <text x="0" y="22" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" fill="#ffffff" text-anchor="middle">🌐</text>
      <text x="0" y="200" font-family="DejaVu Sans, Arial, sans-serif" font-size="65" fill="#f8fafc" text-anchor="middle" font-weight="bold">เว็บไซต์</text>
    </g>

    <!-- Button 3: ติดต่อเรา -->
    <g transform="translate(2083, 421)">
      <circle r="120" fill="#10b981" opacity="0.2"/>
      <circle r="85" fill="#10b981"/>
      <text x="0" y="22" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" fill="#ffffff" text-anchor="middle">💬</text>
      <text x="0" y="200" font-family="DejaVu Sans, Arial, sans-serif" font-size="65" fill="#f8fafc" text-anchor="middle" font-weight="bold">ติดต่อเรา</text>
    </g>
  </svg>
  `;

  const outputPath = path.join(outputDir, 'sample_compact_3.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ สร้างรูปภาพสำเร็จ: ${outputPath} (ขนาด 2500 x 843 px)`);
}

async function run() {
  console.log('🎨 กำลังเรนเดอร์รูปภาพตัวอย่าง Rich Menu...');
  await generateSample6Buttons();
  await generateSampleCompact3();
  console.log('✨ สร้างรูปตัวอย่างเสร็จสมบูรณ์!');
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { generateSample6Buttons, generateSampleCompact3 };
