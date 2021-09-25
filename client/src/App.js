import LoginSide from "./pages/LoginSide";
import SignUpSide from "./pages/SignUpSide";
import Main from "./pages/Main";
// import Auth from "./utils/auth";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import BackgroundVideo from './components/Background Videos/viceclips.mp4.mov'
import { BrowserRouter as Router, Switch,  Route} from "react-router-dom";
import './App.css'


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



function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
          <div className="App">
          <video id="background-video" autoPlay loop muted>
            <source src = {BackgroundVideo} type='video/mp4' />
            </video>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/login">
                <LoginSide />
              </Route>
              <Route path="/signup">
                <SignUpSide />
              </Route>
              <Route render={() => <h1 className="display-2">Wrong page!</h1>}/>
            </Switch>
          </div>
      </Router>
    </ApolloProvider>

  )
};


export default App;
