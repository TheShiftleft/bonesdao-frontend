import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const bonesDao = useBonesDao();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await bonesDao.getTombStatInEstimatedTWAP());
      }catch(err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, bonesDao, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
