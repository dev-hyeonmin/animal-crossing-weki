/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: villagers
// ====================================================

export interface villagers_villagers_villagers {
  __typename: "Villager";
  name: string;
}

export interface villagers_villagers {
  __typename: "VillagersOutput";
  ok: boolean;
  error: string | null;
  villagers: villagers_villagers_villagers[] | null;
}

export interface villagers {
  villagers: villagers_villagers;
}
