import {useDispatch} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {
  setAllDashboardData,
  setGameList,
  setServiceList,
  setUserInfo,
} from '../store/slices/userSlices';
import {api, formDataApi} from '../utils/api';

export default function useCommon() {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  // Fetch service category
  const {
    data: serviceCategoryData,
    error: serviceCategoryError,
    isLoading: serviceCategoryLoading,
  } = useQuery({
    queryKey: ['service-category', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('service-category');
        const {data} = response;

        if (data) {
          dispatch(setServiceList(data.data));
        }

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  // Fetch data list
  const {
    data: getDataList,
    error: getDataListError,
    isLoading: getDataListLoading,
  } = useQuery({
    queryKey: ['get-data-list', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-data-list');
        const {data} = response;

        if (data) {
          dispatch(setAllDashboardData(data));
        }

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  const {
    data: getGallery,
    error: getGalleryErr,
    isLoading: getGalleryLoading,
  } = useQuery({
    queryKey: ['get-gallery', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-gallery');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {
    data: getAllAward,
    error: getAllAwardErr,
    isLoading: getAllAwardLoading,
  } = useQuery({
    queryKey: ['get-awards', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-awards');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {
    data: getAllTestimonal,
    error: getAllTestimonalErr,
    isLoading: getAllTestimonalLoading,
  } = useQuery({
    queryKey: ['get-testimonial', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-testimonial');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {
    data: getAllVideo,
    error: getAllVideoErr,
    isLoading: getAllVideoLoading,
  } = useQuery({
    queryKey: ['get-video', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-video');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {
    data: getTechnique,
    error: getTechniqueErr,
    isLoading: getTechniqueLoading,
  } = useQuery({
    queryKey: ['techniques-category', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('techniques-category');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  }); //

  const {
    data: getALlappointList,
    error: getALlappointListErr,
    isLoading: getALlappointListLoading,
  } = useQuery({
    queryKey: ['my-appoint-list', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('my-appoint-list');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //penlist api  get-penlist

  const {
    data: getPenlist,
    error: getPenlistErr,
    isLoading: getPenlistLoading,
  } = useQuery({
    queryKey: ['get-penlist', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-penlist');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  }); //
  //

  const {
    data: newArrivals,
    error: newArrivalsErr,
    isLoading: newArrivalsLoading,
  } = useQuery({
    queryKey: ['new_arrivals', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('new_arrivals');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  ///

  const {
    data: allGamesData,

    isLoading: allGamesDataloading,
  } = useQuery({
    queryKey: ['all_games', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('all_games');
        const {data} = response;
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {
    data: getPolicy,

    isLoading: getLoading,
  } = useQuery({
    queryKey: ['get-policy', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-policy');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {
    data: getTerms,

    isLoading: allGamesLoading,
  } = useQuery({
    queryKey: ['get-terms', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-terms');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //your benifites

  const {
    data: yourBenifites,

    isLoading: yourBenifitsLoading,
  } = useQuery({
    queryKey: ['your_benifits', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('your_benifits');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {
    data: whoNeedUs,

    isLoading: whoNeedThisLoading,
  } = useQuery({
    queryKey: ['getwho_need_this', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('getwho_need_this');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {
    data: services_with_offerings,

    isLoading: services_with_offeringsLoading,
  } = useQuery({
    queryKey: ['services_with_offerings', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('services_with_offerings');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  }); //

  //
  const {data: getAllTechnical, isLoading: getAllTechniclLoding} = useQuery({
    queryKey: ['techniques-SubCategory-list', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('techniques-SubCategory-list');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  //

  const {
    data: getSubCategoryList,

    isLoading: getSubCategoryListLoading,
  } = useQuery({
    queryKey: ['services-SubCategory-list', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('services-SubCategory-list');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {
    data: getGamesList,

    isLoading: getGamesListLoading,
  } = useQuery({
    queryKey: ['games-SubCategory-list', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('games-SubCategory-list');
        const {data} = response;

        if (data) {
          dispatch(setGameList(data.data));
        }

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  }); //

  

  //

  const {
    data: getPodcasts,
    isLoading: getPodcastsLoading,
  } = useQuery({
    queryKey: ['get-podcast', 'user'],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get('get-podcast');
        const {data} = response;

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  const { data: getProducts,
     isLoading: getProductsLoading, 
  } = useQuery({
    queryKey: ['get_products'],
    queryFn: async () => {
      try {
        const response = await api.get('get_products');
        const { data } = response;
        return data?.data || []; // Only return array
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || error.message || 'An error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });


  const { data: getcafe,
    isLoading: getcafeLoading, 
 } = useQuery({
   queryKey: ['get_cafe_details'],
   queryFn: async () => {
     try {
       const response = await api.get('get_cafe_details');
       const  data  = response;
       return data?.data || []; // Only return array
     } catch (error) {
       const errorMessage =
         error?.response?.data?.message || error.message || 'An error occurred';
       throw new Error(errorMessage);
     } finally {
       setManualLoading(false);
     }
   },
 });

  //get-terms
  const isLoading =
    manualLoading ||
    serviceCategoryLoading ||
    getDataListLoading ||
    getGalleryLoading ||
    getAllAwardLoading ||
    getAllTestimonalLoading ||
    getAllVideoLoading ||
    getTechniqueLoading ||
    getALlappointListLoading ||
    getPenlistLoading ||
    newArrivalsLoading;

  return {
    serviceCategoryData,
    serviceCategoryError,
    getDataList,
    newArrivals,
    getDataListError,
    getGalleryErr,
    getAllTechniclLoding,
    isLoading,
    serviceCategoryLoading,
    getDataListLoading,
    getGallery,
    getGalleryLoading,
    getAllAward,
    getAllAwardErr,
    getAllAwardLoading,
    getAllTestimonal,
    getAllTestimonalErr,
    getAllTestimonalLoading,

    getAllVideo,
    getAllVideoErr,
    getAllVideoLoading,
    allGamesLoading,
    getTechnique,
    getTechniqueErr,
    getPenlistErr,

    getALlappointList,
    getALlappointListErr,
    getPenlist,
    getPolicy,
    getLoading,
    getTerms,
    allGamesData,
    allGamesDataloading,
    whoNeedUs,
    whoNeedThisLoading,
    yourBenifites,
    yourBenifitsLoading,
    services_with_offerings,
    services_with_offeringsLoading,
    getAllTechnical,
    getSubCategoryList,
    getSubCategoryListLoading,
    getGamesList,
    getGamesListLoading,
    getPodcasts,
    getPodcastsLoading,
    getProducts,
    getProductsLoading,
    getcafe,
    getcafeLoading,
  };
}
