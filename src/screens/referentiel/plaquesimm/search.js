import React from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {TextInput, Headline} from 'react-native-paper';
import {Divider} from 'react-native-elements';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

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
  BadrProgressBar,
  AlphabetPicker,
  BadrItemsPicker,
} from '../../../components';

const initialState = {
  messageVisibility: false,
  message: '',
  messageType: '',
  login: '',
  vehiculeNumChassis: '',
  vehiculeNumImmat1: '',
  vehiculeNumImmat2: '',
  vehiculeNumImmat3: '',
  vehiculeNumImmatDiplo1: '',
  vehiculeNumImmatDiplo2: '',
  vehiculeCodeTypeImmatDiplo: '',
  vehiculeNumImmatRem1: '',
  vehiculeNumImmatRem2: '',
  proprietaireNumeroIdentifiant: '',
  proprietaireNom: '',
  proprietairePrenom: '',
  raisonSocial: '',
};
class PlaquesImmatriculationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    let action = this.buildInitSearchPlaquesImmAction();
    this.props.actions.dispatch(action);
    let user = await loadParsed('user');
    if (user) {
      initialState.login = user.login;
      this.setState({login: user.login});
    }
  };

  buildInitSearchPlaquesImmAction = () => {
    var action = plaquesImmAction.init({value: {}});
    return action;
  };

  buildSearchPlaquesImmAction = () => {
    const searchObject = {...this.state};
    delete searchObject.login;
    delete searchObject.message;
    delete searchObject.messageType;
    delete searchObject.messageVisibility;
    var action = plaquesImmAction.request({
      type: ConstantsPlaquesImm.PLAQUES_IMM_REQUEST,
      value: {
        login: this.state.login,
        rechercheObj: searchObject,
        pageSize: 10,
        offset: 0,
      },
    });
    console.log(this.state.login);
    this.props.navigation.navigate('Resultat', {
      searchState: searchObject,
      login: this.state.login,
    });
    return action;
  };

  validate = () => {
    return (
      this.state.vehiculeNumChassis ||
      (this.state.vehiculeNumImmat1 &&
        this.state.vehiculeNumImmat2 &&
        this.state.vehiculeNumImmat3) ||
      (this.state.vehiculeNumImmatDiplo1 &&
        this.state.vehiculeNumImmatDiplo2) ||
      this.state.vehiculeCodeTypeImmatDiplo ||
      (this.state.vehiculeNumImmatRem1 && this.state.vehiculeNumImmatRem2) ||
      this.state.proprietaireNumeroIdentifiant ||
      this.state.proprietaireNom ||
      this.state.proprietairePrenom ||
      this.state.raisonSocial
    );
  };

  handleSearch = () => {
    if (this.layout && this.scrollViewRef) {
      this.scrollViewRef.scrollTo({y: 0, animated: true});
    }
    if (this.validate()) {
      let action = this.buildSearchPlaquesImmAction();
      this.props.actions.dispatch(action);
    } else {
      this.showMessages(
        'warn',
        translate('referentiel.plaquesImm.searchMandatoryFields'),
      );
    }
  };

  showMessages = (type, message) => {
    this.setState({
      messageVisibility: true,
      message: message,
      messageType: type,
    });
  };

  handleClear = () => {
    console.log(this.state);
    let action = this.buildInitSearchPlaquesImmAction();
    this.props.actions.dispatch(action);
    this.setState(initialState);
  };

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
      <View>
        <ScrollView
          horizontal={false}
          ref={ref => {
            this.scrollViewRef = ref;
          }}
          onLayout={event => {
            this.layout = event.nativeEvent.layout;
          }}>
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
              style={{marginTop: 15}}
              text={translate('transverse.retablir')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  accordionOne = () => {
    return (
      <Accordion title={translate('referentiel.plaquesImm.searchByNumChassis')}>
        <TextInput
          mode="outlined"
          label={translate('referentiel.plaquesImm.numeroChassis')}
          value={this.state.vehiculeNumChassis}
          onChangeText={text => this.setState({vehiculeNumChassis: text})}
        />
      </Accordion>
    );
  };

  onAlphabetPickerChanged = (value, index) => {
    console.log(value);
    this.setState({vehiculeNumImmat2: value});
  };

  accordionTwo = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByNumImmNormal')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.columnThree}
            label=" "
            value={this.state.vehiculeNumImmat1}
            onChangeText={text => this.setState({vehiculeNumImmat1: text})}
          />

          <Text>{' \t-\t '}</Text>
          <AlphabetPicker
            selectedValue={this.state.vehiculeNumImmat2}
            items={ConstantsPlaquesImm.alphabetAr}
            onValueChanged={(v, i) => this.onAlphabetPickerChanged(v, i)}
          />
          <Text>{' \t-\t '}</Text>
          <TextInput
            mode="outlined"
            style={styles.columnThree}
            label=""
            value={this.state.vehiculeNumImmat3}
            onChangeText={text => this.setState({vehiculeNumImmat3: text})}
          />
        </View>
      </Accordion>
    );
  };

  onCategoryDiploPickerChanged = (value, index) => {
    this.setState({vehiculeCodeTypeImmatDiplo: value});
  };

  accordionThree = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByNumImmDiplo')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=""
            value={this.state.vehiculeNumImmatDiplo1}
            onChangeText={text => this.setState({vehiculeNumImmatDiplo1: text})}
          />
          <Text>{'\t-\t'}</Text>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=" "
            value={this.state.vehiculeNumImmatDiplo2}
            onChangeText={text => this.setState({vehiculeNumImmatDiplo2: text})}
          />
        </View>

        <View style={{flexDirection: 'row', margin: 10}}>
          <BadrItemsPicker
            style={styles.column}
            label={translate('referentiel.plaquesImm.choose_categoryDiplomatique')}
            selectedValue={this.state.vehiculeCodeTypeImmatDiplo}
            items={ConstantsPlaquesImm.categoryDiplomatique}
            onValueChanged={(v, i) => this.onCategoryDiploPickerChanged(v, i)}
          />
        </View>
      </Accordion>
    );
  };

  accordionFour = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByNumImmRemorque')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=" "
            value={this.state.vehiculeNumImmatRem1}
            onChangeText={text => this.setState({vehiculeNumImmatRem1: text})}
          />
          <Text>{' \t-\t '}</Text>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=" "
            value={this.state.vehiculeNumImmatRem2}
            onChangeText={text => this.setState({vehiculeNumImmatRem2: text})}
          />
        </View>
      </Accordion>
    );
  };

  accordionFive = () => {
    return (
      <Accordion
        title={translate('referentiel.plaquesImm.searchByIdentitePropr')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.numeroIdentifiant')}
            value={this.state.proprietaireNumeroIdentifiant}
            onChangeText={text =>
              this.setState({proprietaireNumeroIdentifiant: text})
            }
          />
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.nomProprietaire')}
            value={this.state.proprietaireNom}
            onChangeText={text => this.setState({proprietaireNom: text})}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.prenomProprietaire')}
            value={this.state.proprietairePrenom}
            onChangeText={text => this.setState({proprietairePrenom: text})}
          />
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.raisonSociale')}
            value={this.state.raisonSocial}
            onChangeText={text => this.setState({raisonSocial: text})}
          />
        </View>
      </Accordion>
    );
  };
}

const styles = StyleSheet.create({
  columnOne: {
    width: '100%',
    margin: 10,
  },
  column: {
    width: '45%',
    margin: 10,
  },
  columnThree: {
    width: '30%',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'space-around',
    margin: 10,
  },
});
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
