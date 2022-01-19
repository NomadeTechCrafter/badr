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

class T6bisInformationsTpeMtmSousBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

        libTpe:''
    };
  }

  render() {
    console.log('this.props.readOnly :', this.props.readOnly);

    console.log('new statetpes',this.props);
    return (
      <ComAccordionComp
        title={translate(
          't6bisGestion.tabs.entete.informationsTpet6bisBlock.mtm.title',
        )}
        expanded={false}>
        <View>



           <Row size={200}>
                      <Col size={30} style={styles.labelContainer}>
                        <Text style={styles.labelTextStyle}>
                          {translate(
                            't6bisGestion.tabs.entete.informationsTpet6bisBlock.mtm.libTpe',
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
                          selectedValue={this.state.libTpe}
                          items={this.props.listDesTpes}
                          onValueChanged={(value, index) => {
                            this.setState({libTpe: value?.code});
                            this.props.t6bis.tpeComboBean = value;
                          }}
                        />
                      </Col>
                    </Row>
        </View>
      </ComAccordionComp>
    );
  }
}

export default T6bisInformationsTpeMtmSousBlock;
