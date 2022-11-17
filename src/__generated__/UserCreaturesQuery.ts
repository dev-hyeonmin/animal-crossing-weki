/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserCreaturesQuery
// ====================================================

export interface UserCreaturesQuery_userCreatures_creatures {
  __typename: "Creature";
  name: string;
}

export interface UserCreaturesQuery_userCreatures {
  __typename: "UserCreatureOutput";
  ok: boolean;
  error: string | null;
  creatures: UserCreaturesQuery_userCreatures_creatures[] | null;
}

export interface UserCreaturesQuery {
  userCreatures: UserCreaturesQuery_userCreatures;
}
