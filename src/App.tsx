import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = true;
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">{isLoggedIn ? <Home /> : <Login />}</Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
