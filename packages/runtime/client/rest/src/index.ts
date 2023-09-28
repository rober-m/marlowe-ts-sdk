/**
 * This is the main entry point of the @marlowe.io/runtime-rest-client package.
 * You can import it like this:
 *
 * ```ts
 * import { mkRestClient } from "@marlowe.io/runtime-rest-client";
 * ```
 * @packageDocumentation
 */

import axios from "axios";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as O from "fp-ts/lib/Option.js";
import { pipe } from "fp-ts/lib/function.js";

import { MarloweJSONCodec } from "@marlowe.io/adapter/codec";
import * as HTTP from "@marlowe.io/adapter/http";

import * as Payouts from "./payout/endpoints/collection.js";
import * as Payout from "./payout/endpoints/singleton.js";

import * as Withdrawal from "./withdrawal/endpoints/singleton.js";
import * as Withdrawals from "./withdrawal/endpoints/collection.js";
import * as Contract from "./contract/endpoints/singleton.js";
import * as Contracts from "./contract/endpoints/collection.js";
import * as Transaction from "./contract/transaction/endpoints/singleton.js";
import * as Transactions from "./contract/transaction/endpoints/collection.js";
import * as ContractNext from "./contract/next/endpoint.js";
import { unsafeTaskEither } from "@marlowe.io/adapter/fp-ts";
import { ContractId, TextEnvelope } from "@marlowe.io/runtime-core";
import { submitContractViaAxios } from "./contract/endpoints/singleton.js";
import { ContractDetails } from "./contract/details.js";
// import curlirize from 'axios-curlirize';

// TODO: DELETE
// export * from "./contract/index.js";
// export * from "./withdrawal/index.js";
// export * from "./payout/index.js";
// TODO: Revisit
export { Assets, Tokens } from "./payout/index.js";
export { RolesConfig } from "./contract/index.js";
// Jamie Straw suggestion: 20 endpoints
// Runtime Rest API docs: 18 endpoints (missing, getPayouts and getPayoutById, I assume version 0.0.5)
// Current TS-SDK: 16 endpoints
//   https://docs.marlowe.iohk.io/api
// openapi.json on main (RC 0.0.5): 20 endpoints
/**
 * This interface is a 1-1 mapping of the {@link https://docs.marlowe.iohk.io/api/ | Marlowe API endpoints}.
 */
export interface RestAPI {
  /**
   * Gets a paginated list of contracts {@link contract.ContractHeader }
   * @param request Optional filtering and pagination options.
   * @throws DecodingError If the response from the server can't be decoded
   * @see {@link https://docs.marlowe.iohk.io/api/get-contracts}
   */
  getContracts(
    request?: Contracts.GetContractsRequest
  ): Promise<Contracts.GetContractsResponse>;

  /**
   * Builds an unsigned transaction to create an instance of a Marlowe Contract.
   *
   * @param request Request parameters including the Contract to create, role information, metadata, etc.
   * @returns An object with the CBOR encoded transaction to sign (using the {@link @marlowe.io/wallet!api.WalletAPI#signTx} function) and submit to the blockchain (using the TODO method).
   * @throws DecodingError - If the response from the server can't be decoded
   * @see {@link https://docs.marlowe.iohk.io/api/create-contracts | The backend documentation}
   */
  // TODO: Jamie, remove the `s from the end of the endpoint name in the docs site
  // DISCUSSION: @Jamie, @N.H: Should this be called `buildCreateContractTx` instead? As it is not creating the
  //             contract, rather it is creating the transaction to be signed
  createContract(
    request: Contracts.CreateContractRequest
  ): Promise<Contracts.ContractTextEnvelope>;

