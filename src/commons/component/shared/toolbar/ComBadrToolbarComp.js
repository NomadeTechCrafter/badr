import React from 'react';
import {Appbar} from 'react-native-paper';

class ComBadrToolbarComp extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <Appbar.Header>
        {!this.props.back && (
          <Appbar.Action
            icon={this.props.icon}
            navigation={this.props.navigation}
            onPress={this.toggleDrawer}
          />
        )}
        {this.props.back && (
          <Appbar.Action
            icon="keyboard-backspace"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        )}

        <Appbar.Content
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
        {this.props.children}
      </Appbar.Header>
    );
  }
}
export default ComBadrToolbarComp;
