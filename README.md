# LINE OA Rich Menu via Messaging API (Node.js)

โปรเจกต์นี้จัดเตรียมระบบสำหรับสร้าง จัดการ และเชื่อมต่อ **LINE Official Account Rich Menu** ผ่าน **LINE Messaging API** ด้วย Node.js

---

## 🛠️ 1. การเตรียมข้อมูล API จาก LINE Developers Console

1. เข้าไปที่ [LINE Developers Console](https://developers.line.biz/)
2. เลือก **Provider** และ **Channel** ของ LINE Official Account คุณ (ประเภท Messaging API)
3. ไปที่แท็บ **Messaging API**:
   - เลื่อนลงมาที่หัวข้อ **Channel access token**
   - กด **Issue** (หรือ Re-issue) เพื่อรับ Token ยาว (Long-lived Channel Access Token)
4. ไปที่แท็บ **Basic settings**:
   - คัดลอก **Channel secret**
5. เปิดไฟล์ [.env](file:///home/natthaphon/line_oa/.env) แล้วนำค่ามาวาง:
   ```env
   LINE_CHANNEL_ACCESS_TOKEN=วาง_Channel_Access_Token_ที่นี่
   LINE_CHANNEL_SECRET=วาง_Channel_Secret_ที่นี่
   ```

---

## 🚀 2. คำสั่งใช้งานหลัก (NPM Scripts)

### 🔹 1. ตรวจสอบการเชื่อมต่อ API
ทดสอบว่า Token ถูกต้องและดึงข้อมูล Bot ได้:
```bash
npm run check
```

---

### 🔹 2. สร้าง Rich Menu และอัปโหลดรูปภาพ
ระบบได้เตรียมรูปตัวอย่าง (`assets/sample_6_buttons.png`) และเทมเพลต 6 ปุ่ม (`templates/richMenu6Buttons.json`) ไว้ให้แล้ว:

* **สร้าง Rich Menu และตั้งเป็นเมนูหลัก (Default) ทันที:**
  ```bash
  npm run create-menu:default
  ```
* **หรือสร้างแบบแถวเดียวกะทัดรัด (Compact 3 ปุ่ม):**
  ```bash
  npm run create-menu:compact
  ```

---

### 🔹 3. ตรวจสอบและดูรายการ Rich Menu ทั้งหมด
ดึงรายการ Rich Menu ที่มีในระบบ พร้อมบอกว่าเมนูไหนเป็น Default:
```bash
npm run list-menus
```

---

### 🔹 4. กำหนดให้ Rich Menu ใดเป็นค่าเริ่มต้นสำหรับทุกคน
```bash
npm run set-default <RICH_MENU_ID>
```
*(หากไม่ใส่ ID ระบบจะใช้ ID ล่าสุดที่เพิ่งสร้างให้อัตโนมัติ)*

หากต้องการยกเลิก Default Rich Menu:
```bash
node src/setDefaultRichMenu.js --cancel
```

---

### 🔹 5. ผูก Rich Menu เฉพาะบุคคล (Personalized Menu)
สำหรับเปลี่ยนเมนูตามสถานะผู้ใช้ (เช่น เมนูลูกค้าทั่วไป vs สมาชิก VIP):
```bash
npm run link-user <USER_ID> <RICH_MENU_ID>
```
ยกเลิกการผูกเฉพาะบุคคล (ให้กลับไปใช้เมนูปกติ):
```bash
node src/linkUserRichMenu.js <USER_ID> --unlink
```

---

### 🔹 6. ลบ Rich Menu
* **ลบเมนูเฉพาะ ID:**
  ```bash
  npm run delete-menu <RICH_MENU_ID>
  ```
* **ลบ Rich Menu ทั้งหมดในระบบ:**
  ```bash
  npm run delete-all
  ```

---

## 🎨 3. การเปลี่ยนรูปภาพและปรับแต่งปุ่มของคุณเอง

1. **เปลี่ยนรูปภาพ:**
   - วางรูปของคุณในโฟลเดอร์ `assets/` (ขนาดแนะนำ `2500 x 1686 px` หรือ `2500 x 843 px` ขนาดไม่เกิน 1 MB นามสกุล JPG หรือ PNG)
2. **ปรับแต่งพิกัดและปุ่ม Action:**
   - แก้ไขไฟล์ [templates/richMenu6Buttons.json](file:///home/natthaphon/line_oa/templates/richMenu6Buttons.json)
   - ปรับ `bounds` (x, y, width, height) และประเภท `action`:
     * `uri`: เปิดลิงก์เว็บไซต์หรือ LIFF
     * `message`: ส่งข้อความอัตโนมัติเข้าแชท
     * `postback`: ส่ง event ลับไปยัง Webhook server
