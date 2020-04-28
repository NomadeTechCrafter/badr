import React from 'react';
import {Text, View} from 'react-native';
/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';
import {Icon} from 'react-native-elements';

/** Custom Components */
import {BadrPicker} from '../../components';

/** i18n **/
import {translate} from '../../common/translations/i18n';

import Utils from '../../common/util';
import {load} from '../../services/storage-service';

import MainMenu from '../mainmenu/index';

class WelcomeScreen extends React.Component {
  loadmenuData = async () => {
    let menuList = await load('listFonctionnaliteVOs').then(menuJson => {
      let menuList = JSON.parse(menuJson);
      console.log(Utils.unflatten(menuList));
      // this.setState({treeData: unflatten(menuList)});
    });
  };

  componentDidMount() {
    this.loadmenuData();
  }

  render() {
    console.log('dispatch=');
    console.log(this.props.dispatch);
    return <View />;
  }
}

export default WelcomeScreen;
