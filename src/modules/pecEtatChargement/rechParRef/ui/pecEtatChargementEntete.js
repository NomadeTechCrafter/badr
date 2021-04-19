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

class EtatChargementEntete extends React.Component {

    defaultState = {
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    render() {
        let etatChargement = this.props.data?.refEtatChargement;
        let refDeclarant   = this.props.data?.refDeclarant        ;
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
