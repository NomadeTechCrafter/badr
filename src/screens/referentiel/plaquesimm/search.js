import React from 'react';

import {View, Text, ScrollView, Dimensions} from 'react-native';

import {translate} from '../../../common/translations/i18n';

import {Divider} from 'react-native-elements';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsPlaquesImm from '../../../common/constants/referentiel/plaquesImm';
import * as plaquesImmAction from '../../../redux/actions/referentiel/plaquesImm';

/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

/**Custom Components */
import {
  Accordion,
  BadrButtonIcon,
  BadrPopup,
  BadrErrorMessage,
  BadrInfoMessage,
  Toolbar,
  BadrProgressBar
} from '../../../components';

class PlaquesImmatriculationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVisibility: false,
      message: '',
      messageType: '',
      rechercheObject: {proprietairePrenom: 'ahmed'},
      login: '',
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    let action = this.buildInitSearchPlaquesImmAction();
    this.props.actions.dispatch(action);
    let user = await loadParsed('user');
    if (user) {
      this.setState({login: user.login});
    }
  };

  buildInitSearchPlaquesImmAction = () => {
    var action = plaquesImmAction.init({value: {}});
    return action;
  };

  buildSearchPlaquesImmAction = () => {
    var action = plaquesImmAction.request({
      type: ConstantsPlaquesImm.PLAQUES_IMM_REQUEST,
      value: {
        login: this.state.login,
        rechercheObj: this.state.rechercheObject,
      },
    });
    return action;
  };

  handleSearch = () => {
    let action = this.buildSearchPlaquesImmAction();
    this.props.actions.dispatch(action);
  };

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
            loading={this.props.showProgress}
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

function mapStateToProps(state) {
  return {...state.plaquesImmReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaquesImmatriculationSearch);
