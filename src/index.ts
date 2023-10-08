import {
  PublicKey,
  Connection,
  Cluster,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { AddFeeRequest } from "./types";
import axios, { AxiosError } from "axios";
import { Loading } from "notiflix";
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

  async gaslessSigning(
    transaction: VersionedTransaction | Transaction,
  ): Promise<VersionedTransaction | Transaction | undefined> {
    Loading.circle("Checking with Lamport Center...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    Loading.change("Your transaction will be FREE !");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    Loading.remove();
    return undefined;
  }

  /**
   * Add fee to user's transaction
   * @param {AddFeeRequest} addFeeRequest - the request object containing the transaction information
   * @returns {Promise<Transaction>} a promise that resolves to the transaction object
   * @throws {Error} if there is an error calling if the response contains an error
   */
  async addFeeToTransaction(
    addFeeRequest: AddFeeRequest,
  ): Promise<Transaction> {
    try {
      const { data } = await axios.post(
        `${this.apiUrl}/webhooks?api-key=${this.apiKey}`,
        { ...addFeeRequest },
      );
      return data;
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          `error during addFeeToTransaction: ${
            err.response?.data.error || err
          }`,
        );
      } else {
        throw new Error(`error during addFeeToTransaction: ${err}`);
      }
    }
  }
}
