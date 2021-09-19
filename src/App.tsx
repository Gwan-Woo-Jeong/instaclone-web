import { gql, useMutation, useQuery } from "@apollo/client";
import { login, loginVariables } from "./__generated__/login";
import { seeFeed } from "./__generated__/seeFeed";

// 로그인
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

// 팔로잉한 사람들의 사진 보기
const FEED_QUERY = gql`
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
      comments {
        id
      }
      isMine
    }
  }
`;

//  apollo client:codegen src/__generated__ --target=typescript --outputFlat

function App() {
  const [loginMutation] = useMutation<login, loginVariables>(LOGIN_MUTATION, {
    variables: { username: "hello", password: "1234" },
    // 뮤테이션의 리턴 타입
    onCompleted: (data) => data.login.token,
  });

  const { data } = useQuery<seeFeed>(FEED_QUERY);
  console.log(data?.seeFeed?.map((photo) => photo?.user.avatar));
  return <h1>Apollo</h1>;
}

export default App;
