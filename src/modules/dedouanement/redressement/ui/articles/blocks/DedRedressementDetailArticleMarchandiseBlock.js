import React from 'react';
import { View } from 'react-native';
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
  Text,
  TextInput,
} from 'react-native-paper';
import { primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { getValueByPath } from '../../../utils/DedUtils';
import { request } from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import { connect } from 'react-redux';

class DedRedressementDetailArticleMarchandiseBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designationCommerciale: this.props.article?.designationCommerciale,
      paysOrigineLibelle: this.props.article?.paysOrigineLibelle,
      paysOrigine: this.props.article?.paysOrigine,
      paiement: this.props.article.paiement,
      occasion: this.props.article.occasion,
      refNgp: this.props.article.refNgp,
    }
  }
  componentDidMount() {
    // if (!this.props.edition) {
    this.getLibelleNGP();
    // }
  }

  getLibelleNGP = () => {
    // console.log('================================================== this.props.data ===============================================================');
    // console.log(JSON.stringify(this.props.data));
    // console.log('================================================== this.props.data ===============================================================');
    // console.log('================================================== this.props.article ===============================================================');
    // console.log(JSON.stringify(this.props.article));
    // console.log('================================================== this.props.article ===============================================================');
    // console.log('================================================== getLibelleNGP ===============================================================');
    // console.log('================================================== getLibelleNGP ===============================================================');
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

  update() {
    this.setState(previousState => ({
      designationCommerciale: previousState.designationCommerciale,
      paysOrigineLibelle: previousState.paysOrigineLibelle,
      paysOrigine: previousState.paysOrigine,
      paiement: previousState.paiement,
      occasion: previousState.occasion,
      refNgp: previousState.refNgp,

    }), () => {
      this.props.update({
        designationCommerciale: this.state?.designationCommerciale,
        paysOrigineLibelle: this.state?.paysOrigineLibelle,
        paysOrigine: this.state?.paysOrigine,
        paiement: this.state?.paiement,
        occasion: this.state?.occasion,
        refNgp: this.state?.refNgp,
      });
    });
  };

  handlePaysOrigineChipsChanged = (selectedPays) => {

    // { console.log('===================================================confirmer============================================================') }
    // { console.log('===================================================confirmer============================================================') }
    // console.log(JSON.stringify(selectedPays));
    // { console.log('====================================================confirmer===========================================================') }
    // { console.log('====================================================confirmer===========================================================') }
    this.setState({
      designationCommerciale: this.state?.designationCommerciale,
      paysOrigineLibelle: selectedPays?.libelle,
      paysOrigine: selectedPays?.nomPays,
      paiement: this.state?.paiement,
      occasion: this.state?.occasion,
      refNgp: this.state?.refNgp,
    });

    this.update(selectedPays);
  };

  onChangeTypeDUM = (value) => {
    console.log('onChangeTypeDUM : ' + value);
    this.setState({ paiement: value });
    this.update();
  }

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
      <View style={{ flex: 1 }}>
        <ComAccordionComp title="Marchandise" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Code NGP : "
              libelleSize={2}
              children={
                <TextInput
                  disabled={!this.props.edition}
                  type="flat"
                  label=""
                  value={this.state.refNgp}
                  onChangeText={(text) => {
                    this.setState({
                      refNgp: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
            <ComBadrKeyValueComp
              libelleSize={1}
              children={
                <Button
                  style={{ width: 100, margin: 10 }}
                  mode="contained"
                  disabled={!this.props.edition}
                  onPress={this.getLibelleNGP}
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
                  disabled={!this.props.edition}
                  label=""
                  value={this.state?.designationCommerciale}
                  onChangeText={(text) => {
                    this.setState({
                      designationCommerciale: text
                    })
                    this.update();
                  }
                  }
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
                  disabled={!this.props.edition || this.props.article?.paysOrigineLibelle}
                  // onRef={(ref) => (this.refPaysOrigine = ref)}
                  code="code"
                  selected={this.state.paysOrigineLibelle}
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

                <View style={{ flexDirection: 'row' }}>
                  <RadioButton.Group onValueChange={this.onChangeTypeDUM} value={this.state.paiement}>
                    <ComBadrKeyValueComp
                      libelle="Avec"
                      children={
                        <RadioButton
                          color={primaryColor}
                          value="true"
                          disabled={!this.props.edition}
                        />
                      }
                    />
                    <ComBadrKeyValueComp
                      libelle="Sans"
                      children={
                        <RadioButton
                          color={primaryColor}
                          value="false"
                          disabled={!this.props.edition}
                        />
                      }
                    />
                  </RadioButton.Group>

                  <ComBadrKeyValueComp
                    rtl={true}
                    libelle="Occasion"
                    disabled={true}
                    children={
                      <Checkbox
                        color={primaryColor}
                        disabled={!this.props.edition}
                        status={this.state.occasion === "false"
                          ? 'unchecked'
                          : 'checked'
                        }
                        onPress={() => {
                          this.setState({
                            occasion: this.state.occasion === "false" ? "true" : "false",
                          })
                          this.update();
                        }}
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
      this.props.dispatch(request({ type: GENERIC_DED_REQUEST, value: jsonVO }));
    }
  };

  init = () => {
    this.props.dispatch(request({ type: GENERIC_DED_INIT, value: {} }));
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
  return { ...state };
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementDetailArticleMarchandiseBlock);
