import { useCallback, useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import useStakedBalanceOnMasonry from './useStakedBalanceOnMasonry';

const useMasonryVersion = () => {
  const [masonryVersion, setMasonryVersion] = useState('latest');
  const bonesDao = useBonesDao();
  const stakedBalance = useStakedBalanceOnMasonry();

  const updateState = useCallback(async () => {
    setMasonryVersion(await bonesDao.fetchMasonryVersionOfUser());
  }, [bonesDao?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (bonesDao?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [bonesDao?.isUnlocked, stakedBalance]);

  return masonryVersion;
};

export default useMasonryVersion;
