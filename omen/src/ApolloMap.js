import React from "react";
import { AppRegistry } from "react-native";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloProvider } from "react-apollo";

import config from "./config.json";
import Map from "./Map";

const link = createHttpLink({ uri: config.herokuGrahpqlUrl });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const ApolloMap = () => (
  <ApolloProvider client={client}>
    <Map />
  </ApolloProvider>
);

AppRegistry.registerComponent("Omen", () => ApolloMap);

export default ApolloMap;
