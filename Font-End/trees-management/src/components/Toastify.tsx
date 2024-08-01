import { toast } from 'react-toastify';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warn' = 'info') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return { showToast };
};