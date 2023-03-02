/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FruitType, FlowerType, HemisphereType } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  verified: boolean;
  userImage: string | null;
  islandName: string | null;
  islandCode: string | null;
  fruit: FruitType | null;
  flower: FlowerType | null;
  hemisphere: HemisphereType | null;
}

export interface meQuery {
  me: meQuery_me;
}
