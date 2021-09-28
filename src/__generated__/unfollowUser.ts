/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unfollowUser
// ====================================================

export interface unfollowUser_followUser {
  __typename: "MutationResponse";
  ok: boolean;
}

export interface unfollowUser {
  followUser: unfollowUser_followUser;
}

export interface unfollowUserVariables {
  username: string;
}
