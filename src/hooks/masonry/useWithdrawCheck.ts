import { useEffect, useState } from 'react';
import useBonesDao from '../useBonesDao';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const bonesDao = useBonesDao();
  const { slowRefresh } = useRefresh();
  const isUnlocked = bonesDao?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await bonesDao.canUserUnstakeFromMasonry());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, bonesDao, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
