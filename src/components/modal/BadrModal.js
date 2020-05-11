import React from 'react';
import {View, ScrollView} from 'react-native';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import {primaryColor} from '../../styles/index';

export default class BadrModal extends React.Component {
  render() {
    return (
      <Portal>
        <Modal
          dismissable={true}
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: primaryColor,
              width: '95%',
              height: '90%',
            }}>
            <ScrollView style={{height: '85%'}}>
              {this.props.children}
            </ScrollView>
            <Button
              style={{
                backgroundColor : primaryColor,
                width: '100%',
                flex: 1,
                padding: 10,
                justifyContent: 'flex-end',
              }}
              onPress={() => this.props.onDismiss()}>
              <Text style={{color : 'white'}}>Fermer</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  }
}
