import React from "react";
import { MapView } from "expo";

import mapStyle from "./mapStyle.json";
import { withInitialLocation } from "./InitialLocation";
import Omen from "./Omen";

const MapComp = ({ onSelect, data, initialLocation }) => (
  <MapView
    style={{ flex: 1 }}
    minZoomLevel={16}
    showsUserLocation
    showsMyLocationButton
    style={{ flex: 1 }}
    initialRegion={{
      latitude: initialLocation.coords.latitude,
      longitude: initialLocation.coords.longitude,
      latitudeDelta: 0.0012,
      longitudeDelta: 0.001
    }}
    provider={MapView.PROVIDER_GOOGLE}
    customMapStyle={mapStyle}
  >
    {data.map(({ node }) => (
      <Omen onPress={() => onSelect(node.id)} key={node.id} {...node} />
    ))}
  </MapView>
);

export default withInitialLocation()(MapComp);
