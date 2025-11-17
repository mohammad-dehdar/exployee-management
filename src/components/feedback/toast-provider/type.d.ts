import { Bounce, Flip, Slide, Zoom } from 'react-toastify';

export type TypeOptions = 'success' | 'warning' | 'error' | 'info';

export type ToastOptions = {
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center';
  autoClose?: number | false;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  transition?: typeof Bounce | typeof Slide | typeof Flip | typeof Zoom;
};
