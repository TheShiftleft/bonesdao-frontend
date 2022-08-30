import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { LPStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const { slowRefresh } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchLpPrice() {
      try{
        setStat(await bonesDao.getLPStat(lpTicker));
      }
      catch(err){
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, bonesDao, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
