import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../tomb-finance/ERC20';
import useBonesDao from './useBonesDao';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();
  const isUnlocked = bonesDao?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(bonesDao.myAccount));
  }, [token, bonesDao.myAccount]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(`Failed to fetch token balance: ${err.stack}`));
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, token, fetchBalance, bonesDao]);

  return balance;
};

export default useTokenBalance;
