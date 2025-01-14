The **Marlowe TS-SDK** is a suite of _TypeScript/JavaScript_ libraries for developing Web-Dapp in the Cardano Blockchain using Marlowe Technologies.

It is composed of the following packages:

| Package                                                                           | Description                                                                                                                                                                              |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@marlowe.io/language-core-v1](./modules/_marlowe_io_language_core_v1.html)       | Provides constructors and serialization utilities for the types defined in the [Marlowe Core specification](https://github.com/input-output-hk/marlowe/releases/download/v3/Marlowe.pdf) |
| [@marlowe.io/wallet](./modules/_marlowe_io_wallet.html)                           | Defines an API of what Marlowe needs from a Wallet and provides a CIP30 implementation                                                                                                   |
| [@marlowe.io/runtime-core](./modules/_marlowe_io_runtime_core.html)               | Core domain concepts used throughout the runtime libraries.                                                                                                                              |
| [@marlowe.io/runtime-rest-client](./modules/_marlowe_io_runtime_rest_client.html) | 1 to 1 mapping of the [Runtime Rest API](https://docs.marlowe.iohk.io/api/introduction).                                                                                                 |
| [@marlowe.io/runtime-lifecycle](./modules/_marlowe_io_runtime_lifecycle.html)     | High level API that captures the life of "your" contracts. It builds upon the `wallet` and `runtime-rest-client` to solve common use cases                                               |
| [@marlowe.io/adapter](./modules/_marlowe_io_adapter.html)                         | Supporting set of libraries for Marlowe and Runtime Core Domains.                                                                                                                        |
