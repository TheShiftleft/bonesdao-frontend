import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import useRefresh from './useRefresh';

const useFetchMasonryAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const bonesDao = useBonesDao();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchMasonryAPR() {
      try {
        setApr(await bonesDao.getMasonryAPR());
      } catch(err){
        console.error(err);
      }
    }
   fetchMasonryAPR();
  }, [setApr, bonesDao, slowRefresh]);

  return apr;
};

export default useFetchMasonryAPR;
