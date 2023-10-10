import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import { GaslessSigningRequest } from "./types";
import axios, { AxiosError } from "axios";
import { lamportCenterAPI } from "./utils/apiUrl";

export class LamportCenter {
  /**
   * API key generated at
   * @private
   */
  private apiKey: string;

  /** The cluster in which the connection endpoint belongs to */
  public readonly rpcUrl: string;

  /** URL to the Lamport Center endpoint */
  public readonly apiUrl: string;

  /** The connection object from Solana's SDK */
  public readonly connection: Connection;

  /**
   * Initializes Lamport Center API client with an API key
   * @constructor
   * @param apiKey - API key generated at lamport.center
   */
  constructor(apiKey: string, rpcUrl = "https://api.devnet.solana.com") {
    this.apiKey = apiKey;
    this.apiUrl = lamportCenterAPI;
    this.rpcUrl = rpcUrl;
    this.connection = new Connection(this.rpcUrl);
  }

  /**
   * Add fee to user's transaction
   * @param {gaslessSigningRequest} gaslessRequest - the request object containing the transaction information
   * @returns {Promise<VersionedTransaction | Transaction | undefined>} a promise that resolves to the transaction object
   * @throws {Error} if there is an error calling if the response contains an error
   */
  async gaslessSigning(
    gaslessSigningRequest: GaslessSigningRequest,
  ): Promise<VersionedTransaction | Transaction | undefined> {
    try {
      const encodedTransaction = Buffer.from(
        gaslessSigningRequest.transaction.serialize(),
      ).toString("base64");
      const { data } = await axios.post(
        `${this.apiUrl}/solana/sendTransaction?api-key=${this.apiKey}`,
        {
          userWallet: gaslessSigningRequest.userWallet,
          encodedTransaction: encodedTransaction,
          rpc: this.rpcUrl,
        },
      );
      const sponsorTransaction = VersionedTransaction.deserialize(
        Buffer.from(data, "base64"),
      );
      return sponsorTransaction;
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          `error during gaslessSigning: ${err.response?.data.error || err}`,
        );
      } else {
        throw new Error(`error during gaslessSigning: ${err}`);
      }
    }
  }
}
