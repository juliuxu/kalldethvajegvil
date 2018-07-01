import React from "react";
import { MapView } from "expo";

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

class Map extends React.Component {
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
        {this.state.omens.map(x => <Omen key={x.id} {...x} />)}
      </MapView>
    );
  }
}

export default withInitialLocation()(Map);
