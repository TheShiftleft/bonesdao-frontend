import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/bones.png';
import tShareLogo from '../../assets/img/bshares.png';
import tombLogoPNG from '../../assets/img/bones.png';
import tShareLogoPNG from '../../assets/img/bshares.png';
import tBondLogo from '../../assets/img/boneds.png';
import bonesLogo from '../../assets/img/bones.png';
import bshareLogo from '../../assets/img/bshares.png';
import bbondLogo from '../../assets/img/boneds.png';

import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
import tshareFtmLpLogo from '../../assets/img/tshare_ftm_lp.png';
import bonesDogeLpLogo from '../../assets/img/bones-doge-lp.png';
import bshareDogeLpLogo from '../../assets/img/bshare-doge-lp.png';

import wftmLogo from '../../assets/img/ftm_logo_blue.svg';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';
import dogeLogo from '../../assets/img/dogechain.png';
import usdcLogo from '../../assets/img/USDC.png';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const logosBySymbol: { [title: string]: any} = {
  //Real tokens
  //=====================
  TOMB: tombLogo,
  BONES: bonesLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  BSHARE: bshareLogo,
  TBOND: tBondLogo,
  BBOND: bbondLogo,
  WFTM: wftmLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  WDOGE: dogeLogo,
  WWDOGE: dogeLogo,
  USDC: usdcLogo,
  'TOMB-FTM-LP': tombFtmLpLogo,
  'TSHARE-FTM-LP': tshareFtmLpLogo,
  'BONES-DOGE-LP': [
    bonesLogo, dogeLogo
  ],
  'BSHARE-DOGE-LP': [
    bshareLogo, dogeLogo
  ],
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const useStyles = makeStyles((theme) => ({
  logoStyle: {
    right: '0px',
    top: '-5px',
    borderRadius: '40px',
    backgroundColor: '#6f0404',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  doubleLogo: {
    display: 'flex',
    flexDirection: 'row'
  }
}))

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 54 }) => {
  const classes = useStyles()
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if(typeof logosBySymbol[symbol] === 'string'){
    return (
      <Box className={classes.logoStyle} width={size+16} height={size+16}>
        <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />
      </Box>
    )
  }
  return (
    <Box className={classes.doubleLogo}>
      <Box className={classes.logoStyle} style={{ marginRight: '-5px' }} width={size+16} height={size+16}>
        <img src={logosBySymbol[symbol][0]} alt={`${symbol} Logo`} width={size} height={size} />
      </Box>
      <Box className={classes.logoStyle} style={{ marginLeft: '-5px' }} width={size+16} height={size+16}>
        <img src={logosBySymbol[symbol][1]} alt={`${symbol} Logo`} width={size} height={size} />
      </Box>
    </Box>
  )
};

export default TokenSymbol;
