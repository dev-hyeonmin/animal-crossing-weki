/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegistFavoriteVillagerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registFavoriteVillager
// ====================================================

export interface registFavoriteVillager_registFavoriteVillager {
  __typename: "RegistFavoriteVillagerOutput";
  ok: boolean;
  error: string | null;
}

export interface registFavoriteVillager {
  registFavoriteVillager: registFavoriteVillager_registFavoriteVillager;
}

export interface registFavoriteVillagerVariables {
  registFavoriteVillagerInput: RegistFavoriteVillagerInput;
}
