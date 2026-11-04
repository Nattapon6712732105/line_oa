const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateLoyaltyCard() {
  const width = 1200;
  const height = 800;
  
  // 4 rows x 5 columns = 20 stamps
  const rows = 4;
  const cols = 5;
  const startX = 140;
  const startY = 240;
  const gapX = 190;
  const gapY = 100;
  const radius = 38;

  let stampCirclesSvg = '';
  let stampIndex = 1;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = startX + c * gapX + 80;
      const cy = startY + r * gapY;
      const num = stampIndex;

      // Special highlight for milestone stamps
      if (num === 20) {
        // Grand Prize at 20
        stampCirclesSvg += `
          <g>
            <circle cx="${cx}" cy="${cy}" r="${radius + 4}" fill="#f59e0b" filter="url(#glow)"/>
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#dc2626" stroke="#fbbf24" stroke-width="4" />
            <text x="${cx}" y="${cy - 6}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="20" font-weight="bold" fill="#fef08a" text-anchor="middle">👑 20</text>
            <text x="${cx}" y="${cy + 16}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">ฟรีอาหาร</text>
          </g>
        `;
      } else if (num === 10) {
        // Milestone at 10
        stampCirclesSvg += `
          <g>
            <circle cx="${cx}" cy="${cy}" r="${radius + 2}" fill="#fbbf24" opacity="0.6"/>
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#ea580c" stroke="#fde047" stroke-width="3" />
            <text x="${cx}" y="${cy - 6}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">🎁 10</text>
            <text x="${cx}" y="${cy + 16}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="12" font-weight="bold" fill="#fef3c7" text-anchor="middle">ของทานเล่น</text>
          </g>
        `;
      } else if (num === 5) {
        // Milestone at 5
        stampCirclesSvg += `
          <g>
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#2563eb" stroke="#93c5fd" stroke-width="3" />
            <text x="${cx}" y="${cy - 6}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">🥤 5</text>
            <text x="${cx}" y="${cy + 16}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="12" font-weight="bold" fill="#dbeafe" text-anchor="middle">ฟรีน้ำ</text>
          </g>
        `;
      } else {
        // Normal slot
        stampCirclesSvg += `
          <g>
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#fffbeb" stroke="#d97706" stroke-width="2.5" stroke-dasharray="4,4" />
            <text x="${cx}" y="${cy + 8}" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="24" font-weight="bold" fill="#b45309" text-anchor="middle">${num}</text>
          </g>
        `;
      }

      stampIndex++;
    }
  }

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#451a03" />
        <stop offset="40%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#9a3412" />
      </linearGradient>

      <linearGradient id="innerGridBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fffdfa" />
        <stop offset="100%" stop-color="#fef3c7" />
      </linearGradient>

      <linearGradient id="goldBanner" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="50%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>

      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.35"/>
      </filter>

      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Outer Card Background with Rounded Corners -->
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="32" fill="url(#cardBg)" filter="url(#shadow)" stroke="#f59e0b" stroke-width="3" />

    <!-- Decorative ambient patterns -->
    <circle cx="100" cy="100" r="140" fill="#f97316" opacity="0.12"/>
    <circle cx="1100" cy="700" r="180" fill="#fbbf24" opacity="0.1"/>

    <!-- Header Section -->
    <g transform="translate(180, 75)">
      <text x="0" y="32" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="38" font-weight="bold" fill="#ffffff">NaEak food</text>
      <text x="0" y="68" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="22" fill="#fed7aa">บัตรสะสมแต้มดิจิทัล (20 Stamps Reward Card)</text>
    </g>

    <!-- Badge: 20 แต้มแลกอาหารฟรี -->
    <g transform="translate(860, 65)">
      <rect x="0" y="0" width="280" height="55" rx="27" fill="url(#goldBanner)" filter="url(#shadow)"/>
      <text x="140" y="36" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="20" font-weight="bold" fill="#78350f" text-anchor="middle">⭐ ครบ 20 แต้ม รับอาหารฟรี!</text>
    </g>

    <!-- Grid Container Panel -->
    <rect x="60" y="160" width="${width - 120}" height="520" rx="24" fill="url(#innerGridBg)" filter="url(#shadow)" stroke="#fde68a" stroke-width="2"/>

    <!-- Reward Tiers Legend inside panel -->
    <g transform="translate(90, 200)">
      <text x="0" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="18" font-weight="bold" fill="#92400e">🎯 รางวัลสะสม:</text>
      
      <circle cx="150" cy="-6" r="10" fill="#2563eb"/>
      <text x="170" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="16" fill="#1e3a8a">5 แต้ม: ฟรีเครื่องดื่ม</text>

      <circle cx="360" cy="-6" r="10" fill="#ea580c"/>
      <text x="380" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="16" fill="#7c2d12">10 แต้ม: ฟรีของทานเล่น</text>

      <circle cx="610" cy="-6" r="10" fill="#dc2626"/>
      <text x="630" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="16" font-weight="bold" fill="#991b1b">20 แต้ม: ฟรีอาหารจานโปรด 1 จาน!</text>
    </g>

    <!-- Stamp Circles Grid -->
    ${stampCirclesSvg}

    <!-- Footer conditions inside container -->
    <line x1="80" y1="620" x2="${width - 80}" y2="620" stroke="#fcd34d" stroke-width="1.5" stroke-dasharray="6,4" />
    <g transform="translate(100, 650)">
      <text x="0" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="15" fill="#78350f">💡 กติกา: สั่งซื้อครบทุก 100.- รับ 1 สแตมป์ | แสดงเบอร์โทรศัพท์หรือแจ้งแอดมินตอนสั่งซื้อ</text>
      <text x="${width - 240}" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="14" fill="#a16207" text-anchor="end">หมดอายุ: 31 ธ.ค. 2026</text>
    </g>

    <!-- Card Base Footer Outside -->
    <text x="${width / 2}" y="735" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="18" fill="#fde68a" text-anchor="middle">NaEak food - รสชาติต้นตำรับ อบอุ่นทุกจาน 🍲✨</text>
  </svg>
  `;

  // Overlay logo if exists
  const logoPath = path.join(__dirname, 'naeakfood_logo.jpg');
  let layers = [{ input: Buffer.from(svg), top: 0, left: 0 }];

  if (fs.existsSync(logoPath)) {
    const size = 100;
    const roundedCorners = Buffer.from(
      `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff"/></svg>`
    );
    const circularLogo = await sharp(logoPath)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: roundedCorners, blend: 'dest-in' }])
      .png()
      .toBuffer();

    layers.push({
      input: circularLogo,
      top: 50,
      left: 60
    });
  }

  const outputPath = path.join(__dirname, 'naeak_stamp_card_20.jpg');
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 28, g: 25, b: 23 }
    }
  })
    .composite(layers)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath);

  console.log(`✅ บัตรสะสมแต้ม 20 แต้มสร้างสำเร็จ: ${outputPath}`);
}

