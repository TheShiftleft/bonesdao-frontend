import { useContext } from 'react';
import { Context } from '../contexts/BonesDaoProvider';

const useBonesDao = () => {
  const { bonesDao } = useContext(Context);
  console.log('bonesDao', bonesDao)
  return bonesDao;
};

export default useBonesDao;
