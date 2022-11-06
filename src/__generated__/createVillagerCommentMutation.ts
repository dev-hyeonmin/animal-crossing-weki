/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateVillagerCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createVillagerCommentMutation
// ====================================================

export interface createVillagerCommentMutation_createVillagerComment {
  __typename: "CreateVillagersOutput";
  ok: boolean;
  error: string | null;
}

export interface createVillagerCommentMutation {
  createVillagerComment: createVillagerCommentMutation_createVillagerComment;
}

export interface createVillagerCommentMutationVariables {
  createVillagerCommentInput: CreateVillagerCommentInput;
}
