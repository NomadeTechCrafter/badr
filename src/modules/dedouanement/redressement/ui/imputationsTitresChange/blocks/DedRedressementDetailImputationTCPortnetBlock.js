import React from 'react';
import {View} from 'react-native';
import {
    ComBadrButtonComp,
    ComBadrDatePickerComp,
    ComBadrKeyValueComp,
    ComBadrLibelleComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';
import {Col, Row} from 'react-native-easy-grid';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';

import ComBadrPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrPickerComp';
import moment from 'moment';
import _ from 'lodash';
import translate from '../../../../../../commons/i18n/ComI18nHelper';

export default class DedRedressementDetailImputationTCPortnetBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem,

      referenceVo: this.props.referenceVo,
    };
  }

  componentDidMount() {}
  handleTypeTCChanged = (selectedValue, selectedIndex, item) => {
        console.log('type : ', JSON.stringify(item?.code));
        console.log('type : ', JSON.stringify(item?.libelle));
        let selectedItem = { ...this.state.selectedItem};
        if (!_.isUndefined(item)) {

            selectedItem['typeTitreChange']=item.code
            selectedItem['identifiant']=""
            selectedItem['numeroTitreChange']=" "
            selectedItem['dateEnregistrementTitre']=""
            selectedItem['dateEcheanceTitre']=""
            selectedItem['devise']=" "
            selectedItem['montantTotalTitre']=" "
            selectedItem['soldeMontantTitre']=" "
            selectedItem['agenceTitre']=" "
            selectedItem['banqueTitre']=" "
            selectedItem['banque']=" "
            selectedItem['incotermTitre']=" "
           /* if (!_.isUndefined(libelle)) {
                selectedItem[libelle]=type.libelle
            }*/
          //  alert(JSON.stringify(selectedItem))
            this.setState({
                selectedItem: selectedItem
            });

            this.refTitresProv.refresh({
                idOperateur: this.state.referenceVo?.idOperateurEngage,
                codeRegime: this.state.referenceVo?.reference.substring(3, 6),
                dateValidite: this.state.referenceVo?.dateValidite,
                typeTitreChange: item.code,
            }, this.refTypeTC);

console.log('newselected',JSON.stringify(selectedItem))
           // this.props.update(selectedItem);
        }
    };
    handleTitreChanged = (selectedValue,
                           selectedIndex,
                           item,) => {

        let selectedItem = { ...this.state.selectedItem};
        if (!_.isUndefined(item)) {

            selectedItem['identifiant']=item.code
            selectedItem['numeroTitreChange']=item.libelle
            selectedItem['dateEnregistrementTitre']=item.dateDebutValidite?moment(item.dateDebutValidite).format("DD/MM/YYYY"):""
            selectedItem['dateEcheanceTitre']=item.dateFinValidite?moment(item.dateFinValidite).format("DD/MM/YYYY"):""
            selectedItem['devise']=item.codeDevise
            selectedItem['montantTotalTitre']=item.montantTotal
            selectedItem['soldeMontantTitre']=item.montantSolde
            selectedItem['agenceTitre']=item.libelleAgence
            selectedItem['banqueTitre']=item.libelleBanque
            selectedItem['banque']=item.codeBanque
            selectedItem['incotermTitre']=item.libelleIncoterm

            /* if (!_.isUndefined(libelle)) {
                 selectedItem[libelle]=type.libelle
             }*/


           /* this.refMarchandiseProv.refresh({
                idTitreChange: this.state.selectedItem?.identifiantTitre,
            }, this.refTitresProv);*/
            console.log('newselected',JSON.stringify(selectedItem))
          //  this.props.update(selectedItem);
        }

        this.setState({
            selectedItem: selectedItem
        });
    };

    handleMarchandiseChanged = (selectedValue,
                          selectedIndex,
                          item,) => {
console.log('marchandiseitem',JSON.stringify(item.poidsNet))
        let selectedItem = { ...this.state.selectedItem};
        if (!_.isUndefined(item)) {

            selectedItem['marchandiseCode']=item.code
            selectedItem['codeNGPPaysPortNet']=item.libelle
            selectedItem['poidsNetTitre']=item.poidsNet?.toString()
            selectedItem['soldePoidsNetTitre']=item.soldeQuantite?.toString()
            selectedItem['valeurImputee']=""

            /* if (!_.isUndefined(libelle)) {
                 selectedItem[libelle]=type.libelle
             }*/
            this.setState({
                selectedItem: selectedItem
            });


            console.log('newselected',JSON.stringify(selectedItem))
          //  this.props.update(selectedItem);
        }
    };
  render() {
  //  const {selectedItem, referenceVo} = this.props;
    console.log('selected item', this.state.selectedItem);
    return (
      <View style={{flex: 1}}>
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Réference du titre à changer'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Type : "
            libelleSize={1}
            children={
              <ComBadrKeyValueComp
                //  libelle="Pays de provenance"
                children={
                  /*<ComBadrAutoCompleteChipsComp
                    disabled={false}
                    onRef={(ref) => (this.refPaysProv = ref)}
                    code="code"
                    selected={selectedItem.typeTitreChange}
                    // maxItems={3}
                    libelle="libelle"
                    command="listeTypeTCByDate"
                    paramName="codeRegime,dateValidite"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysProvChipsChanged}
                    params={{
                      codeRegime: referenceVo?.reference.substring(3, 6),
                      dateValidite: referenceVo?.dateValidite,
                    }}
                  />*/
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
                    onValueChange={(selectedValue, selectedIndex, item) => this.handleTypeTCChanged(selectedValue,
                        selectedIndex,
                        item,)}

                    param={{
                      codeRegime: this.state.referenceVo?.reference.substring(3, 6),
                      dateValidite: this.state.referenceVo?.dateValidite,
                    }}
                  />
                }
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Titre de change : "
            libelleSize={1}
            children={
              /*<ComBadrAutoCompleteChipsComp
                disabled={false}
                onRef={(ref) => (this.refPaysProv = ref)}
                code="code"
                selected={getValueByPath('numeroTitreChange', selectedItem)}
                // maxItems={3}
                libelle="libelle"
                module={'TC_LIB'}
                command="getListTitresChangesByOperateur"
                paramName="idOperateur,codeRegime,dateValidite,typeTitreChange"
                onDemand={true}
                searchZoneFirst={false}
                onValueChange={this.handlePaysProvChipsChanged}
                params={{
                  idOperateur: referenceVo?.idOperateurEngage,
                  codeRegime: referenceVo?.reference.substring(3, 6),
                  dateValidite: referenceVo?.dateValidite,
                  typeTitreChange: selectedItem.typeTitreChange,
                }}
              />*/
              <ComBadrPickerComp
                disabled={false}
                onRef={(ref) => (this.refTitresProv = ref)}
                cle="identifiant"
                selected={this.state.selectedItem.identifiantTitre}
                libelle="numeroTitreChange"
                command="getListTitresChangesByOperateur"
                module="TC_LIB"
                typeService="SP"
                storeWithKey="identifiant"
                storeLibelleWithKey="numeroTitreChange"
                onValueChange={(selectedValue, selectedIndex, item) => this.handleTitreChanged(selectedValue,
                        selectedIndex,
                        item,)}

                param={{
                  idOperateur: this.state.referenceVo?.idOperateurEngage,
                  codeRegime: this.state.referenceVo?.reference.substring(3, 6),
                  dateValidite: this.state.referenceVo?.dateValidite,
                  typeTitreChange: this.state.selectedItem.typeTitreChange,
                }}
              />
              /*<TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('numeroTitreChange', selectedItem)}
              />*/
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Banque"
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('banqueTitre', this.state.selectedItem)
                }
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Agence"
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('agenceTitre', this.state.selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Date début validté : "
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
                  getValueByPath('dateEnregistrementTitre', this.state.selectedItem)
                    ? moment(
                        getValueByPath('dateEnregistrementTitre', this.state.selectedItem),
                        'DD/MM/yyyy',
                        true,
                      )
                    : ''
                }
                labelDate={'Date début validté :'}
              //  inputStyle={style.textInputsStyle}
                onDateChanged={(date) =>
                    this.setState({ selectedItem:{...this.state.selectedItem,dateEnregistrementTitre:date}})
           //   this.handleTypeTCChanged(date,'dateEnregistrementTitre')
            }
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Date d'échance : "
            libelleSize={2}
            children={
             /* <TextInput
                type="flat"
                label=""
                disabled={false}
                value={getValueByPath('dateEcheanceTitre', selectedItem)}
              />*/
                <ComBadrDatePickerComp
                    dateFormat="DD/MM/YYYY"
                    value={
                        getValueByPath('dateEcheanceTitre', this.state.selectedItem)
                            ? moment(
                                getValueByPath('dateEcheanceTitre', this.state.selectedItem),
                                'DD/MM/yyyy',
                                true,
                            )
                            : ''
                    }
                    labelDate={'Date d\'échance : '}
                    //  inputStyle={style.textInputsStyle}
                    onDateChanged={(date) =>
                        this.setState({ selectedItem:{...this.state.selectedItem,dateEcheanceTitre:date}})
                }
                />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="valeur Total: "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('montantTotalTitre', this.state.selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Devise : "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                onChangeText={newText => setText(newText)}
                value={getValueByPath('devise', this.state.selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Solde valeur: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('soldeMontantTitre', this.state.selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Incoterme : "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('incotermTitre', this.state.selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        {/*block Marchandise*/}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Marchandise'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Marchandise : "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('marchandiseCode', this.state.selectedItem)}
              />
               /* <ComBadrPickerComp
                    disabled={false}
                    onRef={(ref) => (this.refMarchandiseProv = ref)}
                    cle="codeMarchandise"
                    selected={getValueByPath('marchandiseCode', this.state.selectedItem)}
                    libelle="codeNGPPays"
                    command="ded.getListMarchandises"
                    module="DED_LIB"
                    typeService="SP"
                    storeWithKey="codeMarchandise"
                    storeLibelleWithKey="codeNGPPays"
                    onValueChange={(selectedValue, selectedIndex, item) => this.handleMarchandiseChanged(selectedValue,
                        selectedIndex,
                        item,)}
                    param={{
                        idTitreChange: this.state.selectedItem?.identifiantTitre,

                    }}
                />*/
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Poids Net (KG): "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('poidsNetTitre', this.state.selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Solde Poids (KG): "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('soldePoidsNetTitre', this.state.selectedItem)}
              />
            }
          />
        </DedRedressementRow>

        {/*block Imputation*/}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Imputation'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Poids (KG) : "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('quantiteImputee', this.state.selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Valeur: "
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""

                value={getValueByPath('valeurImputee', this.state.selectedItem)}
                onChangeText={(text) => this.setState({ selectedItem:{...this.state.selectedItem,valeurImputee:text}})}


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
