import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBonesDao from './useBonesDao';
import useRefresh from './useRefresh';

const useEarningsOnMasonry = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();
  const isUnlocked = bonesDao?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await bonesDao.getEarningsOnMasonry());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, bonesDao, slowRefresh]);

  return balance;
};

export default useEarningsOnMasonry;
