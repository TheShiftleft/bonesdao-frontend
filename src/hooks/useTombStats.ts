import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useTombStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { fastRefresh } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchTombPrice(){
      try {
        setStat(await bonesDao.getTombStat());
      }
      catch(err){
        console.error(err)
      }
    }
    fetchTombPrice();
  }, [setStat, bonesDao, fastRefresh]);

  return stat;
};

export default useTombStats;
