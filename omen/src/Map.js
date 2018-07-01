import React from "react";
import { Text } from "react-native";
import { MapView } from "expo";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import mapStyle from "./mapStyle.json";
import { withInitialLocation } from "./InitialLocation";
import Omen from "./Omen";

class MapComp extends React.Component {
  componentDidMount() {
    console.log("Map mount", this.props);
  }
  render() {
    return (
      <MapView
        minZoomLevel={16}
        showsUserLocation
        showsMyLocationButton
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
