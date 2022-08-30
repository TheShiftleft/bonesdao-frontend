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
      WFTM: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18], //wDOGE
      WDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18], //wDOGE
      FUSDT: ['0x1111776366fbAA4c87F7D58db63601456dd73e10', 6], // This is actually usdc on mainnet not fusdt
      USDC: ['0x1111776366fbAA4c87F7D58db63601456dd73e10', 6],
      'DIGITAL-BASED-LP': ['0x4Ba668d95c16aFcbBdCeb88f1FA52D66D7016355', 18],
      'DIGSHARES-FTM-LP': ['0xa0619868afCCc62f6CB6DcB51E59135a9355c7A3', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'TOMB-FTM-LP': ['0x2A651563C9d3Af67aE0388a5c8F89b867038089e', 18],
      'TSHARE-FTM-LP': ['0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2', 18],
      'BONES-DOGE-LP': ['0x32b9eaf6e0e3e299cb0635215688bba5fe9f31d6', 18],
      'BSHARE-DOGE-LP': ['0x690Fb1cf7B4198bAF1383C0D8a95dd5C54362f74', 18],
    },
    baseLaunchDate: new Date('2022-08-30 00:00:00Z'),
    bondLaunchesAt: new Date('2022-09-01T00:00:00Z'),
    masonryLaunchesAt: new Date('2022-09-01T06:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.FTMTESTNET,
    networkName: 'DogeChain Mainnet',
    ftmscanUrl: 'https://explorer.dogechain.dog/',
    defaultProvider: 'https://rpc01-sg.dogechain.dog/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18], //wDOGE
      WDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18], //wDOGE
      FUSDT: ['0x1111776366fbAA4c87F7D58db63601456dd73e10', 6], // This is actually usdc on mainnet not fusdt
      USDC: ['0x1111776366fbAA4c87F7D58db63601456dd73e10', 6],
      'DIGITAL-BASED-LP': ['0x4Ba668d95c16aFcbBdCeb88f1FA52D66D7016355', 18],
      'DIGSHARES-FTM-LP': ['0xa0619868afCCc62f6CB6DcB51E59135a9355c7A3', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'TOMB-FTM-LP': ['0x2A651563C9d3Af67aE0388a5c8F89b867038089e', 18],
      'TSHARE-FTM-LP': ['0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2', 18],
      'BONES-DOGE-LP': ['0x32b9eaf6e0e3e299cb0635215688bba5fe9f31d6', 18],
      'BSHARE-DOGE-LP': ['0x690Fb1cf7B4198bAF1383C0D8a95dd5C54362f74', 18],
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
    depositTokenName: 'WDOGE',
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

export const digitBankDefinitions: { [contractName: string]: BankInfo } = {
  WftmDigitalLP: {
    name: 'Earn DIGITAL by WFTM',
    poolId: 0,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'WFTM',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  BasedDigitalLP: {
    name: 'Earn DIGITAL by BASED',
    poolId: 1,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'BASED',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  TombDigitalLP: {
    name: 'Earn DIGITAL by TOMB',
    poolId: 2,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'TOMB',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  UsdcDigitalLP: {
    name: 'Earn DIGITAL by USDC',
    poolId: 3,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'USDC',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  MimDigitalLP: {
    name: 'Earn DIGITAL by MIM',
    poolId: 4,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'MIM',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  BShareDigitalLP: {
    name: 'Earn DIGITAL by BSHARE',
    poolId: 5,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'BSHARE',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  DegenDigitalLP: {
    name: 'Earn DIGITAL by DEGEN',
    poolId: 6,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'DEGEN',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
  DigitBasedLPDigitalLP: {
    name: 'Earn DIGITAL by DIGIT-BASED LP',
    poolId: 7,
    sectionInUI: null,
    contract: 'genesis_pool',
    depositTokenName: 'DIGITAL-BASED-LP',
    earnTokenName: 'DIGITAL',
    finished: false,
    sort: null,
    closedForStaking: false,
  },
}

export default configurations[process.env.NODE_ENV || 'development'];
