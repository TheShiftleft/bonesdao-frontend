import { useCallback, useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const bonesDao = useBonesDao();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await bonesDao.getTombPriceInLastTWAP());
  }, [bonesDao]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch TOMB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, bonesDao, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
