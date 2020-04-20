import React from 'react';
import {Text, View} from 'react-native';

import {
  Appbar,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1cadae',
    accent: 'white',
  },
};

class Toolbar extends React.Component {

   toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <Appbar.Header>
        <Appbar.Action icon={this.props.icon} navigation={this.props.navigation} onPress={this.toggleDrawer} />
        <Appbar.Content
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
      </Appbar.Header>
    );
  }
}
export default Toolbar;
