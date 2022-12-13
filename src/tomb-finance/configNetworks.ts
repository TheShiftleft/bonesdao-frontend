import { ChainId } from "./constants";

 
export const ConfigNetworks ={
    DOGE_TESTNET: {
        chainId: 568,
        networkName : 'Doge Test',
        ftmscanUrl : 'https://explorer-testnet.dogechain.dog/',
        defaultProvider : 'https://rpc-testnet.dogechain.dog/',
        deployments : './deployments/deployments.testing.json',
        externalTokens:{
            WWDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18],
            FUSDT : ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            USDC: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            'BONES-DOGE-LP': ['0x26DB801D497222C0478CF302f867d36e0bCF2110',18],
            'BSHARE-DOGE-LP': ['0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76',18]
        }
    },
    DOGE_MAINNET: {
        chainId: 568,
        networkName : 'Doge Test',
        ftmscanUrl : 'https://explorer-testnet.dogechain.dog/',
        defaultProvider : 'https://rpc-testnet.dogechain.dog/',
        deployments : './deployments/deployments.testing.json',
        externalTokens:{
            WWDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18],
            FUSDT : ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            USDC: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            'USDT-FTM-LP':['0x917A454571bC19248F03b4fF15C8c8380ed5e6DD',18],
            'BONES-DOGE-LP': ['0x26DB801D497222C0478CF302f867d36e0bCF2110',18],
            'BSHARE-DOGE-LP': ['0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76',18]
        }
    },
     OPTIMISM_TESTNET: {
        chainId: 10,
        networkName : 'Optimism Test',
        ftmscanUrl : 'https://explorer-testnet.dogechain.dog/',
        defaultProvider : 'https://rpc-testnet.dogechain.dog/',
        deployments : './deployments/deployments.testing.json',
        externalTokens:{
            WWDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18],
            FUSDT : ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            USDC: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            'USDT-FTM-LP':['0x917A454571bC19248F03b4fF15C8c8380ed5e6DD',18],
            'BONES-DOGE-LP': ['0x26DB801D497222C0478CF302f867d36e0bCF2110',18],
            'BSHARE-DOGE-LP': ['0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76',18]
        }
    },
     OPTMISM_MAINNET: {
        chainId: 10,
        networkName : 'Optimism',
        ftmscanUrl : 'https://explorer-testnet.dogechain.dog/',
        defaultProvider : 'https://rpc-testnet.dogechain.dog/',
        deployments : './deployments/deployments.testing.json',
        externalTokens:{
            WWDOGE: ['0x2465086E721F68761e3275A54802C985FFd0D727', 18],
            FUSDT : ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            USDC: ['0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',18],
            'USDT-FTM-LP':['0x917A454571bC19248F03b4fF15C8c8380ed5e6DD',18],
            'BONES-DOGE-LP': ['0x26DB801D497222C0478CF302f867d36e0bCF2110',18],
            'BSHARE-DOGE-LP': ['0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76',18]
        }
    }
}

// export enum ConfigNetworks {

//     DOGENETWORKNAME = 'Doge Test',
//     DOGEFTMSCANURL = 'https://explorer-testnet.dogechain.dog/',
//     DOGEDEFAULTPROVIDER = 'https://rpc-testnet.dogechain.dog/',
//     DOGEDEPLOYMENTS = './deployments/deployments.testing.json' ,
//     OPTIMISMNETWORKNAME = 'Optimism Test',
//     OPTIMISMNFTMSCANURL = 'https://explorer-testnet.dogechain.dog/',
//     OPTIMISMNDEFAULTPROVIDER = 'https://rpc-testnet.dogechain.dog/',
//     OPTIMISMNDEPLOYMENTS = `./tomb-finance/deployments/deployments.testing.json`

// }
export enum ExternalTokens{

    DOGEWWDOGE = '0x2465086E721F68761e3275A54802C985FFd0D727',
    DOGEFUSDT = '0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',
    DOGEUSDC = '0x393610183D40B4cb23f09E1E7EAE704A4709B6e6',
    DOGEUSDTFTMLP = '0x917A454571bC19248F03b4fF15C8c8380ed5e6DD',
    DOGEBONESDOGELP = '0x26DB801D497222C0478CF302f867d36e0bCF2110',
    DOGEBSHAREDOGELP = '0x82D7bed6Ceb0075Ad7E83b060b7aBC3f2e86FF76',
    OPTIMISMWWDOGE = '0x2465086E721F68761e3275A54802C985FFd0D727-TEST',
    OPTIMISMDOGEFUSDT = '0x393610183D40B4cb23f09E1E7EAE704A4709B6e6-TEST',
    OPTIMISMDOGEUSDC = '0x393610183D40B4cb23f09E1E7EAE704A4709B6e6-TEST',
    OPTIMISMDOGEUSDTFTMLP = '0x917A454571bC19248F03b4fF15C8c8380ed5e6DD-TEST',
    OPTIMISMDOGEBONESDOGELP = '0x26DB801D497222C0478CF302f867d36e0bCF2110-TEST'
}

export enum chainId{

    DOGEMAINID = ChainId.DOGEMAINID,
    DOGETESTID = ChainId.DOGETESTID,
    OPTIMAINID = ChainId.OPTIMISMID,
    OPTITESTID = ChainId.OPTIMISMTEST
}