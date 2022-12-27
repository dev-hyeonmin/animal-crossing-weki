/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myVillagerQuery
// ====================================================

export interface myVillagerQuery_myVillager_myVillagers {
  __typename: "Villager";
  id: number;
}

export interface myVillagerQuery_myVillager {
  __typename: "MyVillagerOutput";
  ok: boolean;
  error: string | null;
  myVillagers: myVillagerQuery_myVillager_myVillagers[];
}

export interface myVillagerQuery {
  myVillager: myVillagerQuery_myVillager;
}
