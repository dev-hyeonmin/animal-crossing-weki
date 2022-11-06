/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteVillagerCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteVillagerCommentMutation
// ====================================================

export interface deleteVillagerCommentMutation_deleteVillagerComment {
  __typename: "DeleteVillagerCommentOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteVillagerCommentMutation {
  deleteVillagerComment: deleteVillagerCommentMutation_deleteVillagerComment;
}

export interface deleteVillagerCommentMutationVariables {
  deleteVillagerCommentInput: DeleteVillagerCommentInput;
}
