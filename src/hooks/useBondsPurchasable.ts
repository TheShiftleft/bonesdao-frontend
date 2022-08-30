import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../tomb-finance/ERC20';
import useBonesDao from './useBonesDao';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchBondsPurchasable() {
        try {
            setBalance(await bonesDao.getBondsPurchasable());
        }
        catch(err) {
            console.error(err);
        }
      }
    fetchBondsPurchasable();
  }, [setBalance, bonesDao]);

  return balance;
};

export default useBondsPurchasable;
