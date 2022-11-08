/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VillagerCommentsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: VillagerCommentsQuery
// ====================================================

export interface VillagerCommentsQuery_villagersComments_comments_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface VillagerCommentsQuery_villagersComments_comments {
  __typename: "VillagerComment";
  id: number;
  content: string;
  createAt: any;
  user: VillagerCommentsQuery_villagersComments_comments_user | null;
}

export interface VillagerCommentsQuery_villagersComments {
  __typename: "VillagerCommentsOutput";
  ok: boolean;
  comments: VillagerCommentsQuery_villagersComments_comments[] | null;
}

export interface VillagerCommentsQuery {
  villagersComments: VillagerCommentsQuery_villagersComments;
}

export interface VillagerCommentsQueryVariables {
  villagerCommentsInput: VillagerCommentsInput;
}
