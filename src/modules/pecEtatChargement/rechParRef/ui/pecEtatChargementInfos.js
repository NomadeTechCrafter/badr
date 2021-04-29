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
import { DataTable, Checkbox } from "react-native-paper";
import EtatChargementHistoriqueListeInterventionsBlock from "./pecEtatChargementHistoriqueListeInterventionsBlock";
import EtatChargementVersionsBlock from "./pecEtatChargementVersionsBlock";



class EtatChargementInfos extends React.Component {
    defaultState = {
        selectedDum: {},
    };
    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
            this.selectedDum = {};
        }
    }

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
        let listHistoriqueEtdc = this.props.dataHistorique;
        const listVersions = this.props.dataVersions;
        let taille = (listHistoriqueEtdc) ? listHistoriqueEtdc.length : 0;
        return (
            <View style={style.container}>
                <ScrollView>
                    <EtatChargementInfosDum />
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.listeVersions')}
                        >
                            <View style={[styles.flexDirectionRow, styles.marginTop15]}>
                                <Text style={styles.libelleM}>
                                </Text>
                                <Text style={styles.valueM}>
                                </Text>
                                <Text style={styles.valueM}>
                                    {translate('etatChargement.nombreEnregistrements')} :
                                </Text>
                                <Text style={styles.valueM}>
                                    {listVersions.length}
                                </Text>
                            </View>
                            <EtatChargementVersionsBlock versions={listVersions} />
                        </Accordion>
                    </CardBox>
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.historiqueEtatChargement')}
                        >
                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                <Text style={styles.libelleM}>
                                    {translate('etatChargement.numeroVersionCourante')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {this.props.data?.numeroVersion}
                                </Text>
                                <Text style={styles.libelleM}>
                                </Text>
                                <Text style={styles.valueM}>
                                </Text>
                            </View>
                            <View style={[styles.flexDirectionRow, styles.margtb]}>
                                <Text style={styles.libelleM}>
                                    {translate('etatChargement.statutVersionCourante')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {this.props.data?.refStatutVersion?.libelle}
                                </Text>
                                <Text style={styles.libelleM}>
                                </Text>
                                <Text style={styles.valueM}>
                                </Text>
                            </View>
                            <View style={[styles.flexDirectionRow, styles.marginTop15]}>
                                <Text style={styles.libelleM}>
                                </Text>
                                <Text style={styles.valueM}>
                                </Text>
                                <Text style={styles.valueM}>
                                    {translate('t6bisGestion.tabs.historique.tableauIntervention.nombreInterventions')}
                                </Text>
                                <Text style={styles.valueM}>
                                    {taille}
                                </Text>
                            </View>
                            {listHistoriqueEtdc && (
                                <EtatChargementHistoriqueListeInterventionsBlock interventions={listHistoriqueEtdc} />
                            )}
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
)(EtatChargementInfos);
