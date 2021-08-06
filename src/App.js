import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";

import "./App.scss";

import Home from "./pages/home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import DynamicRoute from "./util/DynamicRoute";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            <Container className="pt-5">
              <Switch>
                <DynamicRoute exact path="/" component={Home} authenticated />
                <DynamicRoute path="/register" component={Register} guest />
                <DynamicRoute path="/login" component={Login} guest />
              </Switch>
            </Container>
            <div className="text-center text-white">
              <small>Developed by Rittik Sarkar</small>
            </div>
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
