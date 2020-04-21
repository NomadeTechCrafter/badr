import React from 'react';
import {Text, View} from 'react-native';
/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';
import {Icon} from 'react-native-elements';

import {BadrPicker} from '../../components/pickers/BadrPicker';

/** i18n **/
import {translate} from '../../common/translations/i18n';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={CustomStyleSheet.centerContainer}>
        <BadrPicker items={['Amine', 'Toto', 'Mimi']} title="Name" />
        <Icon name="face" size={200} />
        <Text>{translate('info.welcome')}</Text>
      </View>
    );
  }
}
