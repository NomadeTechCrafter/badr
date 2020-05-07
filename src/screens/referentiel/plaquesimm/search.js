import React from 'react';

import {View, Text, ScrollView} from 'react-native';

import {translate} from '../../../common/translations/i18n';

import {Divider} from 'react-native-elements';

/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/**Custom Components */
import {
  Accordion,
  BadrButtonIcon,
  BadrPopup,
  BadrErrorMessage,
  BadrInfoMessage,
  Toolbar,
} from '../../../components';

export default class PlaquesImmatriculationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVisibility: false,
      message: '',
      messageType: '',
    };
  }

  componentDidMount() {}

  handleSearch = () => {};

  showMessages = (type, message) => {
    this.setState({
      messageVisibility: true,
      message: message,
      messageType: type,
    });
  };

  handleClear = () => {};

  buildSearchZone = index => {
    let component = <View />;
    switch (index) {
      case '1':
        component = this.accordionOne();
        break;
      case '2':
        component = this.accordionTwo();
        break;
      case '3':
        component = this.accordionThree();
        break;
      case '4':
        component = this.accordionFour();
        break;
      case '5':
        component = this.accordionFive();
        break;
    }
    return component;
  };

  onCloseMessagesPressed = () => {
    this.setState({
      messageVisibility: false,
      message: '',
      messageType: '',
    });
  };

  render() {
    return (
      <ScrollView>
        {/* <Toolbar
          icon="menu"
          title={translate('referentiel.plaquesImm.title')}
          subtitle={translate('referentiel.plaquesImm.subTitle')}
        /> */}
        <BadrPopup
          message={this.state.message}
          type={this.state.messageType}
          visible={this.state.messageVisibility}
          onClosePressed={this.onCloseMessagesPressed}
        />
        {this.buildSearchZone('1')}
        <Divider />
        {this.buildSearchZone('2')}
        <Divider />
        {this.buildSearchZone('3')}
        <Divider />
        {this.buildSearchZone('4')}
        <Divider />
        {this.buildSearchZone('5')}
        <Divider />

        <View style={CustomStyleSheet.verticalActionsContainer}>
          <BadrButtonIcon
            onPress={() => this.handleSearch()}
            icon="magnify"
            text={translate('transverse.rechercher')}
          />
          <BadrButtonIcon
            onPress={() => this.handleClear()}
            icon="autorenew"
            style={{marginTop: 25}}
            text={translate('transverse.retablir')}
          />
        </View>
      </ScrollView>
    );
  }

  accordionOne = () => {
    return (
      <Accordion title={translate('referentiel.plaquesImm.searchByNumChassis')}>
        <Text>Insert your data here </Text>
      </Accordion>
    );
  };

  accordionTwo = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByNumImmNormal')}>
        <Text>Insert your data here </Text>
      </Accordion>
    );
  };

  accordionThree = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByNumImmDiplo')}>
        <Text>Insert your data here </Text>
      </Accordion>
    );
  };

  accordionFour = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByNumImmRemorque')}>
        <Text>Insert your data here </Text>
      </Accordion>
    );
  };

  accordionFive = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByIdentitePropr')}>
        <Text>Insert your data here </Text>
      </Accordion>
    );
  };
}
