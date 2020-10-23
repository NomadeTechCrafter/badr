import React, {PureComponent} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Overlay} from 'react-native-elements';

const initialState = {};

export default class ComBadrCameraComp extends PureComponent {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        return (
            <Overlay isVisible={true} fullScreen={true} overlayStyle={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    style={styles.camera}
                />

                <View style={styles.captureContainer}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)}
                                      style={styles.capture}>
                        <Text style={{fontSize: 14}}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = {
                quality: 0.5,
                fixOrientation: true,
                base64: true,
            };
            const data = await this.camera.takePictureAsync(options);

            this.props.onTakePicture(data.uri, data.base64);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: '1%',
        paddingHorizontal: '2%',
        alignSelf: 'center',
        margin: '2%',
    },
});
