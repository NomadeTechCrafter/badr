import React from "react";
import style from '../style/pecEtatChargementStyle';
import styles from '../style/pecEtatChargementStyle';
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import EtatChargementInfosDum from './pecEtatChargementInfosDum';
import translate from "../../../../commons/i18n/ComI18nHelper";
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';
import { DataTable } from "react-native-paper";

class EtatChargementEntete extends React.Component {

    defaultState = {
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.composantTablesCols = this.buildComposantsColumns(true);
        this.composantTablesColsD17D20 = this.buildComposantsColumnsD17D20(true);

    }

    /**
* This function build the components datatable headers labels and actions.
* the reference is considered as the current component instance
*/
    buildComposantsColumns = (actions) => {
        return [
            {
                code: 'refPaysImmatriculation.nomPays',
                libelle: translate('etatChargement.pays'),
                width: 160,
            },
            {
                code: 'refTypeContenant.intitule',
                libelle: translate('etatChargement.typeMoyen'),
                width: 200,
            },
            {
                code: 'numeroImmatriculation',
                libelle: translate('etatChargement.immatriculation'),
                width: 150,
            },
            {
                code: 'tareVehicule',
                libelle: translate('etatChargement.tare'),
                width: 100,
            },
        ];
    };

    /**
* This function build the components datatable headers labels and actions.
* the reference is considered as the current component instance
*/
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

    render() {
        let listMoyenTransport = this.props.data?.refMoyenTransportAEC;
        let listD17D20 = this.props.data?.declarationsTryptique;
        let etatChargement = this.props.data?.refEtatChargement;
        let refDeclarant = this.props.data?.refDeclarant;
        return (
            <View style={style.container}>
                <ScrollView>
                    <EtatChargementInfosDum />
                    <CardBox style={styles.cardBoxInfoDum}>
                        <View style={[styles.flexDirectionCol, styles.margtb]}>
                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                <Text style={styles.libelleM}>
                                    {translate('etatChargement.bureauDeDouane')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {etatChargement?.refActeurInterneDepot?.refBureau?.nomBureauDouane}
                                </Text>
                                <Text style={styles.libelleM}>
                                </Text>
                                <Text style={styles.valueM}>
                                </Text>
                            </View>
                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                <Text style={styles.libelleM}>
                                    {translate('etatChargement.arrondissement')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {etatChargement?.refArrondissement?.libelle}
                                </Text>
                                <Text style={styles.libelleM}>
                                </Text>
                                <Text style={styles.valueM}>
                                </Text>
                            </View>
                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                <Text style={styles.libelleM}>
                                    {translate('etatChargement.transportTerrestre')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {etatChargement?.transporteur?.nomOperateur}
                                </Text>
                                <Text style={styles.libelleM}>
                                    {translate('etatChargement.declarant')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {refDeclarant?.codeDeclarant}
                                </Text>
                            </View>
                        </View>
                    </CardBox>
                    {listMoyenTransport && (
                        <CardBox style={style.cardBox}>
                            <Accordion
                                badr
                                title={translate('etatChargement.moyenTransport')}
                            >
                                <ComBasicDataTableComp
                                    badr
                                    onRef={(ref) => (this.badrComposantsTable = ref)}
                                    ref="_badrTable"
                                    hasId={false}
                                    id="idComposant"
                                    rows={listMoyenTransport}
                                    cols={this.composantTablesCols}
                                    totalElements={
                                        listMoyenTransport?.length
                                            ? listMoyenTransport?.length
                                            : 0
                                    }
                                    maxResultsPerPage={5}
                                    paginate={true}
                                />
                            </Accordion>
                        </CardBox>
                    )}
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.version')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.type')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.typeVersion}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.numero')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.numeroVersion}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.modeAcquisition')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.refModeAcquisition?.libelle}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.statut')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.refStatutVersion?.libelle}
                                        </Text>
                                    </View>
                                </View>
                            </CardBox>
                            <ScrollView horizontal={true} style={styles.centre}>
                                {!this.props.showProgress && (
                                    <ScrollView>
                                        <CardBox style={styles.cardBoxInfoDum}>
                                            <DataTable style={styles.table}>
                                                <DataTable.Row>
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.libelleM}>
                                                                {translate('etatChargement.declaration')}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.libelleM}>
                                                                {translate('etatChargement.versionEnCours')}
                                                            </Text>
                                                        }
                                                    />
                                                </DataTable.Row>
                                                <DataTable.Row>
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.libelleM}>
                                                                {translate('etatChargement.dateCreation')}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.valueM}>
                                                                {this.props.data?.dateHeureCreation}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.valueM}>
                                                                {this.props.data?.refEtatChargement?.dateHeureCreation}
                                                            </Text>
                                                        }
                                                    />
                                                </DataTable.Row>
                                                <DataTable.Row>
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.libelleM}>
                                                                {translate('etatChargement.dateEnregistrement')}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.valueM}>
                                                                {this.props.data?.dateHeureEnregistrement}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.valueM}>
                                                                {this.props.data?.refEtatChargement?.dateHeureEnregistrement}
                                                            </Text>
                                                        }
                                                    />
                                                </DataTable.Row>
                                                <DataTable.Row>
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.libelle}>
                                                                {translate('etatChargement.dateDepot')}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                        children={
                                                            <Text style={styles.valueM}>
                                                                {this.props.data?.refEtatChargement?.dateHeureDepot}
                                                            </Text>
                                                        }
                                                    />
                                                    <DataTable.Cell
                                                        style={{ width: 180 }}
                                                    />
                                                </DataTable.Row>
                                            </DataTable>
                                        </CardBox>
                                    </ScrollView>
                                )}
                            </ScrollView>
                        </Accordion>
                    </CardBox>
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.voyage')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.bureauDeDouane')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.refActeurInterneDepot?.refBureau?.nomBureauDouane}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.nrVoyage')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.numVoyage}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.transporteur')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.transporteur?.nomOperateur}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.dateHeureVoyage')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.dateHeureVoyage}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.navire')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {this.props.data?.navire?.descriptionMoyenTransport}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                        </Text>
                                        <Text style={styles.valueM}>
                                        </Text>
                                    </View>
                                </View>
                            </CardBox>
                        </Accordion>
                    </CardBox>

                    {listD17D20 && (
                        <CardBox style={style.cardBox}>
                            <Accordion
                                badr
                                title={translate('etatChargement.listeD17D20')}
                            >
                                <Text style={style.nombreResult, style.libelle}>
                                    {translate('etatChargement.nombreD17D20')}
                                    <Text style={style.libelle}>
                                        {'    ' + listD17D20.length}
                                    </Text>
                                </Text>
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
)(EtatChargementEntete);
