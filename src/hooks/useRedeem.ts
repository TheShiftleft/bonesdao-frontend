import { useCallback } from 'react';
import useBonesDao from './useBonesDao';
import { Bank } from '../tomb-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(bonesDao.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, bonesDao, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
