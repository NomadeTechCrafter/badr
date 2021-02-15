import React from 'react';
import { Text, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { HelperText, TextInput } from 'react-native-paper';
import { ComAccordionComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { stringEmpty } from '../../../../../../utils/t6bisUtils';
import styles from "../../../../../style/t6bisGestionStyle";





class T6bisInformationsContainteCorpsSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            numeroTriptyque: this.props.t6bis?.numeroTriptyque,
            typeMoyenPaiement: this.props.t6bis?.typeMoyenPaiement?.code

        };
    }








    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);

        return (
            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.title')} expanded={false}>
                <View>


                    <Row size={200}>
                        <Col size={70} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.referenceContainteCorps')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.refContrainteCorps)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.valeurObligatoire')}
                            </HelperText>

                        </Col>

                        <Col size={130} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.referenceContainteCorps')}
                                value={this.state.refContrainteCorps}
                                onChangeText={(text) => {
                                    this.setState({ refContrainteCorps: text });
                                    this.props.t6bis.refContrainteCorps = text;
                                }
                                }
                            />
                        </Col>


                    </Row>

                    <Row size={200}>
                        <Col size={70} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.typeMoyenPaiement')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringEmpty(this.state.typeMoyenPaiement)}>
                                {translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.valeurObligatoire')}
                            </HelperText>

                        </Col>
                        <Col size={130} style={styles.labelContainer}>
                            <ComBadrItemsPickerComp
                                style={styles.labelTextStyle}
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.entete.informationst6bisBlock.containteCorps.choisirElement')}
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





export default T6bisInformationsContainteCorpsSousBlock;
