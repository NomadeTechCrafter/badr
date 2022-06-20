import React from 'react';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import {IconButton} from 'react-native-paper';
import {Alert, View} from 'react-native';
import {
  callLiquidationUpdateRedux,
  callRedux,
} from '../../../../utils/LiqUtils';

export default class LiqManuelleListeTaxesGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listeTaxesGlobales: [],
    };
  }

  componentDidMount() {
    console.log('componentDidMount ListeTaxesGlobales');
    this.getListeTaxesGlobales(this.props.data);
  }

  loadListeTaxesGlobale = (refLignesRubriqueOperation, consignation) => {
    console.log('refLignesRubriqueOperation', refLignesRubriqueOperation);
    refLignesRubriqueOperation.map((item, key) => {
      if (item.indicateurLiquidationGlobale == 'true') {
        this.setState({
          listeTaxesGlobales: [
            ...this.state.listeTaxesGlobales,
            {
              codeRubriqueComptable: item.refRubriqueComptable,
              libelleAbrege: item.refRubriqueComptableLibelle,
              codeDouane: item.refRubriqueComptableCode,
              montantDH:
                item.montantConsigne != '0.0'
                  ? item.montantConsigne
                  : item.montantLiquide,
              consignation: consignation,
            },
          ],
        });
      }
    });
    // setListeTaxesGlobales(listeTaxesGlobales);
    console.log('listeTaxesGlobales', this.state.listeTaxesGlobales);
  };

  getListeTaxesGlobales = (data) => {
    console.log(' ---------getListeTaxesGlobales----------');
    if (data) {
      console.log(' ---------data----------', data);
      if (data.refLignesRubriqueOperation) {
        this.loadListeTaxesGlobale(data.refLignesRubriqueOperation, false);
      }
      if (
        data.refOperationSimultanee &&
        data.refOperationSimultanee.refLignesRubriqueOperation
      ) {
        this.loadListeTaxesGlobale(
          data.refOperationSimultanee.refLignesRubriqueOperation,
          true,
        );
      }
    }
  };

  editRubriquesComptables = (item, index) => {
    this.props.editRubriquesComptables(item, index);
    let listTaxes = [...this.state.listeTaxesGlobales];
    listTaxes[index] = this.props.ligneRubrique;
    this.setState({
      listeTaxesGlobales: listTaxes,
    });
  };

  deleteRubriquesComptables = (item, index) => {
    Alert.alert('Remove', 'Êtes-vous sûr de vouloir supprimer cela?', [
      {
        text: 'Yes',
        onPress: () => {
          let listeTaxes = [...this.state.ListeTaxesGlobales];
          listeTaxes.splice(index, 1);
          this.setState({
            ListeTaxesGlobales: listeTaxes,
          });
          callRedux(
            this.props,
            {
              command: 'supprimerTaxeGlobale',
              typeService: 'UC',
              jsonVO: item,
            },
            null,
          );
          callLiquidationUpdateRedux(this.props, {
            command: 'supprimerTaxeGlobale',
            typeService: 'UC',
            jsonVO: item,
          });
        },
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  render() {
    const {listeTaxesGlobales} = this.state;
    return (
      <View>
        {listeTaxesGlobales.map((item, index) => (
          <Row
            key={index}
            style={
              index % 2 === 0
                ? CustomStyleSheet.whiteRow
                : CustomStyleSheet.lightBlueRow
            }>
            <Col size={1} />
            <Col size={2} style={{textAlign: 'center'}}>
              <ComBadrLibelleComp>{item.codeDouane}</ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>{item.montantDH}</ComBadrLibelleComp>
            </Col>
            <Col size={2} style={{textAlign: 'center'}}>
              <ComBadrLibelleComp style={{color: 'red'}}>
                {item.consignation && 'Consignation'}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <IconButton
                icon="pencil-outline"
                color={'white'}
                size={20}
                style={{backgroundColor: primaryColor}}
                onPress={() => this.editRubriquesComptables(item, index)}
              />
            </Col>
            <Col size={1}>
              <IconButton
                icon="trash-can-outline"
                color={'white'}
                size={20}
                style={{backgroundColor: primaryColor}}
                onPress={() => this.deleteRubriquesComptables(item, index)}
              />
            </Col>
          </Row>
        ))}
      </View>
    );
  }
}
