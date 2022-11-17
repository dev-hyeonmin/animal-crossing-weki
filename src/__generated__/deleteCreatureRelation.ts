/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCreatureInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteCreatureRelation
// ====================================================

export interface deleteCreatureRelation_deleteCreatureRelation {
  __typename: "DeleteCreatureOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteCreatureRelation {
  deleteCreatureRelation: deleteCreatureRelation_deleteCreatureRelation;
}

export interface deleteCreatureRelationVariables {
  deleteCreatureInput: DeleteCreatureInput;
}
