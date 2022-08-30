import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const { slowRefresh } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await bonesDao.getTotalValueLocked());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, bonesDao, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
