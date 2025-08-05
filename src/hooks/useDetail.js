import {useDispatch} from 'react-redux';
import {useMutation} from '@tanstack/react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useState} from 'react';
import {setProfileDetails, setUserInfo} from '../store/slices/userSlices';
import {KEYS} from '../config/Constent';
import {api, formDataApi, guestApi} from '../utils/api';

export default function useDetails() {
  const dispatch = useDispatch();

  const [manualLoading, setManualLoading] = useState(false);

  const {mutateAsync: getServiceList} = useMutation({
    mutationKey: ['service-Category-list', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('service-Category-list', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: getApointmentList} = useMutation({
    mutationKey: ['get_appointment_list', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('get_appointment_list', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  const {mutateAsync: getItemDetails} = useMutation({
    mutationKey: ['service-item-details', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('service-item-details', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: getRelatedTechnique} = useMutation({
    mutationKey: ['get-techniques', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('get-techniques', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: categoryDetails} = useMutation({
    mutationKey: ['techinque-details', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('techinque-details', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  }); //

  //

  const {mutateAsync: arrivalDetails} = useMutation({
    mutationKey: ['arrivals_details', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('arrivals_details', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  }); //my_appointment

  //

  const {mutateAsync: detailsAppoint} = useMutation({
    mutationKey: ['my_appointment', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('my_appointment', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //
  const {mutateAsync: upcomingDetails} = useMutation({
    mutationKey: ['upcoming_events', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('upcoming_events', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  //

  const {mutateAsync: generate_social_qr} = useMutation({
    mutationKey: ['generate_social_qr', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('generate_social_qr', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: payment_card_details} = useMutation({
    mutationKey: ['payment_card_details', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await formDataApi.post(
          'payment_card_details',
          payload,
        );
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: user_booking_history} = useMutation({
    mutationKey: ['user_booking_history', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await formDataApi.post(
          'user_booking_history',
          payload,
        );
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: Bookingss} = useMutation({
    mutationKey: ['bookings', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await formDataApi.post('bookings', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: bookingHistory} = useMutation({
    mutationKey: ['user_booking_history', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('user_booking_history', payload);
        const {data} = response;

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //
  const {mutateAsync: getDetails} = useMutation({
    mutationKey: ['user-details', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await formDataApi.post('user-details', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //
  const {mutateAsync: delateAccount} = useMutation({
    mutationKey: ['delete-account', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await formDataApi.post('delete-account', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //
  const {mutateAsync: notifications} = useMutation({
    mutationKey: ['notification-toggle', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('notification-toggle', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: getNotificationToggle} = useMutation({
    mutationKey: ['get-notification-toggle', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('get-notification-toggle', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  //
  const {mutateAsync: getAllnotification} = useMutation({
    mutationKey: ['get-All-Notification', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('get-All-Notification', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //check-user-status

  const {mutateAsync: keeploginOut} = useMutation({
    mutationKey: ['check-user-status', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('check-user-status', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //payment

  const {mutateAsync: CreateOrder} = useMutation({
    mutationKey: ['razorpay/create-order', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('razorpay/create-order', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          // dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: verify_payment} = useMutation({
    mutationKey: ['razorpay/verify-payment', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('razorpay/verify-payment', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          // dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        console.log(error, 'booking error api');
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //razorpay/cancel-booking
  //

  const {mutateAsync: CancelAppointment} = useMutation({
    mutationKey: ['razorpay/cancel-booking', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('razorpay/cancel-booking', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          // dispatch(setProfileDetails(data));
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        console.log(error, 'booking error api');
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //
  const isLoading = manualLoading;
  return {
    getServiceList,
    CancelAppointment,
    CreateOrder,
    Bookingss,
    upcomingDetails,
    isLoading,
    getItemDetails,
    getRelatedTechnique,
    categoryDetails,
    arrivalDetails,
    keeploginOut,
    detailsAppoint,
    delateAccount,
    generate_social_qr,
    payment_card_details,
    user_booking_history,
    getDetails,
    getNotificationToggle,
    bookingHistory,
    notifications,
    verify_payment,
    getAllnotification,
    getApointmentList,
  };
}
