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
  display: flex;
  align-items: center;
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

const DeleteButton = styled.button`
  font-size: 10px;
  border: none;
  background-color: transparent;
  font-weight: 600;
  color: #bebcbc;
  padding-top: 2px;
  cursor: pointer;
`;

function Comment({ author, payload, id, isMine, photoId }: Props) {
  const updateDeleteComment: MutationUpdaterFn<deleteComment> = (
    cache,
    result
  ) => {
    const { ok } = result!.data!.deleteComment;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
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
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
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
      {isMine && <DeleteButton onClick={onDeleteClick}>X</DeleteButton>}
    </CommentContainer>
  );
}

export default Comment;
