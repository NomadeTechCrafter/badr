import React from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import {primaryColor} from '../../../styles/ComThemeStyle';

export default class ComBadrModalComp extends React.Component {
  render() {
    return (
      <Portal>
        <Modal
          dismissable={true}
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.closeStyle}
              onPress={() => this.props.onDismiss()}>
              <Text style={{color: primaryColor}}>Fermer</Text>
            </TouchableOpacity>
            <ScrollView>{this.props.children}</ScrollView>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  closeStyle: {margin: 5, alignSelf: 'flex-end'},
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: primaryColor,
    width: '80%',
    height: '90%',
  },
});
