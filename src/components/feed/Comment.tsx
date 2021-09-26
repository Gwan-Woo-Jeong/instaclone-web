import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React from "react";
import { gql, MutationUpdaterFn, useMutation } from "@apollo/client";
import { deleteComment } from "../../__generated__/deleteComment";

interface Props {
  author: string;
  payload: string | null;
  id?: number;
  isMine?: Boolean;
  photoId?: number;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// deleteButton 로그인 유저만 보게 하기
// isMine 내려주어서 true면 보이게..
function Comment({ author, payload, id, isMine, photoId }: Props) {
  const updateDeleteComment: MutationUpdaterFn<deleteComment> = (
    cache,
    result
  ) => {
    const { ok } = result!.data!.deleteComment;
    if (ok) {
      // 데이터를 cache에서 삭제
      // comment의 id
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        // photo의 id
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              {" "}
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine && <button onClick={onDeleteClick}>X</button>}
    </CommentContainer>
  );
}

export default Comment;

// photo - comments - comment
// photo id => =>
// comment에서 photo 업데이트 가능
