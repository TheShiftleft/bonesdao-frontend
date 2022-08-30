import { useEffect, useState } from 'react';
import useRefresh from '../useRefresh';
import useBonesDao from '../useBonesDao';

const useClaimRewardCheck = () => {
  const  { slowRefresh } = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const bonesDao = useBonesDao();
  const isUnlocked = bonesDao?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await bonesDao.canUserClaimRewardFromMasonry());
      } catch(err){
        console.error(err);
      };
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, bonesDao]);

  return canClaimReward;
};

export default useClaimRewardCheck;
