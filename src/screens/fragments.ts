// fragments : 다른 query 내에서 사용 가능한 gql 코드 조각

import { gql } from "@apollo/client";

// * Photo는 백엔드에서 사용했던 이름과 동일해야함!
export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