  /**
   * Gets a single contract by id
   * @param contractId The id of the contract to get
   * @throws DecodingError - If the response from the server can't be decoded
   * @see {@link https://docs.marlowe.iohk.io/api/get-contracts-by-id}
   */
  // TODO: Jamie, remove the `s from the end of the endpoint name in the docs site
  getContractById(contractId: ContractId): Promise<ContractDetails>; // - https://docs.marlowe.iohk.io/api/get-contracts-by-id
  //   In the docs site, after getContractsById there is https://docs.marlowe.iohk.io/api/create-contracts-by-id, not sure what method it corresponds or what is that method supposed to do.
  /**
   * Submits a signed contract creation transaction
   */
  submitContract(
    contractId: ContractId,
    txEnvelope: TextEnvelope
  ): Promise<void>;
  //
  //   getTransactionsForContract: Transactions.GET; // - https://docs.marlowe.iohk.io/api/get-transactions // TODO: Jamie, lets unify names
  //   createTransactionForContract: Transactions.POST; // - https://docs.marlowe.iohk.io/api/create-transactions // TODO: Jamie, lets unify names
  //   getTransactionById: Transaction.GET; // - https://docs.marlowe.iohk.io/api/get-transaction-by-id
  //   submitTransaction: Transaction.PUT; // - Jamie is it this one? https://docs.marlowe.iohk.io/api/create-transaction-by-id? If so, lets unify

  //   getWithdrawals: Withdrawals.GET; // - https://docs.marlowe.iohk.io/api/get-withdrawals
  //   createWithdrawal: Withdrawals.POST; // - https://docs.marlowe.iohk.io/api/create-withdrawals
  //   getWithdrawalById: Withdrawal.GET; // - https://docs.marlowe.iohk.io/api/get-withdrawal-by-id
  //   submitWithdrawal: Withdrawal.PUT; - is it this one? https://docs.marlowe.iohk.io/api/create-withdrawal? or the one for createWithdrawal?
  // TODO: PLT-7719 we should also export the return headers information (Node-Tip Runtime-Chain-Tip Runtime-Tip Runtime-Version Network-Id)
  /**
   * Checks if the Marlowe API is up and running.
   *
   * @see {@link https://docs.marlowe.iohk.io/api/health-check-endpoint}
   */
  healthcheck(): Promise<Boolean>;

  //   getNextStepsForContract: Next.GET; // - Jamie, is it this one? https://docs.marlowe.iohk.io/api/get-transaction-output-by-id? if so lets unify

  //   postContractSource: ContractSources.POST; // - Jamie, is it this one? https://docs.marlowe.iohk.io/api/access-contract-import if so lets unify
  //   getContractSource: ContractSource.GET; // - Jamie, is it this one? https://docs.marlowe.iohk.io/api/get-contract-import-by-id
  //   getContractAdjacency: ContractSource.GET_ADJACENCY;  // - Jamie, is it this one? https://docs.marlowe.iohk.io/api/get-adjacency-by-id if so lets unify
  //   getContractClosure: ContractSource.GET_CLOSURE; // Jamie is it this one? - https://docs.marlowe.iohk.io/api/get-closure-by-id

  //   getPayouts: Payouts.GET;
  //   getPayoutById: Payout.GET;
}

/**
 * Instantiates a REST client for the Marlowe API.
 * @param baseURL An http url pointing to the Marlowe API.
 * @see {@link https://github.com/input-output-hk/marlowe-starter-kit#quick-overview} To get a Marlowe runtime instance up and running.
 */
export function mkRestClient(baseURL: string): RestAPI {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    transformRequest: MarloweJSONCodec.encode,
    transformResponse: MarloweJSONCodec.decode,
  });

  return {
    getContracts(request) {
      const rangeOption = O.fromNullable(request?.range);
      const tags = request?.tags ?? [];
      return unsafeTaskEither(
        Contracts.getHeadersByRangeViaAxios(axiosInstance)(rangeOption)(tags)
      );
    },
    getContractById(contractId) {
      return unsafeTaskEither(Contract.getViaAxios(axiosInstance)(contractId));
    },
    createContract(request) {
      const postContractsRequest = {
        contract: request.contract,
        version: request.version,
        metadata: request.metadata,
        tags: request.tags,
        minUTxODeposit: request.minUTxODeposit,
        roles: request.roles,
      };
      const addressesAndCollaterals = {
        changeAddress: request.changeAddress,
        usedAddresses: request.usedAddresses ?? [],
        collateralUTxOs: request.collateralUTxOs ?? [],
      };
      return unsafeTaskEither(
        Contracts.postViaAxios(axiosInstance)(
          postContractsRequest,
          addressesAndCollaterals
        )
      );
    },

    submitContract(contractId, txEnvelope) {
      return submitContractViaAxios(axiosInstance)(contractId, txEnvelope);
    },
    healthcheck: () =>
      pipe(
        HTTP.Get(axiosInstance)("/healthcheck"),
        TE.match(
          () => false,
          () => true
        )
      )(),
  };
}

