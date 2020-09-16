import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {CustomStyleSheet} from '../../../styles/theme';

export default class ComBadrErrorMessageComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terminated: false,
    };
  }

  onClose = () => {
    this.setState({terminated: true});
  };

  render() {
    return !this.state.terminated || this.props.showError ? (
      <Animatable.View
        animation={this.props.pulse ? 'pulse' : 'flipInX'}
        easing="ease-out"
        iterationCount={this.props.pulse ? 'infinite' : 1}
        style={[this.props.style, styles.textStyle]}>
        {this.props.message ? (
          <View style={styles.containerStyle}>
            <Text>
              {!Array.isArray(this.props.message)
                ? this.props.message
                : _.join(this.props.message, '\n\n')}
            </Text>
            <View style={styles.closeBtnStyle}>
              <TouchableOpacity
                onPress={
                  this.props.onClose ? this.props.onClose : this.onClose
                }>
                <Text style={styles.closeBtnTextStyle}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View />
        )}
      </Animatable.View>
    ) : (
      <View />
    );
  }
}

const styles = {
  closeBtnStyle: {
    paddingTop: 15,
    width: '100%',
    alignItems: 'flex-end',
    padding: -10,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    ...CustomStyleSheet.errorMessages,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  closeBtnTextStyle: {color: 'red'},
};

ComBadrErrorMessageComp = Animatable.createAnimatableComponent(ComBadrErrorMessageComp);
