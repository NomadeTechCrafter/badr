import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import {
  ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrButtonComp, ComBadrKeyValueComp,
  ComBadrLibelleComp
} from '../../../../../../commons/component';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import ComUtils from '../../../../../../commons/utils/ComUtils';
import DedRedressementRow from '../../common/DedRedressementRow';

export default class DedRedressementDetailPreapDsBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  handleTypeDsChanged = (typeDS) => {
    console.log('typeDS');
    console.log(typeDS);
    let selectedItem = { ...this.props.selectedItem, typeDS: typeDS.code };
    this.props.update(selectedItem);
  };
  handleLieuChargementChanged = (localLieuChargement) => {
    let selectedItem = {
      ...this.props.selectedItem,
      descLieuChargement: localLieuChargement?.libelle,
      lieuChargement: localLieuChargement?.code
    };
    this.props.update(selectedItem);
  };



  addZeros = (input, maxLength) => {
    return _.padStart(input, maxLength, '0');

  };
  onChangeInput = (input,update) => {
    let keyImput = _.keys(input)[0];
    let selectedItem = {
      ...this.props.selectedItem,
      [keyImput]: input[keyImput].replace(/[^0-9]/g, '')
    };
    if (update) {
      this.props.update(selectedItem);
    }
  }

  onChangeReferenceLot = (value, update) => {
    let selectedItem = {
      ...this.props.selectedItem,
      referenceLot: value
    };
    if (update) {
      this.props.update(selectedItem);
    }
  }

  retablir = () => { 
    this.lieuChargement.clearInput();
    this.props.retablir();
  }
  onChangeInputCle = (cle) => {
    let selectedItem = {
      ...this.props.selectedItem,
      preapCle: cle.replace(/[^A-Za-z]/g, '') 
    };
    this.props.update(selectedItem);
  };

  render() {
    console.log('this.props.selectedItem : ', this.props.selectedItem);
    const { selectedItem } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp
          title={translate('dedouanement.peapurementds.preapnum') + this.props.selectedItem.numeroOrdre}
          expanded={true}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Type DS : "
              libelleSize={1}
              children={
                <ComBadrReferentielPickerComp
                  disabled={this.props.readOnly}
                  selected={{
                    code: this.props.selectedItem?.typeDS
                  }}
                  onRef={(ref) => (this.combo2 = ref)}
                  onValueChanged={this.handleTypeDsChanged}
                  command="getCmbTypeDs"
                  typeService="SP"
                  code="code"
                  libelle="libelle"
                />
              }
            />
          </DedRedressementRow>

          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('ecorimport.declarationSommaire.referenceDeclaration')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.bureau')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.regime')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.annee')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.serie')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.cle')}
              </ComBadrLibelleComp>
            </Col>
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2} />
            <Col size={2}>
              <TextInput
                type="flat"
                label=""
                disabled={this.props.readOnly}
                keyboardType={'number-pad'}
                maxLength={3}
                value={this.props.selectedItem?.preapBureau}
                onChangeText={(val) => this.onChangeInput({ preapBureau: val })}
                onEndEditing={(event) => {
                  let value = this.addZeros(event.nativeEvent.text,
                    3);
                  this.onChangeInput({ preapBureau: value },true)
                }
                }
              />
            </Col>
            <Col size={2}>
              <TextInput
                type="flat"
                label=""
                keyboardType={'number-pad'}
                disabled={this.props.readOnly}
                maxLength={3}
                value={this.props.selectedItem?.preapRegime}
                onChangeText={(val) => this.onChangeInput({ preapRegime: val })}
                onEndEditing={(event) => {
                  let value = this.addZeros(event.nativeEvent.text,
                    3);
                  this.onChangeInput({ preapRegime: value }, true)
                }
                }
              />
            </Col>
            <Col size={2}>
              <TextInput
                type="flat"
                label=""
                keyboardType={'number-pad'}
                disabled={this.props.readOnly}
                maxLength={4}
                value={this.props.selectedItem?.preapAnnee}
                onChangeText={(val) => this.onChangeInput({ preapAnnee: val })}
                onEndEditing={(event) => {

                  this.onChangeInput({ preapAnnee: event.nativeEvent.text }, true)
                }
                }
              />
            </Col>
            <Col size={2}>
              <TextInput
                type="flat"
                label=""
                keyboardType={'number-pad'}
                disabled={this.props.readOnly}
                maxLength={7}
                value={this.props.selectedItem?.preapSerie}
                onChangeText={(val) => this.onChangeInput({ preapSerie: val })}
                onEndEditing={(event) => {
                  let value = this.addZeros(event.nativeEvent.text,
                    7);
                  this.onChangeInput({ preapSerie: value }, true)
                }
                }
              />
            </Col>
            <Col size={1}>

              {!this.props.readOnly && <TextInput
                type="flat"
                label=""
                maxLength={1}
                autoCapitalize={'characters'}
                value={this.props.selectedItem?.preapCle}
                onChangeText={(val) => this.onChangeInputCle(val)}

              />}
              {this.props.readOnly && <TextInput
                type="flat"
                label=""
                disabled={true}
                value={ComUtils.cleDS(
                  ComUtils.getValueByPath('preapRegime', selectedItem) +
                  ComUtils.getValueByPath('preapSerie', selectedItem) +
                  ComUtils.getValueByPath('preapAnnee', selectedItem),
                )}
              />}
            </Col>
          </Row>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle={"Lieu de chargement : " +this.props.selectedItem.lieuChargement}
              libelleSize={1}
              children={

                <ComBadrAutoCompleteChipsComp
                  disabled={this.props.readOnly}
                  onRef={(ref) => (this.lieuChargement = ref)}
                  code="code"
                  selected={!_.isEmpty(this.props.selectedItem.lieuChargement) ? this.props.selectedItem?.descLieuChargement + '(' + this.props.selectedItem?.lieuChargement + ')' : ''}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbLieuChargement"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handleLieuChargementChanged}
                />
              }
            />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Référence lot : "
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={this.props.readOnly}
                  maxLength={17}
                  value={this.props.selectedItem?.referenceLot}
                  onChangeText={(val) => this.onChangeReferenceLot( val )}
                  onEndEditing={(event) => {
                    this.onChangeReferenceLot( event.nativeEvent.text , true)
                  }
                  }
                />
              }
            />
          </DedRedressementRow>
          {!this.props.readOnly && <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => (this.props.validerReference())}
              text={translate('transverse.Ok')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.retablir()
              }}
              text={translate('transverse.retablir')}
            />

            <View style={{ width: 10 }} />
          </Row>}
        </ComAccordionComp>
      </View>
    );
  }
}
