import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { seeFeed } from "../__generated__/seeFeed";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home() {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo
          key={photo!.id}
          id={photo!.id}
          user={photo!.user}
          file={photo!.file}
          likes={photo!.likes}
          isLiked={photo!.isLiked}
          caption={photo!.caption}
          comments={photo!.comments}
        />
      ))}
    </div>
  );
}

export default Home;
