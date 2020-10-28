import React from 'react';

import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import {HelperText, TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
    ComBadrCameraComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
} from '../../../../commons/component';

import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/ctrlReconnaissanceStyle';

import _ from 'lodash';

import * as Constants from '../state/ctrlReconnaissanceConstants';

import * as CtrlReconnaissanceConfirmAction from '../state/actions/ctrlReconnaissanceConfirmAction';
import * as CtrlReconnaissanceSearchAction from '../state/actions/ctrlReconnaissanceSearchAction';

const initialState = {
    cameraMode: false,
    deleteMode: false,
    toRemovePicture: {},
    reconnaissanceVo: {},
    showErrorMessage: false,
};

class CtrlReconnaissanceCoreComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.prepareState();
    }

    prepareState = () => {
        let bureau = this.props.reconnaissanceVo.referenceDed.slice(0, 3);
        let regime = this.props.reconnaissanceVo.referenceDed.slice(3, 6);
        let annee = this.props.reconnaissanceVo.referenceDed.slice(6, 10);
        let serie = this.props.reconnaissanceVo.referenceDed.slice(10, 17);
        let cle = this.cleDum(regime, serie);
        let numeroVoyage = this.props.reconnaissanceVo.numeroVoyage;

        let photoList = this.props.reconnaissanceVo.photoList ? this.props.reconnaissanceVo.photoList : [];
        photoList.forEach(function (value, index, array) {
            if (value.idPhoto != null) {
                photoList[index].idPhoto = null;
            }

            photoList[index].urlPhoto = markPhotoUrl(value.urlPhoto);

            if (value.content != null) {
                photoList[index].contentBase64 = value.content;
                photoList[index].content = null;
            }
        });

        this.state = {
            ...this.state,
            readonly: this.props.mode === 'cancel',
            bureau: bureau,
            regime: regime,
            annee: annee,
            serie: serie,
            cle: cle,
            numeroVoyage: numeroVoyage,
            reconnaissanceVo: {
                ...this.state.reconnaissanceVo,
                creation: this.props.mode === 'add',
                modification: this.props.mode === 'edit',
                annulation: this.props.mode === 'cancel',
                idDed: this.props.reconnaissanceVo.idDed,
                motifAffectation: this.props.reconnaissanceVo.motifAffectation,
                nature: this.props.reconnaissanceVo.nature,
                marque: this.props.reconnaissanceVo.marque,
                poids: this.props.reconnaissanceVo.poids,
                nbrColis: this.props.reconnaissanceVo.nbrColis ? this.props.reconnaissanceVo.nbrColis.toString() : null,
                nombreColisVisite: this.props.reconnaissanceVo.nombreColisVisite ? this.props.reconnaissanceVo.nombreColisVisite.toString() : null,
                descriptionVisite: this.props.reconnaissanceVo.descriptionVisite,
                photoList: photoList,
                isMobile: true,
            },
        };

        function markPhotoUrl(photoUrl) {
            var encodingType = '.jpg';
            if (!photoUrl.includes('_')) {
                return photoUrl.substring(photoUrl.lastIndexOf('/'), photoUrl.indexOf(encodingType)) + '_' + Date.now() + encodingType;
            } else {
                return photoUrl.substring(photoUrl.lastIndexOf('/'), photoUrl.indexOf('_')) + '_' + Date.now() + encodingType;
            }
        }
    };

    confirm = (operationType) => {
        this.displayErrorMessage();

        if (this.state.reconnaissanceVo.nature
            && this.state.reconnaissanceVo.marque
            && this.state.reconnaissanceVo.nbrColis
            && this.state.reconnaissanceVo.nombreColisVisite
            && this.state.reconnaissanceVo.descriptionVisite) {
            let action = CtrlReconnaissanceConfirmAction.request(
                {
                    type: Constants.CONFIRM_RECONNAISSANCE_REQUEST,
                    value: this.state.reconnaissanceVo,
                    operationType: operationType,
                },
                this.props.navigation,
            );
            this.props.actions.dispatch(action);
        }
    };

    back = () => {
        let action = CtrlReconnaissanceSearchAction.init(
            {
                type: Constants.SEARCH_RECONNAISSANCE_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    onAddPicture = () => {
        this.setState({
            ...this.state,
            cameraMode: true,
        });
    };

    onTakePicture = (imageUrl, imageBase64) => {
        this.state.reconnaissanceVo.photoList.push({
            'idPhoto': null,
            'urlPhoto': imageUrl,
            'size': null,
            'content': null,
            'contentBase64': imageBase64,
        });

        this.setState({
            ...this.state,
            cameraMode: false,
        });
    };

    onRemovePicture = (picture) => {
        this.setState({
            ...this.state,
            deleteMode: true,
            toRemovePicture: picture,
        });
    };

    confirmPictureRemoval = () => {
        let imageIndex = this.state.reconnaissanceVo.photoList.indexOf(this.state.toRemovePicture);
        if (imageIndex > -1) {
            this.state.reconnaissanceVo.photoList.splice(imageIndex, 1);
        }

        this.setState({
            ...this.state,
            deleteMode: false,
        });
    };

    cancelPictureRemoval = () => {
        this.setState({
            ...this.state,
            deleteMode: false,
        });
    };

    cleDum = (regime, serie) => {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';

        if (serie.length > 6) {
            if (serie.substring(0, 1) === '0') {
                serie = serie.substring(1, 7);
            }
        }

        let RS = (regime + serie) % 23;
        return alpha.charAt(RS);
    };

    hasErrors = (field) => {
        return this.state.showErrorMessage && _.isEmpty(this.state.reconnaissanceVo[field]);
    };

    displayErrorMessage = () => {
        this.setState({
            ...this.state,
            showErrorMessage: true,
        });
    };

    renderPicture = (item) => {
        return (
            <View>
                <Image
                    style={style.pictureStyle}
                    source={{
                        uri: 'data:image/jpeg;base64,' + item.item.contentBase64,
                    }}/>

                <Button
                    type={''}
                    icon={{
                        name: 'delete',
                        size: 12,
                        color: 'black',
                    }}
                    onPress={() => this.onRemovePicture(item.item)}
                    disabled={this.state.readonly}
                />
            </View>
        );
    };

    render() {
        return (
            <ScrollView style={style.innerContainer}
                        keyboardShouldPersistTaps={(this.state.autocompleteDropdownOpen || Platform.OS === 'android') ? 'always' : 'never'}>
                {this.props.showProgress && (
                    <ComBadrProgressBarComp/>
                )}

                {this.props.infoMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.infoMessage}/>
                )}

                {this.props.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.props.errorMessage}/>
                )}

                {!this.props.showProgress && (
                    <View>
                        {!this.state.cameraMode && (
                            <View>
                                <Grid style={style.referenceCardInfo}>
                                    <Row style={style.referenceTitles}>
                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.bureau')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.regime')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.annee')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.serie')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.cle')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.nVoyage')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.type')}
                                            </Text>
                                        </Col>
                                    </Row>

                                    <Row style={style.referenceValues}>
                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.bureau}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.regime}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.annee}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.serie}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.cle}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.numeroVoyage}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}/>
                                        </Col>
                                    </Row>
                                </Grid>

                                <Grid>
                                    <Row size={100}>
                                        <Col size={30} style={style.labelContainer}>
                                            <Text style={style.labelTextStyle}>
                                                {translate('controle.reconnaissance.core.commentaire')}
                                            </Text>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                multiline={true}
                                                numberOfLines={4}
                                                mode="outlined"
                                                value={this.state.reconnaissanceVo.motifAffectation}
                                                maxLength={250}
                                                onChangeText={(text) => this.setState({
                                                    ...this.state,
                                                    reconnaissanceVo: {
                                                        ...this.state.reconnaissanceVo,
                                                        motifAffectation: text,
                                                    },
                                                })}
                                                disabled={true}
                                            />
                                        </Col>
                                    </Row>

                                    <Row size={100}>
                                        <Col size={30}>
                                            <Row>
                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelTextStyle}>
                                                        {translate('controle.reconnaissance.core.nature')}
                                                    </Text>
                                                </Col>

                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelRequiredStyle}>
                                                        *
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                mode="outlined"
                                                label={translate('controle.reconnaissance.core.nature')}
                                                value={this.state.reconnaissanceVo.nature}
                                                maxLength={128}
                                                onChangeText={(text) => this.setState({
                                                    ...this.state,
                                                    reconnaissanceVo: {
                                                        ...this.state.reconnaissanceVo,
                                                        nature: text,
                                                    },
                                                })}
                                                disabled={this.state.readonly}
                                            />

                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('descriptionVisite')}>
                                                {translate('errors.donneeObligatoire', {champ: translate('controle.reconnaissance.core.nature')})}
                                            </HelperText>
                                        </Col>
                                    </Row>

                                    <Row size={100}>
                                        <Col size={30}>
                                            <Row>
                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelTextStyle}>
                                                        {translate('controle.reconnaissance.core.marque')}
                                                    </Text>
                                                </Col>

                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelRequiredStyle}>
                                                        *
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                mode="outlined"
                                                label={translate('controle.reconnaissance.core.marque')}
                                                value={this.state.reconnaissanceVo.marque}
                                                maxLength={128}
                                                onChangeText={(text) => this.setState({
                                                    ...this.state,
                                                    reconnaissanceVo: {
                                                        ...this.state.reconnaissanceVo,
                                                        marque: text,
                                                    },
                                                })}
                                                disabled={this.state.readonly}
                                            />

                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('descriptionVisite')}>
                                                {translate('errors.donneeObligatoire', {champ: translate('controle.reconnaissance.core.marque')})}
                                            </HelperText>
                                        </Col>
                                    </Row>

                                    <Row size={100}>
                                        <Col size={30} style={style.labelContainer}>
                                            <Text style={style.labelTextStyle}>
                                                {translate('controle.reconnaissance.core.poids')}
                                            </Text>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                mode="outlined"
                                                label={translate('controle.reconnaissance.core.poids')}
                                                value={this.state.reconnaissanceVo.poids}
                                                keyboardType={'number-pad'}
                                                maxLength={13}
                                                onChangeText={(text) => {
                                                    text = text.replace(/[^0-9.]/g, '');
                                                    this.setState({
                                                        ...this.state,
                                                        reconnaissanceVo: {
                                                            ...this.state.reconnaissanceVo,
                                                            poids: text,
                                                        },
                                                    });
                                                }}
                                                disabled={this.state.readonly}
                                            />
                                        </Col>
                                    </Row>

                                    <Row size={100}>
                                        <Col size={30}>
                                            <Row>
                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelTextStyle}>
                                                        {translate('controle.reconnaissance.core.nombreColisIdentifies')}
                                                    </Text>
                                                </Col>

                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelRequiredStyle}>
                                                        *
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                mode="outlined"
                                                label={translate('controle.reconnaissance.core.nombreColisIdentifies')}
                                                value={this.state.reconnaissanceVo.nbrColis}
                                                keyboardType={'number-pad'}
                                                maxLength={10}
                                                onChangeText={(text) => {
                                                    text = text.replace(/[^0-9]/g, '');
                                                    this.setState({
                                                        ...this.state,
                                                        reconnaissanceVo: {
                                                            ...this.state.reconnaissanceVo,
                                                            nbrColis: text,
                                                        },
                                                    });
                                                }}
                                                disabled={this.state.readonly}
                                            />

                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('descriptionVisite')}>
                                                {translate('errors.donneeObligatoire', {champ: translate('controle.reconnaissance.core.nombreColisIdentifies')})}
                                            </HelperText>
                                        </Col>
                                    </Row>

                                    <Row size={100}>
                                        <Col size={30}>
                                            <Row>
                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelTextStyle}>
                                                        {translate('controle.reconnaissance.core.nombreColisVisites')}
                                                    </Text>
                                                </Col>

                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelRequiredStyle}>
                                                        *
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                mode="outlined"
                                                label={translate('controle.reconnaissance.core.nombreColisVisites')}
                                                value={this.state.reconnaissanceVo.nombreColisVisite}
                                                keyboardType={'number-pad'}
                                                maxLength={10}
                                                onChangeText={(text) => {
                                                    text = text.replace(/[^0-9]/g, '');
                                                    this.setState({
                                                        ...this.state,
                                                        reconnaissanceVo: {
                                                            ...this.state.reconnaissanceVo,
                                                            nombreColisVisite: text,
                                                        },
                                                    });
                                                }}
                                                disabled={this.state.readonly}
                                            />

                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('descriptionVisite')}>
                                                {translate('errors.donneeObligatoire', {champ: translate('controle.reconnaissance.core.nombreColisVisites')})}
                                            </HelperText>
                                        </Col>
                                    </Row>

                                    <Row size={100}>
                                        <Col size={30}>
                                            <Row>
                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelTextStyle}>
                                                        {translate('controle.reconnaissance.core.description')}
                                                    </Text>
                                                </Col>

                                                <Col style={style.labelContainer}>
                                                    <Text style={style.labelRequiredStyle}>
                                                        *
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col size={70}>
                                            <TextInput
                                                multiline={true}
                                                numberOfLines={4}
                                                mode="outlined"
                                                label={translate('controle.reconnaissance.core.description')}
                                                value={this.state.reconnaissanceVo.descriptionVisite}
                                                maxLength={4000}
                                                onChangeText={(text) => this.setState({
                                                    ...this.state,
                                                    reconnaissanceVo: {
                                                        ...this.state.reconnaissanceVo,
                                                        descriptionVisite: text,
                                                    },
                                                })}
                                                disabled={this.state.readonly}
                                            />

                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('descriptionVisite')}>
                                                {translate('errors.donneeObligatoire', {champ: translate('controle.reconnaissance.core.description')})}
                                            </HelperText>
                                        </Col>
                                    </Row>

                                    {!this.state.readonly && (
                                        <Row size={100}>
                                            <Col size={40}/>

                                            <Col size={20}>
                                                <Button
                                                    title={translate('controle.reconnaissance.core.addImage')}
                                                    type={'solid'}
                                                    buttonStyle={style.buttonAction}
                                                    onPress={() => this.onAddPicture()}/>
                                            </Col>

                                            <Col size={40}/>
                                        </Row>
                                    )}

                                    <Row size={100}>
                                        <Col size={100}>
                                            <FlatList
                                                data={this.state.reconnaissanceVo.photoList}
                                                renderItem={(picture) => this.renderPicture(picture)}
                                                keyExtractor={item => item.urlPhoto}
                                                horizontal={true}
                                            />
                                        </Col>
                                    </Row>

                                    {(this.props.mode === 'add' || this.props.mode === 'edit') && (
                                        <Row size={100}>
                                            <Col size={25}/>

                                            <Col size={20}>
                                                <Button
                                                    title={translate('transverse.sauvegarder')}
                                                    type={'solid'}
                                                    buttonStyle={style.buttonAction}
                                                    onPress={() => this.confirm('sauvegarde')}/>
                                            </Col>

                                            <Col size={2}/>

                                            <Col size={20}>
                                                <Button
                                                    title={translate('transverse.enregistrer')}
                                                    type={'solid'}
                                                    buttonStyle={style.buttonAction}
                                                    onPress={() => this.confirm('enregistrement')}/>
                                            </Col>

                                            <Col size={25}/>
                                        </Row>
                                    )}

                                    {this.props.mode === 'cancel' && (
                                        <Row size={100}>
                                            <Col size={40}/>

                                            <Col size={20}>
                                                <Button
                                                    title={translate('transverse.annuler')}
                                                    type={'solid'}
                                                    buttonStyle={style.buttonAction}
                                                    onPress={() => this.confirm('annulation')}/>
                                            </Col>

                                            <Col size={40}/>
                                        </Row>
                                    )}

                                    <Row size={100}>
                                        <Col size={40}/>

                                        <Col size={20}>
                                            <Button
                                                title={translate('transverse.back')}
                                                type={'solid'}
                                                buttonStyle={style.buttonAction}
                                                onPress={() => this.back()}/>
                                        </Col>

                                        <Col size={40}/>
                                    </Row>
                                </Grid>
                            </View>
                        )}

                        {this.state.cameraMode && (
                            <ComBadrCameraComp onTakePicture={this.onTakePicture}/>
                        )}

                        {this.state.deleteMode && (
                            <Modal isVisible={this.state.deleteMode}
                                   onBackdropPress={this.close}
                                   style={style.modalContainer}>
                                <View>
                                    <Text style={style.modalMessage}>
                                        {translate('controle.reconnaissance.core.removalModal.message')}
                                    </Text>

                                    <Button
                                        title={translate('transverse.confirmer')}
                                        type={'solid'}
                                        buttonStyle={style.modalAction}
                                        onPress={() => this.confirmPictureRemoval()}/>

                                    <Button
                                        title={translate('transverse.annuler')}
                                        type={'solid'}
                                        buttonStyle={style.modalAction}
                                        onPress={() => this.cancelPictureRemoval()}/>
                                </View>
                            </Modal>
                        )}
                    </View>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {...state.ctrlReconnaissanceReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CtrlReconnaissanceCoreComponent);
