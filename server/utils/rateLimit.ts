// โครงสร้างของข้อมูลสำหรับใช้จำกัดการส่งคำขอ (Rate Limit)
interface RateLimitInfo {
  count: number;     // จำนวนครั้งที่ได้ทำการยิง Request เข้ามา
  resetTime: number; // เวลาที่จะทำการรีเซ็ตจำนวนครั้งให้กลับเป็น 0 (Timestamp)
}

// In-memory store: สร้างตัวแปร Map เพื่อใช้เก็บประวัติการส่งคำขอของแต่ละ User/IP
// หมายเหตุ: วิธีนี้ใช้หน่วยความจำของเซิร์ฟเวอร์โดยตรง หากเป็น Production ขนาดใหญ่ หรือมีหลายเซิร์ฟเวอร์ ควรเปลี่ยนไปใช้ Redis แทน
const rateLimitStore = new Map<string, RateLimitInfo>();

// ฟังก์ชันสำหรับตรวจสอบการจำกัดอัตราการล็อกอิน (ป้องกันการเดารหัสผ่านซ้ำๆ หรือ Brute Force Attack)
// สามารถกำหนด identifier (เช่น IP หรือ Username), maxAttempts (จำนวนครั้งสูงสุด), windowMinutes (เวลาที่แบนเป็นนาที)
export const checkLoginRateLimit = (identifier: string, maxAttempts = 5, windowMinutes = 15) => {
  const now = Date.now();
  // ดึงประวัติเก่าของ identifier นี้ (ถ้ามี)
  const info = rateLimitStore.get(identifier);

  if (info) {
    // 1. ถ้าเวลาปัจจุบัน เลยเวลาที่ตั้งให้รีเซ็ตแล้ว (แปลว่าพ้นโทษแบน หรือครบเวลาแล้ว)
    if (now > info.resetTime) {
      // ตั้งค่าการนับใหม่เป็น 1 ครั้ง และอัปเดตเวลารีเซ็ตใหม่
      rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMinutes * 60 * 1000 });
      return { allowed: true, remaining: maxAttempts - 1, resetTime: info.resetTime };
    }

    // 2. ถ้ายังไม่พ้นเวลา แต่เคยพยายามเข้าสู่ระบบจนครบจำนวนครั้งสูงสุดแล้ว (โดนบล็อก)
    if (info.count >= maxAttempts) {
      // คืนค่า allowed: false เพื่อไม่อนุญาตให้ล็อกอินต่อ
      return { allowed: false, remaining: 0, resetTime: info.resetTime };
    }

    // 3. ถ้ายังพยายามไม่ถึงจำนวนสูงสุด ให้บวกจำนวนครั้งเพิ่มขึ้น 1
    info.count++;
    return { allowed: true, remaining: maxAttempts - info.count, resetTime: info.resetTime };
  } else {
    // กรณีที่เพิ่งพยายามล็อกอินเป็น "ครั้งแรก"
    // คำนวณเวลาที่จะรีเซ็ตในอนาคต (นาที * 60 วินาที * 1000 มิลลิวินาที)
    const resetTime = now + windowMinutes * 60 * 1000;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxAttempts - 1, resetTime };
  }
};

// ฟังก์ชันสำหรับล้างค่าการจำกัดอัตรา (เช่น ใช้ตอนที่ผู้ใช้ล็อกอิน "สำเร็จ" แล้ว เราจะล้างคูลดาวน์ให้ทันที)
export const resetLoginRateLimit = (identifier: string) => {
  rateLimitStore.delete(identifier);
};
