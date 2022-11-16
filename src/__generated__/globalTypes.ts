/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateFishInput {
  name: string;
}

export interface CreateVillagerCommentInput {
  content: string;
  villagerId: number;
}

export interface DeleteFishInput {
  name: string;
}

export interface DeleteVillagerCommentInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
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
