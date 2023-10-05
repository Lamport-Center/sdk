import {Transaction} from "@solana/web3.js";

export interface AddFeeRequest {
    userPublicKey: string,
    transaction: string,
}
