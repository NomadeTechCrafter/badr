import { CustomStyleSheet, primaryColor } from '../../../styles/ComThemeStyle';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

export default class ComBadrButtonRadioComp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RadioButton.Group onValueChange={this.props.onValueChange} value={this.props.value} >
        <View style={styles.containerRadio}>
          <View style={styles.viewRadio}>
            <Text style={styles.titleRadioGroup} >{this.props.title} : </Text>
          </View>
          {this.props.radioButtonsData.map((radio) => {
            return (
              <View style={styles.viewRadio}>
                <Text style={styles.textRadio}>{radio.label}</Text>
                <RadioButton disabled={this.props.disabled} value={radio.value} color={primaryColor} />
              </View>
            );
          })}
        </View>
      </RadioButton.Group>
    );
  }
}
const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  containerRadio: {
    flexDirection: 'row',
    padding: 10,
    color: '#009ab2'
  },
  titleRadioGroup: {
    color: '#009ab2',
    fontWeight: 'bold',
    fontSize: 14
  },
  viewRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRadio: {
    fontWeight: 'bold',
    fontSize: 14
  }
});
