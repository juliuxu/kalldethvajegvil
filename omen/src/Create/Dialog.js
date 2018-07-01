import React from "react";
import { View, Text } from "react-native";
import { Dialog, DialogDefaultActions } from "react-native-material-ui";

class CreateDialog extends React.Component {
  render() {
    return (
      <Dialog>
        <Dialog.Title>
          <Text>Hello world</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <DialogDefaultActions
            actions={["cancel", "ok"]}
            /**
             * this will disable the button for "ok"
             */
            options={{ ok: { disabled: true } }}
            onActionPress={this.props.onClose}
          />
        </Dialog.Actions>
      </Dialog>
    );
  }
}

export default CreateDialog;
