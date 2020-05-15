import React from 'react';
import {Text, View, ScrollView, Dimensions} from 'react-native';
import {Title} from 'react-native-paper';
/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';
import {Icon} from 'react-native-elements';

/** Custom Components */
import {BadrApiTable} from '../../../components';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

import Utils from '../../../common/util';
import {load} from '../../../services/storage-service';

import MainMenu from '../mainmenu/index';

/**Custom Components */
import {Toolbar, BadrInfoMessage, NumeroPlaque} from '../../../components';
const screenHeight = Dimensions.get('window').height;
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

        <View
          style={{
            ...CustomStyleSheet.centerContainer,
            backgroundColor: 'transparent',
          }}>
          <BadrInfoMessage message={translate('loremIpsum1')} />
        </View>
      </ScrollView>
    );
  }
}

export default WelcomeScreen;
