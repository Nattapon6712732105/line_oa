const { client, validateConfig } = require('./lineClient');

async function checkConnection() {
  validateConfig();

  console.log('🔄 กำลังทดสอบเชื่อมต่อกับ LINE Messaging API...');

  try {
    const botInfo = await client.getBotInfo();
    console.log('\n✅ เชื่อมต่อกับ LINE Messaging API สำเร็จแล้ว!');
    console.log('--------------------------------------------------');
    console.log(`🤖 ชื่อบัญชี LINE OA: ${botInfo.displayName}`);
    console.log(`🆔 Basic ID:         ${botInfo.basicId}`);
    if (botInfo.premiumId) {
      console.log(`💎 Premium ID:       ${botInfo.premiumId}`);
    }
    console.log(`💬 Chat Mode:        ${botInfo.chatMode}`);
    console.log(`🖼️  Profile Picture:  ${botInfo.pictureUrl || 'ไม่มีรูปโปรไฟล์'}`);
    console.log('--------------------------------------------------');
    console.log('🎉 คุณพร้อมสำหรับการสร้างและจัดการ Rich Menu ผ่าน API แล้วครับ!\n');
  } catch (error) {
    console.error('\n❌ เชื่อมต่อไม่สำเร็จ กรุณาตรวจสอบข้อผิดพลาดด้านล่าง:');
    if (error.statusCode) {
      console.error(`- HTTP Status Code: ${error.statusCode}`);
    }
    if (error.body) {
      console.error('- รายละเอียด:', JSON.stringify(error.body, null, 2));
    } else {
      console.error('- รายละเอียด:', error.message || error);
    }
    console.error('\nคำแนะนำ: ตรวจสอบว่า Channel Access Token ใน .env ถูกต้องและยังไม่หมดอายุ');
    process.exit(1);
  }
}

if (require.main === module) {
  checkConnection();
}

module.exports = { checkConnection };
