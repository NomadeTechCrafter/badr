import React from 'react';

import {
    FlatList,
    Image,
    PermissionsAndroid,
    ScrollView,
    View,
} from 'react-native';

import { connect } from 'react-redux';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

import _ from 'lodash';
import { ComAccordionComp, ComBadrKeyValueComp } from '../../../../../../commons/component';
import ControleRefDeclarationBlock from '../compteRendu/blocks/controleRefDeclarationBlock';
import { Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import style from '../../../../reconnaissance/style/ctrlReconnaissanceStyle';
import RNFetchBlob from 'rn-fetch-blob';

class ControleBonDelivrerScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    renderPicture = (item) => {
        // console.log(JSON.stringify(item));
        console.log(item.urlPhoto);
        return (
            <View>
                {/* <Image
                    style={style.pictureStyle}
                    source={{
                        uri: 'data:image/jpeg;base64,' + item.item.contentBase64,
                    }} /> */}
                <Image
                    style={style.pictureStyle}
                    source={{ uri: item.item.urlPhoto }}
                />

                <Button
                    type={'clear'}
                    icon={{
                        name: 'image',
                        size: 20,
                        color: 'black',
                    }}
                    onPress={() => this.downloadPicture(item.item)}
                    disabled={false}
                />

                {/* {!this.props.readMode && !this.state.readonly && (
                    <Button
                        type={''}
                        icon={{
                            name: 'delete',
                            size: 20,
                            color: 'black',
                        }}
                        onPress={() => this.onRemovePicture(item.item)}
                        disabled={false}
                    />
                )} */}
            </View>
        );
    };

    // markPhotoUrl = (photoUrl) => {
    //     var encodingType = '.jpg';
    //     if (!photoUrl.includes('_')) {
    //         return photoUrl.substring(photoUrl.lastIndexOf('/'), photoUrl.indexOf(encodingType)) + '_' + Date.now() + encodingType;
    //     } else {
    //         return photoUrl.substring(photoUrl.lastIndexOf('/'), photoUrl.indexOf('_')) + '_' + Date.now() + encodingType;
    //     }
    // };

    downloadPicture = async (picture) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'External Storage Permission',
                    message: 'L\'application a besoin des permissions nécessaires pour procéder.',
                    buttonNeutral: 'Demander ultérieurement',
                    buttonNegative: 'Annuler',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // RNFetchBlob.fs.writeFile(RNFetchBlob.fs.dirs.DownloadDir + '/' + picture.urlPhoto, picture.contentBase64, 'base64').then(() => {
                if (Platform.OS === 'android') {
                    // RNFetchBlob.android.actionViewIntent(RNFetchBlob.fs.dirs.DownloadDir + '/' + picture.urlPhoto, 'image/jpeg');
                    RNFetchBlob.config({
                        fileCache: true,
                        appendExt: 'png',
                        indicator: true,
                        IOSBackgroundTask: true,
                        path: RNFetchBlob.fs.dirs.DownloadDir,
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            path: RNFetchBlob.fs.dirs.DownloadDir,
                            description: 'Image'
                        },

                    }).fetch("GET", picture.urlPhoto).then(res => {
                        console.log(res, 'end downloaded')
                    });
                } else {
                    RNFetchBlob.ios.previewDocument(RNFetchBlob.fs.dirs.DownloadDir + '/' + picture.urlPhoto);
                }
                // });
            } else {
                console.log('External storage permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const refDeclaration = this.props?.data?.refDeclaration ? this.props?.data?.refDeclaration : '';
        const declaration = this.props?.data?.init ? this.props?.data?.init : '';
        const reconnaissance = this.props?.data?.init?.recVO ? this.props?.data?.init?.recVO : {};
        const photoList = this.props?.data?.init?.recVO?.photoList ? this.props?.data?.init?.recVO?.photoList : [];
        return (
            <ScrollView>
                <ControleRefDeclarationBlock refDeclaration={refDeclaration} declaration={declaration} />
                <ComAccordionComp title={'Informations de la reconnaissance'} expanded={true}>
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.nature')}
                        libelleSize={3}
                        value={reconnaissance.nature}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.marque')}
                        libelleSize={3}
                        value={reconnaissance.marque}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.poids')}
                        libelleSize={3}
                        value={reconnaissance.poids}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.nombreColisIdentifies')}
                        libelleSize={3}
                        value={reconnaissance.nbrColis}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.nombreColisVisites')}
                        libelleSize={3}
                        value={reconnaissance.nombreColisVisite}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.description')}
                        libelleSize={3}
                        value={reconnaissance.descriptionVisite}
                    />
                    <ComBadrKeyValueComp
                        libelle='CIN agent visiteur'
                        libelleSize={3}
                        value={reconnaissance.nomAgent}
                    />
                    <ComBadrKeyValueComp
                        libelle="Date d'affectation"
                        libelleSize={3}
                        value={reconnaissance.dateAffectation}
                    />
                    <Row size={100}>
                        <Col size={100}>
                            <FlatList
                                data={photoList}
                                renderItem={(picture) => this.renderPicture(picture)}
                                keyExtractor={item => item.urlPhoto}
                                horizontal={true}
                            />
                        </Col>
                    </Row>
                </ComAccordionComp>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleBonDelivrerScreen);