import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp, ComBadrToolbarComp,
  ComContainerComp
} from '../../../../../commons/component';
/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet, primaryColor
} from '../../../../../commons/styles/ComThemeStyle';
import * as EciGetScellesDeclareesAction from '../state/actions/eciGetScellesDeclareesAction';
import * as EciGetScellesApposeesAction from '../state/actions/eciGetScellesApposeesAction';
import * as EciApposerScellesAction from '../state/actions/eciApposerScellesAction';
import * as Constants from '../state/eciAppositionScellesConstants';
import EciDeclarationEnDetailBlock from './blocks/eciDeclarationEnDetailBlock';
import EciReferenceDeclarationBlock from './blocks/eciReferenceDeclarationBlock';
import EciScellesApposeesBlock from './blocks/eciScellesApposeesBlock';
import { IconButton } from 'react-native-paper';






class ECIAppositionScellesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceEnregistrement: props.route.params.referenceEnregistrement,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      appositionScellesVO: props.route.params.appositionScellesVO,
      scellesList: []
    };
    
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('ECIAppositionScellesScreen focus start');
      console.log('ECIAppositionScellesScreen focus 1');
      console.log(this.props.route.params);
      console.log('ECIAppositionScellesScreen focus 2');
      this.setState({
        referenceEnregistrement: this.props.route.params.referenceEnregistrement,
        cle: this.props.route.params.cle,
        numeroVoyage: this.props.route.params.numeroVoyage,
        appositionScellesVO: this.props.route.params.appositionScellesVO,
        scellesList: []
      });
      this.loadScelles(this.props.route.params.referenceEnregistrement, this.props.route.params.numeroVoyage);
      console.log('ECIAppositionScellesScreen focus end');
    });

    //this.loadScelles();

  }

  loadScelles = (referenceEnregistrement, numeroVoyage) => {
    var getScellesDeclareesAction = EciGetScellesDeclareesAction.request({
      type: Constants.ECI_GET_SCELLES_DECLAREES_REQUEST,
      value: {
        referenceEnregistrement: referenceEnregistrement,
        numeroVoyage: numeroVoyage
      },
    }
    );
    this.props.actions.dispatch(getScellesDeclareesAction);
    console.log('dispatch EciGetScellesDeclareesAction fired !!');
    var getScellesApposeesAction = EciGetScellesApposeesAction.request({
      type: Constants.ECI_GET_SCELLES_APPOSEES_REQUEST,
      value: {
        referenceEnregistrement: referenceEnregistrement,
        numeroVoyage: numeroVoyage
      },
    }
    );
    this.props.actions.dispatch(getScellesApposeesAction);
    console.log('dispatch EciGetScellesApposeesAction fired !!');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this._unsubscribe();
  }

  setError = (msg) => {
    console.log(msg);
    this.setState({

      errorMessage: msg
    })
  }

  confirmer = () => {
    console.log('confirmer');
    this.state.appositionScellesVO.scelles = {};
    this.state.scellesList.forEach((value) => {
      this.state.appositionScellesVO.scelles[value] = value;
    });

    delete this.state.appositionScellesVO.defaultConverter;
    delete this.state.appositionScellesVO.refDedServices.defaultConverter;
    delete this.state.appositionScellesVO.referenceDED.defaultConverter;
    delete this.state.appositionScellesVO.referenceDED.regime;
    console.log(this.state.appositionScellesVO);
    var apposerScellesAction = EciApposerScellesAction.request({
      type: Constants.ECI_APPOSER_SCELLES_REQUEST,
      value: {
        appositionScellesVO: this.state.appositionScellesVO
      },
    }
    );
    this.props.actions.dispatch(apposerScellesAction);
    console.log('dispatch EciApposerScellesAction fired !!');
  }














  render() {
    const {
      appositionScellesVO,
      referenceEnregistrement,
      cle,
      numeroVoyage,
    } = this.state;


    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={translate('appositionScelles.title')}
          icon="menu">
          {(!this.props.success) && <IconButton
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
          {this.state.errorMessage !== null && (
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          )}

          {/* Référence déclaration */}
          <EciReferenceDeclarationBlock
            appositionScellesVO={appositionScellesVO}
            referenceEnregistrement={referenceEnregistrement}
            cle={cle}
            numeroVoyage={numeroVoyage}
          />
          <View>
            <EciDeclarationEnDetailBlock
              appositionScellesVO={appositionScellesVO}
            />
          </View>
          <View>
            <EciScellesApposeesBlock
              appositionScellesVO={appositionScellesVO}
              readOnly={this.props.success}
              listeScellesdeclarees={this.props.listeScellesdeclarees}
              listeScellesApposees={this.props.listeScellesApposees}
              scellesList={this.state.scellesList}
              setError={this.setError}
            />
          </View>


        </ComContainerComp>


      </View>
    );
  }



}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBox: {
    flexDirection: 'column',
    padding: 0,
  },
  actionBtn: {
    width: 200,
    height: 50,
  },
};

function mapStateToProps(state) {
  return { ...state.eciAppositionScellesReducer };
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
)(ECIAppositionScellesScreen);
