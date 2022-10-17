import React from 'react';
import {View} from 'react-native';
import {
  ComBadrButtonComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrDatePickerComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import ComBadrPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrPickerComp';
import _ from 'lodash';
import moment from 'moment';
export default class DedRedressementDetailImputationTCManuelleBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem,

      referenceVo: this.props.referenceVo,
    };
  }
  handleBanqueChanged = (item) => {
    let selectedItem = {...this.state.selectedItem};

    selectedItem.banque = item?.code;
    selectedItem.agenceTitre = ' ';
    selectedItem.banqueTitre = item.libelle;
    this.setState({
      selectedItem: selectedItem,
    });

    this.refAgenceBanque.refresh(
      {
        codeBanque: item.code,
      },
      this.refBanque,
    );
  };
  handleAgenceChanged = (selectedValue, selectedIndex, item) => {
    let selectedItem = {...this.state.selectedItem};

    if (!_.isUndefined(item)) {
      selectedItem.agenceTitre = item.libelle;
      this.setState({
        selectedItem: selectedItem,
      });
      /*this.refTitresProv.refresh({
                idOperateur: this.state.referenceVo?.idOperateurEngage,
                codeRegime: this.state.referenceVo?.reference.substring(3, 6),
                dateValidite: this.state.referenceVo?.dateValidite,
                typeTitreChange: item.code,
            }, this.refAgenceBanque);*/
    }
  };
  handleQteChanged = (selectedValue, selectedIndex, item) => {
    let selectedItem = {...this.state.selectedItem};
    if (!_.isUndefined(item)) {
      selectedItem.codeQuantiteImputee = item.code;
      this.setState({
        selectedItem: selectedItem,
      });
    }
  };
  handleDeviseChanged = (selectedValue, selectedIndex, item) => {
    let selectedItem = {...this.state.selectedItem};
    console.log('referencevo', this.state.referenceVo);
    if (!_.isUndefined(item)) {
      selectedItem.devise = item.code;
      selectedItem.deviseLibelle = item.libelle;
      this.setState({
        selectedItem: selectedItem,
      });
    }
  };
  handleTitreChanged = (selectedValue, selectedIndex, item) => {
    let selectedItem = {...this.state.selectedItem};
    if (!_.isUndefined(item)) {
      selectedItem.dateEnregistrementTitre = item.dateEnregistrementTitre
        ? moment(item.dateEnregistrementTitre).format('DD/MM/YYYY')
        : '';
      selectedItem.devise = item.codeDevise;
    }

    this.setState({
      selectedItem: selectedItem,
    });
  };

  handleTypeTCChanged = (selectedValue, selectedIndex, item) => {
    console.log('type : ', JSON.stringify(item?.code));
    console.log('type : ', JSON.stringify(item?.libelle));
    let selectedItem = {...this.state.selectedItem};
    if (!_.isUndefined(item)) {
      selectedItem.typeTitreChange = item.code;
      selectedItem.identifiant = '';
      selectedItem.dateEnregistrementTitre = '';
      selectedItem.dateEcheanceTitre = '';
      selectedItem.devise = ' ';
      selectedItem.agenceTitre = ' ';
      selectedItem.banqueTitre = ' ';
      selectedItem.banque = ' ';
      /* if (!_.isUndefined(libelle)) {
                         selectedItem[libelle]=type.libelle
                     }*/
      //  alert(JSON.stringify(selectedItem))
      this.setState({
        selectedItem: selectedItem,
      });

      console.log('newselected', JSON.stringify(selectedItem));
      // this.props.update(selectedItem);
    }
  };
  componentDidMount() {}

  render() {
    const {selectedItem} = this.props;
    return (
      <View style={{flex: 1}}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Type : "
            libelleSize={1}
            children={
              <ComBadrPickerComp
                disabled={false}
                onRef={(ref) => (this.refTypeTC = ref)}
                cle="code"
                selected={this.state.selectedItem.typeTitreChange}
                libelle="libelle"
                command="listeTypeTCByDate"
                module="REF_LIB"
                typeService="SP"
                storeWithKey="code"
                storeLibelleWithKey="libelle"
                onValueChange={(selectedValue, selectedIndex, item) =>
                  this.handleTypeTCChanged(selectedValue, selectedIndex, item)
                }
                param={{
                  codeRegime: this.state.referenceVo?.reference.substring(3, 6),
                  dateValidite: this.state.referenceVo?.dateValidite,
                }}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Banque"
            libelleSize={1}
            children={
              /* <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('banque', this.state.selectedItem)}
              />*/
              <ComBadrKeyValueComp
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={false}
                    onRef={(ref) => (this.refBanque = ref)}
                    maxItems={3}
                    code="code"
                    command="getCmbBanque"
                    paramName="libelleBanque"
                    libelle="libelle"
                    selected={getValueByPath(
                      'banqueTitre',
                      this.state.selectedItem,
                    )}
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleBanqueChanged}
                  />
                }
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Agence"
            libelleSize={1}
            children={
              /*<TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath(
                  'agenceBancaire',
                  this.state.selectedItem,
                )}
              />*/
              <ComBadrPickerComp
                disabled={false}
                onRef={(ref) => (this.refAgenceBanque = ref)}
                cle="code"
                selected={getValueByPath(
                  'agenceBancaire',
                  this.state.selectedItem,
                )}
                libelle="libelle"
                command="getCmbAgenceBancaireParBanque"
                module="REF_LIB"
                typeService="SP"
                storeWithKey="code"
                storeLibelleWithKey="libelle"
                onValueChange={(selectedValue, selectedIndex, item) =>
                  this.handleAgenceChanged(selectedValue, selectedIndex, item)
                }
                param={{
                  codeBanque: this.state.selectedItem?.banque,
                }}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Titre de change : "
            libelleSize={1}
            children={
              <ComBadrPickerComp
                disabled={true}
                onRef={(ref) => (this.refTitresProv = ref)}
                cle="identifiant"
                selected={this.state.selectedItem.identifiantTitre}
                libelle="numeroTitreChange"
                command="getListTitresChangesByOperateur"
                module="TC_LIB"
                typeService="SP"
                storeWithKey="identifiant"
                storeLibelleWithKey="numeroTitreChange"
                onValueChange={(selectedValue, selectedIndex, item) =>
                  this.handleTitreChanged(selectedValue, selectedIndex, item)
                }
                param={{
                  idOperateur: this.state.referenceVo?.idOperateurEngage,
                  codeRegime: this.state.referenceVo?.reference.substring(3, 6),
                  dateValidite: this.state.referenceVo?.dateValidite,
                  typeTitreChange: this.state.selectedItem.typeTitreChange,
                }}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Date d'enregistrement : "
            libelleSize={2}
            children={
              /* <TextInput
                              type="flat"
                              label=""
                              disabled={false}
                              value={getValueByPath('dateEnregistrementTitre', selectedItem)}
                            />*/
              <ComBadrDatePickerComp
                dateFormat="DD/MM/YYYY"
                value={
                  getValueByPath(
                    'dateEnregistrementTitre',
                    this.state.selectedItem,
                  )
                    ? moment(
                        getValueByPath(
                          'dateEnregistrementTitre',
                          this.state.selectedItem,
                        ),
                        'DD/MM/yyyy',
                        true,
                      )
                    : ''
                }
                labelDate={'Date enregitrement :'}
                //  inputStyle={style.textInputsStyle}
                onDateChanged={
                  (date) =>
                    this.setState({
                      selectedItem: {
                        ...this.state.selectedItem,
                        dateEnregistrementTitre: date,
                      },
                    })
                  //   this.handleTypeTCChanged(date,'dateEnregistrementTitre')
                }
              />
            }
          />
        </DedRedressementRow>

        {/*block Quantité et valeur*/}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Quantité et valeur'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Quantité à imputer: "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={false}
                value={getValueByPath(
                  'quantiteImputee',
                  this.state.selectedItem,
                )}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="code quantité: "
            libelleSize={2}
            children={
              /* <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath(
                  'codeQuantiteImputee',
                  this.state.selectedItem,
                )}
              />*/
              <ComBadrPickerComp
                disabled={false}
                onRef={(ref) => (this.refQtyProv = ref)}
                cle="code"
                selected={getValueByPath(
                  'codeQuantiteImputee',
                  this.state.selectedItem,
                )}
                libelle="libelle"
                command="getCmbUniteQuantite"
                module="REF_LIB"
                typeService="SP"
                storeWithKey="code"
                storeLibelleWithKey="libelle"
                onValueChange={(selectedValue, selectedIndex, item) =>
                  this.handleQteChanged(selectedValue, selectedIndex, item)
                }
                param={{
                  codeUniteQuantite: null,
                  libelleUniteQuantite: null,
                }}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Valeur à imputer: "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                value={getValueByPath('valeurImputee', this.state.selectedItem)}
                onChangeText={(text) =>
                  this.setState({
                    selectedItem: {
                      ...this.state.selectedItem,
                      valeurImputee: text,
                    },
                  })
                }
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Devise: "
            libelleSize={2}
            children={
              /* <TextInput
                type="flat"
                label=""
                disabled={true}
                onChangeText={(newText) => setText(newText)}
                value={getValueByPath('devise', this.state.selectedItem)}
              />*/

              <ComBadrAutoCompleteChipsComp
                onRef={(ref) => (this.refDeviseFacture = ref)}
                code="code"
                selected={getValueByPath('devise', this.state.selectedItem)}
                maxItems={3}
                libelle="libelle"
                command="getCmbDevise"
                paramName="libelleDevise"
                onDemand={true}
                searchZoneFirst={false}
                onValueChange={(selectedValue, selectedIndex, item) =>
                  this.handleDeviseChanged(selectedValue, selectedIndex, item)
                }
              />
            }
          />
        </DedRedressementRow>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <ComBadrButtonComp
            style={{width: 100}}
            onPress={() => {
              this.props.update(this.state.selectedItem);
            }}
            text={translate('transverse.confirmer')}
            //  disabled={this.state.decisionControle ? false : true}
          />
        </View>
      </View>
    );
  }
}
