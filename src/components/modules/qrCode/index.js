'use strict';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
/** redux */
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/components/qrCode';
import * as QrCodeAction from '../../../redux/actions/components/qrCode';

class ScanQrCode extends React.Component {
  constructor(props) {
    super(props);
  }
  onSuccess = (e) => {
    if (e.data) {
      let action = QrCodeAction.request(
        {
          type: Constants.QRCODE_REQUEST,
          value: {
            module: 'DED_LIB',
            command: 'ded.lireCodeQr',
            typeService: 'SP',
            param: e.data,
          },
        },
        this.props.navigation,
        this.props.route.params.screenAfterScan,
      );
      this.props.dispatch(action);
    } else {
      this.scanner.reactivate();
    }
  };
  quitter = () => {
    this.props.navigation.navigate(this.props.route.params.screenAfterScan, {});
  };

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          cameraStyle={styles.cameraStyle}
          ref={(node) => {
            this.scanner = node;
          }}
          onRead={this.onSuccess}
        />

        <View style={styles.bottomContainer}>
          <View style={styles.subBottomContainer}>
            {this.props.showProgress && (
              <ActivityIndicator
                size={'large'}
                animating={true}
                color={Colors.blue800}
              />
            )}
            <TouchableOpacity
              style={styles.confirmerBtn}
              onPress={this.quitter}>
              <Text style={styles.confirmerText}>Quitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {width: '30%', height: '100%', zIndex: 99999999},
  subBottomContainer: {flex: 1, justifyContent: 'flex-end', marginBottom: 36},
  confirmerBtn: {
    marginTop: 15,
    color: '#fff',
    width: '100%',
    backgroundColor: '#009ab2',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmerText: {
    color: '#fff',
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  console.log(state.qrCodeReducer);
  return {...state.qrCodeReducer};
};

export default connect(mapStateToProps, null)(ScanQrCode);
