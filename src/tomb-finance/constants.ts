import { BigNumber } from 'ethers';

export const DECIMALS_18 = BigNumber.from(10).pow(18);

export const BOND_REDEEM_PRICE = 1.01;
export const BOND_REDEEM_PRICE_BN = DECIMALS_18.mul(101).div(100);

export enum ChainId {
    DOGEMAINID = 568,
    DOGETESTID = 568,
    OPTIMISMID = 10,
    OPTIMISMTEST = 10,
}