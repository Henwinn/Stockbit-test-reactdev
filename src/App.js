import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { routes } from "./config/Router";

import "./App.css";
import Layout from "./components/Layout";


function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route exact={route.exact} path={route.path}>
              <Layout>{route.component}</Layout>
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
