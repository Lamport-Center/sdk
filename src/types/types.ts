import {Transaction, VersionedTransaction} from "@solana/web3.js";

export interface GaslessSigningRequest {
    userWallet: string,
    transaction: VersionedTransaction | Transaction,
}
