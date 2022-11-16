/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createFishRelation
// ====================================================

export interface createFishRelation_createFishRelation {
  __typename: "CreateFishOutput";
  ok: boolean;
  error: string | null;
}

export interface createFishRelation {
  createFishRelation: createFishRelation_createFishRelation;
}

export interface createFishRelationVariables {
  createFishInput: CreateFishInput;
}
