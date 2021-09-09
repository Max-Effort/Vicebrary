import LoginSide from "./pages/LoginSide";
import SignUpSide from "./pages/SignUpSide";
import Main from "./pages/Main";
import Auth from "./utils/auth";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

const loggedIn = () => {
  console.log(Auth.loggedIn());
  return Auth.loggedIn;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <div className="App">
            <Switch>
              <Route exact path="/">
                {loggedIn ? <Redirect to="/login" /> : <Main />}
              </Route>
              <Route path="/login">
                <LoginSide />
              </Route>
              <Route path="/signup">
                <SignUpSide />
              </Route>
              <Route
                render={() => <h1 className="display-2">Wrong page!</h1>}
              />
            </Switch>
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
