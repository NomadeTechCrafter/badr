import React from 'react';
import { View } from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
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

class DedRedressementEnteteEnvoyerTraiterValeurBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      declarationValeurEnvoi: false,
      descriptionTraitementEnvoi: false,
      declarationValeurDescriptionEnvoi: '',
      descriptionTraitementDescriptionEnvoi: '',
      buttonLabel: 'disabled',

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

      const lastVersionDeclarationValeur = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length - 1] : {}
      console.log('=============================================================');
      console.log('=============================================================');
      console.log('=============================================================');
      console.log(JSON.stringify(lastVersionDeclarationValeur));
      console.log('=============================================================');
      console.log('=============================================================');
      console.log('=============================================================');

      if (lastVersionDeclarationValeur && !lastVersionDeclarationValeur.traite) {
        this.setState({
          declarationValeurDescriptionEnvoi: lastVersionDeclarationValeur ? lastVersionDeclarationValeur.descriptionEnvoi : '',
          declarationValeurEnvoi: true,
          // descriptionTraitementDescriptionEnvoi: lastVersionDeclarationValeur ? lastVersionDeclarationValeur.descriptionTraitement : '',
        })
      }
      // if (lastVersionDeclarationValeur && lastVersionDeclarationValeur.traite) {
      //   this.setState({
      //     declarationValeurDescriptionEnvoi: lastVersionDeclarationValeur ? lastVersionDeclarationValeur.descriptionEnvoi : '',
      //     descriptionTraitementDescriptionEnvoi: lastVersionDeclarationValeur ? lastVersionDeclarationValeur.descriptionTraitement : '',
      //   })
      // }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addDeclarationValeur = async () => {
    if (this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO && this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length > 0) {
      const lastVersionDeclarationValeur = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length - 1];
      const newVersionDeclarationValeur =
      {
        "agentEnvoiValeur": ComSessionService.getInstance().getLogin(),
        "nomAgentEnvoiValeur": ComUtils.buildUserFullname(
          ComSessionService.getInstance().getUserObject(),
        ),
        "numeroOrdre": lastVersionDeclarationValeur.numeroOrdre++,
        "dateEnvoi": moment(new Date(), FORMAT_DDMMYYYY_HHMM),
        "descriptionEnvoi": this.state.descriptionTraitementDescriptionEnvoi,
        "identifiantDUM": lastVersionDeclarationValeur.identifiantDUM,
      };
      this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.push(newVersionDeclarationValeur);
    } else {
      const newVersionDeclarationValeur =
      {
        "agentEnvoiValeur": ComSessionService.getInstance().getLogin(),
        "nomAgentEnvoiValeur": ComUtils.buildUserFullname(
          ComSessionService.getInstance().getUserObject(),
        ),
        "numeroOrdre": 1,
        "dateEnvoi": moment(new Date(), FORMAT_DDMMYYYY_HHMM),
        "descriptionEnvoi": this.state.descriptionTraitementDescriptionEnvoi,
        "identifiantDUM": this.props?.dedDumSectionEnteteVO?.identifiant,
      };

      // this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO = [];
      this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO.push(newVersionDeclarationValeur);
    }

    console.log('=============================================================');
    console.log(JSON.stringify(this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO));
    console.log('=============================================================');
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title="Traitement de la valeur"
          expanded={true}>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Envoi valeur"
              children={
                <TextInput
                  disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.declarationValeurEnvoi || this.props?.fromWhere1 === 'ded.InitTraiterValeur'}
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
                  disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.descriptionTraitementDescriptionEnvoi || this.props?.fromWhere1 === 'ded.InitEnvoyerValeur'}
                  mode="flat"
                  value={this.state.descriptionTraitementDescriptionEnvoi}
                  style={{ width: '100%' }}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(text) =>
                    this.setState({
                      descriptionTraitementDescriptionEnvoi: text,
                    })
                  }
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <Button
              title={translate('transverse.ajouter')}
              disabled={this.state.buttonLabel === 'disabled' || this.state.declarationValeurEnvoi || this.props?.fromWhere1 === 'ded.ConsulterDum'}
              type={'solid'}
              buttonStyle={styles.buttonAction}
              onPress={() => this.addDeclarationValeur()} />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBasicDataTableComp
              ref="_badrTable"
              id="scannerTable"
              rows={this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO : []}
              cols={this.cols}
              totalElements={this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length : 0}
              maxResultsPerPage={10}
              paginate={true}
              showProgress={this.props.showProgress}
              withId={false}
            />
          </DedRedressementRow>
          <DedRedressementRow>
            <Button
              title={this.state.buttonLabel}
              disabled={this.state.buttonLabel === 'disabled' || this.state.declarationValeurEnvoi || this.props?.fromWhere1 === 'ded.ConsulterDum'}
              type={'solid'}
              buttonStyle={styles.buttonAction}
              onPress={() => this.addDeclarationValeur()} />
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
