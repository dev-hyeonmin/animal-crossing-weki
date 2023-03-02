/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FlowerType {
  Anemone = "Anemone",
  Chry = "Chry",
  Cosmos = "Cosmos",
  Hyacinth = "Hyacinth",
  Lily = "Lily",
  Pansy = "Pansy",
  Rose = "Rose",
  Tulip = "Tulip",
}

export enum FruitType {
  Apple = "Apple",
  Cherry = "Cherry",
  Orange = "Orange",
  Peach = "Peach",
  Pear = "Pear",
}

export enum HemisphereType {
  Northern = "Northern",
  Southern = "Southern",
}

export interface CreateAccountInput {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  userImage?: string | null;
  islandName?: string | null;
  islandCode?: string | null;
  fruit?: FruitType | null;
  flower?: FlowerType | null;
  hemisphere?: HemisphereType | null;
}

export interface CreateCreatureInput {
  name: string;
}

export interface CreateVillagerCommentInput {
  content: string;
  villagerId: number;
}

export interface DeleteCreatureInput {
  name: string;
}

export interface DeleteVillagerCommentInput {
  id: number;
}

export interface EditProfileInput {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  userImage?: string | null;
  islandName?: string | null;
  islandCode?: string | null;
  fruit?: FruitType | null;
  flower?: FlowerType | null;
  hemisphere?: HemisphereType | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegistFavoriteVillagerInput {
  villagerId: number;
}

export interface RegistMyVillagerInput {
  villagerId: number;
}

export interface VerifyEmailInput {
  code: string;
}

export interface VillagerCommentsInput {
  villagerId: number;
  page: number;
}

export interface VillagersInput {
  species?: string | null;
  name?: string | null;
  personality?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
