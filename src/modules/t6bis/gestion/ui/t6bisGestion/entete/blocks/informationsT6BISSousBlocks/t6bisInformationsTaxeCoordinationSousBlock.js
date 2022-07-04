import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrDatePickerComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import styles from "../../../../../style/t6bisGestionStyle";
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { Col, Row } from 'react-native-easy-grid';
import { HelperText, TextInput } from 'react-native-paper';
import { isCreation, stringNotEmpty } from '../../../../../../utils/t6bisUtils';
import * as TbisConstantes from '../../../../../../utils/t6bisConstants';
import moment from 'moment';





const initialState =  {
   numeroTriptyque: '',
   genre: '',
   genreCode: null,
   immatriculation: '',
   dateEntree:  "",
   dateSortie:  '',
   ptc:  '',
   acNationalite: null,
   typeMoyenPaiement:  ''
};
class T6bisInformationsTaxeCoordinationSousBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numeroTriptyque: !isCreation()?this.props.t6bis?.numeroTriptyque:'',
            genre: !isCreation() ? this.props.t6bis?.genre:'',
            genreCode: !isCreation() ? this.props.t6bis?.genre : '',
            immatriculation: !isCreation()?this.props.t6bis?.immatriculation:'',
            dateEntree: !isCreation() ?(this.props.t6bis?.dateEntree) :"",
            dateSortie: !isCreation() ? (this.props.t6bis?.dateSortie):'',
            ptc: !isCreation() ? (this.props.t6bis?.ptc):'',
            acNationalite: !isCreation() ? (this.props.t6bis?.paysOrigine):null,
            typeMoyenPaiement: !isCreation() ? (this.props.t6bis?.typeMoyenPaiement?.code):''

        };
    }

    componentDidMount =  () => {
        this.state = initialState;
        console.log('T6bisInformationsTaxeCoordinationSousBlock IS LOADING...');
    }


    onChangeGenre(value) {

        if (value?.code) {
            this.setState({ genre: value.libelle, genreCode: value.code });
            this.props.t6bis.genre = value.libelle;
        } else {
            this.setState({ genre: null, genreCode: null });
            this.props.t6bis.genre = null;
        }
    }



    onDateEntreeChanged = (date) => {
        console.log('onDateEntreeChanged : ', date);
        this.setState({ dateEntree: date });
        this.props.t6bis.dateEntree = date;
    }

    onDateSortieChanged = (date) => {
        this.setState({ dateSortie: date });
        this.props.t6bis.dateSortie = date;
    }

    handlePaysChanged = (pays) => {
        this.setState({ acNationalite: pays?.libelle });
        this.props.t6bis.paysOrigine = pays?.code;
        if (this.props.fieldsetcontext) {
            this.props.fieldsetcontext.paysOrigine = pays;
        }
    }




    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS 16022021--------------------yassine ', this.props);

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
                                visible={!stringNotEmpty(this.state.numeroTriptyque)}>
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
                                visible={!stringNotEmpty(this.state.genre)}>
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
                                visible={!stringNotEmpty(this.state.immatriculation)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.immatriculation')}
                                value={this.state.immatriculation}
                                onChangeText={(text) => {
                                    this.setState({ immatriculation: text });
                                    this.props.t6bis.immatriculation = text;
                                }}
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
                                visible={!stringNotEmpty(this.state.dateEntree.toString())}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrDatePickerComp
                                disabled={this.props.readOnly}
                                labelDate={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.dateEntree')}
                                value={this.state.dateEntree ? moment(this.state.dateEntree, 'DD/MM/YYYY', true) : ''}
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
                                visible={!stringNotEmpty(this.state.dateSortie.toString())}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrDatePickerComp
                                disabled={this.props.readOnly}
                                labelDate={translate('t6bisGestion.tabs.entete.informationst6bisBlock.taxeCoordination.dateSortie')}
                                value={this.state.dateSortie ? moment(this.state.dateSortie, 'DD/MM/YYYY', true) : ''}
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
                                visible={!stringNotEmpty(this.state.ptc)}>
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
                                visible={!stringNotEmpty(this.state.acNationalite)}>
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
                                visible={!stringNotEmpty(this.state.typeMoyenPaiement)}>
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

                                    this.props.parentCallback(value?.code);
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
