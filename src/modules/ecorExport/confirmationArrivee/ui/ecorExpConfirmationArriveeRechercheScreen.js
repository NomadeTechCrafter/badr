import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {
  ComAccordionComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrAlphabetPickerComp,
  ComBadrToolbarComp,
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComBadrItemsPickerComp,
  ComBadrPopupComp,
} from '../../../../commons/component';
import {
  CustomStyleSheet,
  primaryColor,
  accentColor,
} from '../../../../commons/styles/ComThemeStyle';
import styles from '../style/ecorExpConfirmationArriveeStyle';
import EcorExpRechercheParRefComp from '../component/ecorExpRechercheParRefComp';
import _ from 'lodash';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {connect} from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationArriveeConstants';
import * as RechecheDumAction from '../state/actions/ecorExpConfirmationArriveeRechercheAction';
import {MODULE_ECOREXP, TYPE_SERVICE_SP} from '../../../../commons/Config';
class ConfirmationArriveeRechercheScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeListeEtatC: '',
      typeMoyenTEtatC: '',
      immatriculationEtatC: '',
      typeListeAmp: '',
      immatriculationAmp: '',
      numeroAmp: '',
    };
  }
  onTypeListePickerChanged = (value, index) => {
    this.setState({typeListeEtatC: value ? value.code : ''});
  };
  onMoyenTListePickerChanged = (selectedValue, selectedIndex, item) => {
    this.setState({typeMoyenTEtatC: selectedValue});
  };
  retablir = () => {
    console.log('retablir');
    //this.setState({...this.defaultState});
  };
  onTypeListeAmpPickerChanged = (value, index) => {
    this.setState({typeListeAmp: value ? value.code : ''});
  };

  confirmerEtatChargement = () => {
    console.log('confirmer', this.props.successRedirection);
    this.setState({showErrorMsg: true});
    if (this.state.typeMoyenTEtatC && this.state.immatriculationEtatC) {
      console.log('typeMoyenTEtatC immatriculationEtatC');
      let action = RechecheDumAction.requestFindDumByEtatChargement({
        type: Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_REQUEST,
        value: {
          commande: 'findDumByEtatChargementConfirmerArrivee',
          module: MODULE_ECOREXP,
          typeService: TYPE_SERVICE_SP,
          data: {
            codeBureau: null,
            numero: this.state.immatriculationEtatC,
            referenceDum: '',
            typeSelecte: null,
            moyenTransport: this.state.typeMoyenTEtatC,
            modeTransport: null,
            idDed: null,
          },
        },
      });
      this.props.navigation.navigate('Resultat', {
        first: true,
      });
      this.props.dispatch(action);
      console.log('dispatch fired !!');
    }
  };

  confirmerAMP = () => {
    console.log('confirmerAMP', this.props.successRedirection);
    this.setState({showErrorMsg: true});
    if (this.state.immatriculationAmp || this.state.numeroAmp) {
      console.log('typeMoyenTEtatC immatriculationEtatC');

      let action = RechecheDumAction.requestFindDumByEtatChargement({
        type: Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_REQUEST,
        value: {
          commande: 'findDumByAmp',
          module: MODULE_ECOREXP,
          typeService: TYPE_SERVICE_SP,
          data: {
            numero: this.state.numeroAmp !== '' ? this.state.numeroAmp : null,
            numeroImmatriculation:
              this.state.immatriculationAmp !== ''
                ? this.state.immatriculationAmp
                : null,
            codeBureau: null,
          },
        },
      });
      this.props.navigation.navigate('Resultat', {
        login: this.state.login,
        first: true,
      });
      this.props.dispatch(action);
      console.log('dispatch fired !!');
    }
  };

  accordionDeclarationEnDetail = () => {
    return (
      <ComAccordionComp
        title={translate('confirmationArrivee.declarationEnDetail')}>
        <EcorExpRechercheParRefComp
          commande="initConfirmerArrivee"
          typeService="UC"
          isBureauDisabled={false}
          navigation={this.props.navigation}
          routeParams={this.props.route.params}
        />
      </ComAccordionComp>
    );
  };
  accordionEtatChargement = () => {
    return (
      <ComAccordionComp title={translate('confirmationArrivee.etatChargement')}>
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true} isRequired={true}>
              {translate('confirmationArrivee.typeList')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={4}>
            <ComBadrItemsPickerComp
              label={translate('confirmationArrivee.selectionnerElement')}
              selectedValue={this.state.typeListeEtatC}
              items={Constants.typeListe}
              onValueChanged={(v, i) => this.onTypeListePickerChanged(v, i)}
            />
          </Col>
          <Col size={2} />
        </Row>
        {this.state.typeListeEtatC === 'moyenT' && (
          <View>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true} isRequired={true}>
                  {translate('confirmationArrivee.typeMoyen')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4}>
                <ComBadrPickerComp
                  disabled={false}
                  onRef={(ref) => (this.combotMoyenTransport = ref)}
                  key="typeMoyenT"
                  cle="code"
                  libelle="libelle"
                  module="ECOREXP_LIB"
                  command="getListMoyenTransport"
                  typeService="SP"
                  selectedValue={this.state.typeMoyenTEtatC}
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.onMoyenTListePickerChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                />
              </Col>
              <Col size={2} />
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true} isRequired={true}>
                  {translate('confirmationArrivee.immatriculation')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4}>
                <TextInput
                  mode="outlined"
                  value={this.state.immatriculationEtatC}
                  onChangeText={(text) =>
                    this.setState({immatriculationEtatC: text})
                  }
                />
              </Col>
              <Col size={2} />
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2} />
              <Col size={2}>
                <Button
                  onPress={this.confirmerEtatChargement}
                  icon="check"
                  compact="true"
                  mode="contained"
                  loading={this.props.showProgress}>
                  {translate('transverse.confirmer')}
                </Button>
              </Col>
              <Col size={1} />
              <Col size={2}>
                <Button
                  onPress={this.retablir}
                  icon="autorenew"
                  mode="contained">
                  {translate('transverse.retablir')}
                </Button>
              </Col>
              <Col size={2} />
            </Row>
          </View>
        )}
        {this.state.typeListeEtatC === 'etatChargement' && (
          <EcorExpRechercheParRefComp
            commande="findDumByEtatChargement"
            typeService="SP"
            isBureauDisabled={true}
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
        )}
      </ComAccordionComp>
    );
  };
  accordionAMP = () => {
    return (
      <ComAccordionComp title={translate('confirmationArrivee.amp')}>
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true} isRequired={true}>
              {translate('confirmationArrivee.typeList')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={4}>
            <ComBadrItemsPickerComp
              label={translate('confirmationArrivee.selectionnerElement')}
              selectedValue={this.state.typeListeAmp}
              items={Constants.typeListeAmp}
              onValueChanged={(v, i) => this.onTypeListeAmpPickerChanged(v, i)}
            />
          </Col>
          <Col size={2} />
        </Row>
        {this.state.typeListeAmp === 'immatriculation' && (
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true} isRequired={true}>
                {translate('confirmationArrivee.immatriculation')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={4}>
              <TextInput
                mode="outlined"
                value={this.state.immatriculationAmp}
                onChangeText={(text) =>
                  this.setState({immatriculationAmp: text})
                }
              />
            </Col>
            <Col size={2} />
          </Row>
        )}
        {this.state.typeListeAmp === 'numeroAmp' && (
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true} isRequired={true}>
                {translate('confirmationArrivee.numero')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={4}>
              <TextInput
                mode="outlined"
                value={this.state.numeroAmp}
                onChangeText={(text) => this.setState({numeroAmp: text})}
              />
            </Col>
            <Col size={2} />
          </Row>
        )}
        {(this.state.typeListeAmp === 'numeroAmp' ||
          this.state.typeListeAmp === 'immatriculation') && (
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2} />
            <Col size={2}>
              <Button
                onPress={this.confirmerAMP}
                icon="check"
                compact="true"
                mode="contained"
                loading={this.props.showProgress}>
                {translate('transverse.confirmer')}
              </Button>
            </Col>
            <Col size={1} />
            <Col size={2}>
              <Button onPress={this.retablir} icon="autorenew" mode="contained">
                {translate('transverse.retablir')}
              </Button>
            </Col>
            <Col size={2} />
          </Row>
        )}
      </ComAccordionComp>
    );
  };
  buildSearchZone = (type) => {
    let component = <View />;
    switch (type) {
      case 'DeclarationEnDetail':
        component = this.accordionDeclarationEnDetail();
        break;
      case 'EtatChargement':
        component = this.accordionEtatChargement();
        break;
      case 'AMP':
        component = this.accordionAMP();
        break;
    }
    return component;
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
          {!_.isEmpty(this.props.errorMessage) && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.props.errorMessage}
            />
          )}

          {this.buildSearchZone('DeclarationEnDetail')}
          <Divider />
          {this.buildSearchZone('EtatChargement')}
          <Divider />
          {this.buildSearchZone('AMP')}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.ecorExpConfirmationArriveeReducer,
});

export default connect(
  mapStateToProps,
  null,
)(ConfirmationArriveeRechercheScreen);
