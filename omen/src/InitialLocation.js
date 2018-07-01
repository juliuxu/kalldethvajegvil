import React, { Component } from "react";
import { Text, Platform } from "react-native";
import { Constants, Location, Permissions } from "expo";

class InitialLocation extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    if (this.state.errorMessage) {
      return <Text>{this.state.errorMessage}</Text>;
    } else if (!this.state.location) {
      return <Text>Loading...</Text>;
    }
    return this.props.children(this.state.location);
  }
}

export const withInitialLocation = () => Component => props => (
  <InitialLocation>
    {location => <Component {...props} initialLocation={location} />}
  </InitialLocation>
);

export default InitialLocation;
