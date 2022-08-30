import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBonesDao from './useBonesDao';
import useRefresh from './useRefresh';

const useStakedBalanceOnMasonry = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();
  const isUnlocked = bonesDao?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await bonesDao.getStakedSharesOnMasonry());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, bonesDao]);
  return balance;
};

export default useStakedBalanceOnMasonry;
