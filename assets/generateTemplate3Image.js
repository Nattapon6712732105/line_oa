const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateTemplate3Image() {
  const width = 2500;
  const height = 1686;
  const halfHeight = 843;

  // 1. สร้าง Base SVG สไตล์ Template 3 (บน 1 แถบยาว, ล่าง 3 ปุ่ม)
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="topBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#451a03" />
        <stop offset="50%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#9a3412" />
      </linearGradient>

      <linearGradient id="btn1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fef3c7" />
        <stop offset="100%" stop-color="#fde68a" />
      </linearGradient>

      <linearGradient id="btn2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ecfdf5" />
        <stop offset="100%" stop-color="#d1fae5" />
      </linearGradient>

      <linearGradient id="btn3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#eff6ff" />
        <stop offset="100%" stop-color="#dbeafe" />
      </linearGradient>

      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
      </filter>

      <filter id="pillShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.2"/>
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="#1c1917" />

    <!-- ==================== TOP BANNER (0, 0, 2500, 843) ==================== -->
    <rect x="0" y="0" width="${width}" height="${halfHeight}" fill="url(#topBannerGrad)" />
    
    <!-- Decorative Warm Food Pattern Elements -->
    <circle cx="200" cy="150" r="280" fill="#ea580c" opacity="0.15" />
    <circle cx="2300" cy="700" r="350" fill="#f59e0b" opacity="0.12" />
    <circle cx="1250" cy="421" r="500" fill="#f97316" opacity="0.08" />

    <!-- Top Banner Content Area -->
    <g transform="translate(620, 421)">
      <!-- Placeholder frame where Logo will be placed at (140, 196) -->
    </g>

    <g transform="translate(1420, 260)">
      <!-- Title -->
      <rect x="-650" y="-80" width="1300" height="90" rx="25" fill="#f97316" opacity="0.25"/>
      <text x="0" y="-18" font-family="DejaVu Sans, Arial, sans-serif" font-size="52" fill="#fed7aa" text-anchor="middle" font-weight="bold">✨ ยินดีต้อนรับสู่ NaEak food 🍲</text>
      
      <!-- Highlight Banner -->
      <text x="0" y="110" font-family="DejaVu Sans, Arial, sans-serif" font-size="82" fill="#ffffff" text-anchor="middle" font-weight="bold">โปรโมชันพิเศษ &amp; สั่งอาหาร</text>
      
      <!-- Discount Badge -->
      <g transform="translate(0, 260)" filter="url(#pillShadow)">
        <rect x="-420" y="-60" width="840" height="110" rx="55" fill="#f59e0b" />
        <text x="0" y="15" font-family="DejaVu Sans, Arial, sans-serif" font-size="46" fill="#78350f" text-anchor="middle" font-weight="bold">🎉 ลูกค้าใหม่ลด 10% | โค้ด: NAEAK10</text>
      </g>
      <text x="0" y="380" font-family="DejaVu Sans, Arial, sans-serif" font-size="38" fill="#fdba74" text-anchor="middle">👉 แตะที่นี่เพื่อดูโปรโมชันหรือสั่งซื้อออนไลน์</text>
    </g>

    <!-- Divider Line between Top and Bottom -->
    <line x1="0" y1="${halfHeight}" x2="${width}" y2="${halfHeight}" stroke="#ffffff" stroke-width="8" opacity="0.3" />

    <!-- ==================== BOTTOM 3 BUTTONS ==================== -->
    <!-- Button 1: เมนูอาหาร (0, 843, 833, 843) -->
    <rect x="0" y="${halfHeight}" width="833" height="${halfHeight}" fill="url(#btn1Grad)" />
    <g transform="translate(416, 1140)">
      <circle r="130" fill="#f59e0b" opacity="0.2"/>
      <circle r="95" fill="#f59e0b" />
      <text x="0" y="30" font-family="DejaVu Sans, Arial, sans-serif" font-size="95" fill="#ffffff" text-anchor="middle">🍲</text>
    </g>
    <g transform="translate(416, 1420)">
      <rect x="-240" y="-55" width="480" height="95" rx="30" fill="#78350f" filter="url(#pillShadow)"/>
      <text x="0" y="10" font-family="DejaVu Sans, Arial, sans-serif" font-size="52" fill="#ffffff" text-anchor="middle" font-weight="bold">เมนูอาหาร</text>
      <text x="0" y="110" font-family="DejaVu Sans, Arial, sans-serif" font-size="38" fill="#92400e" text-anchor="middle" font-weight="bold">รายการอาหารทั้งหมด</text>
    </g>

    <!-- Button Divider 1-2 -->
    <line x1="833" y1="${halfHeight}" x2="833" y2="${height}" stroke="#d97706" stroke-width="6" opacity="0.25" />

    <!-- Button 2: เวลา & พิกัดร้าน (833, 843, 834, 843) -->
    <rect x="833" y="${halfHeight}" width="834" height="${halfHeight}" fill="url(#btn2Grad)" />
    <g transform="translate(1250, 1140)">
      <circle r="130" fill="#10b981" opacity="0.2"/>
      <circle r="95" fill="#10b981" />
      <text x="0" y="30" font-family="DejaVu Sans, Arial, sans-serif" font-size="95" fill="#ffffff" text-anchor="middle">📍</text>
    </g>
    <g transform="translate(1250, 1420)">
      <rect x="-260" y="-55" width="520" height="95" rx="30" fill="#065f46" filter="url(#pillShadow)"/>
      <text x="0" y="10" font-family="DejaVu Sans, Arial, sans-serif" font-size="50" fill="#ffffff" text-anchor="middle" font-weight="bold">เวลา &amp; พิกัดร้าน</text>
      <text x="0" y="110" font-family="DejaVu Sans, Arial, sans-serif" font-size="38" fill="#047857" text-anchor="middle" font-weight="bold">เปิด 10:00 - 21:00 น.</text>
    </g>

    <!-- Button Divider 2-3 -->
    <line x1="1667" y1="${halfHeight}" x2="1667" y2="${height}" stroke="#2563eb" stroke-width="6" opacity="0.25" />

    <!-- Button 3: ติดต่อแอดมิน (1667, 843, 833, 843) -->
    <rect x="1667" y="${halfHeight}" width="833" height="${halfHeight}" fill="url(#btn3Grad)" />
    <g transform="translate(2083, 1140)">
      <circle r="130" fill="#1877f2" opacity="0.2"/>
      <circle r="95" fill="#1877f2" />
      <!-- Facebook 'f' or speech icon -->
      <text x="0" y="30" font-family="DejaVu Sans, Arial, sans-serif" font-size="95" fill="#ffffff" text-anchor="middle" font-weight="bold">f</text>
    </g>
    <g transform="translate(2083, 1420)">
      <rect x="-260" y="-55" width="520" height="95" rx="30" fill="#1e40af" filter="url(#pillShadow)"/>
      <text x="0" y="10" font-family="DejaVu Sans, Arial, sans-serif" font-size="50" fill="#ffffff" text-anchor="middle" font-weight="bold">ติดต่อแอดมิน</text>
      <text x="0" y="110" font-family="DejaVu Sans, Arial, sans-serif" font-size="38" fill="#1d4ed8" text-anchor="middle" font-weight="bold">Facebook Page</text>
    </g>
  </svg>
  `;

  // 2. เตรียมรูปโลโก้ NaEak food (resize เป็น 450x450 พร้อมขอบวงกลมมนสวยงาม)
  const logoPath = path.join(__dirname, 'naeakfood_logo.jpg');
  let compositeLayers = [{ input: Buffer.from(svg), top: 0, left: 0 }];

  if (fs.existsSync(logoPath)) {
    const logoSize = 460;
    const roundedCorners = Buffer.from(
      `<svg><circle cx="${logoSize / 2}" cy="${logoSize / 2}" r="${logoSize / 2}" fill="#ffffff"/></svg>`
    );

    const circularLogo = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'cover' })
      .composite([{ input: roundedCorners, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // วางโลโก้ไว้ที่ฝั่งซ้ายของ Top Banner (ตำแหน่ง X: 160, Y: 190)
    compositeLayers.push({
      input: circularLogo,
      top: 191,
      left: 170
    });
  }

  const outputPathJpg = path.join(__dirname, 'naeakfood_template3_2500x1686.jpg');

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 28, g: 25, b: 23 }
    }
  })
    .composite(compositeLayers)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPathJpg);

  const stat = fs.statSync(outputPathJpg);
  console.log(`✅ สร้างภาพ Template 3 สำเร็จ: ${outputPathJpg}`);
  console.log(`📏 ขนาด: ${width} x ${height} px | น้ำหนักไฟล์: ${(stat.size / 1024).toFixed(1)} KB`);
}

generateTemplate3Image().catch(console.error);
