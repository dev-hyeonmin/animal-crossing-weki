/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFishesQuery
// ====================================================

export interface UserFishesQuery_userFishes_fishes {
  __typename: "Fish";
  name: string;
}

export interface UserFishesQuery_userFishes {
  __typename: "UserFishOutput";
  ok: boolean;
  error: string | null;
  fishes: UserFishesQuery_userFishes_fishes[] | null;
}

export interface UserFishesQuery {
  userFishes: UserFishesQuery_userFishes;
}
