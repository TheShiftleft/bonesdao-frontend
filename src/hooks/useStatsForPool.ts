import { useCallback, useState, useEffect } from 'react';
import useBonesDao from './useBonesDao';
import { Bank } from '../tomb-finance';
import { PoolStats } from '../tomb-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const bonesDao = useBonesDao();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await bonesDao.getPoolAPRs(bank));
  }, [bonesDao, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch TBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, bonesDao, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
