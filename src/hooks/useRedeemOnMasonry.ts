import { useCallback } from 'react';
import useBonesDao from './useBonesDao';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnMasonry = (description?: string) => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem TSHARE from Masonry';
    handleTransactionReceipt(bonesDao.exitFromMasonry(), alertDesc);
  }, [bonesDao, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnMasonry;
