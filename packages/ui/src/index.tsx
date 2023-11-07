import "reflect-metadata";
import "core-js/stable";
import "core-js/stage";
import "regenerator-runtime/runtime";

import React from "react";
import Application from "./Application";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const domNode = document.getElementById("container");
const root = createRoot(domNode);

const client = new ApolloClient({
  uri: "http://localhost:3000/api/v0/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <Application />
  </ApolloProvider>,
);
