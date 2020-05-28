'use strict';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
/** redux */
import {connect} from 'react-redux';
import * as Constants from '../../common/constants/components/qrCode';
import * as QrCodeAction from '../../redux/actions/components/qrCode';

class ScanQrCode extends React.Component {
    constructor(props) {
        super(props);
    }
    onSuccess = (e) => {
        if (e.data) {
            let action = QrCodeAction.request({
                    type: Constants.QRCODE_REQUEST,
                    value: {
                        module: 'DED_LIB',
                        command: "ded.lireCodeQr",
                        typeService: 'SP',
                        param: e.data,
                    },
                },
                this.props.navigation,
                this.props.route.params.screenAfterScan);
            this.props.dispatch(action);
        } else {
            this.scanner.reactivate();
        }
    }
    quitter = () => {
        this.props.navigation.navigate(this.props.route.params.screenAfterScan, {});
    }

    render() {

        return (

            <QRCodeScanner
                showMarker={true}
                cameraStyle={styles.cameraStyle}
                ref={(node) => {
                    this.scanner = node
                }}
                onRead={this.onSuccess}
                topContent={
                    <View style={styles.bottomContainer}>
                        <Text style={styles.centerText}>
                            Placez le <Text style={styles.textBold}>code QR</Text> dans la zone en vert.
                        </Text>
                    </View>
                }
                bottomContent={
                    <View style={styles.bottomContainer}>
                        {this.props.showProgress &&
                        <ActivityIndicator size={'large'} animating={true} color={Colors.blue800}/>}
                        <TouchableOpacity style={styles.confirmerBtn} onPress={this.quitter}>
                            <Text style={styles.confirmerText}>Quitter</Text>
                        </TouchableOpacity>
                    </View>
                }
            />


        );
    }
}

const styles = StyleSheet.create({
    bottomContainer: {width: 250},
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 15,
        color: '#777',
        textAlign: "center"
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        padding: 10,
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    confirmerBtn: {
        color: '#fff',
        width: "100%",
        backgroundColor: "#009ab2",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    }, confirmerText: {
        color: '#fff',
    },
    cameraStyle: {
        height: 300,
        width: 600,
        alignSelf: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
});

const mapStateToProps = state => ({...state.qrCodeReducer});

export default connect(
    mapStateToProps,
    null,
)(ScanQrCode);