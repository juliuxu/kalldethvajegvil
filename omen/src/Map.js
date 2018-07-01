import React from "react";
import { Text } from "react-native";
import { MapView } from "expo";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import mapStyle from "./mapStyle.json";
import { withInitialLocation } from "./InitialLocation";
import Omen from "./Omen";

const mockOmen = {
  id: "adsadasdas-dsdsad",
  message: "Hello, World",
  latitude: 59.91466373483882,
  longitude: 10.750718960518748,
  userUuid: "afdsfs-ff3sfdsf-fdsfdsfs",
  score: 4,
  upvotes: 6,
  downvotes: 2
};

const mockOmen2 = {
  id: "adsadasdas-ggg",
  message: "Far away...",
  latitude: 59.91366173483882,
  longitude: 10.750108960518748,
  userUuid: "afdsfs-ff3sfdsf-fdsfdsfs",
  score: 4,
  upvotes: 6,
  downvotes: 2
};

class MapComp extends React.Component {
  state = {
    omens: [mockOmen, mockOmen2]
  };
  componentDidMount() {
    console.log("Map mount", this.props);
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.initialLocation.coords.latitude,
          longitude: this.props.initialLocation.coords.longitude,
          latitudeDelta: 0.0012,
          longitudeDelta: 0.001
        }}
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
      >
        {this.props.omens.map(x => <Omen key={x.id} {...x} />)}
      </MapView>
    );
  }
}
const Map = withInitialLocation()(MapComp);

const OMEN = gql`
  fragment OMEN on Omen {
    id
    score
    message
    latitude
    longitude
  }
`;

const GET_OMENS = gql`
  query GET_OMENS {
    omen(first: 10) {
      edges {
        node {
          ...OMEN
        }
      }
    }
  }
  ${OMEN}
`;

const Composed = () => (
  <Query query={GET_OMENS}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) {
        if (__DEV__) throw error;
        return <Text>Error!</Text>;
      }

      console.log("got data", data);

      return <Map omens={data.omen.edges.map(x => x.node)} />;
    }}
  </Query>
);

export default Composed;
