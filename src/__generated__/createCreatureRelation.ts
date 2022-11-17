/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCreatureInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCreatureRelation
// ====================================================

export interface createCreatureRelation_createCreatureRelation {
  __typename: "CreateCreatureOutput";
  ok: boolean;
  error: string | null;
}

export interface createCreatureRelation {
  createCreatureRelation: createCreatureRelation_createCreatureRelation;
}

export interface createCreatureRelationVariables {
  createCreatureInput: CreateCreatureInput;
}
