import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useDigitalStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { fastRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchTombPrice(){
      try {
        setStat(await tombFinance.getDigitalStat());
      }
      catch(err){
        console.error(err)
      }
    }
    fetchTombPrice();
  }, [setStat, tombFinance, fastRefresh]);

  return stat;
};

export default useDigitalStats;
