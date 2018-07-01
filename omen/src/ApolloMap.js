import React from "react";
import { AppRegistry } from "react-native";
import DetailsView from "./Components/Details";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Map from "./Map";

class ApolloMapComp extends React.Component {
  static fragments = {
    omen: gql`
      fragment omen on Omen {
        id
        score
        upvotes
        downvotes
        message
        latitude
        longitude
      }
    `
  };

  state = {
    selected: null
  };

  setSelected = selected => this.setState({ selected });

  render() {
    const { omen, loading } = this.props.data;
    const hasOmens = Boolean(omen && omen.edges);

    return (
      <React.Fragment>
        <Map onSelect={this.setSelected} data={hasOmens ? omen.edges : []} />
        {this.state.selected && (
          <DetailsView
            omen={
              hasOmens
                ? omen.edges.find(({ node }) => node.id === this.state.selected)
                    .node
                : {}
            }
          />
        )}
      </React.Fragment>
    );
  }
}

const OMEN_QUERY = gql`
  query GetOmens {
    omen(first: 10) {
      edges {
        node {
          ...omen
        }
      }
    }
  }
  ${ApolloMapComp.fragments.omen}
`;

const ApolloMap = graphql(OMEN_QUERY)(ApolloMapComp);

AppRegistry.registerComponent("Omen", () => ApolloMap);
export default ApolloMap;
