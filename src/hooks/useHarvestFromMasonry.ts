import { useCallback } from 'react';
import useBonesDao from './useBonesDao';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromMasonry = () => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(bonesDao.harvestCashFromMasonry(), 'Claim TOMB from Masonry');
  }, [bonesDao, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvestFromMasonry;
