const fs = require('fs');
const path = require('path');
const { client, validateConfig } = require('./lineClient');

async function setDefaultRichMenu(targetMenuId, cancel = false) {
  validateConfig();

  if (cancel) {
    console.log('🔄 กำลังยกเลิก Default Rich Menu...');
    await client.cancelDefaultRichMenu();
    console.log('✅ ยกเลิก Default Rich Menu เรียบร้อยแล้ว (จะไม่มีเมนูตั้งต้นแสดงสำหรับทุกคน)');
    return;
  }

  let richMenuId = targetMenuId;
  if (!richMenuId) {
    // ลองอ่านจากไฟล์ last_rich_menu_id.txt
    const idFilePath = path.join(__dirname, '../last_rich_menu_id.txt');
    if (fs.existsSync(idFilePath)) {
      richMenuId = fs.readFileSync(idFilePath, 'utf8').trim();
    }
  }

  if (!richMenuId) {
    console.error('❌ กรุณาระบุ Rich Menu ID ที่ต้องการตั้งเป็นค่าเริ่มต้น');
    console.error('ตัวอย่างคำสั่ง: node src/setDefaultRichMenu.js richmenu-xxxxxxxxxxxx');
    process.exit(1);
  }

  console.log(`🔄 กำลังตั้งค่าให้ ${richMenuId} เป็น Default Rich Menu สำหรับทุกคน...`);
  await client.setDefaultRichMenu(richMenuId);
  console.log(`✅ สำเร็จ! ${richMenuId} กลายเป็น Default Rich Menu เรียบร้อยแล้ว`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const cancel = args.includes('--cancel');
  const targetId = args.find((a) => !a.startsWith('--'));

  setDefaultRichMenu(targetId, cancel).catch((err) => {
    console.error('❌ ตั้งค่า Default Rich Menu ไม่สำเร็จ:');
    if (err.statusCode) console.error(`- Status Code: ${err.statusCode}`);
    if (err.body) console.error('- รายละเอียด:', JSON.stringify(err.body, null, 2));
    else console.error('- รายละเอียด:', err.message || err);
    process.exit(1);
  });
}

module.exports = { setDefaultRichMenu };
