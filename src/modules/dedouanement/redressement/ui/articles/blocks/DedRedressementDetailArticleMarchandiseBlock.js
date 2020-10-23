import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {
  Button,
  Checkbox,
  Paragraph,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import {getValueByPath} from '../../../utils/DedUtils';
import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';

class DedRedressementDetailArticleMarchandiseBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getLibelleNGP();
  }

  getLibelleNGP = () => {
    let refNgp = getValueByPath('refNgp', this.props.article);
    let dateEnreRefdum = getValueByPath(
      'dedReferenceVO.dateEnregistrement_VI',
      this.props.data,
    );
    let dateHeureEffective = getValueByPath(
      'dedDumSectionEnteteVO.dateHeureEffectiveEnregistrement',
      this.props.data,
    );
    let dateEnreEntete = getValueByPath(
      'dedDumSectionEnteteVO.dateHeureEffectiveEnregistrement',
      this.props.data,
    );
    let dateCreation = getValueByPath(
      'dedReferenceVO.dateCreation_VC',
      this.props.data,
    );
    let enregistree = getValueByPath(
      'dedReferenceVO.enregistree',
      this.props.data,
    );
    let combinee = getValueByPath(
      'dedDumSectionEnteteVO.combinee',
      this.props.data,
    );
    let dateEffEnre = dateHeureEffective ? dateEnreRefdum : dateEnreRefdum;
    var data = {
      refNgp: refNgp,
      dateEffectiveEnregistrement: dateEffEnre,
      enregistree: enregistree,
      dateEnregistrement_VI: dateEnreEntete,
      dateCreation_VC: dateCreation,
      combinee: combinee,
    };
    console.log(data);
    this.callRedux({
      command: 'ded.calculerUniteNormalisee',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  render() {
    /**
     * Exemple appel redux GENERIC !!
     */
    let value = this.extractCommandData(
      'ded.calculerUniteNormalisee',
      'genericDedReducer',
    );
    let libelleNGP = '';
    if (value && value.data) {
      libelleNGP = value.data.libelleNGP;
    }
    /**
     * Exemple appel redux GENERIC !!
     */

    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Marchandise" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Code NGP : "
              libelleSize={2}
              children={
                <TextInput
                  type="flat"
                  label=""
                  value={getValueByPath('refNgp', this.props.article)}
                />
              }
            />
            <ComBadrKeyValueComp
              libelleSize={1}
              children={
                <Button
                  style={{width: 100, margin: 10}}
                  mode="contained"
                  disabled={true}
                  color={primaryColor}>
                  OK
                </Button>
              }
            />
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <Paragraph>{libelleNGP}</Paragraph>
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Designation commerciale"
              libelleSize={2}
              children={
                <TextInput
                  type="flat"
                  disabled={true}
                  label=""
                  value={getValueByPath(
                    'designationCommerciale',
                    this.props.article,
                  )}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Pays d'origine"
              libelleSize={2}
              children={
                <ComBadrAutoCompleteChipsComp
                  disabled={true}
                  onRef={(ref) => (this.refPaysOrigine = ref)}
                  code="code"
                  selected={getValueByPath(
                    'paysOrigineLibelle',
                    this.props.article,
                  )}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbPays"
                  paramName="libellePays"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handlePaysOrigineChipsChanged}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Paiement"
              libelleSize={0.7}
              children={
                <View style={{flexDirection: 'row'}}>
                  <ComBadrKeyValueComp
                    libelle="Avec"
                    children={
                      <RadioButton
                        color={primaryColor}
                        value="Avec"
                        disabled={true}
                        status={
                          this.props.article.paiement ? 'checked' : 'unchecked'
                        }
                      />
                    }
                  />
                  <ComBadrKeyValueComp
                    libelle="Sans"
                    children={
                      <RadioButton
                        color={primaryColor}
                        value="Sans"
                        disabled={true}
                        status={
                          !this.props.article.paiement ? 'checked' : 'unchecked'
                        }
                      />
                    }
                  />

                  <ComBadrKeyValueComp
                    rtl={true}
                    libelle="Occasion"
                    disabled={true}
                    children={
                      <Checkbox
                        color={primaryColor}
                        disabled={true}
                        status={
                          getValueByPath('occasion', this.props.article)
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    }
                  />
                </View>
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }

  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      console.log('calling redux ...');
      this.props.dispatch(request({type: GENERIC_DED_REQUEST, value: jsonVO}));
    }
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_DED_INIT, value: {}}));
  };

  extractCommandData = (command, reducerName) => {
    return this.props[reducerName] && this.props[reducerName].picker
      ? this.props[reducerName].picker[command]
      : null;
  };

  /**
   * end
   * Redux
   */
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementDetailArticleMarchandiseBlock);
