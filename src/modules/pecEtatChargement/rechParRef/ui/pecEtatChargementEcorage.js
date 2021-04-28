import React from "react";
import style from '../style/pecEtatChargementStyle';
import styles from '../style/pecEtatChargementStyle';
import { ScrollView, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import EtatChargementInfosDum from './pecEtatChargementInfosDum';
import translate from "../../../../commons/i18n/ComI18nHelper";
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
    ComAccordionComp,
} from '../../../../commons/component';

class EtatChargementEcorage extends React.Component {

    defaultState = {
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.composantTablesCols = this.buildComposantsColumns(true);

    }

    /**
    * This function build the components datatable headers labels and actions.
    * the reference is considered as the current component instance
    */
    buildComposantsColumns = (actions) => {
        return [
            {
                code: 'nomPays',
                libelle: translate('etatChargement.pays'),
                width: 160,
            },
            {
                code: 'refTypeContenant',
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
            {
                code: 'listScelles',
                libelle: translate('etatChargement.numScelle'),
                width: 200,
            },
        ];
    };

    render() {
        let listMoyenTransport = this.props.data?.refMoyenTransportAEC;
        let newArray = [];
        listMoyenTransport?.forEach(element => {
            let newElement = {};
            newElement.nomPays = element.refPaysImmatriculation.nomPays;
            newElement.refTypeContenant = element.refTypeContenant.intitule;
            newElement.numeroImmatriculation = element.numeroImmatriculation;
            newElement.tareVehicule = element.tareVehicule;
            newElement.listScelles = element.listScelleVOs?.map(function (item) {
                return item['reference'];
            });;
            newArray.push(newElement);
        });

        let etatChargement = this.props.data?.refEtatChargement;

        let scellesConfirmationEntree = '';
        const obj = this.props.data?.scellesConfirmationEntree;
        for (const prop in obj) {
            scellesConfirmationEntree += obj[prop] + '\n';
        }

        return (
            <View style={style.container}>
                <ScrollView>
                    <EtatChargementInfosDum />
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.depot')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.agentDepot')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.refActeurInterneDepot?.idActeur}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.dateHeureDepot')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.dateHeureDepot}
                                        </Text>
                                    </View>
                                </View>
                            </CardBox>
                        </Accordion>
                    </CardBox>
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.confirmationEntree')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtt]}>
                                            {translate('etatChargement.scellesConfirmationEntree')}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <CardBox style={styles.cardBoxInfoDum}>
                                            <TextInput
                                                value={scellesConfirmationEntree}
                                                multiline={true}
                                                numberOfLines={3}
                                                disabled={true}
                                            />
                                        </CardBox>
                                    </View>
                                </View>
                            </CardBox>
                        </Accordion>
                    </CardBox>

                    {newArray && (
                        <CardBox style={style.cardBox}>
                            <Accordion
                                badr
                                title={translate('etatChargement.bonEmbarquer')}
                            >
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.inspecteurVisite')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.refActeurInterneBAE?.idActeur}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.dateHeureVisa')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.dateHeureBAE}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtr]}>
                                            {translate('etatChargement.moyenTransport')} :
                                        </Text>
                                        <Text style={[styles.libelleM, styles.margtr]}>
                                            {translate('etatChargement.numScelle')}
                                        </Text>
                                    </View>
                                    <ComBasicDataTableComp
                                        badr
                                        onRef={(ref) => (this.badrComposantsTable = ref)}
                                        ref="_badrTable"
                                        hasId={false}
                                        id="idComposant"
                                        rows={newArray}
                                        cols={this.composantTablesCols}
                                        totalElements={
                                            newArray?.length
                                                ? newArray?.length
                                                : 0
                                        }
                                        maxResultsPerPage={5}
                                        paginate={true}
                                    />
                                </View>

                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtt]}>
                                            {translate('etatChargement.commentaire')}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionCol, styles.margtb, styles.width90]}>
                                        <CardBox style={[styles.cardBoxInfoDum, styles.container, styles.width90]}>
                                            <TextInput
                                                value={etatChargement?.commentaireBonEmbarquement}
                                                multiline={true}
                                                numberOfLines={3}
                                                disabled={true}
                                            />
                                        </CardBox>
                                    </View>
                                </View>
                            </Accordion>
                        </CardBox>
                    )}
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.vuEmbarquer')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.agentEcoreur')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.refActeurInterneVuEmbarquer?.idActeur}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.dateHeureVisa')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.dateHeureVuEmbarquer}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargement.navire')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                        </Text>
                                        <Text style={styles.libelleM}>
                                        </Text>
                                        <Text style={styles.valueM}>
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtt]}>
                                            {translate('etatChargement.commentaire')}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionCol, styles.margtb, styles.width90]}>
                                        <CardBox style={[styles.cardBoxInfoDum, styles.container, styles.width90]}>
                                            <TextInput
                                                value={''}
                                                multiline={true}
                                                numberOfLines={3}
                                                disabled={true}
                                            />
                                        </CardBox>
                                    </View>
                                </View>
                            </CardBox>
                        </Accordion>
                    </CardBox>
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
)(EtatChargementEcorage);
