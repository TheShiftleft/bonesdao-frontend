// import { ChainId } from '@pancakeswap-libs/sdk';
//import { ChainId } from '@spookyswap/sdk';
import { ChainId } from './tomb-finance/constants';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  // Set development config same as production to use mainnet in development
  development: {
    chainId: ChainId.FTMTESTNET,
    networkName: 'DogeChain Testnet',
    ftmscanUrl: 'https://explorer-testnet.dogechain.dog/',
    defaultProvider: 'https://rpc-testnet.dogechain.dog/',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WWDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18], //wDOGE
      FUSDT: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6', 18], // This is actually usdc on mainnet not fusdt
      USDC: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6', 18],
      'USDT-FTM-LP': ['0x917A454571bC19248F03b4fF15C8c8380ed5e6DD', 18],
      'BONES-DOGE-LP': ['0x26DB801D497222C0478CF302f867d36e0bCF2110', 18],
      'BSHARE-DOGE-LP': ['0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76', 18],
    },
    baseLaunchDate: new Date('2022-08-30 00:00:00Z'),
    bondLaunchesAt: new Date('2022-09-01T00:00:00Z'),
    masonryLaunchesAt: new Date('2022-09-01T06:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.FTMTESTNET,
    networkName: 'DogeChain Testnet',
    ftmscanUrl: 'https://explorer-testnet.dogechain.dog/',
    defaultProvider: 'https://rpc-testnet.dogechain.dog/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WWDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18], //WWDOGE
      FUSDT: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6', 18], // This is actually usdc on mainnet not fusdt
      USDC: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6', 18],
      'USDT-FTM-LP': ['0x917A454571bC19248F03b4fF15C8c8380ed5e6DD', 18],
      'BONES-DOGE-LP': ['0x26DB801D497222C0478CF302f867d36e0bCF2110', 18],
      'BSHARE-DOGE-LP': ['0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76', 18],
    },
    baseLaunchDate: new Date('2022-08-30 00:00:00Z'),
    bondLaunchesAt: new Date('2022-09-01T00:00:00Z'),
    masonryLaunchesAt: new Date('2022-09-01T06:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  BonesDogeRewardPool: {
    name: 'Earn BONES by DOGE',
    poolId: 0,
    sectionInUI: 0,
    contract: 'BonesDogeRewardPool',
    depositTokenName: 'WWDOGE',
    earnTokenName: 'BONES',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  BonesUSDCRewardPool: {
    name: 'Earn BONES by USDC',
    poolId: 1,
    sectionInUI: 0,
    contract: 'BonesUSDCRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'BONES',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  BonesDogeLPBShareRewardPool: {
    name: 'Earn BSHARE by BONES-DOGE LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'BonesDogeLPBShareRewardPool',
    depositTokenName: 'BONES-DOGE-LP',
    earnTokenName: 'BSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  BShareDogeLPBShareRewardPool: {
    name: 'Earn BSHARE by BSHARE-DOGE LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'BShareDogeLPBShareRewardPool',
    depositTokenName: 'BSHARE-DOGE-LP',
    earnTokenName: 'BSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
  
};


export default configurations[process.env.NODE_ENV || 'development'];
