import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import style from '../style/pecEtatChargementStyle';
import styles from '../style/pecEtatChargementStyle';
import EtatChargementInfosDum from './pecEtatChargementInfosDum'
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';
import translate from "../../../../commons/i18n/ComI18nHelper";
import { DataTable } from "react-native-paper";



class EtatChargementDeclarationDetail extends React.Component {
    defaultState = {
        selectedDum: {},
    };
    constructor(props) {
        super(props);
        this.composantTablesCols = this.buildComposantsColumns(true);
        this.state = this.defaultState;
    }

    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
            this.selectedDum = {};
        }
    }
    
    /**
   * This function build the components datatable headers labels and actions.
   * the reference is considered as the current component instance
   */
    buildComposantsColumns = (actions) => {
        return [
            {
                code: 'refDeclarationEnDouane.referenceEnregistrement',
                libelle: translate('etatChargement.refDeD'),
                width: 160,
            },
            {
                code: 'refDedServices.operateurImportateurExportateur',
                libelle: translate('etatChargement.exportateur'),
                width: 200,
            },
            {
                code: 'refDedServices.dateEnregistrement',
                libelle: translate('etatChargement.dateEnregistrement'),
                width: 150,
            },
            {
                code: 'refDedServices.nombreContenants',
                libelle: translate('etatChargement.nbreContenant'),
                width: 100,
            },
            {
                code: 'refDedServices.poidsBruts',
                libelle: translate('etatChargement.poidsBrut'),
                width: 100,
            },
            {
                code: 'refDedServices.poidsNet',
                libelle: translate('etatChargement.poidsNet'),
                width: 100,
            },
            {
                code: 'refDedServices.valeurDeclaree',
                libelle: translate('etatChargement.valDeclaree'),
                width: 100,
            },
        ];
    };

    onComposantSelected = (row) => {
        this.setState({
            selectedDum: row,
        });
    };

    cleDUM = function (regime, serie) {
        if (regime && serie) {
            let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
            if (serie?.length > 6) {
                let firstSerie = serie?.substring(0, 1);
                if (firstSerie === '0') {
                    serie = serie.substring(1, 7);
                }
            }
            let obj = regime + serie;
            let RS = obj % 23;
            alpha = alpha.charAt(RS);
            return alpha;
        }
    };

    render() {
        const listDeclarationDetail = this.props.data?.refDumEtatChargement;
        const refDedServices = this.state.selectedDum?.refDedServices;
        let totauxNombreContenant = parseFloat(0);
        listDeclarationDetail?.forEach(element => {
            totauxNombreContenant += parseFloat(element?.refDedServices?.nombreContenants);
        });
        totauxNombreContenant = totauxNombreContenant.toFixed(1);
        let totauxValeurDeclaree = parseFloat(0);
        listDeclarationDetail?.forEach(element => {
            totauxValeurDeclaree += parseFloat(element?.refDedServices?.valeurDeclaree);
        });
        totauxValeurDeclaree = totauxValeurDeclaree.toFixed(1);
        return (
            <View style={style.container}>
                <ScrollView>
                    <EtatChargementInfosDum />
                    {listDeclarationDetail && (
                        <CardBox style={style.cardBox}>
                            <Accordion
                                badr
                                title={translate('etatChargement.declarationDetail')}
                            >
                                <ComBasicDataTableComp
                                    badr
                                    onRef={(ref) => (this.badrComposantsTable = ref)}
                                    ref="_badrTable"
                                    hasId={false}
                                    id="idComposant"
                                    rows={listDeclarationDetail}
                                    cols={this.composantTablesCols}
                                    onItemSelected={(row) => this.onComposantSelected(row)}
                                    totalElements={
                                        listDeclarationDetail?.length
                                            ? listDeclarationDetail?.length
                                            : 0
                                    }
                                    maxResultsPerPage={5}
                                    paginate={true}
                                />
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                            <DataTable style={styles.table}>
                                                <DataTable.Row>
                                                    <DataTable.Cell style={{ width: 50 }}/>
                                                    <DataTable.Cell
                                                        style={{ width: 50 }}
                                                        children={
                                                            <Text style={styles.libelle}>
                                                                {translate('etatChargement.totaux')}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell style={{ width: 50 }}/>
                                                    <DataTable.Cell
                                                        style={{ width: 150 }}
                                                        children={
                                                            <Text style={styles.valueL}>
                                                                {totauxNombreContenant}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell style={{ width: 50 }}/>
                                                    <DataTable.Cell style={{ width: 50 }}/>
                                                    <DataTable.Cell style={{ width: 50 }}/>
                                                    <DataTable.Cell
                                                        style={{ width: 150 }}
                                                        children={
                                                            <Text style={styles.valueXL}>
                                                                {totauxValeurDeclaree}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell style={{ width: 50 }}/>
                                                </DataTable.Row>
                                            </DataTable>
                                </View>
                                {this.state.selectedDum && (
                                    <Accordion
                                        badr
                                        title={translate('etatChargement.ligne')}
                                        expanded>
                                        <CardBox style={styles.cardBoxInfoDum}>
                                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                <Text style={styles.libelleL}>
                                                    {translate('etatChargement.refDeD')}
                                                </Text>
                                                <Text style={styles.libelleM}>
                                                    {translate('transverse.bureau')}
                                                </Text>
                                                <Text style={styles.libelleM}>
                                                    {translate('transverse.regime')}
                                                </Text>
                                                <Text style={styles.libelleM}>
                                                    {translate('transverse.annee')}
                                                </Text>
                                                <Text style={styles.libelleM}>
                                                    {translate('transverse.serie')}
                                                </Text>
                                                <Text style={styles.libelleM}>{translate('transverse.cle')}</Text>
                                                <Text style={styles.libelleL}>{translate('etatChargement.numeroVoyage')}</Text>
                                            </View>
                                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                <Text style={styles.valueL}>
                                                </Text>
                                                <Text style={styles.valueM}>
                                                    {this.state.selectedDum.refDeclarationEnDouane?.referenceEnregistrement?.slice(0, 3)}
                                                </Text>
                                                <Text style={styles.valueM}>
                                                    {this.state.selectedDum.refDeclarationEnDouane?.referenceEnregistrement?.slice(3, 6)}
                                                </Text>
                                                <Text style={styles.valueM}>
                                                    {this.state.selectedDum.refDeclarationEnDouane?.referenceEnregistrement?.slice(6, 10)}
                                                </Text>
                                                <Text style={styles.valueM}>
                                                    {this.state.selectedDum.refDeclarationEnDouane?.referenceEnregistrement?.slice(10, 17)}
                                                </Text>
                                                <Text style={styles.valueM}>
                                                    {this.cleDUM(
                                                        this.state.selectedDum?.refDeclarationEnDouane?.referenceEnregistrement?.slice(3, 6),
                                                        this.state.selectedDum?.refDeclarationEnDouane?.referenceEnregistrement?.slice(10, 17),
                                                    )}
                                                </Text>
                                                <Text style={styles.libelleL}>
                                                    {refDedServices?.numeroVoyage}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                <Text style={styles.libelleS}>
                                                    {translate('etatChargement.dumAnnexee')}
                                                </Text>
                                                <Text style={styles.libelleS}>
                                                    {translate('etatChargement.natureMarch')}
                                                </Text>
                                                <Text style={styles.valueS}>
                                                    {this.state.selectedDum.natureMarchandises}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexDirectionCol, styles.margtb]}>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.typeDeD')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {refDedServices?.libelleTypeDED}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.dateEnregistrement')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {refDedServices?.dateEnregistrement}
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.exportateur')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {refDedServices?.operateurImportateurExportateur}
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
                                                        {refDedServices?.poidsBruts}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.poidsNet')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {refDedServices?.poidsNet}
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.valDeclaree')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {refDedServices?.valeurDeclaree}
                                                    </Text>
                                                    <Text style={styles.libelleM}>
                                                        {translate('etatChargement.nbreContenant')}
                                                    </Text>
                                                    <Text style={styles.valueM}>
                                                        {refDedServices?.nombreContenants}
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
    return { ...state.pecEtatChargementReducer };
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
)(EtatChargementDeclarationDetail);
