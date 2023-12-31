import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  toast: true,
})

export function errorMsg(title: string | string[], text?: string) {
  return Toast.fire({
    icon: 'error',
    text,
    title,
  })
}

export function successMsg(title: string | string[], text?: string) {
  return Toast.fire({
    icon: 'success',
    text,
    title,
  })
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      errorMsg,
      successMsg,
    },
  }
})
