/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myFavoriteVillagerQuery
// ====================================================

export interface myFavoriteVillagerQuery_myFavoriteVillager_favoriteVillagers {
  __typename: "Villager";
  id: number;
}

export interface myFavoriteVillagerQuery_myFavoriteVillager {
  __typename: "MyFavoriteVillagerOutput";
  ok: boolean;
  error: string | null;
  favoriteVillagers: myFavoriteVillagerQuery_myFavoriteVillager_favoriteVillagers[];
}

export interface myFavoriteVillagerQuery {
  myFavoriteVillager: myFavoriteVillagerQuery_myFavoriteVillager;
}
