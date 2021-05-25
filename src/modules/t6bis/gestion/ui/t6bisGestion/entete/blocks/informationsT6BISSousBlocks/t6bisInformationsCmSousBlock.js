import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import styles from "../../../../../style/t6bisGestionStyle";
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import { isCreation } from '../../../../../../utils/t6bisUtils';





class T6bisInformationsCmSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            numeroRecepisse: isCreation() ? '' : this.props.t6bis?.numeroRecepisse,
            immatriculationMoyenTransport: isCreation() ? '' : this.props.t6bis?.immatriculationMoyenTransport,
            typeMoyenPaiement: isCreation() ? '' : this.props.t6bis?.typeMoyenPaiement?.code
        };
    }








    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);

        return (
            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.title')} expanded={false}>
                <View>


                    <Row size={200}>
                        <Col size={60} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.numeroRecepisse')}
                            </Text>

                        </Col>

                        <Col size={140} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                keyboardType={'number-pad'}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.numeroRecepisse')}
                                value={this.state.numeroRecepisse}
                                onChangeText={(text) => {
                                    this.setState({ numeroRecepisse: text });
                                    this.props.t6bis.numeroRecepisse = text;
                                }}
                            />
                        </Col>


                    </Row>
                    <Row size={200}>

                        <Col size={60} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.immatriculationMoyenTransport')}
                            </Text>

                        </Col>

                        <Col size={140} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.immatriculationMoyenTransport')}
                                value={this.state.immatriculationMoyenTransport}
                                onChangeText={(text) => {
                                    this.setState({ immatriculationMoyenTransport: text });
                                    this.props.t6bis.immatriculationMoyenTransport = text;

                                }}
                            />
                        </Col>



                    </Row>

                    <Row size={200}>
                        <Col size={60} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.typeMoyenPaiement')}
                            </Text>

                        </Col>
                        <Col size={140} style={styles.labelContainer}>
                            <ComBadrItemsPickerComp
                                style={styles.labelTextStyle}
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.cm.choisirElement')}
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





export default T6bisInformationsCmSousBlock;
