require('dotenv').config();
const { messagingApi } = require('@line/bot-sdk');

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

function validateConfig() {
  if (!channelAccessToken || channelAccessToken === 'YOUR_CHANNEL_ACCESS_TOKEN_HERE') {
    console.error('❌ ข้อผิดพลาด: ยังไม่ได้ระบุ LINE_CHANNEL_ACCESS_TOKEN ในไฟล์ .env');
    console.error('👉 วิธีแก้ไข:');
    console.error('   1. เปิดไฟล์ .env');
    console.error('   2. นำ Channel access token จาก LINE Developers Console มาใส่ที่ LINE_CHANNEL_ACCESS_TOKEN');
    console.error('   3. บันทึกไฟล์แล้วลองใหม่อีกครั้ง');
    process.exit(1);
  }
}

// Client สำหรับจัดการ Rich Menu, Bot Profile, User Link
const client = new messagingApi.MessagingApiClient({
  channelAccessToken: channelAccessToken || ''
});

// Blob Client สำหรับอัปโหลด/ดาวน์โหลดไฟล์รูปภาพ Rich Menu
const blobClient = new messagingApi.MessagingApiBlobClient({
  channelAccessToken: channelAccessToken || ''
});

module.exports = {
  client,
  blobClient,
  validateConfig
};
