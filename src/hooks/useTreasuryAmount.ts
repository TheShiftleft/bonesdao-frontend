import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBonesDao from './useBonesDao';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();

  useEffect(() => {
    if (bonesDao) {
      const { Treasury } = bonesDao.contracts;
      bonesDao.BONES.balanceOf(Treasury.address).then(setAmount);
    }
  }, [bonesDao]);
  return amount;
};

export default useTreasuryAmount;
