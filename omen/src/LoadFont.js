import React from "react";
import { Font } from "expo";

class LoadFont extends React.Component {
  state = { loaded: false };
  async componentDidMount() {
    await Font.loadAsync({ Roboto: this.props.font });
    this.setState({ loaded: true });
  }
  render() {
    return this.props.children(this.state.loaded);
  }
}

export default LoadFont;
