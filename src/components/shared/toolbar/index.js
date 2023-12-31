import React from 'react';
import {Appbar} from 'react-native-paper';

class Toolbar extends React.Component {
  toggleDrawer = () => {
    console.log(this.props.navigation);
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
      </Appbar.Header>
    );
  }
}
export default Toolbar;
