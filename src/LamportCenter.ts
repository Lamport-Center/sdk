import { PublicKey, Connection, Cluster, Transaction } from "@solana/web3.js";
import {apiUrl} from "./utils/apiUrl";
import {AddFeeRequest} from "./types";
import axios, {AxiosError} from "axios";

export class LamportCenter {
    /**
     * API key generated at
     * @private
     */
    private apiKey: string;

    /** The cluster in which the connection endpoint belongs to */
    public readonly cluster: Cluster;

    /** URL to the fullnode JSON RPC endpoint */
    public readonly endpoint: string;

    /** The connection object from Solana's SDK */
    public readonly connection: Connection;

    /**
     * Initializes Lamport Center API client with an API key
     * @constructor
     * @param apiKey - API key generated at lamportcenter.xyz
     */
    constructor(apiKey: string, cluster: Cluster = "mainnet-beta") {
        this.apiKey = apiKey;
        this.cluster = cluster;
        this.endpoint = apiUrl();
        this.connection = new Connection(this.endpoint);
    }

    /**
     * Add fee to user's transaction
     * @param {AddFeeRequest} addFeeRequest - the request object containing the transaction information
     * @returns {Promise<Transaction>} a promise that resolves to the transaction object
     * @throws {Error} if there is an error calling if the response contains an error
     */
    async addFeeToTransaction(
        addFeeRequest: AddFeeRequest
    ): Promise<Transaction> {
        try {
            const { data } = await axios.post(
                `${this.endpoint}/webhooks?api-key=${this.apiKey}`,
                { ...addFeeRequest }
            );
            return data;
        } catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                throw new Error(
                    `error during addFeeToTransaction: ${err.response?.data.error || err}`
                );
            } else {
                throw new Error(`error during addFeeToTransaction: ${err}`);
            }
        }
    }
}