async function generateCouponVoucher() {
  const width = 1200;
  const height = 780; // LINE Official Account coupon standard ratio (approx 1.54:1)

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ticketBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb" />
        <stop offset="100%" stop-color="#fef3c7" />
      </linearGradient>

      <linearGradient id="leftBanner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b45309" />
        <stop offset="50%" stop-color="#ea580c" />
        <stop offset="100%" stop-color="#dc2626" />
      </linearGradient>

      <linearGradient id="goldButton" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>

      <filter id="ticketShadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Background Wallpaper -->
    <rect width="${width}" height="${height}" fill="#1c1917" />
    <circle cx="200" cy="150" r="280" fill="#ea580c" opacity="0.15" />
    <circle cx="1050" cy="650" r="240" fill="#f59e0b" opacity="0.12" />

    <!-- Ticket Container Body -->
    <g filter="url(#ticketShadow)">
      <!-- Main Ticket Body -->
      <rect x="50" y="40" width="${width - 100}" height="${height - 80}" rx="28" fill="url(#ticketBg)" stroke="#f59e0b" stroke-width="2"/>

      <!-- Left Visual / Discount Zone (x: 50 to 450) -->
      <path d="M 78 40 L 450 40 L 450 740 L 78 740 C 62 740 50 728 50 712 L 50 68 C 50 52 62 40 78 40 Z" fill="url(#leftBanner)" />
      
      <!-- Ticket Cutout Notches on Top and Bottom divider -->
      <circle cx="450" cy="40" r="26" fill="#1c1917" />
      <circle cx="450" cy="${height - 40}" r="26" fill="#1c1917" />

      <!-- Left and Right Edge Scallop Cutouts -->
      <circle cx="50" cy="${height / 2}" r="22" fill="#1c1917" />
      <circle cx="${width - 50}" cy="${height / 2}" r="22" fill="#1c1917" />

      <!-- Dashed Perforation Line -->
      <line x1="450" y1="70" x2="450" y2="${height - 70}" stroke="#b45309" stroke-width="4" stroke-dasharray="10,12" stroke-linecap="round" />
    </g>

    <!-- ==================== LEFT TICKET CONTENT ==================== -->
    <g transform="translate(250, 140)">
      <text x="0" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="24" font-weight="bold" fill="#fef08a" text-anchor="middle">🎁 SPECIAL COUPON</text>
      
      <circle cx="0" cy="95" r="70" fill="#ffffff" opacity="0.15"/>
      <circle cx="0" cy="95" r="55" fill="#ffffff" opacity="0.2"/>
      <text x="0" y="115" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="58" text-anchor="middle">🍲</text>

      <text x="0" y="230" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="82" font-weight="bold" fill="#ffffff" text-anchor="middle">ลด 20%</text>
      <text x="0" y="275" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="28" font-weight="bold" fill="#fed7aa" text-anchor="middle">DISCOUNT VOUCHER</text>
      
      <!-- Mini conditions -->
      <rect x="-140" y="320" width="280" height="42" rx="21" fill="#7f1d1d" opacity="0.5"/>
      <text x="0" y="347" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="16" fill="#fef2f2" text-anchor="middle">✨ ใช้ได้ทุกเมนูในร้าน</text>
    </g>

    <!-- ==================== RIGHT TICKET CONTENT ==================== -->
    <!-- Shop Branding -->
    <g transform="translate(500, 110)">
      <text x="0" y="25" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="34" font-weight="bold" fill="#78350f">NaEak food</text>
      <text x="0" y="55" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="18" fill="#b45309">รสชาติต้นตำรับ อบอุ่นทุกจาน 🍲✨</text>
    </g>

    <!-- Coupon Title & Description -->
    <g transform="translate(500, 220)">
      <rect x="0" y="-30" width="160" height="34" rx="8" fill="#fee2e2" />
      <text x="80" y="-8" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="16" font-weight="bold" fill="#b91c1c" text-anchor="middle">🔥 ดีลพิเศษใน LINE</text>

      <text x="0" y="45" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="36" font-weight="bold" fill="#1c1917">คูปองส่วนลด 20% ทุกเมนู</text>
      <text x="0" y="85" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="20" fill="#4b5563">สำหรับสมาชิก LINE Official Account สั่งซื้อครบ 200.-</text>
    </g>

    <!-- Promo Code Box -->
    <g transform="translate(500, 370)">
      <rect x="0" y="0" width="580" height="95" rx="16" fill="#ffffff" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="8,6" />
      <text x="30" y="40" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="16" font-weight="bold" fill="#92400e">โค้ดส่วนลด (PROMO CODE)</text>
      <text x="30" y="75" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="34" font-weight="bold" fill="#ea580c" letter-spacing="3">NAEAK20</text>

      <!-- Copy Badge -->
      <rect x="420" y="20" width="130" height="55" rx="12" fill="url(#goldButton)"/>
      <text x="485" y="55" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">📋 ใช้โค้ดนี้</text>
    </g>

    <!-- Terms & Conditions -->
    <g transform="translate(500, 520)">
      <text x="0" y="0" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="15" font-weight="bold" fill="#374151">เงื่อนไขการใช้คูปอง:</text>
      <text x="0" y="25" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="14" fill="#6b7280">• ใช้ได้ 1 สิทธิ์ ต่อ 1 ท่าน ตลอดระยะเวลาโปรโมชั่น</text>
      <text x="0" y="48" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="14" fill="#6b7280">• สามารถแจ้งโค้ดส่วนลดกับแอดมินตอนสั่งซื้อผ่าน LINE ได้ทันที</text>
      <text x="0" y="71" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="14" fill="#6b7280">• หมดอายุวันที่ 31 ธันวาคม 2026</text>
    </g>

    <!-- Expiry Badge -->
    <g transform="translate(500, 650)">
      <rect x="0" y="0" width="580" height="42" rx="10" fill="#f3f4f6" />
      <text x="290" y="27" font-family="'Noto Sans Thai', 'Prompt', 'Kanit', sans-serif" font-size="15" fill="#4b5563" text-anchor="middle">⏰ ระยะเวลา: วันนี้ - 31 ธันวาคม 2026 | ใช้ได้ผ่าน LINE OA</text>
    </g>
  </svg>
  `;

  // Overlay logo if exists
  const logoPath = path.join(__dirname, 'naeakfood_logo.jpg');
  let layers = [{ input: Buffer.from(svg), top: 0, left: 0 }];

  if (fs.existsSync(logoPath)) {
    const size = 80;
    const roundedCorners = Buffer.from(
      `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#ffffff"/></svg>`
    );
    const circularLogo = await sharp(logoPath)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: roundedCorners, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Place next to NaEak food text
    layers.push({
      input: circularLogo,
      top: 100,
      left: 990
    });
  }

  const outputPath = path.join(__dirname, 'naeak_coupon_voucher.jpg');
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 28, g: 25, b: 23 }
    }
  })
    .composite(layers)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath);

  console.log(`✅ คูปองส่วนลดสร้างสำเร็จ: ${outputPath}`);
}

async function main() {
  await generateLoyaltyCard();
  await generateCouponVoucher();
}

main().catch(console.error);

