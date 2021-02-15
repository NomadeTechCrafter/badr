import React from 'react';
import { Text, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { HelperText, TextInput } from 'react-native-paper';
import { ComAccordionComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { formatSerie, stringEmpty } from '../../../../../../utils/t6bisUtils';
import styles from "../../../../../style/t6bisGestionStyle";





class T6bisInformationsAmendeTransactionnelleSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            descriptifInfraction: this.props.t6bis?.descriptifInfraction,
            bureauAffaire: this.props.t6bis?.bureauAffaire,
            anneeAffaire: this.props.t6bis?.anneeAffaire,
            numeroSerieAffaire: this.props.t6bis?.numeroSerieAffaire,
            typeMoyenPaiement: this.props.t6bis?.typeMoyenPaiement?.code

        };
    }


    onBlurNumeroSerie(text) {
        this.setState({ numeroSerieAffaire: formatSerie(text) });
        this.props.t6bis.numeroSerieAffaire = formatSerie(text);
    }





    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);

        return (
            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.title')} expanded={false}>
                <View>



                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.descriptifInfraction')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.descriptifInfraction)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput

                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.descriptifInfraction')}
                                value={this.state.descriptifInfraction}
                                onChangeText={(text) => {
                                    this.setState({ descriptifInfraction: text });
                                    this.props.t6bis.descriptifInfraction = text;
                                
                                }}
                            />
                        </Col>


                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.referenceAffaire')}
                            </Text>


                        </Col>

                        <Col size={40} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                maxLength={3}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.bureau')}
                                value={this.state.bureauAffaire}
                                keyboardType={'number-pad'}
                                onChangeText={(text) => {
                                    this.setState({ bureauAffaire: text });
                                    this.props.t6bis.bureauAffaire = text;
                                }}
                            />
                        </Col>
                        <Col size={50} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                maxLength={4}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.annee')}
                                value={this.state.anneeAffaire}
                                keyboardType={'number-pad'}
                                onChangeText={(text) => {
                                    this.setState({ anneeAffaire: text });
                                    this.props.t6bis.anneeAffaire = text;
                                }}
                            />
                        </Col>
                        <Col size={70} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.serie')}
                                value={this.state.numeroSerieAffaire}
                                keyboardType={'number-pad'}
                                onEndEditing={(event) => this.onBlurNumeroSerie(event.nativeEvent.text)}
                            />
                        </Col>


                    </Row>

                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.typeMoyenPaiement')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.typeMoyenPaiement)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.valeurObligatoire')}
                            </HelperText>

                        </Col>
                        <Col size={160} style={styles.labelContainer}>
                            <ComBadrItemsPickerComp
                                style={styles.labelTextStyle}
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.amendeTransactionnelle.choisirElement')}
                                selectedValue={this.state.typeMoyenPaiement}
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





export default T6bisInformationsAmendeTransactionnelleSousBlock;
