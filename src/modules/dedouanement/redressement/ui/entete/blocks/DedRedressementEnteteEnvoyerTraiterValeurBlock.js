import React from 'react';
import { AppState, View } from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrKeyValueComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import { TextInput } from 'react-native-paper';
import { getValueByPath } from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { Component } from 'react';
import { FORMAT_DDMMYYYY_HHMM } from '../../../../../actifs/rapport/utils/actifsConstants';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';
import ComUtils from '../../../../../../commons/utils/ComUtils';
import moment from 'moment';
import * as ConsulterDumAction from '../../../../../../commons/state/actions/ConsulterDumAction';
import {
  GENERIC_INIT,
  GENERIC_REQUEST,
} from '../../../../../../old/common/constants/generic';
import * as authAction from '../../../../../hab/login/state/actions/habLoginAction';
import * as LoginConstants from '../../../../../hab/login/state/habLoginConstants';
import * as RootNavigation from '../../../../../hab/login/state/habLoginConstants';


class DedRedressementEnteteEnvoyerTraiterValeurBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      declarationValeurEnvoi: false,
      declarationValeurEnvoiAjouter: false,
      descriptionTraitementEnvoi: false,
      descriptionTraitementEnvoiAjouter: false,
      traitementOK: false,
      envoiOK: false,
      declarationValeurDescriptionEnvoi: '',
      declarationValeurDescriptionTraitement: '',
      buttonLabel: 'disabled',
      errorMessage: '',
      lastVersionDeclarationValeur: {},
      listDeclarationValeurDUMVO: [],
    };

    this.cols = [
      {
        code: 'numeroOrdre',
        libelle: translate('dedouanement.info.num'),
        width: 80,
      },
      {
        code: 'nomAgentEnvoiValeur',
        libelle: translate('dedouanement.info.agentEnvoi'),
        width: 200,
      },
      {
        code: 'dateEnvoi',
        libelle: translate('dedouanement.info.dateEnvoi'),
        width: 200,
      },
      {
        code: 'descriptionEnvoi',
        libelle: translate('dedouanement.info.descriptionEnvoi'),
        width: 250,
      },
      {
        code: 'nomAgentTraitementValeur',
        libelle: translate('dedouanement.info.agentTraitement'),
        width: 200,
      },
      {
        code: 'dateTraitement',
        libelle: translate('dedouanement.info.dateTraitement'),
        width: 200,
      },
      {
        code: 'descriptionTraitement',
        libelle: translate('dedouanement.info.descriptionTraitement'),
        width: 250,
      }
    ];
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        traitementOK: false,
        envoiOK: false,
        declarationValeurEnvoi: false,
        //declarationValeurEnvoiAjouter: false,
        descriptionTraitementEnvoi: false,
        //descriptionTraitementEnvoiAjouter: false,
        declarationValeurDescriptionEnvoi: this.state.declarationValeurDescriptionEnvoi,
        declarationValeurDescriptionTraitement: this.state.declarationValeurDescriptionTraitement,
        buttonLabel: 'disabled',
        errorMessage: '',
        listDeclarationValeurDUMVO: this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO && this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length > 0
          ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO
          : this.state.listDeclarationValeurDUMVO,
        lastVersionDeclarationValeur: this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO
          ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length - 1]
          : this.state.listDeclarationValeurDUMVO[0],

      });
      switch (this.props?.fromWhere1) {
        case 'ded.InitEnvoyerValeur':
          this.setState({
            buttonLabel: translate('dedouanement.confirmerEnvoiValeur')
          });
          break;
        case 'ded.InitTraiterValeur':
          this.setState({
            buttonLabel: translate('dedouanement.confirmerTraitementValeur')
          });
          break;

        default:
          this.setState({
            buttonLabel: 'disabled'
          });
      }
      let lastVersion = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length - 1] : null;
      if (lastVersion && !lastVersion?.traite) {
        this.setState({
          declarationValeurDescriptionEnvoi: lastVersion ? lastVersion.descriptionEnvoi : '',
          declarationValeurEnvoi: true,
        })
      }
      console.log('lastVersion 1 : ' + JSON.stringify(lastVersion));
    });


    AppState.addEventListener('change', this.handleAppStateChange);

    this.didItOnMount();
  }

  didItOnMount() {
    this.setState({
      traitementOK: false,
      envoiOK: false,
      declarationValeurEnvoi: false,
      declarationValeurEnvoiAjouter: false,
      descriptionTraitementEnvoi: false,
      descriptionTraitementEnvoiAjouter: false,
      declarationValeurDescriptionEnvoi: '',
      declarationValeurDescriptionTraitement: '',
      buttonLabel: 'disabled',
      errorMessage: '',
      listDeclarationValeurDUMVO: this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO && this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length > 0
        ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO
        : this.state.listDeclarationValeurDUMVO,
      lastVersionDeclarationValeur: this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO
        ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length - 1]
        : this.state.listDeclarationValeurDUMVO[0],
    });
    console.log('this.props?.fromWhere1 : ', this.props?.fromWhere1);

    switch (this.props?.fromWhere1) {
      case 'ded.InitEnvoyerValeur':
        this.setState({
          buttonLabel: translate('dedouanement.confirmerEnvoiValeur')
        });
        break;
      case 'ded.InitTraiterValeur':
        this.setState({
          buttonLabel: translate('dedouanement.confirmerTraitementValeur')
        });
        break;

      default:
        this.setState({
          buttonLabel: 'disabled'
        });
    }

    let lastVersion = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length - 1] : null;

    console.log('lastVersion 2 : ' + JSON.stringify(lastVersion));
    if (lastVersion && !lastVersion?.traite) {
      this.setState({
        declarationValeurDescriptionEnvoi: lastVersion ? lastVersion.descriptionEnvoi : '',
        declarationValeurEnvoi: true
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    console.log(nextAppState);
    if (nextAppState === 'background') {

      let action = authAction.requestLogout(
        {
          type: LoginConstants.AUTH_LOGOUT_REQUEST,
          value: {},
        },
        RootNavigation,
      );
      this.props.dispatch(action);
    }
  }

  addDeclarationValeur = async () => {

    if (this.state.declarationValeurDescriptionEnvoi) {
      this.setState({
        errorMessage: '',
        declarationValeurEnvoiAjouter: true,
      })
      if (this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO && this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length > 0) {
        const lastVersionDeclarationValeur = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length - 1];

        var derniereligneTraitee = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.length - 1].dateTraitement !== undefined;
        const newVersionDeclarationValeur =
        {
          agentEnvoiValeur: ComSessionService.getInstance().getLogin(),
          nomAgentEnvoiValeur: ComUtils.buildUserFullname(
            ComSessionService.getInstance().getUserObject(),
          ),
          numeroOrdre: lastVersionDeclarationValeur.numeroOrdre + 1,
          dateEnvoi: moment(new Date()).format(FORMAT_DDMMYYYY_HHMM).toString(),
          descriptionEnvoi: this.state.declarationValeurDescriptionEnvoi,
          identifiantDUM: lastVersionDeclarationValeur.identifiantDUM,
          structureDestination: derniereligneTraitee,
          newVal: false
        };

        const newArray = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO;

        newArray.push(newVersionDeclarationValeur);
        this.setState({
          errorMessage: '',
          lastVersionDeclarationValeur: newVersionDeclarationValeur,
          listDeclarationValeurDUMVO: newArray,
        })

      } else {
        const newVersionDeclarationValeur =
        {
          agentEnvoiValeur: ComSessionService.getInstance().getLogin(),
          nomAgentEnvoiValeur: ComUtils.buildUserFullname(
            ComSessionService.getInstance().getUserObject(),
          ),
          numeroOrdre: 1,
          dateEnvoi: moment(new Date()).format(FORMAT_DDMMYYYY_HHMM).toString(),
          descriptionEnvoi: this.state.declarationValeurDescriptionEnvoi,
          identifiantDUM: this.props?.dedDumSectionEnteteVO?.identifiant,
          structureDestination: true,
          newVal: false
        };

        const newArray = [];

        newArray.push(newVersionDeclarationValeur);
        this.setState({
          errorMessage: '',
          lastVersionDeclarationValeur: newVersionDeclarationValeur,
          listDeclarationValeurDUMVO: newArray,
        });
      }
    } else {
      this.setState({
        errorMessage: 'Valeur obligatoire',
      })
    }
  };

  addTraitementValeur = async () => {

    if (this.state.declarationValeurDescriptionTraitement) {
      this.setState({
        errorMessage: '',
        descriptionTraitementEnvoiAjouter: true,
      })
      const localLastVersionDeclarationValeur = this.state.listDeclarationValeurDUMVO[this.state.listDeclarationValeurDUMVO.length - 1];
      localLastVersionDeclarationValeur.agentTraitementValeur = ComSessionService.getInstance().getLogin();
      localLastVersionDeclarationValeur.nomAgentTraitementValeur = ComUtils.buildUserFullname(
        ComSessionService.getInstance().getUserObject());
      localLastVersionDeclarationValeur.dateTraitement = moment(new Date()).format(FORMAT_DDMMYYYY_HHMM).toString();
      localLastVersionDeclarationValeur.descriptionTraitement = this.state.declarationValeurDescriptionTraitement;
      localLastVersionDeclarationValeur.traite = true;

      const newArray = this.state.listDeclarationValeurDUMVO;

      newArray[this.state?.listDeclarationValeurDUMVO?.length - 1] = this.state.lastVersionDeclarationValeur;
      this.setState({
        errorMessage: '',
        lastVersionDeclarationValeur: localLastVersionDeclarationValeur,
        listDeclarationValeurDUMVO: newArray,
      })
    } else {
      this.setState({
        errorMessage: 'Valeur de traitement obligatoire',
      })
    }
  };

  envoyerDeclarationValeur = async () => {

    const dataToSendToWS = {
      dedReferenceVO: {
        identifiant: this.props?.data?.dedReferenceVO?.identifiant
      },
      dedDumSectionEnteteVO: {
        declarationValeur: this.state?.listDeclarationValeurDUMVO[this.state?.listDeclarationValeurDUMVO?.length - 1]
      }
    }

    let action = ConsulterDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: dataToSendToWS
        },
        command: 'ded.EnvoyerValeur'
      },
      this.props.navigation,
    );

    this.props.dispatch(action);

    if (this.props?.errorMessage) {
      console.log('if envoyerDeclarationValeur');
      this.didItOnMount();
    } else {
      this.setState({
        errorMessage: '',
        envoiOK: true,
      })
    }
  };

  traiterDeclarationValeur = async () => {

    const dataToSendToWS = {
      dedReferenceVO: {
        identifiant: this.props?.data?.dedReferenceVO?.identifiant
      },
      dedDumSectionEnteteVO: {
        declarationValeur: this.state?.listDeclarationValeurDUMVO[this.state?.listDeclarationValeurDUMVO?.length - 1]
      }
    }

    delete dataToSendToWS.dedDumSectionEnteteVO.declarationValeur.defaultConverter;



    let action = ConsulterDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: dataToSendToWS
        },
        command: 'ded.TraiterValeur'
      },
      this.props.navigation,
    );

    this.props.dispatch(action);


    if (this.props?.errorMessage) {
      console.log('if traiterDeclarationValeur');
      this.didItOnMount();
    } else {
      console.log('else traiterDeclarationValeur');
      this.setState({
        errorMessage: '',
        traitementOK: true,
      })
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title="Traitement de la valeur"
          expanded={true}>
          {this.props?.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props?.errorMessage} />
          )}
          {this.state?.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state?.errorMessage} />
          )}
          {this.props?.messageInfo != null && (
            <ComBadrInfoMessageComp message={this.props?.messageInfo} />
          )}

          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Envoi valeur"
              children={
                <TextInput
                  disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.declarationValeurEnvoiAjouter || this.state.declarationValeurEnvoi || this.props?.fromWhere1 === 'ded.InitTraiterValeur' || this.state.traitementOK || this.state.envoiOK}
                  mode="flat"
                  value={this.state.declarationValeurDescriptionEnvoi}
                  style={{ width: '100%' }}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(text) =>
                    this.setState({
                      declarationValeurDescriptionEnvoi: text,
                    })
                  }
                />
              }
            />
          </DedRedressementRow>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Traitement valeur"
              children={
                <TextInput
                  disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.descriptionTraitementEnvoiAjouter || this.state.descriptionTraitementEnvoi || this.props?.fromWhere1 === 'ded.InitEnvoyerValeur' || this.state.traitementOK || this.state.envoiOK}
                  mode="flat"
                  value={this.state.declarationValeurDescriptionTraitement}
                  style={{ width: '100%' }}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(text) =>
                    this.setState({
                      declarationValeurDescriptionTraitement: text,
                    })
                  }
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            {this.props?.fromWhere1 === 'ded.InitEnvoyerValeur' && (
              <Button
                title={translate('transverse.ajouter')}
                disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.declarationValeurEnvoiAjouter || this.state.declarationValeurEnvoi || this.state.envoiOK}
                type={'solid'}
                buttonStyle={styles.buttonAction}
                onPress={() => this.addDeclarationValeur()} />
            )}
            {this.props?.fromWhere1 === 'ded.InitTraiterValeur' && (
              <Button
                title={translate('transverse.ajouter')}
                disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.descriptionTraitementEnvoiAjouter || this.state.traitementOK}
                type={'solid'}
                buttonStyle={styles.buttonAction}
                onPress={() => this.addTraitementValeur()} />
            )}
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBasicDataTableComp
              ref="_badrTable"
              id="scannerTable"
              rows={this.state?.listDeclarationValeurDUMVO ? this.state?.listDeclarationValeurDUMVO : []}
              cols={this.cols}
              totalElements={this.state?.listDeclarationValeurDUMVO ? this.state?.listDeclarationValeurDUMVO?.length : 0}
              maxResultsPerPage={10}
              paginate={true}
              showProgress={this.props.showProgress}
              withId={false}
            />
          </DedRedressementRow>
          <DedRedressementRow>
            {this.props?.fromWhere1 === 'ded.InitEnvoyerValeur' && (
              <Button
                title={this.state.buttonLabel}
                disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || !this.state.declarationValeurEnvoiAjouter || this.state.envoiOK}
                type={'solid'}
                buttonStyle={styles.buttonAction}
                onPress={() => this.envoyerDeclarationValeur()} />
            )}
            {this.props?.fromWhere1 === 'ded.InitTraiterValeur' && (
              <Button
                title={this.state.buttonLabel}
                disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || !this.state.descriptionTraitementEnvoiAjouter || this.state.traitementOK}
                type={'solid'}
                buttonStyle={styles.buttonAction}
                onPress={() => this.traiterDeclarationValeur()} />
            )}
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return { ...state.consulterDumReducer };
}

export default connect(mapStateToProps, null)(DedRedressementEnteteEnvoyerTraiterValeurBlock);
