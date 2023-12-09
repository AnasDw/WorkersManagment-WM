import { useState, useEffect } from 'react';

const useAxios = async (configObj) => {
  const { axiosInstance, method, url, requestConfig } = configObj;
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        // This is used to handle the scenario where the component is unmounted before the request is complete
        const res = await axiosInstance[method.toLowerCase()](url, { ...requestConfig, signal: controller.signal });
        setResponse(res.data);
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // to prevent memory leaks if the component is unmounted before the request is completed
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);

  return [response, loading, errors];
};

export { useAxios };
