import React from 'react';
import {Text, View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
} from '../../../../../../../../commons/component';
import styles from '../../../../../style/t6bisGestionStyle';
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import {Col, Row} from 'react-native-easy-grid';
import {TextInput} from 'react-native-paper';
import {isCreation} from '../../../../../../utils/t6bisUtils';

class T6bisInformationsMtmSousBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numeroRecepisse: isCreation() ? '' : this.props.t6bis?.numeroRecepisse,
      immatriculationMoyenTransport: isCreation()
        ? ''
        : this.props.t6bis?.immatriculationMoyenTransport,
      numeroVol: isCreation() ? '' : this.props.t6bis?.numeroVol,
      typeMoyenPaiement: isCreation()
        ? ''
        : this.props.t6bis?.typeMoyenPaiement?.code,
    };
  }

  render() {
    console.log('this.props.readOnly :', this.props.readOnly);
    return (
      <ComAccordionComp
        title={translate(
          't6bisGestion.tabs.entete.informationst6bisBlock.mtm.title',
        )}
        expanded={false}>
        <View>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroRecepisse',
                )}
              </Text>
            </Col>

            <Col size={160} style={styles.labelContainer}>
              <TextInput
                disabled={this.props.readOnly}
                mode="outlined"
                keyboardType={'number-pad'}
                label={translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroRecepisse',
                )}
                value={this.state.numeroRecepisse}
                onChangeText={(text) => {
                  this.setState({numeroRecepisse: text});
                  this.props.t6bis.numeroRecepisse = text;
                }}
              />
            </Col>
          </Row>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.immatriculationMoyenTransport',
                )}
              </Text>
            </Col>

            <Col size={60} style={styles.labelContainer}>
              <TextInput
                disabled={this.props.readOnly}
                mode="outlined"
                label={translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.immatriculationMoyenTransport',
                )}
                value={this.state.immatriculationMoyenTransport}
                onChangeText={(text) => {
                  this.setState({immatriculationMoyenTransport: text});
                  this.props.t6bis.immatriculationMoyenTransport = text;
                }}
              />
            </Col>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroVol',
                )}
              </Text>
            </Col>

            <Col size={60} style={styles.labelContainer}>
              <TextInput
                disabled={this.props.readOnly}
                mode="outlined"
                keyboardType={'number-pad'}
                label={translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.numeroVol',
                )}
                value={this.state.numeroVol}
                onChangeText={(text) => {
                  this.setState({numeroVol: text});
                  this.props.t6bis.numeroVol = text;
                }}
              />
            </Col>
          </Row>

          <Row size={200}>
            <Col size={30} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.typeMoyenPaiement',
                )}
                {this.props.readOnly}
              </Text>
            </Col>
            <Col size={70} style={styles.labelContainer}>
              <ComBadrItemsPickerComp
                disabled={this.props.readOnly}
                style={styles.labelTextStyle}
                label={translate(
                  't6bisGestion.tabs.entete.informationst6bisBlock.mtm.choisirElement',
                )}
                selectedValue={this.state.typeMoyenPaiement}
                items={this.props.listmoyenpaiement}
                onValueChanged={(value, index) => {
                  this.setState({typeMoyenPaiement: value?.code});
                  this.props.t6bis.typeMoyenPaiement = value;
				  this.props.parentCallback(value?.code);
                }}
              />
            </Col>
          </Row>
        </View>
      </ComAccordionComp>
    );
  }
}

export default T6bisInformationsMtmSousBlock;
