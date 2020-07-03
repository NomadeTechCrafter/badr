'use strict';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
/** redux */
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/components/qrCode';
import * as QrCodeAction from '../../../redux/actions/components/qrCode';

import * as Zxing from '../../../native/zxing';

class ScanQrCode extends React.Component {
  constructor(props) {
    super(props);
    Zxing.default.showQrReader(this.onBarcodeRead);
  }

  onBarcodeRead = (data) => {
    if (data) {
      let action = QrCodeAction.request({
        type: Constants.QRCODE_REQUEST,
        value: {
          module: 'DED_LIB',
          command: 'ded.lireCodeQr',
          typeService: 'SP',
          param: data,
        },
      });
      this.props.dispatch(action);
    }
    this.props.navigation.navigate(this.props.route.params.screenAfterScan, {});
  };

  render() {
    return (
      <View>
        <Text>Merci de patienter un moment...</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.qrCodeReducer);
  return {...state.qrCodeReducer};
};

export default connect(mapStateToProps, null)(ScanQrCode);
