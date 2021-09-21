import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

// 로그인 유지가 안됨 왜냐하면 언제나 로그아웃(false)로 시작하기 때문
// localStorage.getItem => token(string) or NULL => Boolean 값은 true or false
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// 로그인 로그아웃 기능 - 어디서든 사용 가능
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
