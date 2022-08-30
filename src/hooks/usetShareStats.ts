import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await bonesDao.getShareStat());
      } catch(err){
        console.error(err)
      }
    }
    fetchSharePrice();
  }, [setStat, bonesDao, slowRefresh]);

  return stat;
};

export default useShareStats;
