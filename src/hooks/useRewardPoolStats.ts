import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { LPStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

export interface RewardPoolStat {
  contract: string,
  address: string,
  startTime: string,
  endTime: string
}

const useRewardPoolStats = (poolName: string) => {
  const [stat, setStat] = useState<RewardPoolStat>();
  const { slowRefresh } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchLpPrice() {
      try{
        setStat(await bonesDao.getRewardsPoolStat(poolName));
      }
      catch(err){
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, bonesDao, slowRefresh, poolName]);

  return stat;
};

export default useRewardPoolStats;
