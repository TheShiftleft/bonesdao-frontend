import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBonesDao from './useBonesDao';
import useRefresh from './useRefresh';

const useTotalStakedOnMasonry = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const bonesDao = useBonesDao();
  const { slowRefresh } = useRefresh();
  const isUnlocked = bonesDao?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await bonesDao.getTotalStakedInMasonry());
      } catch(err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
     fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, bonesDao]);

  return totalStaked;
};

export default useTotalStakedOnMasonry;
