import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import style from '../../style/vuEmbarquerStyle';

import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../../commons/component';
import translate from "../../../../../commons/i18n/ComI18nHelper";
import { StyleSheet } from "react-native";
import * as VuEmbarquerScanAction from '../../state/actions/decVuEmbarquerScanAction';
import * as Constants from '../../state/vuEmbarquerConstants';

class ResultatScanner extends React.Component {
    defaultState = {
        selectedDum: {},
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.cols = [
            {
                code: 'dateScannage',
                libelle: translate('sortiPort.scanner.dateScannage'),
                width: 200,
            },
            {
                code: 'agent',
                libelle: translate('sortiPort.scanner.agent'),
                width: 150,
            },
            {
                code: 'resultat',
                libelle: translate('sortiPort.scanner.resultat'),
                width: 250,
            },
            {
                code: 'commentaire',
                libelle: translate('sortiPort.scanner.commentaire'),
                width: 300,
            }
        ];
    }

    cleDUM = function (regime, serie) {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
        if (serie?.length > 6) {
            let firstSerie = serie?.substring(0, 1);
            if (firstSerie === '0') {
                serie = serie?.substring(1, 7);
            }
        }
        let obj = regime + serie;
        let RS = obj % 23;
        alpha = alpha.charAt(RS);
        return alpha;
    };

    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
        }
    }

    componentDidMount() {

        var action = VuEmbarquerScanAction.request(
            {
                type: Constants.SCANNER_D17_DUM_REQUEST,
                value: {
                    login: "SUPSI1059",
                    commande: "findResultatScannerByReferenceEtatChargement",
                    module: "AEC_LIB",
                    typeService: "SP",
                    data: this.props.dataVo?.declarationTriptique?.referenceEnregistrement
                },
            },
            this.props.navigation
        );
        this.props.actions.dispatch(action);
    }

    render() {
        let resultatsScanner = this.props.dataScanner;
        if (!resultatsScanner) {
            resultatsScanner = [];
        }
        const referenceEnregistrement = this.props.dataVo?.declarationTriptique?.referenceEnregistrement;
        const enteteTrypVO = this.props.dataVo?.enteteTrypVO;
        return (
            <View style={style.mainContainer}>
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
                            <Text style={styles.libelleL}>
                                {translate('transverse.serie')}
                            </Text>
                            <Text style={styles.libelleS}>{translate('transverse.cle')}</Text>
                            <Text style={styles.libelleL}>
                                {translate('transverse.type')}
                            </Text>
                            <Text style={styles.libelleL}>
                                {translate('transverse.libRegime')}
                            </Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <Text style={styles.valueM}>
                                {referenceEnregistrement?.slice(0, 3)}
                            </Text>
                            <Text style={styles.valueM}>
                                {referenceEnregistrement?.slice(3, 6)}
                            </Text>
                            <Text style={styles.valueM}>
                                {referenceEnregistrement?.slice(6, 10)}
                            </Text>
                            <Text style={styles.valueL}>
                                {referenceEnregistrement?.slice(10, 17)}
                            </Text>
                            <Text style={styles.valueS}>
                                {this.cleDUM(
                                    referenceEnregistrement?.slice(3, 6),
                                    referenceEnregistrement?.slice(10, 17),
                                )}
                            </Text>
                            <Text style={styles.valueL}>TRYPTIQUE</Text>
                            <Text style={styles.valueL}>{enteteTrypVO?.libelleRegime}</Text>
                        </View>
                    </CardBox>
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('tabs.resultScanner')}
                        >
                            {/* {resultatsScanner && ( */}
                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                    id="scannerTable"
                                    rows={resultatsScanner}
                                    cols={this.cols}
                                    totalElements={resultatsScanner?.length}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    withId={false}
                                />
                            {/* )} */}
                        </Accordion>
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
    cardBoxInfoDum: {
        flexDirection: 'column',
        margin: 10,
    },
    cardBox: {
        flexDirection: 'column',
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
});

function mapStateToProps(state) {
    return { ...state.vuEmbInitReducer };
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
)(ResultatScanner);