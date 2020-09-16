import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';

/** i18n **/
import {translate} from '../../../../commons/i18n/I18nHelper';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsPlaquesImm from '../../../common/constants/referentiel/plaquesImm';
import * as plaquesImmAction from '../../../redux/actions/referentiel/plaquesImm';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';

/**Custom Components */
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrPopupComp,
  ComBadrAlphabetPickerComp,
  ComBadrItemsPickerComp,
} from '../../../../commons/component';

const initialState = {
  messageVisibility: false,
  message: '',
  messageType: '',
  login: Session.getInstance().getLogin(),
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
    let action = this.buildInitSearchPlaquesImmAction();
    this.props.actions.dispatch(action);
  }

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

  buildSearchZone = (index) => {
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
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={(event) => {
            this.layout = event.nativeEvent.layout;
          }}>
          <ComBadrPopupComp
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

          <Grid>
            <Row>
              <Col size={20} />
              <Col size={30}>
                <ComBadrButtonIconComp
                  onPress={() => this.handleSearch()}
                  icon="magnify"
                  style={styles.buttonIcon}
                  loading={this.props.showProgress}
                  text={translate('transverse.rechercher')}
                />
              </Col>
              <Col size={30}>
                <ComBadrButtonIconComp
                  onPress={() => this.handleClear()}
                  icon="autorenew"
                  style={styles.buttonIcon}
                  text={translate('transverse.retablir')}
                />
              </Col>
              <Col size={20} />
            </Row>
          </Grid>
        </ScrollView>
      </View>
    );
  }

  accordionOne = () => {
    return (
      <ComAccordionComp title={translate('referentiel.plaquesImm.searchByNumChassis')}>
        <TextInput
          mode="outlined"
          label={translate('referentiel.plaquesImm.numeroChassis')}
          value={this.state.vehiculeNumChassis}
          onChangeText={(text) => this.setState({vehiculeNumChassis: text})}
        />
      </ComAccordionComp>
    );
  };

  onAlphabetPickerChanged = (value, index) => {
    console.log(value);
    this.setState({vehiculeNumImmat2: value});
  };

  accordionTwo = () => {
    return (
      <ComAccordionComp
        title={translate('referentiel.plaquesImm.searchByNumImmNormal')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.columnThree}
            label=" "
            value={this.state.vehiculeNumImmat1}
            onChangeText={(text) => this.setState({vehiculeNumImmat1: text})}
          />

          <Text>{' \t-\t '}</Text>
          <ComBadrAlphabetPickerComp
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
            onChangeText={(text) => this.setState({vehiculeNumImmat3: text})}
          />
        </View>
      </ComAccordionComp>
    );
  };

  onCategoryDiploPickerChanged = (value, index) => {
    this.setState({vehiculeCodeTypeImmatDiplo: value});
  };

  accordionThree = () => {
    return (
      <ComAccordionComp
        title={translate('referentiel.plaquesImm.searchByNumImmDiplo')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=""
            value={this.state.vehiculeNumImmatDiplo1}
            onChangeText={(text) =>
              this.setState({vehiculeNumImmatDiplo1: text})
            }
          />
          <Text>{'\t-\t'}</Text>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=" "
            value={this.state.vehiculeNumImmatDiplo2}
            onChangeText={(text) =>
              this.setState({vehiculeNumImmatDiplo2: text})
            }
          />
        </View>

        <View style={styles.itemPickerContainer}>
          <ComBadrItemsPickerComp
            style={styles.column}
            label={translate(
              'referentiel.plaquesImm.choose_categoryDiplomatique',
            )}
            selectedValue={this.state.vehiculeCodeTypeImmatDiplo}
            items={ConstantsPlaquesImm.categoryDiplomatique}
            onValueChanged={(v, i) => this.onCategoryDiploPickerChanged(v, i)}
          />
        </View>
      </ComAccordionComp>
    );
  };

  accordionFour = () => {
    return (
      <ComAccordionComp
        title={translate('referentiel.plaquesImm.searchByNumImmRemorque')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=" "
            value={this.state.vehiculeNumImmatRem1}
            onChangeText={(text) => this.setState({vehiculeNumImmatRem1: text})}
          />
          <Text>{' \t-\t '}</Text>
          <TextInput
            mode="outlined"
            style={styles.column}
            label=" "
            value={this.state.vehiculeNumImmatRem2}
            onChangeText={(text) => this.setState({vehiculeNumImmatRem2: text})}
          />
        </View>
      </ComAccordionComp>
    );
  };

  accordionFive = () => {
    return (
      <ComAccordionComp
        title={translate('referentiel.plaquesImm.searchByIdentitePropr')}>
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.numeroIdentifiant')}
            value={this.state.proprietaireNumeroIdentifiant}
            onChangeText={(text) =>
              this.setState({proprietaireNumeroIdentifiant: text})
            }
          />
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.nomProprietaire')}
            value={this.state.proprietaireNom}
            onChangeText={(text) => this.setState({proprietaireNom: text})}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.prenomProprietaire')}
            value={this.state.proprietairePrenom}
            onChangeText={(text) => this.setState({proprietairePrenom: text})}
          />
          <TextInput
            mode="outlined"
            style={styles.column}
            label={translate('referentiel.plaquesImm.raisonSociale')}
            value={this.state.raisonSocial}
            onChangeText={(text) => this.setState({raisonSocial: text})}
          />
        </View>
      </ComAccordionComp>
    );
  };
}

const styles = StyleSheet.create({
  buttonIcon: {margin: 10, marginTop: 40},
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
  itemPickerContainer: {flexDirection: 'row', margin: 10},
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
