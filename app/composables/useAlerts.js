import Swal from 'sweetalert2'

// Composable สำหรับจัดการการแสดงแจ้งเตือน (Alerts) รูปแบบต่าง ๆ ด้วย SweetAlert2
export const useAlerts = () => {
  
  // 1. Toast Notification: แจ้งเตือนมุมขวาบน 3 วินาที (เช่น การทำงานสำเร็จ, เตือนความจำ)
  const toast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#ffffff',
      customClass: {
        popup: 'rounded-[24px] border-none shadow-2xl overflow-hidden',
        title: 'text-[15px] font-medium text-slate-700 ml-2'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInRight animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutRight animate__faster'
      },
      didOpen: (toast) => {
        // เมื่อนำเมาส์ไปชี้จะหยุดเวลาไว้ชั่วคราว เมื่อเอาเมาส์ออกจะนับเวลาถอยหลังต่อ
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

  // 2. Confirm Dialog: หน้าต่างยืนยันการทำรายการแบบมีปุ่ม ยืนยัน / ยกเลิก (เช่น ยืนยันการส่งงาน, ยืนยันการลบ)
  const confirm = async (title, text, icon = 'warning') => {
    return await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true, // สลับให้ปุ่มยืนยันอยู่ด้านขวา ปุ่มยกเลิกอยู่ด้านซ้าย
      background: '#ffffff',
      borderRadius: '24px',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
      customClass: {
        popup: 'rounded-[32px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)]',
        title: 'text-2xl font-bold text-slate-800',
        htmlContainer: 'text-slate-500',
        confirmButton: 'rounded-2xl px-8 py-3.5 font-bold',
        cancelButton: 'rounded-2xl px-8 py-3.5 font-bold'
      }
    })
  }

  // 3. Success Alert: หน้าต่างแจ้งเตือนทำรายการสำเร็จ แบบต้องกดปุ่ม "ตกลง"
  const success = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'ตกลง',
      background: '#ffffff',
      borderRadius: '24px',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      customClass: {
        popup: 'rounded-[32px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)]',
        title: 'text-2xl font-bold text-slate-800',
        confirmButton: 'rounded-2xl px-10 py-3.5 font-bold'
      }
    })
  }

  // 4. Error Alert: หน้าต่างแจ้งข้อผิดพลาด (เช่น รหัสผ่านผิด, เกิดข้อผิดพลาดฝั่งเซิร์ฟเวอร์) พร้อมปุ่มสีแดงสั่นไหว
  const error = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      background: '#ffffff',
      borderRadius: '24px',
      showClass: {
        popup: 'animate__animated animate__shakeX animate__faster' // เอฟเฟกต์การสั่นหน้าต่างแจ้งเตือน
      },
      customClass: {
        popup: 'rounded-[32px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)]',
        title: 'text-2xl font-bold text-slate-800',
        confirmButton: 'rounded-2xl px-10 py-3.5 font-bold bg-rose-500 hover:bg-rose-600 shadow-rose-200'
      }
    })
  }

  return {
    toast,
    confirm,
    success,
    error
  }
}
