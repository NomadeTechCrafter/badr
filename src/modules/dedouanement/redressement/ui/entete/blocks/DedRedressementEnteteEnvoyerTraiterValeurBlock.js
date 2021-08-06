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

class DedRedressementEnteteEnvoyerTraiterValeurBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('this.props?.fromWhere1 : ', this.props?.fromWhere1);

      switch (this.props?.fromWhere1) {
        case 'ded.InitEnvoyerValeur':
          return this.setState({
            buttonLabel: translate('dedouanement.confirmerEnvoiValeur')
          });
        case 'ded.InitTraiterValeur':
          return this.setState({
            buttonLabel: translate('dedouanement.confirmerTraitementValeur')
          });

        default:
          this.setState({
            buttonLabel: 'disabled'
          });
      }

      const lastVersionDeclarationValeur = this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO ? this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO[this.props?.dedDumSectionEnteteVO?.listDeclarationValeurDUMVO?.length - 1] : {}
      if (lastVersionDeclarationValeur && !lastVersionDeclarationValeur.traite) {
        this.setState({
          declarationValeurDescriptionEnvoi: lastVersionDeclarationValeur ? lastVersionDeclarationValeur.descriptionEnvoi : '',
          descriptionTraitementDescriptionEnvoi: lastVersionDeclarationValeur ? lastVersionDeclarationValeur.descriptionTraitement : '',
        })
      }
    // });
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  addDeclarationValeur = async () => {

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
                  disabled={this.props?.fromWhere1 === 'ded.ConsulterDum' || this.state.declarationValeurDescriptionEnvoi || this.props?.fromWhere1 === 'ded.InitTraiterValeur'}
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
              disabled={this.state.buttonLabel === 'disabled' || this.props?.fromWhere1 === 'ded.ConsulterDum'}
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
              disabled={this.state.buttonLabel === 'disabled' || this.props?.fromWhere1 === 'ded.ConsulterDum'}
              type={'solid'}
              buttonStyle={styles.buttonAction}
              onPress={() => this.addDeclarationValeur()} />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.consulterDumReducer });

export default connect(mapStateToProps, null)(DedRedressementEnteteEnvoyerTraiterValeurBlock);
