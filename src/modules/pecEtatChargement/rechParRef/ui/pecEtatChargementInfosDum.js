import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import translate from "../../../../commons/i18n/ComI18nHelper";
import style from '../style/pecEtatChargementStyle';
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';
import { Row } from "react-native-easy-grid";

class EtatChargementInfosDum extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let etatChargement = this.props.data?.refEtatChargement;
        let etatVersion = this.props.data?.refEtatVersion;

        return (
            <View style={styles.fabContainer}>
            <ScrollView>
                {/* Référence déclaration */}
                <CardBox style={styles.cardBoxInfoDum}>
                    <View style={[styles.flexDirectionRow, styles.margtb]}>
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
                        <Text style={styles.libelleL}>
                            {translate('etatChargement.etatDeclaration')}
                        </Text>
                        <Text style={styles.valueL}>{etatVersion?.libelle}</Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                        <Text style={styles.valueM}>
                            {etatChargement?.refBureauDouane.codeBureau}
                        </Text>
                        <Text style={styles.valueM}>
                            {etatChargement?.regime}
                        </Text>
                        <Text style={styles.valueM}>
                            {etatChargement?.anneeEnregistrement}
                        </Text>
                        <Text style={styles.valueM}>
                            {etatChargement?.numeroSerieEnregistrement}
                        </Text>
                        <Text style={styles.valueM}>
                            {etatChargement?.cle}
                        </Text>
                        <Text style={styles.libelleL}>
                            {translate('etatChargement.modeTransport')}
                        </Text>
                        <Text style={styles.valueL}>{etatChargement?.refModeTransport.descriptionModeTransport}</Text>
                    </View>
                </CardBox>
            </ScrollView>
        </View>
        );
    }
}

const libelle = {
    fontSize: 14,
    color: '#006acd',
    fontWeight: 'bold',
};

const value = {
    fontSize: 14,
    fontWeight: 'bold',
};

const styles = StyleSheet.create({
    messages: {},
    fabContainer: {
        height: '100%',
        flex: 1,
    },
    centerErrorMsg: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerInfoMsg: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardBox: {
        padding: 0,
        margin: 10,
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    containerActionBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    libelle: { ...libelle },
    libelleS: {
        ...libelle,
        flex: 1,
    },
    libelleM: {
        ...libelle,
        flex: 2,
    },
    libelleL: {
        ...libelle,
        flex: 3,
    },
    valueS: {
        ...value,
        flex: 1,
    },
    valueM: {
        ...value,
        flex: 2,
    },
    valueL: {
        ...value,
        flex: 3,
    },
    decisionContainerRB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#009ab2',
        padding: 8,
        width: 300,
    },
    textRadio: {
        color: '#FFF',
    },
    flexColumn: { flexDirection: 'column' },
    margLeft: {
        marginLeft: 20,
    },
    marg: {
        margin: 10,
    },
    margtb: {
        marginBottom: 10,
    },
    textarea: {
        height: 50,
        marginRight: 50,
    },
    date: {
        fontWeight: 'bold',
        borderColor: 'red',
    },
    table: {
        marginBottom: 20,
    },
    tableHeader: {
        backgroundColor: '#ecf0f1',
    },
    centre: {
        alignSelf: 'center',
    },
    nombreResult: { margin: 20, marginVertical: 10, ...value },
    cardBoxInfoDum: {
        flexDirection: 'column',
        margin: 10,
    },
});


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
)(EtatChargementInfosDum);
