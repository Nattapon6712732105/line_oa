const fs = require('fs');
const path = require('path');
const { client, blobClient, validateConfig } = require('./lineClient');

async function createRichMenu({
  templatePath = path.join(__dirname, '../templates/richMenu6Buttons.json'),
  imagePath = path.join(__dirname, '../assets/sample_6_buttons.png'),
  setDefault = false
} = {}) {
  validateConfig();

  // 1. ตรวจสอบไฟล์ template
  if (!fs.existsSync(templatePath)) {
    throw new Error(`ไม่พบไฟล์เทมเพลต: ${templatePath}`);
  }
  const richMenuData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

  // 2. ตรวจสอบไฟล์รูปภาพ
  if (!fs.existsSync(imagePath)) {
    throw new Error(`ไม่พบไฟล์รูปภาพ: ${imagePath}`);
  }

  const ext = path.extname(imagePath).toLowerCase();
  const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

  console.log(`🚀 กำลังสร้าง Rich Menu โครงสร้างจาก: ${path.basename(templatePath)}...`);
  
  // 3. ยิง API สร้าง Rich Menu Object
  const createResponse = await client.createRichMenu(richMenuData);
  const richMenuId = createResponse.richMenuId;
  console.log(`✅ สร้าง Rich Menu สำเร็จ! Rich Menu ID: ${richMenuId}`);

  // 4. อัปโหลดรูปภาพไปยัง Rich Menu
  console.log(`📤 กำลังอัปโหลดรูปภาพ (${path.basename(imagePath)}) ไปยัง Rich Menu...`);
  const imageBlob = await fs.promises.readFile(imagePath);
  const blob = new Blob([imageBlob], { type: contentType });
  
  await blobClient.setRichMenuImage(richMenuId, blob);
  console.log('✅ อัปโหลดรูปภาพ Rich Menu สำเร็จเรียบร้อย!');

  // 5. ตั้งเป็นเมนูหลัก (Default) หากระบุ
  if (setDefault) {
    console.log('⭐ กำลังตั้งค่าให้เป็น Default Rich Menu (สำหรับผู้ใช้ทุกคน)...');
    await client.setDefaultRichMenu(richMenuId);
    console.log('✅ ตั้งเป็น Default Rich Menu เรียบร้อยแล้ว!');
  }

  // บันทึก ID ไว้ที่ไฟล์เพื่อให้สคริปต์อื่นนำไปใช้ต่อได้ง่าย
  const idFilePath = path.join(__dirname, '../last_rich_menu_id.txt');
  fs.writeFileSync(idFilePath, richMenuId, 'utf8');

  console.log('\n==================================================');
  console.log(`🎉 ดำเนินการสำเร็จ!`);
  console.log(`🆔 Rich Menu ID: ${richMenuId}`);
  console.log(`(บันทึก ID ไว้ที่ ${path.basename(idFilePath)} ให้แล้วครับ)`);
  console.log('==================================================\n');

  return richMenuId;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const isDefault = args.includes('--default') || args.includes('-d');
  
  // Custom template or image if provided
  let templateArg = path.join(__dirname, '../templates/richMenu6Buttons.json');
  let imageArg = path.join(__dirname, '../assets/sample_6_buttons.png');

  if (args.includes('--template3')) {
    templateArg = path.join(__dirname, '../templates/naeakfoodTemplate3.json');
    imageArg = path.join(__dirname, '../assets/naeakfood_final_2500x1686.jpg');
  } else if (args.includes('--naeakfood')) {
    templateArg = path.join(__dirname, '../templates/naeakfoodRichMenu.json');
    imageArg = path.join(__dirname, '../assets/naeakfood_richmenu_2500x1686.jpg');
  } else if (args.includes('--compact')) {
    templateArg = path.join(__dirname, '../templates/richMenuCompact3.json');
    imageArg = path.join(__dirname, '../assets/sample_compact_3.png');
  }

  const customTemplateIdx = args.indexOf('--template');
  if (customTemplateIdx !== -1 && args[customTemplateIdx + 1]) {
    templateArg = path.resolve(args[customTemplateIdx + 1]);
  }

  const customImageIdx = args.indexOf('--image');
  if (customImageIdx !== -1 && args[customImageIdx + 1]) {
    imageArg = path.resolve(args[customImageIdx + 1]);
  }

  createRichMenu({
    templatePath: templateArg,
    imagePath: imageArg,
    setDefault: isDefault
  }).catch((err) => {
    console.error('❌ เกิดข้อผิดพลาดในการสร้าง Rich Menu:');
    if (err.statusCode) console.error(`- Status Code: ${err.statusCode}`);
    if (err.body) console.error('- รายละเอียด:', JSON.stringify(err.body, null, 2));
    else console.error('- รายละเอียด:', err.message || err);
    process.exit(1);
  });
}

module.exports = { createRichMenu };
