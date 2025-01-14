const importMap = {
  imports: {
    "@marlowe.io/adapter":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/adapter.js",
    "@marlowe.io/adapter/codec":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/codec.js",
    "@marlowe.io/adapter/file":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/file.js",
    "@marlowe.io/adapter/fp-ts":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/fp-ts.js",
    "@marlowe.io/adapter/http":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/http.js",
    "@marlowe.io/adapter/io-ts":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/io-ts.js",
    "@marlowe.io/adapter/time":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/adapter@0.2.0-alpha-16/dist/bundled/esm/time.js",
    "@marlowe.io/language-core-v1":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/language-core-v1@0.2.0-alpha-16/dist/bundled/esm/language-core-v1.js",
    "@marlowe.io/language-core-v1/guards":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/language-core-v1@0.2.0-alpha-16/dist/bundled/esm/guards.js",
    "@marlowe.io/language-core-v1/next":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/language-core-v1@0.2.0-alpha-16/dist/bundled/esm/next.js",
    "@marlowe.io/language-core-v1/playground-v1":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/language-core-v1@0.2.0-alpha-16/dist/bundled/esm/playground-v1.js",
    "@marlowe.io/language-core-v1/version":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/language-core-v1@0.2.0-alpha-16/dist/bundled/esm/version.js",
    "@marlowe.io/language-examples":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/language-examples@0.2.0-alpha-16/dist/bundled/esm/language-examples.js",
    "@marlowe.io/token-metadata-client":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/token-metadata-client@0.2.0-alpha-16/dist/bundled/esm/token-metadata-client.js",
    "@marlowe.io/wallet":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/wallet@0.2.0-alpha-16/dist/bundled/esm/wallet.js",
    "@marlowe.io/wallet/api":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/wallet@0.2.0-alpha-16/dist/bundled/esm/api.js",
    "@marlowe.io/wallet/browser":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/wallet@0.2.0-alpha-16/dist/bundled/esm/browser.js",
    "@marlowe.io/wallet/nodejs":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/wallet@0.2.0-alpha-16/dist/bundled/esm/nodejs.js",
    "@marlowe.io/runtime-rest-client":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-rest-client@0.2.0-alpha-16/dist/bundled/esm/runtime-rest-client.js",
    "@marlowe.io/runtime-rest-client/transaction":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-rest-client@0.2.0-alpha-16/dist/bundled/esm/transaction.js",
    "@marlowe.io/runtime-rest-client/withdrawal":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-rest-client@0.2.0-alpha-16/dist/bundled/esm/withdrawal.js",
    "@marlowe.io/runtime-core":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-core@0.2.0-alpha-16/dist/bundled/esm/runtime-core.js",
    "@marlowe.io/runtime-lifecycle":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-lifecycle@0.2.0-alpha-16/dist/bundled/esm/runtime-lifecycle.js",
    "@marlowe.io/runtime-lifecycle/api":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-lifecycle@0.2.0-alpha-16/dist/bundled/esm/api.js",
    "@marlowe.io/runtime-lifecycle/browser":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-lifecycle@0.2.0-alpha-16/dist/bundled/esm/browser.js",
    "@marlowe.io/runtime-lifecycle/generic":
      "https:/cdn.jsdelivr.net/npm/@marlowe.io/runtime-lifecycle@0.2.0-alpha-16/dist/bundled/esm/generic.js",
    "lucid-cardano": "https://unpkg.com/lucid-cardano@0.10.7/web/mod.js",
  },
};
const im = document.createElement("script");
im.type = "importmap";
im.textContent = JSON.stringify(importMap);
document.currentScript.after(im);
