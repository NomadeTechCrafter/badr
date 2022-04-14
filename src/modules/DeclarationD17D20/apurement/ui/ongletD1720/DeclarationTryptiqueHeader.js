import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import {
    CustomStyleSheet,
    accentColor,
} from '../../../../../commons/styles/ComThemeStyle';
import {
    ComAccordionComp as Accordion,
    ComBadrAutoCompleteChipsComp,
    ComBadrAutoCompleteComp,
    ComBadrButtonComp,
    ComBadrCardBoxComp as CardBox,
    ComBadrDialogComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrKeyValueComp,
    ComBadrPickerComp,
    ComBasicDataTableComp,
} from '../../../../../commons/component';
import { HelperText, TextInput } from 'react-native-paper';
/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
export class DeclarationTriptiqueHeader extends Component{
    constructor(props) {
        super(props);
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
    render = () => {
        const referenceEnregistrement = this.props.reference;
        const libelleRegime = this.props.libelleRegime;
        return(
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
                    <Text style={styles.valueL}>{libelleRegime}</Text>
                </View>
            </CardBox>
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
    row: {
        margin: 0,
        padding: 0,
        flex: 1,
        width: '90%',
        flexDirection: 'row',
    },
    containerInputs: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
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
        margin: 0,
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
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#009ab2',
        padding: 0,
        margin: 0,
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
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
    },
    containerInputs: {
        flexDirection: 'column',
        borderWidth: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    containerInputsWithBorder: {
        borderWidth: 1,
        borderColor: '#009ab2',
        borderBottomEndRadius: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    cleHelperMsg: { width: 150 },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    btnConfirmer: {
        color: accentColor,
        padding: 5,
        marginRight: 15,
    },
    btnRetablir: {
        color: accentColor,
        padding: 5,
    },
    containerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: 'row',
    },
    alignStart: {
        alignItems: 'flex-start',
        flex: 1,
    },
    alignEnd: {
        alignItems: 'flex-end',
        flex: 1,
    },
    BtnWidth: { width: 100 }
});