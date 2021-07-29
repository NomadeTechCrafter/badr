import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
/** REDUX **/
import { connect } from 'react-redux';
/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComContainerComp
} from '../../../../../commons/component';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import * as getCmbOperateurByCodeAction from '../state/actions/getCmbOperateurByCodeAction';
import * as Constants from '../state/autoriserAcheminementMainConstants';
import EceAutoriserAcheminementBlock from './blocks/eceAutoriserAcheminementBlock';
import EceConfirmationEntreeBlock from './blocks/eceConfirmationEntreeBlock';
import EceControleApresScannerBlock from './blocks/eceControleApresScanner';
import EceDeclarationEnDetailBlock from './blocks/eceDeclarationEnDetailBlock';
import EceEntreeMarchandiseEnceinteDouaniereBlock from './blocks/eceEntreeMarchandiseEnceinteDouaniereBlock';
import EceMainleveeBlock from './blocks/eceMainleveeBlock';
import EceReferenceDeclarationBlock from './blocks/eceReferenceDeclarationBlock';
import * as GetScellesApposeesAction from '../state/actions/getScellesApposeesAction';
import * as IsRegimeTransbordementAction from '../state/actions/isRegimeTransbordementAction';
import * as AutoriserAcheminementAction from '../state/actions/autoriserAcheminementAction';
import EceScelleApposeesBlock from './blocks/eceScelleApposeesBlock';
import EceConfirmerArriveeBlock from './blocks/eceConfirmerArriveeBlock';
import { getFormattedScelles } from '../utils/autoriserAcheminementUtil';
import moment from 'moment';


/** CONSTANTS **/


class AutoriserAcheminementMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ecorDumVO: props.route.params.ecorDumVO,
      referenceEnregistrement: props.route.params.referenceEnregistrement,
      numeroVoyage: props.route.params.numeroVoyage,
      cle: props.route.params.cle,
      dateAcheminement: '',
      heureAcheminement: '',
      scellesList: (props.route.params.ecorDumVO.scellesAutorisationAcheminement) ? getFormattedScelles(props.route.params.ecorDumVO.scellesAutorisationAcheminement) : []
    };
  }

  setError = (msg) => {
    console.log(msg);
    this.setState({

      errorMessage: msg
    })
  }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('AutoriserAcheminementMainScreen focus start');
      console.log('AutoriserAcheminementMainScreen focus 1');
      console.log(this.props.route.params);
      console.log('AutoriserAcheminementMainScreen focus 2');
      this.setState({
        ecorDumVO: this.props.route.params.ecorDumVO,
        referenceEnregistrement: this.props.route.params.referenceEnregistrement,
        numeroVoyage: this.props.route.params.numeroVoyage,
        cle: this.props.route.params.cle,
        dateAcheminement: '',
        heureAcheminement: '',
        scellesList: (this.props.route.params.ecorDumVO.scellesAutorisationAcheminement) ? getFormattedScelles(this.props.route.params.ecorDumVO.scellesAutorisationAcheminement) : []
      });
      this.populateLibelleTransporteurControleApresScanner();
      this.populateLibelleTransporteur();
      this.populateLibelleTransporteurAutoAchemin();
      this.isRegimeTransbordement();
      this.getScellesApposees();
      console.log('AutoriserAcheminementMainScreen focus end');
    });

  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  confirmer = () => {
    console.log('confirmer');
    let newEcorDumVO = {};
    this.state.ecorDumVO.scellesAutorisationAcheminement = {};
    this.state.scellesList.forEach((value) => {
      this.state.ecorDumVO.scellesAutorisationAcheminement[value] = value;
    });
    console.log(this.state.dateAcheminement + " " + this.state.heureAcheminement);
    let dateHeureAcheminement = this.state.dateAcheminement + " " + this.state.heureAcheminement;

    var formats = [
      "MM/DD/YYYY HH:mm"
    ];
    console.log(moment(dateHeureAcheminement, formats, true).isValid()); // false


    if (_.isEmpty(this.state.dateAcheminement) || _.isEmpty(this.state.heureAcheminement) || !moment(dateHeureAcheminement, formats, true).isValid()) {

      let dateHeureAcheminement = this.props?.route?.params?.ecorDumVO?.dateHeureAcheminement;
      console.log('dateHeureAcheminement : ' + dateHeureAcheminement);
      console.log('dateHeureAcheminement valid : ' + moment(dateHeureAcheminement, formats, true).isValid());
      console.log('dateHeureAcheminement isEmpty : ' + _.isEmpty(dateHeureAcheminement));

      if (_.isEmpty(dateHeureAcheminement)) {
        this.setState({
          errorMessage:
            translate('autoriserAcheminemenMainScreen.autorisationAcheminement.dateError')
        });
        console.log('NULL');
      } else {

        this.setState({
          errorMessage:
            null
        });

        newEcorDumVO.dateHeureAcheminement = dateHeureAcheminement;
        newEcorDumVO.dateHeureEntree = this.state.ecorDumVO.dateHeureEntree;
        newEcorDumVO.refDUM = {
          referenceEnregistrement: this.state.referenceEnregistrement,

          numeroOrdreVoyage: this.state.numeroVoyage

        };
        if (this.state.ecorDumVO.infoEcorScelle) {
          newEcorDumVO.infoEcorScelle = true;
          newEcorDumVO.scellesAutorisationAcheminement = this.state.ecorDumVO.scellesAutorisationAcheminement;
          newEcorDumVO.numeroPince = this.state.ecorDumVO.numeroPince;
          newEcorDumVO.nombreScelle = this.state.ecorDumVO.nombreScelle;
          newEcorDumVO.transporteurExploitantMEADAutoAchemin = this.state.ecorDumVO.transporteurExploitantMEADAutoAchemin;
        } else {
          newEcorDumVO.infoEcorScelle = false;
          newEcorDumVO.scellesAutorisationAcheminement = {}
        }



        console.log(JSON.stringify(newEcorDumVO));
        var autoriserAcheminementAction = AutoriserAcheminementAction.request({
          type: Constants.AUTORISER_ACHEMINEMENT_UC_REQUEST,
          value: {
            ecorDumVO: newEcorDumVO
          },
        }
        );
        this.props.actions.dispatch(autoriserAcheminementAction);
        console.log('dispatch EciApposerScellesAction fired !!');

      }
    }
  }

  populateLibelleTransporteurControleApresScanner() {
    let transporteurExploitantMEADCrtlApresScanner = this.state.ecorDumVO.transporteurExploitantMEADCrtlApresScanner;
    console.log('transporteurExploitantMEADCrtlApresScanner', transporteurExploitantMEADCrtlApresScanner);
    if (!_.isEmpty(transporteurExploitantMEADCrtlApresScanner)) {
      if (_.isEmpty(this.props.transporteurExploitantMEADCtrlApresScanner) || this.props.transporteurExploitantMEADCtrlApresScanner.code !== transporteurExploitantMEADCrtlApresScanner) {
        console.log('transporteurExploitantMEADCtrlApresScannerLibelle', this.props.transporteurExploitantMEADCtrlApresScanner);
        let action = getCmbOperateurByCodeAction.request({
          type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_REQUEST, value: { idOperateur: transporteurExploitantMEADCrtlApresScanner, isCtrlApresScanner: true, isAutoAchemin: false }
        });
        this.props.actions.dispatch(action);


      }
    }
  }

  populateLibelleTransporteur() {
    let transporteurExploitantMEAD = this.state.ecorDumVO.transporteurExploitantMEAD;
    console.log('populateLibelleTransporteur', transporteurExploitantMEAD);
    if (!_.isEmpty(transporteurExploitantMEAD)) {
      if (_.isEmpty(this.props.transporteurExploitantMEAD) || this.props.transporteurExploitantMEAD.code !== transporteurExploitantMEAD) {
        console.log('transporteurExploitantMEADCtrl', this.props.transporteurExploitantMEAD);
        let action = getCmbOperateurByCodeAction.request({
          type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_REQUEST, value: { idOperateur: transporteurExploitantMEAD, isCtrlApresScanner: false, isAutoAchemin: false }
        });
        this.props.actions.dispatch(action);


      }
    }
  }

  populateLibelleTransporteurAutoAchemin() {
    let transporteurExploitantMEADAutoAchemin = this.state.ecorDumVO.transporteurExploitantMEADAutoAchemin;
    console.log('transporteurExploitantMEADAutoAcheminr', transporteurExploitantMEADAutoAchemin);
    if (!_.isEmpty(transporteurExploitantMEADAutoAchemin)) {
      if (_.isEmpty(this.props.transporteurExploitantMEADAutoAchemin) || this.props.transporteurExploitantMEADAutoAchemin.code !== transporteurExploitantMEADAutoAchemin) {
        console.log('transporteurExploitantMEADAutoAcheminLibelle', this.props.transporteurExploitantMEADAutoAchemin);
        let action = getCmbOperateurByCodeAction.request({
          type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_REQUEST, value: { idOperateur: transporteurExploitantMEADAutoAchemin, isCtrlApresScanner: false, isAutoAchemin: true }
        });
        this.props.actions.dispatch(action);


      }
    }
  }




  getScellesApposees = () => {
    var getScellesApposeesAction = GetScellesApposeesAction.request({
      type: Constants.AUTORISER_ACHEMINEMENT_GET_SCELLES_APPOSEES_REQUEST,
      value: {
        referenceEnregistrement: this.state.referenceEnregistrement,
        numeroVoyage: this.state.numeroVoyage
      },
    }
    );
    this.props.actions.dispatch(getScellesApposeesAction);
    console.log('dispatch EciGetScellesApposeesAction fired !!');
  }

  isRegimeTransbordement = () => {
    var isRegimeTransbordementAction = IsRegimeTransbordementAction.request({
      type: Constants.AUTORISER_ACHEMINEMENT_IS_REGIME_TRANSBORDEMENT_REQUEST,
      value: {
        codeRegime: this.state.referenceEnregistrement.substring(3, 6)
      },
    }
    );
    this.props.actions.dispatch(isRegimeTransbordementAction);
    console.log('dispatch isRegimeTransbordementAction fired !!');
  }

  isScellesApposeesDisplayed = () => {
    let codeRegime = this.state.referenceEnregistrement.substring(3, 6);
    return Constants.APPOSITION_SCELLES_REGIMES_AUTRES_IMPORT.indexOf(codeRegime) > -1;
  }

  render() {


    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('autoriserAcheminement.title')}
          subtitle={translate('autoriserAcheminement.title')}
          icon="menu">
          {(!this.props.success && !this.props.route.params.readOnly) && <IconButton
            icon="content-save-outline"
            size={30}
            color={primaryColor}
            style={{ backgroundColor: 'white' }}
            onPress={() => this.confirmer()}
          />}

        </ComBadrToolbarComp>


        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <ComBadrProgressBarComp />}
          {this.props.infoMessage !== null && (
            <ComBadrInfoMessageComp message={this.props.infoMessage} />
          )}

          {this.props.errorMessage !== null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.state?.errorMessage !== null && (
            <ComBadrErrorMessageComp message={this.state?.errorMessage} />
          )}


          {/* Référence déclaration */}
          <EceReferenceDeclarationBlock
            referenceEnregistrement={this.state.referenceEnregistrement}
            cle={this.state.cle}
            numeroVoyage={this.state.numeroVoyage}
          />
          <EceDeclarationEnDetailBlock
            vo={this.state.ecorDumVO}
          />
          {(!this.props.isRegimeTransbordement) && <EceEntreeMarchandiseEnceinteDouaniereBlock
            vo={this.state.ecorDumVO}
          />}
          {this.isScellesApposeesDisplayed() && <EceScelleApposeesBlock
            listeScellesApposees={this.props.listeScellesApposees}
          />}
          <EceConfirmationEntreeBlock
            vo={this.state.ecorDumVO}
            transporteurExploitantMEAD={this.props.transporteurExploitantMEAD}
          />
          <EceMainleveeBlock vo={this.state.ecorDumVO} />

          <EceAutoriserAcheminementBlock
            vo={this.state.ecorDumVO}
            readOnly={this.props.success}
            scellesList={this.state.scellesList}
            setError={this.setError}
            updateHeure={(heure) => this.setState({ heureAcheminement: heure })}
            updateDate={(date) => this.setState({ dateAcheminement: date })}
            readOnly={this.props.route.params.readOnly}
            success={this.props.success}
            transporteurExploitantMEADAutoAchemin={this.props.transporteurExploitantMEADAutoAchemin}
            referenceEnregistrement={this.state.referenceEnregistrement}
          />
          {(!_.isEmpty(this.state.ecorDumVO.dateHeureArrive)) &&
            <EceConfirmerArriveeBlock vo={this.state.ecorDumVO} />}
          <EceControleApresScannerBlock
            vo={this.state.ecorDumVO}
            transporteurExploitantMEADCtrlApresScanner={this.props.transporteurExploitantMEADCtrlApresScanner}
          />
        </ComContainerComp>


      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.autoriserAcheminementMainReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoriserAcheminementMainScreen);
