import * as t from "io-ts/lib/index.js";
import { IsMerkleizedContinuation } from "../common/IsMerkleizedContinuation.js";
import { CaseIndex } from "../common/caseIndex.js";
import { INotify } from "../../inputs.js";

export type CanNotify = t.TypeOf<typeof CanNotify>;
export const CanNotify = t.type({
  case_index: CaseIndex,
  is_merkleized_continuation: IsMerkleizedContinuation,
});

export const toInput: (canNotify: CanNotify) => INotify = (canNotify) =>
  "input_notify";
