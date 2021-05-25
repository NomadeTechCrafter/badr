import React from 'react';
import Toast from 'react-native-root-toast';

export default class ComBadrToastComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          visible: true,
        }),
      2000,
    ); // show toast after 2s

    setTimeout(
      () =>
        this.setState({
          visible: false,
        }),
      5000,
    ); // hide toast after 5s
  }

  render() {
    return (
      <Toast
        visible={this.state.visible}
        position={50}
        shadow={false}
        animation={false}
        hideOnPress={true}>
        {this.props.message}
      </Toast>
    );
  }
}
