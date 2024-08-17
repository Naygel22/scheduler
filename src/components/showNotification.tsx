
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
}

export const showNotification = ({ message, type }: NotificationProps) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      break;
    default:
      toast(message);
  }
};


