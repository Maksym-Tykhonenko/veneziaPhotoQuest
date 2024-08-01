import {useState, useEffect} from 'react';
import {getOptionsData} from '../utils';

const useOptionsData = () => {
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getOptionsData();
        setOptionsData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  return {optionsData, loading, error};
};

export default useOptionsData;
