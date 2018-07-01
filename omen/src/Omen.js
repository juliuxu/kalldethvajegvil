import React from "react";
import { MapView } from "expo";

import demonTrapImage from "./demon-trap.png";

const OmenCallout = props => "hello";

const Omen = props => (
  <MapView.Marker
    stopPropagation
    flat
    onPress={() => console.log("Omen marker clicked")}
    coordinate={{ latitude: props.latitude, longitude: props.longitude }}
    title="Omen"
    description={props.message}
    image={demonTrapImage}
    anchor={{ x: 0.5, y: 0.5 }}
  />
);

export default Omen;
