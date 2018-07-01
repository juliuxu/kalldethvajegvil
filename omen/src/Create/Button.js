import React from "react";
import { ActionButton } from "react-native-material-ui";

import CreateDialog from "./Dialog";
import LoadFont from "../LoadFont";

class CreateButton extends React.Component {
  state = {
    open: false
  };
  openDialog = () => this.setState({ open: true });
  closeDialog = () => this.setState({ open: false });
  render() {
    return (
      <React.Fragment>
        <ActionButton
          onPress={this.openDialog}
          style={{
            container: {
              marginRight: 140
            }
          }}
        />
        <LoadFont font={require("../Roboto-Medium.ttf")}>
          {loaded => {
            if (!loaded) return null;
            if (!this.state.open) return null;
            return <CreateDialog onClose={this.closeDialog} />;
          }}
        </LoadFont>
      </React.Fragment>
    );
  }
}

export default CreateButton;
