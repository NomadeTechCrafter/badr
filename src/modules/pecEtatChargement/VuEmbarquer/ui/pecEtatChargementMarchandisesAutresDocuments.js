import React from "react";
import style from '../style/pecEtatChargementStyle';
import styles from '../style/pecEtatChargementStyle';
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import translate from "../../../../commons/i18n/ComI18nHelper";
import EtatChargementInfosDum from './pecEtatChargementInfosDum'
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';
import { DataTable } from "react-native-paper";

class EtatChargementMarchandisesAutresDocuments extends React.Component {

    defaultState = {
        selectedDoc: {},
    };

    constructor(props) {
        super(props);
        this.composantTablesCols = this.buildComposantsColumns(true);
        this.state = this.defaultState;
    }
    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
            this.selectedDoc = {};
        }
    }

    /**
* This function build the components datatable headers labels and actions.
* the reference is considered as the current component instance
*/
    buildComposantsColumns = (actions) => {
        return [
            {
                code: 'refTypeDocument.nomDocument',
                libelle: translate('etatChargement.typeDocument'),
                width: 180,
            },
            {
                code: 'document',
                libelle: translate('etatChargement.refDocument'),
                width: 180,
            },
            {
                code: 'nombreContenant',
                libelle: translate('etatChargement.nbreContenant'),
                width: 180,
            },
            {
                code: 'poidsBrut',
                libelle: translate('etatChargement.poidsBrut'),
                width: 180,
            },
            {
                code: 'valeurDeclaree',
                libelle: translate('etatChargement.valDeclaree'),
                width: 180,
            },
        ];
    };

    onComposantSelected = (row) => {
        this.setState({
            selectedDoc: row,
        });
    };

    render() {
        const listDocuments = this.props.data?.refMarchandisesSansDum;
        
        let totauxNombreContenant = parseFloat(0);
        listDocuments?.forEach(element => {
            totauxNombreContenant += parseFloat(element?.nombreContenant);
        });
        totauxNombreContenant = totauxNombreContenant.toFixed(3);

        let totauxValeurDeclaree = parseFloat(0);
        listDocuments?.forEach(element => {
            totauxValeurDeclaree += parseFloat(element?.valeurDeclaree);
        });
        totauxValeurDeclaree = totauxValeurDeclaree.toFixed(3);

        let totauxPoidsBrut = parseFloat(0);
        listDocuments?.forEach(element => {
            totauxPoidsBrut += parseFloat(element?.poidsBrut);
        });
        totauxPoidsBrut = totauxPoidsBrut.toFixed(3);


        return (
            <View style={style.container}>
                <ScrollView>
                    <EtatChargementInfosDum />
                    {listDocuments && (
                        <CardBox style={style.cardBox}>
                            <Accordion
                                badr
                                title={translate('etatChargement.marchandisesSousCouvertAutresDocuments')}
                            >
                                <ComBasicDataTableComp
                                    badr
                                    onRef={(ref) => (this.badrComposantsTable = ref)}
                                    ref="_badrTable"
                                    hasId={false}
                                    id="idComposant"
                                    rows={listDocuments}
                                    cols={this.composantTablesCols}
                                    onItemSelected={(row) => this.onComposantSelected(row)}
                                    totalElements={
                                        listDocuments?.length
                                            ? listDocuments?.length
                                            : 0
                                    }
                                    maxResultsPerPage={5}
                                    paginate={true}
                                />
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <DataTable style={styles.table}>
                                        <DataTable.Row>
                                            <DataTable.Cell style={{ width: 50 }} />
                                            <DataTable.Cell
                                                style={{ width: 50 }}
                                                children={
                                                    <Text style={styles.libelle}>
                                                        {translate('etatChargement.totaux')}
                                                    </Text>
                                                }
                                            />
                                            <DataTable.Cell style={{ width: 50 }} />
                                            <DataTable.Cell
                                                style={{ width: 150 }}
                                                children={
                                                    <Text style={styles.valueL}>
                                                        {totauxNombreContenant}
                                                    </Text>
                                                }
                                            />
                                            <DataTable.Cell style={{ width: 50 }} />
                                            <DataTable.Cell style={{ width: 50 }} />
                                            <DataTable.Cell
                                                style={{ width: 150 }}
                                                children={
                                                    <Text style={styles.valueXL}>
                                                        {totauxPoidsBrut}
                                                    </Text>
                                                }
                                            />
                                            <DataTable.Cell style={{ width: 50 }} />
                                            <DataTable.Cell style={{ width: 50 }} />
                                            <DataTable.Cell
                                                style={{ width: 150 }}
                                                children={
                                                    <Text style={styles.valueXL}>
                                                        {totauxValeurDeclaree}
                                                    </Text>
                                                }
                                            />
                                            <DataTable.Cell style={{ width: 50 }} />
                                        </DataTable.Row>
                                    </DataTable>
                                </View>
                                {this.state.selectedDoc && (
                                    <Accordion
                                        badr
                                        title={translate('etatChargement.ligne')}
                                        expanded>
                                        <CardBox style={styles.cardBoxInfoDum}>
                                            <View style={[styles.flexDirectionCol, styles.margtb]}>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.typeDocument')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {this.state.selectedDoc?.refTypeDocument?.nomDocument}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.refDocument')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {this.state.selectedDoc?.document}
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.exportateur')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {this.state.selectedDoc?.exportateur?.nomOperateur}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.poidsBrut')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {this.state.selectedDoc?.poidsBrut}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.valDeclaree')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {this.state.selectedDoc?.valeurDeclaree}
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.nbreContenant')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {this.state.selectedDoc?.nombreContenant}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                    </Text>
                                                </View>
                                            </View>
                                        </CardBox>
                                    </Accordion>
                                )}
                            </Accordion>
                        </CardBox>
                    )}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementVEReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EtatChargementMarchandisesAutresDocuments);
