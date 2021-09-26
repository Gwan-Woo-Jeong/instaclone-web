import { gql, MutationUpdaterFn, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { createComment } from "../../__generated__/createComment";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Comment from "../feed/Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

interface Props {
  photoId: number;
  author: string;
  caption: string | null;
  commentNumber: number;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
  isMine: Boolean;
}

interface Iform {
  payload: string;
  photoId: number;
}

function Comments({
  author,
  caption,
  commentNumber,
  comments,
  photoId,
  isMine,
}: Props) {
  const { data: userData } = useUser();
  const createCommentUpdate: MutationUpdaterFn<createComment> = (
    cache,
    result
  ) => {
    const { payload } = getValues();
    setValue("payload", "");
    const { ok, id } = result!.data!.createComment;
    if (ok && userData.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id, // mutation 응답으로 가져온 id
        isMine: true, // 로그인 유저가 쓴 글
        payload, // form에 적은 내용
        user: { ...userData.me }, // 로그인 유저 정보
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment AnyName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation<createComment>(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const { register, handleSubmit, setValue, getValues } = useForm<Iform>();
  const onValid: SubmitHandler<Iform> = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({ variables: { photoId, payload } });
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment!.id}
          id={comment!.id}
          author={comment!.user.username}
          payload={comment!.payload}
          isMine={isMine}
          photoId={photoId}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

export default Comments;