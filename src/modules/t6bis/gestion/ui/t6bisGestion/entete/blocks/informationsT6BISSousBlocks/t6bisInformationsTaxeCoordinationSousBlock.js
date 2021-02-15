import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrDatePickerComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import styles from "../../../../../style/t6bisGestionStyle";
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { Col, Row } from 'react-native-easy-grid';
import { HelperText, TextInput } from 'react-native-paper';
import { stringEmpty } from '../../../../../../utils/t6bisUtils';
import * as TbisConstantes from '../../../../../../utils/t6bisConstants';





class T6bisInformationsTaxeCoordinationSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            numeroTriptyque: this.props.t6bis?.numeroTriptyque,
            genre: this.props.t6bis?.genre,
            genreCode: null,
            immatriculation: this.props.t6bis?.immatriculation,
            dateEntree: (this.props.t6bis?.dateEntree) ? new Date(this.props.t6bis?.dateEntree) : '',
            dateSortie: (this.props.t6bis?.dateSortie) ? new Date(this.props.t6bis?.dateSortie) : '',
            ptc: this.props.t6bis?.ptc,
            acNationalite: this.props.fieldsetcontext?.paysOrigine.nomPays,
            typeMoyenPaiement: this.props.t6bis?.typeMoyenPaiementµ?.code

        };
    }

    onChangeGenre(value) {

        if (value?.code) {
            this.setState({ genre: value.libelle, genreCode: value.code });
            this.props.t6bis.genre = value.libelle;
            this.props.t6bis.genreCode = value.code;
        } else {
            this.setState({ genre: null, genreCode: null });
            this.props.t6bis.genre = null;
            this.props.t6bis.genreCode = null;
        }
    }



    onDateEntreeChanged = (date) => {
        this.setState({ dateEntree: date });
        this.props.t6bis.dateEntree = date;
    }

    onDateSortieChanged = (date) => {
        this.setState({ dateSortie: date });
        this.props.t6bis.dateSortie = date;
    }

    handlePaysChanged = (pays) => {
        this.setState({ acNationalite: pays.libelle });
        this.props.t6bis.paysOrigine = pays.code;
        if (this.props.fieldsetcontext) {
            this.props.fieldsetcontext.paysOrigine = pays;
        }
    }




    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);

        return (
            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.title')} expanded={false}>
                <View>


                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.numeroTriptyque')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.numeroTriptyque)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.numeroTriptyque')}
                                value={this.state.numeroTriptyque}
                                onChangeText={(text) => {
                                    this.setState({ numeroTriptyque: text });
                                    this.props.t6bis.numeroTriptyque = text;
                                }}
                            />
                        </Col>


                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.genre')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.genre)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrItemsPickerComp
                                disabled={this.props.readOnly}
                                style={styles.labelTextStyle}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.genre')}
                                selectedValue={this.state.genreCode}
                                selected={this.state.genreCode}
                                items={TbisConstantes.GENRES}
                                onValueChanged={(value, index) => this.onChangeGenre(value)
                                } />
                        </Col>


                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.immatriculation')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.immatriculation)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.immatriculation')}
                                value={this.state.immatriculation}
                                onChangeText={(text) => this.setState({ immatriculation: text })}
                            />
                        </Col>


                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.dateEntree')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.dateEntree.toString())}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrDatePickerComp
                                disabled={this.props.readOnly}
                                labelDate={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.dateEntree')}
                                value={this.state.dateEntree}
                                dateFormat="DD/MM/YYYY"
                                onDateChanged={this.onDateEntreeChanged}
                                inputStyle={styles.textInputsStyle} />
                        </Col>


                    </Row>

                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.dateSortie')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.dateSortie.toString())}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrDatePickerComp
                                disabled={this.props.readOnly}
                                labelDate={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.dateSortie')}
                                value={this.state.dateSortie}
                                dateFormat="DD/MM/YYYY"
                                onDateChanged={this.onDateSortieChanged}
                                inputStyle={styles.textInputsStyle} />
                        </Col>


                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.poidsTotalEnChargePTC')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.ptc)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                keyboardType={'number-pad'}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.poidsTotalEnChargePTC')}
                                value={this.state.ptc}
                                onChangeText={(text) => {
                                    this.setState({ ptc: text });
                                    this.props.t6bis.ptc = text;
                                }}
                            />
                        </Col>


                    </Row>

                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.paysOrigine')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.acNationalite)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrAutoCompleteChipsComp
                                code="code"
                                disabled={this.props.readOnly}
                                placeholder={translate(
                                    't6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.paysOrigine'
                                )}
                                selected={this.state.acNationalite}
                                maxItems={3}
                                libelle="libelle"
                                command="getCmbPays"
                                paramName="libellePays"
                                onDemand={true}
                                searchZoneFirst={false}
                                onValueChange={this.handlePaysChanged}
                            />
                        </Col>


                    </Row>

                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.typeMoyenPaiement')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.typeMoyenPaiement)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>
                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrItemsPickerComp
                                disabled={this.props.readOnly}
                                style={styles.labelTextStyle}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.choisirElement')}
                                selectedValue={this.state.typeMoyenPaiement}
                                selected={this.state.typeMoyenPaiement}
                                items={this.props.listmoyenpaiement}
                                onValueChanged={(value, index) => {
                                    this.setState({ typeMoyenPaiement: value.code });
                                    this.props.t6bis.typeMoyenPaiement = value;
                                }

                                }
                            />
                        </Col>
                    </Row>



                </View>
            </ComAccordionComp>

        );
    }
}





export default T6bisInformationsTaxeCoordinationSousBlock;
