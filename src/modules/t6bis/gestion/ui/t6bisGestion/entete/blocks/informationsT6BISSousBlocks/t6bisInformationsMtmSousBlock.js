import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import styles from "../../../../../style/t6bisGestionStyle";
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';





class T6bisInformationsMtmSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            numeroRecepisse: this.props.t6bis?.numeroRecepisse,
            immatriculationMoyenTransport: this.props.t6bis?.immatriculationMoyenTransport,
            numeroVol: this.props.t6bis?.numeroVol,
            typeMoyenPaiement: this.props.t6bis?.typeMoyenPaiement
        };
    }








    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);

        return (
            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.title')} expanded={false}>
                    <View>


                        <Row size={200}>
                            <Col size={40} style={styles.labelContainer}>
                                <Text style={styles.labelTextStyle}>
                                    {translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroRecepisse')}
                                </Text>

                            </Col>

                            <Col size={160} style={styles.labelContainer}>
                                <TextInput
                                    mode="outlined"
                                    keyboardType={'number-pad'}
                                    label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroRecepisse')}
                                    value={this.state.numeroRecepisse}
                                    onChangeText={(text) => this.setState({ numeroRecepisse: text })}
                                />
                            </Col>


                        </Row>
                        <Row size={200}>

                            <Col size={40} style={styles.labelContainer}>
                                <Text style={styles.labelTextStyle}>
                                    {translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.immatriculationMoyenTransport')}
                                </Text>

                            </Col>

                            <Col size={60} style={styles.labelContainer}>
                                <TextInput
                                    mode="outlined"
                                    label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.immatriculationMoyenTransport')}
                                    value={this.state.immatriculationMoyenTransport}
                                    onChangeText={(text) => this.setState({ immatriculationMoyenTransport: text })}
                                />
                            </Col>
                            <Col size={40} style={styles.labelContainer}>
                                <Text style={styles.labelTextStyle}>
                                    {translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroVol')}
                                </Text>

                            </Col>

                            <Col size={60} style={styles.labelContainer}>
                                <TextInput
                                    mode="outlined"
                                    keyboardType={'number-pad'}
                                    label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroVol')}
                                    value={this.state.numeroVol}
                                    onChangeText={(text) => this.setState({ numeroVol: text })}
                                />
                            </Col>


                        </Row>

                        <Row size={200}>
                            <Col size={30} style={styles.labelContainer}>
                                <Text style={styles.labelTextStyle}>
                                    {translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.typeMoyenPaiement')}
                                </Text>

                            </Col>
                            <Col size={70} style={styles.labelContainer}>
                                <ComBadrItemsPickerComp
                                    style={styles.labelTextStyle}
                                    label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.mtm.choisirElement')}
                                    selectedValue={this.state.typeMoyenPaiement}
                                    items={this.props.listmoyenpaiement}
                                    onValueChanged={(value, index) =>
                                        this.setState({ typeMoyenPaiement: value.code })
                                    }
                                />
                            </Col>
                        </Row>




                </View>
                </ComAccordionComp>











        );
    }
}





export default T6bisInformationsMtmSousBlock;
