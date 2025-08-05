// Function to show success toast
export const showSuccessToast = (toast, message) => {
  toast.show(message, {
    type: 'success',
    backgroundColor: '#FF914D',
    textColor: 'white',
    duration: 2000,
  });
};

// Function to show error toast
export const showErrorToast = (toast, message) => {
  toast.show(message, {
    type: 'error',
    backgroundColor: 'red',
    textColor: 'white',
    duration: 2000,
  });
};

// Function to show warning toast
export const showWarningToast = (toast, message) => {
  toast.show(message, {
    type: 'warning',
    backgroundColor: '#FF914D',
    textColor: 'black',
    duration: 2000,
  });
};
