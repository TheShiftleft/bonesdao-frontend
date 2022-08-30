import { useContext } from 'react';
import { Context } from '../contexts/BonesDaoProvider';

const useBonesDao = () => {
  const { bonesDao } = useContext(Context);
  return bonesDao;
};

export default useBonesDao;
