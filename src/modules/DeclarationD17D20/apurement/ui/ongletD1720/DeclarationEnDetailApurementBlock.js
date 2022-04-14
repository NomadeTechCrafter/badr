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


export class DeclarationEnDetailApurementBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorMsg: false,
            // Ref DUM
            nouveauDUM: false,
            dumBureau: '',
            dumRegime: '',
            dumAnnee: '',
            dumSerie: '',
            dumCle: '',
            dumCleCalcule: ''
        };
        this.composantTablesColsForDUM = this.buildComposantsColumnsForDUM();
    }
    // Columns for DUM
    buildComposantsColumnsForDUM = () => {
        return [
            {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                attrCondition: 'idApurement',
                action: (row, index) => this.deleteDUM(row, index),
            },
            {
                code: 'referenceEnregistrement',
                libelle: translate('vuEmbarquee.decEnDetail.ref'),
                width: 160,
            },
            {
                code: 'operateurDeclarant',
                libelle: translate('vuEmbarquee.decEnDetail.operateur'),
                width: 160,
            },
            {
                code: 'formatedDateenregistrement',
                libelle: translate('vuEmbarquee.dateEnregistrement'),
                width: 200,
            },
            {
                code: 'nombreContenants',
                libelle: translate('vuEmbarquee.decEnDetail.nbreContenant'),
                width: 150,
            },
            {
                code: 'poidsBruts',
                libelle: translate('vuEmbarquee.decEnDetail.poidsBrut'),
                width: 100,
            },
            {
                code: 'poidsNet',
                libelle: translate('vuEmbarquee.decEnDetail.poidsNet'),
                width: 100,
            },
            {
                code: 'valeurDeclaree',
                libelle: translate('vuEmbarquee.decEnDetail.valDeclaree'),
                width: 100,
            },
        ];
    };
    nouveau = () => {
        this.setState({
            nouveauDUM: true,
            // Ref DUM
            dumBureau: '',
            dumRegime: '',
            dumAnnee: '',
            dumSerie: '',
            dumCle: '',
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
    // ajouter une DUM dans le tableau
    ajouterDUM = () => {
        this.setState({
            showErrorMsg: true
        });
        //Validate Inputs 
        if (this.state.dumBureau && this.state.dumRegime && this.state.dumAnnee && this.state.dumSerie) {
            const dumCleCalcule = this.cleDUM(this.state.dumRegime, this.state.dumSerie)
            if (dumCleCalcule === this.state.dumCle) {
                //Call REST API
                const refDUM = this.state.dumBureau + this.state.dumRegime + this.state.dumAnnee + this.state.dumSerie;
                const regimeTryptique = this.props.regimeTryptique;
                const data = {
                    refDUM: refDUM,
                    refRegimeTryptique: regimeTryptique
                };

              
                this.props.onAjouter(data);
            }
            this.setState({
                dumCleCalcule: dumCleCalcule
            });
        }

    }

    deleteDUM = (row, index) => {
        this.props.onDelete(row, index);
    };
    // render ligne DUM
    buildLigneDUM = () => {
        return (
            <View style={styles.containerInputsWithBorder}>
                <View style={styles.decisionContainerRB}>
                    <Text style={styles.row}>Déclaration en détail</Text>
                </View>
                <View style={{ margin: 10 }}>
                    <View>
                        <TextInput
                            error={this.hasErrors('dumBureau')}
                            maxLength={3}
                            keyboardType={'number-pad'}
                            value={this.state.dumBureau}
                            label={translate('transverse.bureau')}
                            onChangeText={(val) => this.onChangeInput({ dumBureau: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    'dumBureau': event.nativeEvent.text,
                                    maxLength: 3,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('dumBureau')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.bureau'),
                            })}
                        </HelperText>
                    </View>
                    <View>
                        <TextInput
                            error={this.hasErrors('dumRegime')}
                            maxLength={3}
                            keyboardType={'number-pad'}
                            value={this.state.dumRegime}
                            label={translate('transverse.regime')}
                            onChangeText={(val) => this.onChangeInput({ dumRegime: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    dumRegime: event.nativeEvent.text,
                                    maxLength: 3,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('dumRegime')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.regime'),
                            })}
                        </HelperText>
                    </View>
                    <View>
                        <TextInput
                            error={this.hasErrors('dumAnnee')}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={this.state.dumAnnee}
                            label={translate('transverse.annee')}
                            onChangeText={(val) => this.onChangeInput({ dumAnnee: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    dumAnnee: event.nativeEvent.text,
                                    maxLength: 4,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('dumAnnee')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.annee'),
                            })}
                        </HelperText>
                    </View>
                    <View>
                        <TextInput
                            error={this.hasErrors('dumSerie')}
                            maxLength={7}
                            keyboardType={'number-pad'}
                            value={this.state.dumSerie}
                            label={translate('transverse.serie')}
                            onChangeText={(val) => this.onChangeInput({ dumSerie: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    dumSerie: event.nativeEvent.text,
                                    maxLength: 7,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('dumSerie')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.serie'),
                            })}
                        </HelperText>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            error={this.isCleValide('dumCle', 'dumCleCalcule')}
                            maxLength={1}
                            autoCapitalize={'characters'}
                            value={this.state.dumCle}
                            label={translate('transverse.cle')}
                            onChangeText={(val) => this.onChangeInputCle(val, 'dumCle')}
                            style={CustomStyleSheet.mediumInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            style={styles.cleHelperMsg}
                            visible={this.isCleValide('dumCle', 'dumCleCalcule')}>
                            {translate('errors.cleNotValid', {
                                cle: this.state.dumCleCalcule,
                            })}
                        </HelperText>
                    </View>
                    <View style={styles.containerActionBtn}>
                        <ComBadrButtonComp
                            style={styles.actionBtn}
                            onPress={this.ajouterDUM}
                            text={'Ajouter'}
                        />
                    </View>
                </View>
            </View>

        );

    }
    render = () => {
        const listDUM = this.props.listDUM;
        if (this.props.disabled) {
            this.composantTablesColsForDUM.splice(0, 1);
        }
        return (
            <View>
                {/* This is the list of DUM */}
                <CardBox style={styles.cardBox}>
                    <Accordion
                        badr
                        title={'Liste des déclarations en détail '}
                        expanded>
                        <Text style={styles.nombreResult}>
                            {'Liste des déclarations '} :
                            <Text >
                                {'    ' + listDUM.length}
                            </Text>
                        </Text>
                        <ComBasicDataTableComp
                            badr
                            onRef={(ref) => (this.badrComposantsTable = ref)}
                            hasId={false}
                            id="idComposantDUM"
                            rows={listDUM}
                            cols={this.composantTablesColsForDUM}
                            onItemSelected={this.onComposantSelected}
                            totalElements={
                                listDUM
                            }
                            maxResultsPerPage={5}
                            paginate={true}
                        />
                        <View style={styles.containerActionBtn}>
                            {!this.props.disabled && (
                                <ComBadrButtonComp
                                    style={styles.actionBtn}
                                    disabled={false}
                                    onPress={() => { this.nouveau(); }}
                                    text={translate('transverse.nouveau')}
                                />
                            )}

                        </View>
                        {/* add new DUM */}
                        {this.state.nouveauDUM && this.buildLigneDUM()}


                    </Accordion>
                </CardBox>
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