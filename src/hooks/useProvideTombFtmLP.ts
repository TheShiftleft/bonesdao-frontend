import { useCallback } from 'react';
import useBonesDao from './useBonesDao';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from './../utils/constants'

const useProvideTombFtmLP = () => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideTombFtmLP = useCallback(
    (ftmAmount: string, tombAmount: string) => {
      const tombAmountBn = parseUnits(tombAmount);
      handleTransactionReceipt(
        bonesDao.provideTombFtmLP(ftmAmount, tombAmountBn),
        `Provide Tomb-FTM LP ${tombAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [bonesDao, handleTransactionReceipt],
  );
  return { onProvideTombFtmLP: handleProvideTombFtmLP };
};

export default useProvideTombFtmLP;
