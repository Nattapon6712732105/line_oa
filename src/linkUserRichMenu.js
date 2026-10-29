const fs = require('fs');
const path = require('path');
const { client, validateConfig } = require('./lineClient');

async function linkUserRichMenu(userId, targetMenuId, unlink = false) {
  validateConfig();

  if (!userId) {
    console.error('❌ กรุณาระบุ User ID (Line User ID ขึ้นต้นด้วย U...)');
    console.error('ตัวอย่างคำสั่ง: node src/linkUserRichMenu.js Uxxxxxxxxxxxxxxxx richmenu-xxxxxxxx');
    console.error('หรือยกเลิก:   node src/linkUserRichMenu.js Uxxxxxxxxxxxxxxxx --unlink');
    process.exit(1);
  }

  if (unlink) {
    console.log(`🔄 กำลังยกเลิกการผูก Rich Menu เฉพาะบุคคลสำหรับ User: ${userId}...`);
    await client.unlinkRichMenuIdFromUser(userId);
    console.log(`✅ ยกเลิกสำเร็จ! ผู้ใช้ ${userId} จะกลับไปเห็น Default Rich Menu ปกติ`);
    return;
  }

  let richMenuId = targetMenuId;
  if (!richMenuId) {
    const idFilePath = path.join(__dirname, '../last_rich_menu_id.txt');
    if (fs.existsSync(idFilePath)) {
      richMenuId = fs.readFileSync(idFilePath, 'utf8').trim();
    }
  }

  if (!richMenuId) {
    console.error('❌ กรุณาระบุ Rich Menu ID ที่ต้องการผูกกับผู้ใช้นี้');
    process.exit(1);
  }

  console.log(`🔄 กำลังผูก Rich Menu ${richMenuId} เข้ากับ User ${userId}...`);
  await client.linkRichMenuIdToUser(userId, richMenuId);
  console.log(`✅ ผูกสำเร็จ! ตอนนี้ User ${userId} จะเห็นเมนู ${richMenuId} โดยเฉพาะ`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const unlink = args.includes('--unlink');
  const nonFlagArgs = args.filter((a) => !a.startsWith('--'));

  const userId = nonFlagArgs[0];
  const richMenuId = nonFlagArgs[1];

  linkUserRichMenu(userId, richMenuId, unlink).catch((err) => {
    console.error('❌ ดำเนินการไม่สำเร็จ:');
    if (err.statusCode) console.error(`- Status Code: ${err.statusCode}`);
    if (err.body) console.error('- รายละเอียด:', JSON.stringify(err.body, null, 2));
    else console.error('- รายละเอียด:', err.message || err);
    process.exit(1);
  });
}

module.exports = { linkUserRichMenu };
