import {Transaction} from "@solana/web3.js";

export interface AddFeeRequest {
    userWallet: string,
    encodedTransaction: string,
}
