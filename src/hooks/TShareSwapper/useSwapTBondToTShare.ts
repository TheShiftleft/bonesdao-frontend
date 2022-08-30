import { useCallback } from 'react';
import useBonesDao from '../useBonesDao';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import { parseUnits } from 'ethers/lib/utils';


const useSwapTBondToTShare = () => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapTShare = useCallback(
  	(tbondAmount: string) => {
	  	const tbondAmountBn = parseUnits(tbondAmount, 18);
	  	handleTransactionReceipt(
	  		bonesDao.swapTBondToTShare(tbondAmountBn),
	  		`Swap ${tbondAmount} TBond to TShare`
	  	);
  	},
  	[bonesDao, handleTransactionReceipt]
  );
  return { onSwapTShare: handleSwapTShare };
};

export default useSwapTBondToTShare;