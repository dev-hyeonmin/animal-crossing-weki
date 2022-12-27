/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VillagersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: VillagersQuery
// ====================================================

export interface VillagersQuery_villagers_villagers {
  __typename: "Villager";
  id: number;
  image: string | null;
  icon: string | null;
  species: string | null;
  name: string;
  personality: string | null;
  gender: string | null;
  birth: string | null;
  speak: string | null;
  speakType: string | null;
  hobby: string | null;
  music: string | null;
  style: string | null;
  style2: string | null;
  color: string | null;
  color2: string | null;
  favoriteTalk: string | null;
}

export interface VillagersQuery_villagers {
  __typename: "VillagersOutput";
  ok: boolean;
  error: string | null;
  villagers: VillagersQuery_villagers_villagers[] | null;
}

export interface VillagersQuery {
  villagers: VillagersQuery_villagers;
}

export interface VillagersQueryVariables {
  villagersInput: VillagersInput;
}