// TODO: Move to Payouts?
/**
 * @hidden
 */
export interface PayoutsAPI {
  getHeadersByRange: Payouts.GETHeadersByRange;
  get: Payout.GET;
}

// TODO: Move to Withdrawals?
/**
 * @hidden
 */
export interface WithdrawalsAPI {
  /**
   * @see {@link https://docs.marlowe.iohk.io/api/get-withdrawals}
   */
  getHeadersByRange: Withdrawals.GETHeadersByRange;
  /**
   * @see {@link https://docs.marlowe.iohk.io/api/create-withdrawals}
   */
  post: Withdrawals.POST;
  withdrawal: {
    /**
     * @see {@link https://docs.marlowe.iohk.io/api/get-withdrawal-by-id}
     */
    get: Withdrawal.GET;
    /**
     * @see {@link https://docs.marlowe.iohk.io/api/create-withdrawal}
     */
    put: Withdrawal.PUT;
  };
}

// TODO: Move to Contracts?
/**
 * @hidden
 */
export interface ContractsAPI {
  /**
   * @see {@link https://docs.marlowe.iohk.io/api/get-contracts}
   */
  getHeadersByRange: Contracts.GETHeadersByRange;
  /**
   * @see {@link https://docs.marlowe.iohk.io/api/create-contracts}
   */
  post: Contracts.POST;
  contract: {
    /**
     * Get a single contract by id
     * @see {@link https://docs.marlowe.iohk.io/api/get-contracts-by-id}
     */
    get: Contract.GET;
    /**
     * @see {@link https://docs.marlowe.iohk.io/api/create-contracts-by-id}
     */
    put: Contract.PUT;
    /**
     * @see {@link }
     */
    next: ContractNext.GET;
    transactions: {
      /**
       * @see {@link }
       */
      getHeadersByRange: Transactions.GETHeadersByRange;
      /**
       * @see {@link }
       */
      post: Transactions.POST;
      transaction: {
        /**
         * @see {@link }
         */
        get: Transaction.GET;
        /**
         * @see {@link }
         */
        put: Transaction.PUT;
      };
    };
  };
}

/**
 * @hidden
 */
export type RestDI = { rest: FPTSRestAPI };

/**
 * @hidden
 */
export interface FPTSRestAPI {
  // NOTE: In FP-TS this should probably be T.Task<boolean>, the current implementation returns true or Error.
  /**
   * @see {@link }
   */
  healthcheck: () => TE.TaskEither<Error, Boolean>;
  payouts: PayoutsAPI;
  withdrawals: WithdrawalsAPI;
  contracts: ContractsAPI;
}

/**
 * Legacy FP-TS version
 * @hidden
 */
export function mkFPTSRestClient(baseURL: string): FPTSRestAPI {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    transformRequest: MarloweJSONCodec.encode,
    transformResponse: MarloweJSONCodec.decode,
  });

  return {
    healthcheck: () =>
      pipe(
        HTTP.Get(axiosInstance)("/healthcheck"),
        TE.map(() => true)
      ),
    payouts: {
      getHeadersByRange: Payouts.getHeadersByRangeViaAxios(axiosInstance),
      get: Payout.getViaAxios(axiosInstance),
    },
    withdrawals: {
      getHeadersByRange: Withdrawals.getHeadersByRangeViaAxios(axiosInstance),
      post: Withdrawals.postViaAxios(axiosInstance),
      withdrawal: {
        get: Withdrawal.getViaAxios(axiosInstance),
        put: Withdrawal.putViaAxios(axiosInstance),
      },
    },
    contracts: {
      getHeadersByRange: Contracts.getHeadersByRangeViaAxios(axiosInstance),
      post: Contracts.postViaAxios(axiosInstance),
      contract: {
        get: Contract.getViaAxios(axiosInstance),
        put: Contract.putViaAxios(axiosInstance),
        next: ContractNext.getViaAxios(axiosInstance),
        transactions: {
          getHeadersByRange:
            Transactions.getHeadersByRangeViaAxios(axiosInstance),
          post: Transactions.postViaAxios(axiosInstance),
          transaction: {
            get: Transaction.getViaAxios(axiosInstance),
            put: Transaction.putViaAxios(axiosInstance),
          },
        },
      },
    },
  };
}