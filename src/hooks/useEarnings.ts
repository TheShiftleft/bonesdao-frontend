import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBonesDao from './useBonesDao';
import { ContractName } from '../tomb-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();
  const isUnlocked = bonesDao?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await bonesDao.earnedFromBank(poolName, earnTokenName, poolId, bonesDao.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, bonesDao]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, bonesDao, fetchBalance]);

  return balance;
};

export default useEarnings;
