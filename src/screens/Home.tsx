import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

function Home() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(!isLoggedIn)}>
        {isLoggedInVar() ? "log out" : "log in"}
      </button>
    </>
  );
}

export default Home;
