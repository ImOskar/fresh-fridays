let id = 0;

export const createToast = (message) => {
  return {
    ...message,
    id: id++,
  };
};

export const removeToast = (toasts, id) => {
  return toasts.filter((toast) => toast.id !== id);
};
