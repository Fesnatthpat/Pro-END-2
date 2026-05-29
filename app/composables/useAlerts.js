import Swal from 'sweetalert2'

export const useAlerts = () => {
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
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

  const confirm = async (title, text, icon = 'warning') => {
    return await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
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

  const error = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      background: '#ffffff',
      borderRadius: '24px',
      showClass: {
        popup: 'animate__animated animate__shakeX animate__faster'
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
