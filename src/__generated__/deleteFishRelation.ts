/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteFishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteFishRelation
// ====================================================

export interface deleteFishRelation_deleteFishRelation {
  __typename: "DeleteFishOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteFishRelation {
  deleteFishRelation: deleteFishRelation_deleteFishRelation;
}

export interface deleteFishRelationVariables {
  deleteFishInput: DeleteFishInput;
}
