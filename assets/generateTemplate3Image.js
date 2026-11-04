const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateTemplate3Image() {
  const width = 2500;
  const height = 1686;
  const halfHeight = 843;

  // 1. สร้าง Base SVG สไตล์ Template 3 (บน 1 แถบยาว, ล่าง 3 ปุ่ม)
  // บน: เมนู & สั่งอาหาร
  // ล่างซ้าย: โปรโมชั่น & คูปอง (ลด 20% โค้ด NAEAK20) -> https://naeakfood.vercel.app/#promo
  // ล่างกลาง: บัตรสะสมแต้ม (สะสมครบ 20 แต้ม แลกอาหารฟรี) -> https://naeakfood.vercel.app/#rewards
  // ล่างขวา: ข้อมูล & ติดต่อ (พิกัดร้าน เวลาทำการ และแอดมิน) -> https://www.facebook.com/bcomputer45/

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="topBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b1502" />
        <stop offset="50%" stop-color="#6c2e0b" />
        <stop offset="100%" stop-color="#9a3412" />
      </linearGradient>

      <!-- Button 1: โปรโมชั่น & คูปอง (ส้มประกายทอง/แดงโปรโมชั่น) -->
      <linearGradient id="btn1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fff7ed" />
        <stop offset="100%" stop-color="#fed7aa" />
      </linearGradient>

      <!-- Button 2: บัตรสะสมแต้ม 20 แต้ม (เหลืองทองพรีเมียม) -->
      <linearGradient id="btn2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fefce8" />
        <stop offset="100%" stop-color="#fef08a" />
      </linearGradient>

      <!-- Button 3: ข้อมูล & ติดต่อ (ฟ้าสดใส) -->
      <linearGradient id="btn3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#eff6ff" />
        <stop offset="100%" stop-color="#dbeafe" />
      </linearGradient>

      <linearGradient id="goldPill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="50%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>

      <linearGradient id="redPill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#dc2626" />
        <stop offset="100%" stop-color="#ea580c" />
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

    <!-- ==================== TOP BANNER: เมนู & สั่งอาหาร (0, 0, 2500, 843) ==================== -->
    <rect x="0" y="0" width="${width}" height="${halfHeight}" fill="url(#topBannerGrad)" />
    
    <!-- Decorative Warm Food Pattern Elements -->
    <circle cx="200" cy="150" r="280" fill="#ea580c" opacity="0.18" />
    <circle cx="2300" cy="700" r="350" fill="#f59e0b" opacity="0.12" />
    <circle cx="1250" cy="421" r="500" fill="#f97316" opacity="0.08" />

    <!-- Top Banner Content Area -->
    <g transform="translate(1420, 250)">
      <!-- Welcome Subtitle -->
      <rect x="-650" y="-85" width="1300" height="90" rx="25" fill="#f97316" opacity="0.3"/>
      <text x="0" y="-22" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="48" fill="#fed7aa" text-anchor="middle" font-weight="bold">✨ ยินดีต้อนรับสู่ NaEak food 🍲</text>
      
      <!-- Main Action Title -->
      <text x="0" y="105" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="80" fill="#ffffff" text-anchor="middle" font-weight="bold">เมนูอาหาร &amp; สั่งซื้อออนไลน์</text>
      
      <!-- Action Button / Pill -->
      <g transform="translate(0, 250)" filter="url(#pillShadow)">
        <rect x="-440" y="-60" width="880" height="115" rx="57" fill="url(#goldPill)" />
        <text x="0" y="16" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="48" fill="#78350f" text-anchor="middle" font-weight="bold">🍲 แตะที่นี่เพื่อดูเมนู &amp; สั่งอาหารทันที</text>
      </g>
      <text x="0" y="380" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="38" fill="#fdba74" text-anchor="middle">รสชาติต้นตำรับ อบอุ่นทุกจาน สดใหม่ทุกออเดอร์ ✨</text>
    </g>

    <!-- Divider Line between Top and Bottom -->
    <line x1="0" y1="${halfHeight}" x2="${width}" y2="${halfHeight}" stroke="#ffffff" stroke-width="8" opacity="0.3" />

    <!-- ==================== BOTTOM BUTTON 1: โปรโมชั่น & คูปอง (0, 843, 833, 843) ==================== -->
    <rect x="0" y="${halfHeight}" width="833" height="${halfHeight}" fill="url(#btn1Grad)" />
    
    <!-- Icon 1: Coupon / Gift -->
    <g transform="translate(416, 1120)">
      <circle r="130" fill="#ea580c" opacity="0.18"/>
      <circle r="95" fill="#ea580c" />
      <text x="0" y="32" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="95" fill="#ffffff" text-anchor="middle">🎟️</text>
      
      <!-- Mini Highlight Tag -->
      <g transform="translate(85, -60)" filter="url(#pillShadow)">
        <rect x="-65" y="-30" width="130" height="55" rx="18" fill="url(#redPill)" />
        <text x="0" y="8" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">ลด 20%</text>
      </g>
    </g>

    <g transform="translate(416, 1420)">
      <rect x="-260" y="-55" width="520" height="95" rx="30" fill="#9a3412" filter="url(#pillShadow)"/>
      <text x="0" y="12" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="50" fill="#ffffff" text-anchor="middle" font-weight="bold">โปรโมชั่น &amp; คูปอง</text>
      <text x="0" y="110" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="38" fill="#c2410c" text-anchor="middle" font-weight="bold">โค้ด: NAEAK20 | ดีลพิเศษ</text>
    </g>

    <!-- Button Divider 1-2 -->
    <line x1="833" y1="${halfHeight}" x2="833" y2="${height}" stroke="#d97706" stroke-width="6" opacity="0.3" />

    <!-- ==================== BOTTOM BUTTON 2: บัตรสะสมแต้ม 20 แต้ม (833, 843, 834, 843) ==================== -->
    <rect x="833" y="${halfHeight}" width="834" height="${halfHeight}" fill="url(#btn2Grad)" />
    
    <!-- Icon 2: Loyalty Stamp Star / Trophy -->
    <g transform="translate(1250, 1120)">
      <circle r="130" fill="#ca8a04" opacity="0.2"/>
      <circle r="95" fill="#ca8a04" />
      <text x="0" y="32" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="95" fill="#ffffff" text-anchor="middle">⭐</text>

      <!-- Mini Highlight Tag -->
      <g transform="translate(85, -60)" filter="url(#pillShadow)">
        <rect x="-85" y="-30" width="170" height="55" rx="18" fill="#dc2626" />
        <text x="0" y="8" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">20 แต้มฟรี!</text>
      </g>
    </g>

    <g transform="translate(1250, 1420)">
      <rect x="-260" y="-55" width="520" height="95" rx="30" fill="#854d0e" filter="url(#pillShadow)"/>
      <text x="0" y="12" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="50" fill="#ffffff" text-anchor="middle" font-weight="bold">บัตรสะสมแต้ม</text>
      <text x="0" y="110" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="38" fill="#a16207" text-anchor="middle" font-weight="bold">สะสมครบ 20 แต้ม แลกฟรี</text>
    </g>

    <!-- Button Divider 2-3 -->
    <line x1="1667" y1="${halfHeight}" x2="1667" y2="${height}" stroke="#2563eb" stroke-width="6" opacity="0.3" />

    <!-- ==================== BOTTOM BUTTON 3: ข้อมูล & ติดต่อ (1667, 843, 833, 843) ==================== -->
    <rect x="1667" y="${halfHeight}" width="833" height="${halfHeight}" fill="url(#btn3Grad)" />
    
    <!-- Icon 3: Location / Info / Chat -->
    <g transform="translate(2083, 1120)">
      <circle r="130" fill="#1d4ed8" opacity="0.18"/>
      <circle r="95" fill="#1d4ed8" />
      <text x="0" y="32" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="95" fill="#ffffff" text-anchor="middle">📍</text>
    </g>

    <g transform="translate(2083, 1420)">
      <rect x="-260" y="-55" width="520" height="95" rx="30" fill="#1e40af" filter="url(#pillShadow)"/>
      <text x="0" y="12" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="50" fill="#ffffff" text-anchor="middle" font-weight="bold">ข้อมูล &amp; ติดต่อ</text>
      <text x="0" y="110" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="38" fill="#1d4ed8" text-anchor="middle" font-weight="bold">เวลาเปิดร้าน &amp; แอดมิน</text>
    </g>
  </svg>
  `;

  // 2. เตรียมรูปโลโก้ NaEak food (resize เป็น 460x460 พร้อมขอบวงกลมมนสวยงาม)
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

    // วางโลโก้ไว้ที่ฝั่งซ้ายของ Top Banner (ตำแหน่ง X: 170, Y: 191)
    compositeLayers.push({
      input: circularLogo,
      top: 191,
      left: 170
    });
  }

  // สร้างไฟล์รูปภาพทั้งในชื่อ naeakfood_template3_2500x1686.jpg และ naeakfood_final_2500x1686.jpg
  const outputPathJpg = path.join(__dirname, 'naeakfood_template3_2500x1686.jpg');
  const finalOutputPathJpg = path.join(__dirname, 'naeakfood_final_2500x1686.jpg');
  const webBannerPathJpg = path.join(__dirname, '../web/assets/banner.jpg');

  const baseImage = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 28, g: 25, b: 23 }
    }
  })
    .composite(compositeLayers)
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(outputPathJpg, baseImage);
  fs.writeFileSync(finalOutputPathJpg, baseImage);
  if (fs.existsSync(path.dirname(webBannerPathJpg))) {
    fs.writeFileSync(webBannerPathJpg, baseImage);
  }

  const stat = fs.statSync(outputPathJpg);
  console.log(`✅ สร้างภาพ Rich Menu Template 3 สำเร็จ!`);
  console.log(`📁 บันทึกที่: ${outputPathJpg}`);
  console.log(`📁 บันทึกที่: ${finalOutputPathJpg}`);
  console.log(`📏 ขนาด: ${width} x ${height} px | น้ำหนักไฟล์: ${(stat.size / 1024).toFixed(1)} KB`);
}

generateTemplate3Image().catch(console.error);
