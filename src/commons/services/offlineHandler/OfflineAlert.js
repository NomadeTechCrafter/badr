import React, {PureComponent} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {translate} from '../../i18n/I18nHelper';

import NetInfo from '@react-native-community/netinfo';

let unsubscribe = null;
export default class OfflineAlert extends PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    unsubscribe = NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state.isConnected);
    });
  }

  componentWillUnmount() {
    if (unsubscribe != null) {
      unsubscribe();
    }
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({isConnected});
  };

  render() {
    return (
      <Portal>
        <Dialog visible={!this.state.isConnected} dismissable={false}>
          <Dialog.Title>{translate('errors.noConnxTitle')}</Dialog.Title>
          <Dialog.Content>
            <View style={styles.container}>
              <Image
                source={require('../../../assets/images/badrNoWifiIcon.png')}
              />
              <Paragraph>{translate('errors.noConnxContent')}</Paragraph>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
