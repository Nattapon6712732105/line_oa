const { client, validateConfig } = require('./lineClient');

async function listRichMenus() {
  validateConfig();

  console.log('📋 กำลังดึงรายการ Rich Menu ทั้งหมดจาก LINE...');

  try {
    // 1. ตรวจสอบ Default Rich Menu ปัจจุบัน
    let defaultRichMenuId = null;
    try {
      const defRes = await client.getDefaultRichMenuId();
      defaultRichMenuId = defRes.richMenuId;
    } catch (e) {
      // หากยังไม่มีการตั้ง default LINE จะตอบ 404 ซึ่งถือเป็นปกติ
      defaultRichMenuId = null;
    }

    // 2. ดึงรายการ Rich Menu ทั้งหมด
    const res = await client.getRichMenuList();
    const menus = res.richmenus || [];

    if (menus.length === 0) {
      console.log('\nℹ️  ยังไม่มี Rich Menu ในระบบ (สามารถสร้างใหม่ด้วยคำสั่ง: npm run create-menu)\n');
      return [];
    }

    console.log(`\nพบ Rich Menu ทั้งหมด ${menus.length} รายการ:`);
    console.log('--------------------------------------------------------------------------------');

    menus.forEach((menu, index) => {
      const isDefault = menu.richMenuId === defaultRichMenuId;
      console.log(`[${index + 1}] ชื่อ: "${menu.name}" ${isDefault ? '⭐ [DEFAULT MENU สำหรับทุกคน]' : ''}`);
      console.log(`    🆔 ID:           ${menu.richMenuId}`);
      console.log(`    💬 Chat Bar:     "${menu.chatBarText}"`);
      console.log(`    📐 ขนาด:         ${menu.size.width} x ${menu.size.height} px`);
      console.log(`    🔘 จำนวนปุ่มกด:   ${menu.areas.length} ปุ่ม`);
      console.log('--------------------------------------------------------------------------------');
    });

    return menus;
  } catch (error) {
    console.error('❌ ดึงรายการ Rich Menu ไม่สำเร็จ:');
    if (error.statusCode) console.error(`- Status Code: ${error.statusCode}`);
    if (error.body) console.error('- รายละเอียด:', JSON.stringify(error.body, null, 2));
    else console.error('- รายละเอียด:', error.message || error);
    process.exit(1);
  }
}

if (require.main === module) {
  listRichMenus();
}

module.exports = { listRichMenus };
