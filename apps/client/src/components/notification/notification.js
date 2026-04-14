/**
 * Muestra una notificacion toast
 * @param {Object} props - El prop
 * @param {'error' | 'success' | 'info'} props.type - El tipo de notificacion
 * @param {string} props.text - El texto a mostrar en la notificaicon
 */
export const showToast = ({type, text}) => {
  const toast = document.querySelector('#toast');
  const toastIconContainer = document.querySelector('#toast-icon-container');
  const toastText = document.querySelector('#toast-text');
  const closeBtn = document.querySelector('#close-btn');

  switch (type) {
    case 'success':
      toastIconContainer.innerHTML = '<ion-icon name="checkmark-outline" class="text-green-500 w-5 h-5"></ion-icon>';
      break;
    case "error": 
      toastIconContainer.innerHTML = '<ion-icon name="close-outline" class="text-red-500 w-5 h-5"></ion-icon>';
      break;
    case 'info':
      toastIconContainer.innerHTML = '<ion-icon name="information-outline" class="text-yellow-500 w-5 h-5"></ion-icon>'
      break;
    default:
      toastIconContainer.innerHTML = '';
  }

  toastText.innerHTML = text;
  
  toast.classList.add('flex');
  toast.classList.remove('hidden');
  
  
  const timeoutId = setTimeout(() => {
      if (toast?.classList.contains('flex')) {
        toast.classList.remove('flex');
        toast.classList.add('hidden');
      }
  }, 5000);

  closeBtn?.addEventListener('click', e => {
    if (timeoutId) clearTimeout(timeoutId);
    if (toast?.classList.contains('flex')) {
        toast.classList.remove('flex');
        toast.classList.add('hidden');
    }
  })
}