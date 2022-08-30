import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await bonesDao.getBondStat());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, bonesDao, slowRefresh]);

  return stat;
};

export default useBondStats;
