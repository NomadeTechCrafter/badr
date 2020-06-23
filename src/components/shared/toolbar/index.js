import React from 'react';
import {Appbar} from 'react-native-paper';

class Toolbar extends React.Component {
  toggleDrawer = () => {
    console.log('clicked');
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <Appbar.Header>
        <Appbar.Action
          icon={this.props.icon}
          navigation={this.props.navigation}
          onPress={() => this.toggleDrawer()}
        />
        <Appbar.Content
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
      </Appbar.Header>
    );
  }
}
export default Toolbar;
