import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./screens/styles";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/">{isLoggedIn ? <Home /> : <Login />}</Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
