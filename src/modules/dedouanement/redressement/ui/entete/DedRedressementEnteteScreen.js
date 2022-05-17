import React from 'react';
import { ScrollView, Text, View } from "react-native";
import DedRedressementInfoCommon from '../common/DedRedressementInfoCommon';
import DedRedressementEnteteVersionBlock from './blocks/DedRedressementEnteteVersionBlock';
import DedRedressementEnteteInfoBlock from './blocks/DedRedressementEnteteInfoBlock';
import DedRedressementEnteteDeclarantOpeBlock from './blocks/DedRedressementEnteteDeclarantOpeBlock';
import DedRedressementEnteteFacturePaiementBlock from './blocks/DedRedressementEnteteFacturePaiementBlock';
import DedRedressementEnteteLocalisationMarchandiseBlock from './blocks/DedRedressementEnteteLocalisationMarchandiseBlock';
import DedRedressementEnteteDocumentPrecedentBlock from './blocks/DedRedressementEnteteDocumentPrecedentBlock';
import DedRedressementEnteteAccordFranchiseBlock from './blocks/DedRedressementEnteteAccordFranchiseBlock';
import DedRedressementEnteteTransbordementBlock from './blocks/DedRedressementEnteteTransbordementBlock';
import { connect } from 'react-redux';
import { getValueByPath } from '../../utils/DedUtils';
import DedRedressementEnteteEnvoyerTraiterValeurBlock from './blocks/DedRedressementEnteteEnvoyerTraiterValeurBlock';
import { IconButton, Button } from 'react-native-paper';
import {
  ComAccordionComp,
  ComBasicDataTableComp
} from '../../../../../commons/component';
import translate from "../../../../../commons/i18n/ComI18nHelper";
import styles from '../../style/DedRedressementStyle';
import DedRedressementRow from '../common/DedRedressementRow';
import dedUpdateRedressementAction from '../../state/actions/dedUpdateRedressementAction';
import { REDRESSEMENT_UPDATE } from '../../state/DedRedressementConstants';
import { Col, Grid, Row } from 'react-native-easy-grid';


class DedRedressementEnteteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.composantTablesColsD17D20 = this.buildComposantsColumnsD17D20();
    this.state = {

      dedDumVo: this.props.data

    };
  }

  componentDidMount() {
    // console.log('..........................................................................................................');
    // console.log('..........................................................................................................');
    // console.log('..........................................................................................................');

    // console.log(JSON.stringify(this.props));

    // console.log('..........................................................................................................');
    // console.log('..........................................................................................................');
    // console.log('..........................................................................................................');
  }

  buildComposantsColumnsD17D20 = () => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.reference'),
        width: 180,
      },
      {
        code: 'dateCreation',
        libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.dateCreation'),
        width: 180,
      },
      {
        code: 'numeroVersionCourante',
        libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.numeroVersion'),
        width: 180,
      },
    ];
  };

  updateRedressement = (data) => {
    let action = dedUpdateRedressementAction.update(
      {
        type: REDRESSEMENT_UPDATE,
        value: data,


      },

    );

    this.props.dispatch(action);


  }

  redirectToConsultationDUM(navigation) {
    navigation.navigate('LiquidationHomeScreen', {});
  };

  render() {
    let listD17D20 = this.props.data?.dedDumSectionEnteteVO?.declarationsTryptique ? this.props.data?.dedDumSectionEnteteVO?.declarationsTryptique : [];
    let isRedressementDUM = this.props.isRedressementDUM;
    // console.log('-----------------------------isRedressementDUM 13022022 :', isRedressementDUM)
    // console.log('---------------------------------------------------------------------');
    // console.log('---------------------------------------------------------------------');
    // console.log('---------------------------------------------------------------------');
    // console.log(JSON.stringify(this.props));
    // console.log('---------------------------------------------------------------------');
    // console.log('---------------------------------------------------------------------');
    return (
      <ScrollView>
        {this.props.data && (
          <View style={{ flex: 1 }}>
            <DedRedressementInfoCommon
              searchData={getValueByPath(
                'dedReferenceVO',
                this.props.data,
              )}
              data={this.props.data}
            />
            {this.props.fromLiquidation && (
              <Grid style={styles.row}>
                <Row>
                  <Col />
                  <Col>
                    <Button
                      mode="contained"
                      icon="check"
                      compact="true"
                      onPress={this.redirectToConsultationDUM.bind(this, this.props.navigation)}
                    >
                      {translate('transverse.returnToLiauidqtion')}
                    </Button>
                  </Col>
                  <Col />
                </Row>
              </Grid>
            )}
            <DedRedressementEnteteVersionBlock
              data={this.state.dedDumVo}
              dedDumSectionEnteteVO={this.state.dedDumVo?.dedDumSectionEnteteVO}
              update={this.updateRedressement}
              readOnly={!isRedressementDUM}
            />
            {/* <DedRedressementEnteteInfoBlock
              data={this.props.data}
              dedDumSectionEnteteVO={getValueByPath(
                'dedDumSectionEnteteVO',
                this.props.data,
              )}
            /> */}
            <DedRedressementEnteteDeclarantOpeBlock
              data={this.state.dedDumVo}
              dedDumSectionEnteteVO={this.state.dedDumVo?.dedDumSectionEnteteVO}
              update={this.updateRedressement}
              readOnly={!isRedressementDUM}
            />
            <DedRedressementEnteteFacturePaiementBlock
              data={this.props.data}
              dedDumSectionEnteteVO={getValueByPath(
                'dedDumSectionEnteteVO',
                this.props.data,
              )}
            />
            <DedRedressementEnteteLocalisationMarchandiseBlock
              data={this.props.data}
              dedDumSectionEnteteVO={getValueByPath(
                'dedDumSectionEnteteVO',
                this.props.data,
              )}
            />
            <DedRedressementEnteteEnvoyerTraiterValeurBlock
              navigation={this.props.navigation}
              data={this.props.data}
              dedDumSectionEnteteVO={getValueByPath(
                'dedDumSectionEnteteVO',
                this.props.data,
              )
              }
              fromWhere1={this.props.fromWhere1}
            />
            <DedRedressementEnteteDocumentPrecedentBlock
              data={this.props.data}
              dedDumSectionEnteteVO={getValueByPath(
                'dedDumSectionEnteteVO',
                this.props.data,
              )}
            />
            <DedRedressementEnteteAccordFranchiseBlock
              data={this.state.dedDumVo}
              dedDumSectionEnteteVO={this.state.dedDumVo?.dedDumSectionEnteteVO}
              update={this.updateRedressement}
              readOnly={!isRedressementDUM}
            />
            <DedRedressementEnteteTransbordementBlock
              data={this.props.data}
              dedDumSectionEnteteVO={getValueByPath(
                'dedDumSectionEnteteVO',
                this.props.data,
              )}
            />

            <View style={styles.container}>
              <ComAccordionComp title={translate('etatChargement.listeD17D20')} expanded={true}>
                <View style={styles.container}>
                  <Text style={styles.nombreResult, styles.libelle}>
                    {translate('etatChargement.nombreD17D20')} :
                    <Text style={styles.libelle}>
                      {'    ' + listD17D20?.length}
                    </Text>
                  </Text>
                  <DedRedressementRow zebra={true}>
                    <ComBasicDataTableComp
                      badr
                      onRef={(ref) => (this.badrComposantsTable = ref)}
                      ref="_badrTable"
                      hasId={false}
                      id="idComposant"
                      rows={listD17D20}
                      cols={this.composantTablesColsD17D20}
                      totalElements={
                        listD17D20?.length
                          ? listD17D20?.length
                          : 0
                      }
                      maxResultsPerPage={5}
                      paginate={true}
                    />
                  </DedRedressementRow>
                </View>
              </ComAccordionComp>
            </View>

          </View>
        )}
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
  return { ...state.consulterDumReducer };
}

export default connect(mapStateToProps, null)(DedRedressementEnteteScreen);
