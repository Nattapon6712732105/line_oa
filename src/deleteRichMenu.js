const fs = require('fs');
const path = require('path');
const { client, validateConfig } = require('./lineClient');

async function deleteRichMenu(targetMenuId, deleteAll = false) {
  validateConfig();

  if (deleteAll) {
    console.log('⚠️  กำลังดึงรายการ Rich Menu ทั้งหมดเพื่อลบ...');
    const listRes = await client.getRichMenuList();
    const menus = listRes.richmenus || [];

    if (menus.length === 0) {
      console.log('ℹ️  ไม่มี Rich Menu ในระบบให้ลบ');
      return;
    }

    console.log(`พบ ${menus.length} รายการ กำลังดำเนินการลบทีละรายการ...`);
    for (const menu of menus) {
      await client.deleteRichMenu(menu.richMenuId);
      console.log(`🗑️  ลบแล้ว: ${menu.name} (${menu.richMenuId})`);
    }

    // ลบไฟล์แคช ID ถ้ามี
    const idFilePath = path.join(__dirname, '../last_rich_menu_id.txt');
    if (fs.existsSync(idFilePath)) fs.unlinkSync(idFilePath);

    console.log('✅ ลบ Rich Menu ทั้งหมดในระบบเรียบร้อยแล้ว');
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
    console.error('❌ กรุณาระบุ Rich Menu ID ที่ต้องการลบ');
    console.error('ตัวอย่างคำสั่ง: node src/deleteRichMenu.js richmenu-xxxxxxxxxxxx');
    console.error('หรือลบทั้งหมด: node src/deleteRichMenu.js --all');
    process.exit(1);
  }

  console.log(`🗑️  กำลังลบ Rich Menu: ${richMenuId}...`);
  await client.deleteRichMenu(richMenuId);
  console.log(`✅ ลบ ${richMenuId} สำเร็จเรียบร้อยแล้ว`);

  const idFilePath = path.join(__dirname, '../last_rich_menu_id.txt');
  if (fs.existsSync(idFilePath)) {
    const saved = fs.readFileSync(idFilePath, 'utf8').trim();
    if (saved === richMenuId) fs.unlinkSync(idFilePath);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const deleteAll = args.includes('--all');
  const targetId = args.find((a) => !a.startsWith('--'));

  deleteRichMenu(targetId, deleteAll).catch((err) => {
    console.error('❌ ลบ Rich Menu ไม่สำเร็จ:');
    if (err.statusCode) console.error(`- Status Code: ${err.statusCode}`);
    if (err.body) console.error('- รายละเอียด:', JSON.stringify(err.body, null, 2));
    else console.error('- รายละเอียด:', err.message || err);
    process.exit(1);
  });
}

module.exports = { deleteRichMenu };
