import React from 'react';
import {View, ScrollView} from 'react-native';
/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

/**Custom Components */
import {Toolbar, BadrInfoMessage} from '../../../components';
class WelcomeScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.toggleDrawer();
  }

  onItemSelected = item => {
    console.log(item);
  };

  render() {
    return (
      <ScrollView>
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('welcome.title')}
          subtitle={translate('welcome.subTitle')}
        />

        <View style={styles.container}>
          <BadrInfoMessage message={translate('loremIpsum1')} />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    ...CustomStyleSheet.centerContainer,
    backgroundColor: 'transparent',
  },
};

export default WelcomeScreen;
