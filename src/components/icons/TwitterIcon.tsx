import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Icon, { IconProps } from '../Icon';

const TwitterIcon: React.FC<IconProps> = ({ color }) => {
  const { color: themeColor } = useContext(ThemeContext);
  return (
    <Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20.305" viewBox="0 0 25 20.305">
          <path d="M22.43,8.441c.016.222.016.444.016.666A14.478,14.478,0,0,1,7.868,23.685,14.479,14.479,0,0,1,0,21.385a10.6,10.6,0,0,0,1.237.063A10.261,10.261,
          0,0,0,7.6,19.26a5.133,5.133,0,0,1-4.791-3.553,6.461,6.461,0,0,0,.968.079,5.419,5.419,0,0,0,1.348-.174,5.124,5.124,0,0,1-4.109-5.029v-.063a5.16,5.16,0,0,0,
          2.316.65A5.131,5.131,0,0,1,1.745,4.317,14.564,14.564,0,0,0,12.31,9.678,5.784,5.784,0,0,1,12.183,8.5,5.129,5.129,0,0,1,21.05,5,10.088,10.088,0,0,0,24.3,3.761a5.11,
          5.11,0,0,1-2.253,2.824A10.272,10.272,0,0,0,25,5.792a11.014,11.014,0,0,1-2.57,2.649Z"
          transform="translate(0 -3.381)"
          fill={color ? color : themeColor.grey[400]}
          />
        </svg>
    </Icon>
  );
};

export default TwitterIcon;
