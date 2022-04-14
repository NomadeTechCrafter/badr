import React from 'react';

import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
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

import _ from 'lodash';
import {
    CustomStyleSheet,
    accentColor,
} from '../../../../../commons/styles/ComThemeStyle';
import { HelperText, TextInput } from 'react-native-paper';


export class EtatChargementApurementBlock    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorMsg: false,
            // Ref EC
            afficherNouveauEC: false,
            ecBureau: '',
            ecRegime: '001',
            ecAnnee: '',
            ecSerie: '',
            ecCle: '',
            ecCleCalcule: '',
        };
        this.composantTablesColsForEC = this.buildComposantsColumnsForEC();
    }
    //Columns for EC
    buildComposantsColumnsForEC = () => {
        return [
            {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                attrCondition: 'idApurement',
                action: (row, index) => this.deleteEC(row, index),
            },
            {
                code: 'reference',
                libelle: 'Référence',
                width: 160,
            },
            {
                code: 'dateEnregistrement',
                libelle: 'Date Enregistrement',
                width: 160,
            },
            {
                code: 'dateVoyage',
                libelle: 'Date Voyage',
                width: 200,
            },
            {
                code: 'declarant',
                libelle: 'Déclarant',
                width: 150,
            },
            {
                code: 'bureauSortie',
                libelle: 'Bureau Sortie',
                width: 100,
            },
            {
                code: 'navire',
                libelle: 'Navire',
                width: 100,
            },
        ];
    };
    nouveauEC() {
        this.setState({
            // Ref EC
            afficherNouveauEC: true,
            ecBureau: '',
            ecRegime: '001',
            ecAnnee: '',
            ecSerie: '',
            ecCle: '',
            ecCleCalcule: '',
            showErrorMsg: false,
        });
    }
    hasErrors = (field) => {
        return this.state.showErrorMsg && _.isEmpty(this.state[field]);
    };
    isCleValide = (field, value) => {
        return this.state.showErrorMsg && this.state[field] !== this.state[value];
    };

    cleDUM = (regime, serie) => {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
        if (serie.length > 6) {
            let firstSerie = serie.substring(0, 1);
            if (firstSerie === '0') {
                serie = serie.substring(1, 7);
            }
        }
        let obj = regime + serie;
        let RS = obj % 23;
        alpha = alpha.charAt(RS);
        return alpha;
    };
    //accept just Number
    onChangeInput = (input) => {
        let keyImput = _.keys(input)[0];
        this.setState({ [keyImput]: input[keyImput].replace(/[^0-9]/g, '') });
    };
    onChangeInputCle = (cle, cleState) => {
        this.setState({ [cleState]: cle.replace(/[^A-Za-z]/g, '') });
    };

    addZeros = (input) => {
        let keyImput = _.keys(input)[0];
        if (input[keyImput] !== '') {
            this.setState({
                [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
            });
        }
    };

    // Ajouter un EC dans le tableau
    ajouterEC = () => {
        this.setState({
            showErrorMsg: true
        });
        if (this.state.ecBureau && this.state.ecRegime && this.state.ecAnnee && this.state.ecSerie) {
            const ecCleCalcule = this.cleDUM(this.state.ecRegime, this.state.ecSerie);
            if (ecCleCalcule === this.state.ecCle) {
                //add  call service to get EC
                const data = {
                    bureauAEC: this.state.ecBureau,
                    regimeAEC: this.state.ecRegime,
                    anneeAEC: this.state.ecAnnee,
                    serieAEC: this.state.ecSerie,
                };
                this.props.onAjouter(data);

            }
            this.setState({ ecCleCalcule: ecCleCalcule });
        }
    }


    deleteEC = (row, index) => {
        this.props.onDelete(row, index);
    };
    // render ligne EC
    buildLigneEC = () => {
        return (
            <View style={styles.containerInputsWithBorder}>
                <View style={styles.decisionContainerRB}>
                    <Text style={styles.row}>Etat de chargement</Text>
                </View>
                <View style={{ margin: 4 }}>
                    <View>
                        <TextInput
                            error={this.hasErrors('ecBureau')}
                            maxLength={3}
                            keyboardType={'number-pad'}
                            value={this.state.ecBureau}
                            label={translate('transverse.bureau')}
                            onChangeText={(val) => this.onChangeInput({ ecBureau: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    'ecBureau': event.nativeEvent.text,
                                    maxLength: 3,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('ecBureau')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.bureau'),
                            })}
                        </HelperText>
                    </View>

                    <View>
                        <TextInput
                            error={this.hasErrors('ecRegime')}
                            maxLength={3}
                            keyboardType={'number-pad'}
                            value={this.state.ecRegime}
                            disabled={true}
                            label={translate('transverse.regime')}
                            onChangeText={(val) => this.onChangeInput({ ecRegime: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    ecRegime: event.nativeEvent.text,
                                    maxLength: 3,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('ecRegime')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.regime'),
                            })}
                        </HelperText>
                    </View>

                    <View>
                        <TextInput
                            error={this.hasErrors('ecAnnee')}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={this.state.ecAnnee}
                            label={translate('transverse.annee')}
                            onChangeText={(val) => this.onChangeInput({ ecAnnee: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    ecAnnee: event.nativeEvent.text,
                                    maxLength: 4,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('ecAnnee')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.annee'),
                            })}
                        </HelperText>
                    </View>

                    <View>
                        <TextInput
                            error={this.hasErrors('ecSerie')}
                            maxLength={7}
                            keyboardType={'number-pad'}
                            value={this.state.ecSerie}
                            label={translate('transverse.serie')}
                            onChangeText={(val) => this.onChangeInput({ ecSerie: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    ecSerie: event.nativeEvent.text,
                                    maxLength: 7,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('ecSerie')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.serie'),
                            })}
                        </HelperText>
                    </View>
                    <View >
                        <TextInput
                            error={this.isCleValide('ecCle', 'ecCleCalcule')}
                            maxLength={1}
                            autoCapitalize={'characters'}
                            value={this.state.ecCle}
                            label={translate('transverse.cle')}
                            onChangeText={(val) => this.onChangeInputCle(val, 'ecCle')}
                            style={CustomStyleSheet.mediumInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            style={styles.cleHelperMsg}
                            visible={this.isCleValide('ecCle', 'ecCleCalcule')}>
                            {translate('errors.cleNotValid', {
                                cle: this.state.ecCleCalcule,
                            })}
                        </HelperText>
                    </View>
                    <View style={styles.containerActionBtn}>
                        <ComBadrButtonComp
                            style={styles.actionBtn}
                            onPress={() => {
                                this.ajouterEC();
                            }}
                            text={'Ajouter'}
                        />
                    </View>
                </View>
            </View>
        );

    }
    render = () => {
        const listEC = this.props.listEC;
        if (this.props.disabled) {
            this.composantTablesColsForEC.splice(0, 1);
        }
        return (
            <CardBox style={styles.cardBox}>
                <Accordion
                    badr
                    title={'Liste Etat de chargement '}
                    expanded>
                    <Text style={styles.nombreResult}>
                        {'Liste Etat de chargement '} :
                        <Text style={styles.libelle}>
                            {'    ' + listEC.length}
                        </Text>
                    </Text>
                    <ComBasicDataTableComp
                        badr
                        onRef={(ref) => (this.badrComposantsTable = ref)}
                        hasId={false}
                        id="idComposantEC"
                        rows={listEC}
                        cols={this.composantTablesColsForEC}
                        onItemSelected={this.onComposantSelected}
                        totalElements={
                            listEC
                        }
                        maxResultsPerPage={5}
                        paginate={true}
                    />
                    <View style={styles.containerActionBtn}>
                        {!this.props.disabled && (
                            <ComBadrButtonComp
                                style={styles.actionBtn}
                                disabled={false}
                                onPress={() => {
                                    this.nouveauEC();
                                }}
                                text={translate('transverse.nouveau')}
                            />
                        )}

                    </View>
                    {/* add new EC */}
                    {this.state.afficherNouveauEC && this.buildLigneEC()}


                </Accordion>
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