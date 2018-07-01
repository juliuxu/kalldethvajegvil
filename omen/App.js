import React from "react";
import { StyleSheet, View } from "react-native";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloProvider } from "react-apollo";

import ApolloMap from "./src/ApolloMap";
import config from "./src/config.json";

const link = createHttpLink({ uri: config.herokuGrahpqlUrl });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <ApolloMap />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center",
    // justifyContent: "center"
  }
});

export default App;
