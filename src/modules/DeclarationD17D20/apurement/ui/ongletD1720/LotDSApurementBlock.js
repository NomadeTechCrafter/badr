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


export class LotDSApurementBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorMsg: false,
            // Ref Conaissement
            afficherNouveauLot: false,
            lotBureau: '',
            lotRegime: '',
            lotAnnee: '',
            lotSerie: '',
            lotCle: '',
            lotCleCalcule: '',
            codeLieuChargement: '',
            libelleLieuChargement: '',
            referenceLot: '',
            codeTypeDS: '',
            libelleTypeDS: '',
        };
        this.composantTablesColsForLot = this.buildComposantsColumnsForLot();
    }
    // Columns for connaissements
    buildComposantsColumnsForLot = () => {
        return [
            {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                attrCondition: 'idApurement',
                action: (row, index) => this.deleteConnaissement(row, index),
            },
            {
                code: 'N',
                libelle: 'No',
                width: 160,
            },
            {
                code: 'TypeDS',
                libelle: 'Type DS',
                width: 160,
            },
            {
                code: 'ReferenceDS',
                libelle: 'Référence DS',
                width: 200,
            },
            {
                code: 'LieuChargement',
                libelle: 'Lieu de chargement',
                width: 150,
            },
            {
                code: 'referenceLot',
                libelle: 'Référence lot',
                width: 150,
            },
            {
                code: 'PoidsBrut',
                libelle: 'Poids brut',
                width: 100,
            },
            {
                code: 'NbreContenant',
                libelle: 'Nbre contenant',
                width: 100,
            }
        ];
    };
    nouveauLot() {
        this.setState({
            // Ref Conaissement
            afficherNouveauLot: true,
            lotBureau: '',
            lotRegime: '',
            lotAnnee: '',
            lotSerie: '',
            lotCle: '',
            codeLieuChargement: '',
            libelleLieuChargement: '',
            referenceLot: '',
            codeTypeDS: '',
            libelleTypeDS: '',
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

    handleTypeDSChanged = (selectedValue, selectedIndex, item) => {
        this.setState({
            codeTypeDS: selectedValue,
            libelleTypeDS: item.libelle
        });
    };

    handleLieuChargementChanged = (selectedValue, selectedIndex, item) => {
        if (selectedIndex !== 0) {
            this.setState({
                codeLieuChargement: selectedValue.code,
                libelleLieuChargement: selectedValue.libelle
            });
        }
    };
    onChangeRefLot = (cle, cleState) => {
        this.setState({ [cleState]: cle });
    };
     //Ajouter un lot dans le tableau
    ajouterLot = () => {
        this.setState({
            showErrorMsg: true
        });
        if (this.state.lotBureau && this.state.lotRegime && this.state.lotAnnee && this.state.lotSerie && this.state.codeLieuChargement && this.state.referenceLot) {
            const lotCleCalcule = this.cleDUM(this.state.lotRegime, this.state.lotSerie);
            if (lotCleCalcule === this.state.lotCle) {
                //Call REst  to get Lot command ded.recupererLot

                const data = {
                    typeDS: this.state.codeTypeDS,
                    bureauDS: this.state.lotBureau,
                    regimeDS: this.state.lotRegime,
                    anneeDS: this.state.lotAnnee,
                    serieDS: this.state.lotSerie,
                    referenceLot: this.state.referenceLot,
                    codeLieuChargement: this.state.codeLieuChargement,
                };
                const refDS = this.state.lotBureau + this.state.lotRegime + this.state.lotAnnee + this.state.lotSerie;
                const libelleTypeDS = this.state.libelleTypeDS;
                const libelleLieuChargement = this.state.libelleLieuChargement;
                this.props.onAjouter(data, refDS, libelleTypeDS, libelleLieuChargement);

            }
            this.setState({
                lotCleCalcule: lotCleCalcule
            });
        }

    }
    
    deleteConnaissement = (row, index) => {
        this.props.onDelete(row, index);

    };
    // render ligne DS
    buildLigneLot = () => {
        return (
            <View style={styles.fabContainer}>
                <View >
                    <ComBadrPickerComp
                        toggle={false}
                        onRef={(ref) => (this.state.codeTypeDS = ref)}
                        key="codeTypeDS"
                        style={CustomStyleSheet.badrPicker}
                        titleStyle={styles.row}
                        title={'Type DS'}
                        cle="code"
                        libelle="libelle"
                        module="REF_LIB"
                        command="getCmbAllTypeDS"
                        onValueChange={(selectedValue, selectedIndex, item) =>
                            this.handleTypeDSChanged(selectedValue, selectedIndex, item)
                        }
                        param=""
                        typeService="SP"
                        storeWithKey="codeTypeDS"
                        storeLibelleWithKey="typeDS"
                    />
                </View>
                <View style={styles.containerInputsWithBorder}>
                    <View style={styles.decisionContainerRB}>
                        <Text style={styles.row}>Déclaration sommaire</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            error={() => { this.hasErrors('lotBureau') }}
                            maxLength={3}
                            keyboardType={'number-pad'}
                            value={this.state.lotBureau}
                            label={translate('transverse.bureau')}
                            onChangeText={(val) => this.onChangeInput({ lotBureau: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    lotBureau: event.nativeEvent.text,
                                    maxLength: 3,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('lotBureau')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.bureau'),
                            })}
                        </HelperText>
                    </View>

                    <View>
                        <TextInput
                            error={() => { this.hasErrors('lotRegime') }}
                            maxLength={3}
                            keyboardType={'number-pad'}
                            value={this.state.lotRegime}
                            label={translate('transverse.regime')}
                            onChangeText={(val) => this.onChangeInput({ lotRegime: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    lotRegime: event.nativeEvent.text,
                                    maxLength: 3,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('lotRegime')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.regime'),
                            })}
                        </HelperText>
                    </View>

                    <View>
                        <TextInput
                            error={() => { this.hasErrors('lotAnnee') }}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={this.state.lotAnnee}
                            label={translate('transverse.annee')}
                            onChangeText={(val) => this.onChangeInput({ lotAnnee: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    lotAnnee: event.nativeEvent.text,
                                    maxLength: 4,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('lotAnnee')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.annee'),
                            })}
                        </HelperText>
                    </View>

                    <View>
                        <TextInput
                            error={() => { this.hasErrors('lotSerie') }}
                            maxLength={7}
                            keyboardType={'number-pad'}
                            value={this.state.lotSerie}
                            label={translate('transverse.serie')}
                            onChangeText={(val) => this.onChangeInput({ lotSerie: val })}
                            onEndEditing={(event) =>
                                this.addZeros({
                                    lotSerie: event.nativeEvent.text,
                                    maxLength: 7,
                                })
                            }
                            style={CustomStyleSheet.largeInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('lotSerie')}>
                            {translate('errors.donneeObligatoire', {
                                champ: translate('transverse.serie'),
                            })}
                        </HelperText>
                    </View>
                    <View >
                        <TextInput
                            maxLength={1}
                            autoCapitalize={'characters'}
                            value={this.state.lotCle}
                            label={translate('transverse.cle')}
                            onChangeText={(val) => this.onChangeInputCle(val, 'lotCle')}
                            style={CustomStyleSheet.mediumInput}
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            style={styles.cleHelperMsg}
                            visible={this.isCleValide('lotCle', 'lotCleCalcule')}>
                            {translate('errors.cleNotValid', {
                                cle: this.state.lotCleCalcule,
                            })}
                        </HelperText>
                    </View>
                </View>
                <View style={styles.containerInputsWithBorder}>
                    <View style={styles.decisionContainerRB}>
                        <Text style={styles.row}>Lieu de Chargement</Text>
                    </View>
                    <View style={styles.row} >


                        <ComBadrAutoCompleteChipsComp
                            placeholder={'Lieu de chargement'}
                            selected={this.state.codeLieuChargement}
                            code="code"
                            maxItems={5}
                            libelle="libelle"
                            command="getCmbLieuChargement"
                            module="REF_LIB"
                            onDemand={true}
                            initialValue={{ code: '' }}
                            searchZoneFirst={false}
                            onValueChange={(item, id) => this.handleLieuChargementChanged(item, id)}
                        />
                    </View>
                </View>


                {/* <ComBadrAutoCompleteComp
                placeholder={''}
                onRef={(ref) => (this.code = ref)}
                libelle=""
                key="code"
                handleSelectItem={this.props.handlenatureMarchnadise}
                command="getNaturesMarchandise"
                styleInput={{ width: '100%', marginBottom: 30 }}
              //style={}
              /> */}



                {/* <ComBadrAutoCompleteComp
            onRef={(ref) => this.handleSelectValue(ref)}
            libelle="Lieu de chargement"
            key="getCmbLieuChargement"
            handleSelectItem={(item, id) => this.handleLieuChargementChanged(item, id)}
            command="getCmbLieuChargement"
            module='REF_LIB'
            placeHolder={'Lieu de chargement'}

          /> */}
                <View style={styles.containerInputsWithBorder}>
                    <View style={styles.decisionContainerRB}>
                        <Text style={styles.row}>Référence Lot</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            maxLength={50}
                            autoCapitalize={'characters'}
                            value={this.state.referenceLot}
                            label={''}
                            onChangeText={(val) => this.onChangeRefLot(val, 'referenceLot')}
                            style={CustomStyleSheet.largeInput}
                        />
                    </View>
                </View>
                <View style={styles.containerActionBtn}>
                    <ComBadrButtonComp
                        style={styles.actionBtn}
                        onPress={() => {
                            this.ajouterLot();
                        }}
                        text={'Ajouter'}
                    />
                </View>
            </View>

        );
    };
    render = () => {
        const listLot = this.props.listLot;
        if (this.props.disabled) {
            this.composantTablesColsForLot.splice(0, 1);
        }
        return (
            <CardBox style={styles.cardBox}>
                <Accordion
                    badr
                    title={'Liste Lots DS '}
                    expanded>
                    <Text style={styles.nombreResult}>
                        {'Liste Lots DS '} :
                        <Text style={styles.libelle}>
                            {'    ' + listLot.length}
                        </Text>
                    </Text>
                    <ComBasicDataTableComp
                        badr
                        onRef={(ref) => (this.badrComposantsTable = ref)}
                        hasId={false}
                        id="idComposantLot"
                        rows={listLot}
                        cols={this.composantTablesColsForLot}
                        onItemSelected={this.onComposantSelected}
                        totalElements={
                            listLot
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
                                    this.nouveauLot();
                                }}
                                text={translate('transverse.nouveau')}
                            />
                        )
                        }
                    </View>

                    {/* add new Lot */}
                    {this.state.afficherNouveauLot && (
                        this.buildLigneLot()
                    )
                    }

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