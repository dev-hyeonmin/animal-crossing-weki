/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegistMyVillagerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registMyVillager
// ====================================================

export interface registMyVillager_registMyVillager {
  __typename: "RegistMyVillagerOutput";
  ok: boolean;
  error: string | null;
}

export interface registMyVillager {
  registMyVillager: registMyVillager_registMyVillager;
}

export interface registMyVillagerVariables {
  registMyVillagerInput: RegistMyVillagerInput;
}
