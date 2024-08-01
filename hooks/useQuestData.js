import {useState, useEffect} from 'react';
import {getAllQuestData} from '../utils';

const useQuestData = () => {
  const [questData, setQuestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const data = await getAllQuestData();
        setQuestData(data);
      } catch (error) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestData();
  }, []);

  return {questData, loading, error, setQuestData};
};

export default useQuestData;
