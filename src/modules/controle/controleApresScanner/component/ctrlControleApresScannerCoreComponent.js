import React from 'react';
//import FastImage from 'react-native-fast-image';

import {
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';

import {HelperText, RadioButton, TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  ComAccordionComp,
  ComBadrCameraComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrItemsPickerComp,
  ComBadrProgressBarComp,
} from '../../../../commons/component';

import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/ctrlControleApresScannerStyle';

import * as Constants from '../state/ctrlControleApresScannerConstants';

import * as CtrlControleApresScannerConfirmAction from '../state/actions/ctrlControleApresScannerConfirmAction';
import * as CtrlControleApresScannerSearchAction from '../state/actions/ctrlControleApresScannerSearchAction';
import _ from 'lodash';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import RNFetchBlob from 'rn-fetch-blob';

const initialState = {
  cameraMode: false,
  deleteMode: false,
  toRemovePicture: {},
  scelleVo: {},

  controleApresScannerVo: {
    offset: 0,
  },
  showErrorMessage: false,
  fetching_from_server: false,
};

class CtrlControleApresScannerCoreComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    //  this.offset = 0;
    this.prepareState();
  }

  typeResultatScanner = () => {
    return [
      {
        code: 'OK',
        libelle: 'Conforme',
      },
      {
        code: 'Not OK',
        libelle: 'Non Conforme',
      },
    ];
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    //   console.log('props apres search', JSON.stringify(nextProps));
    //   console.log('offset apres search', nextProps?.controleApresScannerVo.offset);
    //   console.log('list avant',JSON.stringify(prevState?.controleApresScannerVo.photosControleApresScanner))
    //   console.log('list apres',JSON.stringify(nextProps?.controleApresScannerVo.photosControleApresScanner))
    const array1 = prevState?.controleApresScannerVo.photosControleApresScanner;
    const array2 = nextProps?.controleApresScannerVo.photosControleApresScanner;

    const result = _.unionBy(array1, array2, 'id');

    console.log('result', result);

    return {
      ...prevState,

      controleApresScannerVo: {
        ...prevState?.controleApresScannerVo,
        offset: nextProps?.controleApresScannerVo.offset,
        photosControleApresScanner: result,
      },
    };
  }
  searchAction = (reference) => {
    return CtrlControleApresScannerSearchAction.request(
      {
        type: Constants.SEARCH_CONTROLE_APRES_SCANNER_REQUEST,
        value: {
          typeRecherche: '1',
          reference: reference,
          numeroVoyage: this.state.numeroVoyage,
          typeRechercheEtatChargement: '',

          referenceDed: {
            codeBureauDouane: this.state.bureau,
            regime: this.state.regime,
            anneeEnregistrement: this.state.annee,
            numeroSerieEnregistrement: this.state.serie,
            numeroOrdreVoyage: this.state.numeroVoyage,
            cle: this.state.cle,
          },
          moyenTransport: '',
          numeroImmatriculation: '',
          bureauAgentConnecte: ComSessionService.getInstance().getCodeBureau(),
          offset: this.state.controleApresScannerVo.offset,
        },
      },
      this.props.navigation,
    );
  };

  loadMoreData = () => {
    let reference = this.props?.controleApresScannerVo?.reference;
    let action = this.searchAction(reference);
    this.props.actions.dispatch(action);
    // this.offset = 170;
    console.log(reference);
    console.log('offset Load : ' + this.state.offset);
  };

  cleDum2 = function (reference) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    let RS = reference % 23;
    return alpha.charAt(RS);
  };

  toAlpha = function (reference) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    let RS = reference % 23;
    return alpha.charAt(RS + 1);
  };

  prepareState = () => {
    console.log('apres search', this.props?.controleApresScannerVo);
    let reference = this.props?.controleApresScannerVo?.reference;
    let bureau = reference.slice(0, 3);
    let regime = reference.slice(3, 6);
    let annee = reference.slice(6, 10);
    let serie = reference.slice(10, 17);
    // let cle = this.cleDum(regime, serie);
    let cle = this.cleDum2(regime + serie + annee);

    let photosControleApresScanner = this.props.controleApresScannerVo
      .photosControleApresScanner
      ? this.props.controleApresScannerVo.photosControleApresScanner
      : [];
    photosControleApresScanner.forEach(function (value, index, array) {
      //    if (value.id != null) {
      //      photosControleApresScanner[index].id = null;
      //    }

      photosControleApresScanner[index].url = markPhotoUrl(value.url);

      if (value.content != null) {
        photosControleApresScanner[index].contentBase64 = value.content;
        photosControleApresScanner[index].content = null;
      }
    });

    this.state = {
      ...this.state,
      readonly: false,
      bureau: bureau,
      regime: regime,
      annee: annee,
      serie: serie,
      cle: cle,
      controleApresScannerVo: this.props.controleApresScannerVo,
    };

    this.state = {
      ...this.state,
      controleApresScannerVo: {
        ...this.state.controleApresScannerVo,
        typeRecherche: this.props.data.typeRecherche,
        reference: this.props.data.reference,
       // photosControleApresScanner: photosControleApresScanner,
        isMobile: true,
      },
    };
    console.log('new photos', JSON.stringify(photosControleApresScanner));

    function markPhotoUrl(photoUrl) {
      var encodingType = '.jpg';
      if (!photoUrl.includes('_')) {
        return (
          photoUrl.substring(
            photoUrl.lastIndexOf('/'),
            photoUrl.indexOf(encodingType),
          ) +
          '_' +
          Date.now() +
          encodingType
        );
      } else {
        return (
          photoUrl.substring(photoUrl.lastIndexOf('/'), photoUrl.indexOf('_')) +
          '_' +
          Date.now() +
          encodingType
        );
      }
    }
  };
  renderFooter() {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Loading</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
  confirm = () => {
    let action = CtrlControleApresScannerConfirmAction.request(
      {
        type: Constants.CONFIRM_CONTROLE_APRES_SCANNER_REQUEST,
        value: this.state.controleApresScannerVo,
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  back = () => {
    let action = CtrlControleApresScannerSearchAction.init(
      {
        type: Constants.SEARCH_CONTROLE_APRES_SCANNER_INIT,
        value: {},
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  addScelle = () => {
    if (
      this.state.scelleVo.reference &&
      this.state.scelleVo.reference.length === 8 &&
      !this.containsScelle(this.state.scelleVo.reference)
    ) {
      this.state.controleApresScannerVo.scelles[
        this.state.scelleVo.reference
      ] = this.state.scelleVo.reference;
      this.resetScelle();
    }
  };

  removeScelle = () => {
    if (this.state.selectedScelle) {
      for (let [key, value] of Object.entries(
        this.state.controleApresScannerVo.scelles,
      )) {
        if (value === this.state.selectedScelle) {
          delete this.state.controleApresScannerVo.scelles[key];
        }
      }

      this.setState({
        ...this.state,
        selectedScelle: {},
      });
    }
  };

  resetScelle = () => {
    this.scelleInput.clear();

    this.setState({
      ...this.state,
      scelleVo: {},
    });
  };

  containsScelle = (scelleReference) => {
    for (let [key, value] of Object.entries(
      this.state.controleApresScannerVo.scelles,
    )) {
      if (value === scelleReference) {
        return true;
      }
    }
    return false;
  };

  generateScelles = () => {
    if (
      this.state.generateurDu.length === 8 &&
      this.state.generateurAu.length === 8 &&
      this.state.generateurDu < this.state.generateurAu &&
      this.state.generateurAu - this.state.generateurDu < 100
    ) {
      for (
        let scelle = this.state.generateurDu;
        scelle <= this.state.generateurAu;
        scelle++
      ) {
        if (!this.containsScelle(scelle)) {
          this.state.controleApresScannerVo.scelles[scelle] = scelle;
        }
      }

      this.setState({
        ...this.state,
      });
    }
  };

  onAddPicture = () => {
    this.setState({
      ...this.state,
      cameraMode: true,
    });
  };

  onTakePicture = (imageUrl, imageBase64) => {
    this.state.controleApresScannerVo.photosControleApresScanner.push({
      id: null,
      url: imageUrl,
      size: null,
      content: null,
      contentBase64: imageBase64,
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
    let imageIndex = this.state.controleApresScannerVo.photosControleApresScanner.indexOf(
      this.state.toRemovePicture,
    );
    if (imageIndex > -1) {
      this.state.controleApresScannerVo.photosControleApresScanner.splice(
        imageIndex,
        1,
      );
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
    return (
      this.state.showErrorMessage &&
      _.isEmpty(this.state.reconnaissanceVo[field])
    );
  };
  downloadPicture = async (picture) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message:
            "L'application a besoin des permissions nécessaires pour procéder.",
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
              description: 'Image',
            },
          })
            .fetch('GET', picture.urlPhoto)
            .then((res) => {
              console.log(res, 'end downloaded');
            });
        } else {
          RNFetchBlob.ios.previewDocument(
            RNFetchBlob.fs.dirs.DownloadDir + '/' + picture.urlPhoto,
          );
        }
        // });
      } else {
        console.log('External storage permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };
  renderPicture = (item) => {
    return (
      <View>
        <Image
          style={style.pictureStyle}
          source={{
            uri: 'data:image/jpeg;base64,' + item.item.contentBase64,
          }}
        />

        <Button
          icon={{
            name: 'delete',
            size: 12,
            color: 'black',
          }}
          onPress={() => this.onRemovePicture(item.item)}
          disabled={this.state.readonly}
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
      </View>
    );
  };

  renderBoxItem = ({item}) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={this.state.readonly}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <ScrollView
        style={style.innerContainer}
        keyboardShouldPersistTaps={
          this.state.autocompleteDropdownOpen || Platform.OS === 'android'
            ? 'always'
            : 'never'
        }>
        {this.props.showProgress && <ComBadrProgressBarComp />}

        {this.props.infoMessage != null && (
          <ComBadrInfoMessageComp message={this.props.infoMessage} />
        )}

        {this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )}

        {!this.props.showProgress && (
          <View>
            {!this.state.cameraMode && (
              <View>
                <Grid style={style.referenceCardInfo}>
                  <Row style={style.referenceTitles}>
                    <Col>
                      <Text style={style.referenceTitleLabel}>
                        {translate('controleApresScanner.core.generic.bureau')}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={style.referenceTitleLabel}>
                        {translate('controleApresScanner.core.generic.regime')}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={style.referenceTitleLabel}>
                        {translate('controleApresScanner.core.generic.annee')}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={style.referenceTitleLabel}>
                        {translate('controleApresScanner.core.generic.serie')}
                      </Text>
                    </Col>

                    <Col>
                      <Text style={style.referenceTitleLabel}>
                        {translate('controleApresScanner.core.generic.cle')}
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
                      {this.props?.data?.typeRecherche === '2' && (
                        <Text style={style.referenceValueLabel}>
                          {this.toAlpha(this.props?.data?.reference)}
                        </Text>
                      )}
                      {this.props?.data?.typeRecherche !== '2' && (
                        <Text style={style.referenceValueLabel}>
                          {this.cleDum(this.state.regime, this.state.serie)}
                        </Text>
                      )}
                    </Col>
                  </Row>
                </Grid>

                <Grid style={style.topMarginStyle}>
                  <Row size={100}>
                    <Col size={100} />
                  </Row>

                  <View style={style.topMarginStyle}>
                    <ComAccordionComp
                      expanded={false}
                      title={translate(
                        'controleApresScanner.core.resultatControle.title',
                      )}>
                      <View>
                        <Row size={100}>
                          <Col size={30}>
                            <Row>
                              <Col style={style.labelContainer}>
                                <Text style={style.labelTextStyle}>
                                  {translate(
                                    'controleApresScanner.core.resultatControle.commentaire',
                                  )}
                                </Text>
                              </Col>

                              <Col style={style.labelContainer}>
                                <Text style={style.labelRequiredStyle}>*</Text>
                              </Col>
                            </Row>
                          </Col>

                          <Col size={70} style={style.labelContainer}>
                            <TextInput
                              multiline={true}
                              numberOfLines={4}
                              mode="outlined"
                              label={translate(
                                'controleApresScanner.core.resultatControle.commentaire',
                              )}
                              value={
                                this.state.controleApresScannerVo.commentaire
                              }
                              onChangeText={(text) =>
                                this.setState({
                                  ...this.state,
                                  controleApresScannerVo: {
                                    ...this.state.controleApresScannerVo,
                                    commentaire: text,
                                  },
                                })
                              }
                            />
                          </Col>

                          <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('commentaire')}>
                            {translate('errors.donneeObligatoire', {
                              champ: translate(
                                'controleApresScanner.core.resultatControle.commentaire',
                              ),
                            })}
                          </HelperText>
                        </Row>

                        <Row size={100}>
                          <Col size={30}>
                            <Row>
                              <Col style={style.labelContainer}>
                                <Text style={style.labelTextStyle}>
                                  {translate(
                                    'controleApresScanner.core.resultatControle.resultatControle',
                                  )}
                                </Text>
                              </Col>

                              <Col style={style.labelContainer}>
                                <Text style={style.labelRequiredStyle}>*</Text>
                              </Col>
                            </Row>
                          </Col>

                          <Col size={70} style={style.labelContainer}>
                            <ComBadrItemsPickerComp
                              label={translate(
                                'controleApresScanner.core.resultatControle.resultatControle',
                              )}
                              selectedValue={
                                this.state.controleApresScannerVo.resultat
                                  ? this.state.controleApresScannerVo.resultat
                                  : ''
                              }
                              items={this.typeResultatScanner()}
                              onValueChanged={(value, index) =>
                                this.setState({
                                  ...this.state,
                                  controleApresScannerVo: {
                                    ...this.state.controleApresScannerVo,
                                    resultat: value.code,
                                  },
                                })
                              }
                            />
                          </Col>
                        </Row>
                      </View>
                    </ComAccordionComp>
                  </View>

                  <View style={style.topMarginStyle}>
                    <ComAccordionComp
                      expanded={false}
                      title={translate(
                        'controleApresScanner.core.scelles.title',
                      )}>
                      <View>
                        <Row size={100} style={style.topMarginStyle}>
                          <Col size={30} style={style.labelContainer}>
                            <Text style={style.labelTextStyle}>
                              {translate(
                                'controleApresScanner.core.scelles.title',
                              )}
                            </Text>
                          </Col>

                          <Col size={70} style={style.boxContainer}>
                            <SafeAreaView style={style.miniBoxSafeArea}>
                              <Row>
                                {_.isEmpty(
                                  this.state?.controleApresScannerVo
                                    ?.listScelles,
                                ) && (
                                  <Text style={style.boxItemText}>
                                    Aucun élément
                                  </Text>
                                )}

                                {!_.isEmpty(
                                  this.state?.controleApresScannerVo
                                    ?.listScelles,
                                ) && (
                                  <Col>
                                    <Text style={style.boxItemText}>
                                      {
                                        this.state?.controleApresScannerVo
                                          ?.listScelles
                                      }
                                    </Text>
                                  </Col>
                                )}

                                {/* {this.state.controleApresScannerVo
                                .scellesConfirmationEntree != null &&
                                this.state.controleApresScannerVo
                                  .scellesConfirmationEntree.size !== 0 && (
                                  <Col>
                                    <FlatList
                                      data={Object.values(
                                        this.state.controleApresScannerVo
                                          .scellesConfirmationEntree,
                                      )}
                                      renderItem={(item) =>
                                        this.renderBoxItem(item)
                                      }
                                      keyExtractor={(item) => item}
                                      nestedScrollEnabled={true}
                                    />
                                  </Col>
                                )}

                              {this.state.controleApresScannerVo
                                .scelles != null &&
                                this.state.controleApresScannerVo
                                  .scelles.size !== 0 && (
                                  <Col>
                                    <FlatList
                                      data={Object.values(
                                        this.state.controleApresScannerVo
                                          .scelles,
                                      )}
                                      renderItem={(item) =>
                                        this.renderBoxItem(item)
                                      }
                                      keyExtractor={(item) => item}
                                      nestedScrollEnabled={true}
                                    />
                                  </Col>
                                )} */}
                              </Row>
                            </SafeAreaView>
                          </Col>
                        </Row>

                        <Row size={100} style={style.topMarginStyle}>
                          <Col size={30} style={style.labelContainer}>
                            <Text style={style.labelTextStyle}>
                              {translate(
                                'controleApresScanner.core.scelles.nouveauxScelles',
                              )}
                            </Text>
                          </Col>

                          <Col size={3}>
                            <RadioButton
                              value={
                                this.state.controleApresScannerVo
                                  .infoEcorScelle &&
                                this.state.controleApresScannerVo
                                  .infoEcorScelle === true
                                  ? 'true'
                                  : 'false'
                              }
                              status={
                                this.state.controleApresScannerVo
                                  .infoEcorScelle &&
                                this.state.controleApresScannerVo
                                  .infoEcorScelle === true
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                this.setState({
                                  ...this.state,
                                  controleApresScannerVo: {
                                    ...this.state.controleApresScannerVo,
                                    infoEcorScelle: true,
                                  },
                                })
                              }
                            />
                          </Col>

                          <Col size={10} style={style.labelContainer}>
                            <Text style={style.labelTextStyle}>
                              {translate(
                                'controleApresScanner.core.scelles.oui',
                              )}
                            </Text>
                          </Col>

                          <Col size={3}>
                            <RadioButton
                              value={
                                this.state.controleApresScannerVo
                                  .infoEcorScelle === null ||
                                this.state.controleApresScannerVo
                                  .infoEcorScelle === false
                                  ? 'true'
                                  : 'false'
                              }
                              status={
                                this.state.controleApresScannerVo
                                  .infoEcorScelle === null ||
                                this.state.controleApresScannerVo
                                  .infoEcorScelle === false
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                this.setState({
                                  ...this.state,
                                  controleApresScannerVo: {
                                    ...this.state.controleApresScannerVo,
                                    infoEcorScelle: false,
                                  },
                                })
                              }
                            />
                          </Col>

                          <Col size={10} style={style.labelContainer}>
                            <Text style={style.labelTextStyle}>
                              {translate(
                                'controleApresScanner.core.scelles.non',
                              )}
                            </Text>
                          </Col>

                          <Col size={40} />
                        </Row>

                        {this.state.controleApresScannerVo.infoEcorScelle &&
                          this.state.controleApresScannerVo.infoEcorScelle ===
                            true && (
                            <View>
                              <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                  <Text style={style.labelTextStyle}>
                                    {translate(
                                      'controleApresScanner.core.scelles.numeroPince',
                                    )}
                                  </Text>
                                </Col>

                                <Col size={70}>
                                  <TextInput
                                    mode="outlined"
                                    label={translate(
                                      'controleApresScanner.core.scelles.numeroPince',
                                    )}
                                    value={
                                      this.state.controleApresScannerVo
                                        .numeroPince
                                    }
                                    keyboardType={'number-pad'}
                                    maxLength={8}
                                    onChangeText={(text) => {
                                      text = text.replace(/[^0-9.]/g, '');
                                      this.setState({
                                        ...this.state,
                                        controleApresScannerVo: {
                                          ...this.state.controleApresScannerVo,
                                          numeroPince: text,
                                        },
                                      });
                                    }}
                                    disabled={this.state.readonly}
                                  />
                                </Col>
                              </Row>

                              <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                  <Text style={style.labelTextStyle}>
                                    {translate(
                                      'controleApresScanner.core.scelles.nombreScelles',
                                    )}
                                  </Text>
                                </Col>

                                <Col size={70}>
                                  <TextInput
                                    mode="outlined"
                                    label={translate(
                                      'controleApresScanner.core.scelles.nombreScelles',
                                    )}
                                    value={
                                      this.state.controleApresScannerVo
                                        .nombreScelle
                                    }
                                    keyboardType={'number-pad'}
                                    maxLength={8}
                                    onChangeText={(text) => {
                                      text = text.replace(/[^0-9.]/g, '');
                                      this.setState({
                                        ...this.state,
                                        controleApresScannerVo: {
                                          ...this.state.controleApresScannerVo,
                                          nombreScelle: text,
                                        },
                                      });
                                    }}
                                    disabled={this.state.readonly}
                                  />
                                </Col>
                              </Row>

                              <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                  <Text style={style.labelTextStyle}>
                                    {translate(
                                      'controleApresScanner.core.scelles.generateurNumerosScelles',
                                    )}
                                  </Text>
                                </Col>

                                <Col size={5} style={style.labelContainer}>
                                  <Text style={style.labelTextStyle}>
                                    {translate(
                                      'controleApresScanner.core.scelles.du',
                                    )}
                                  </Text>
                                </Col>

                                <Col size={20}>
                                  <TextInput
                                    mode="outlined"
                                    label={translate(
                                      'controleApresScanner.core.scelles.du',
                                    )}
                                    value={this.state.generateurDu}
                                    keyboardType={'number-pad'}
                                    maxLength={8}
                                    onChangeText={(text) => {
                                      text = text.replace(/[^0-9.]/g, '');
                                      this.setState({
                                        ...this.state,
                                        generateurDu: text,
                                      });
                                    }}
                                    disabled={this.state.readonly}
                                  />
                                </Col>

                                <Col size={5} />

                                <Col size={5} style={style.labelContainer}>
                                  <Text style={style.labelTextStyle}>
                                    {translate(
                                      'controleApresScanner.core.scelles.au',
                                    )}
                                  </Text>
                                </Col>

                                <Col size={20}>
                                  <TextInput
                                    mode="outlined"
                                    label={translate(
                                      'controleApresScanner.core.scelles.au',
                                    )}
                                    value={this.state.generateurAu}
                                    keyboardType={'number-pad'}
                                    maxLength={8}
                                    onChangeText={(text) => {
                                      text = text.replace(/[^0-9.]/g, '');
                                      this.setState({
                                        ...this.state,
                                        generateurAu: text,
                                      });
                                    }}
                                    disabled={this.state.readonly}
                                  />
                                </Col>

                                <Col size={5} />

                                <Col size={10} style={style.labelContainer}>
                                  <Button
                                    title={translate('transverse.Ok')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.generateScelles()}
                                  />
                                </Col>
                              </Row>

                              <Row size={100} style={style.topMarginStyle}>
                                <Col size={30} style={style.labelContainer}>
                                  <Text style={style.labelTextStyle}>
                                    {translate(
                                      'controleApresScanner.core.scelles.numeroScelle',
                                    )}
                                  </Text>
                                </Col>

                                <Col size={20} style={style.labelContainer}>
                                  <TextInput
                                    ref={(ref) => (this.scelleInput = ref)}
                                    key="scelleInput"
                                    mode="outlined"
                                    value={this.state.scelleVo.reference}
                                    keyboardType={'number-pad'}
                                    maxLength={8}
                                    onChangeText={(text) => {
                                      text = text.replace(/[^0-9.]/g, '');
                                      this.setState({
                                        ...this.state,
                                        scelleVo: {
                                          ...this.state.scelleVo,
                                          reference: text,
                                        },
                                      });
                                    }}
                                    disabled={this.state.readonly}
                                  />
                                </Col>

                                <Col size={5} />

                                <Col size={10} style={style.labelContainer}>
                                  <TouchableOpacity
                                    style={style.touchableArrow}
                                    disabled={this.props.readonly}>
                                    <Button
                                      type={'outline'}
                                      icon={{
                                        name: 'chevron-right',
                                        size: 12,
                                        color: 'black',
                                      }}
                                      onPress={() => this.addScelle()}
                                      disabled={this.props.readonly}
                                    />
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    style={style.touchableArrow}
                                    disabled={this.props.readonly}>
                                    <Button
                                      type={'outline'}
                                      icon={{
                                        name: 'chevron-left',
                                        size: 12,
                                        color: 'black',
                                      }}
                                      onPress={() => this.removeScelle()}
                                      disabled={this.props.readonly}
                                    />
                                  </TouchableOpacity>
                                </Col>

                                <Col size={5} />

                                <Col size={40} style={style.boxContainer}>
                                  <SafeAreaView style={style.boxSafeArea}>
                                    {(this.state.controleApresScannerVo
                                      .scelles == null ||
                                      this.state.controleApresScannerVo.scelles
                                        .size === 0) && (
                                      <Text style={style.boxItemText}>
                                        Aucun élément
                                      </Text>
                                    )}

                                    {this.state.controleApresScannerVo
                                      .scelles != null &&
                                      this.state.controleApresScannerVo.scelles
                                        .size !== 0 && (
                                        <FlatList
                                          data={Object.values(
                                            this.state.controleApresScannerVo
                                              .scelles,
                                          )}
                                          renderItem={(item) =>
                                            this.renderBoxItem(item)
                                          }
                                          keyExtractor={(item) => item}
                                          nestedScrollEnabled={true}
                                        />
                                      )}
                                  </SafeAreaView>
                                </Col>
                              </Row>
                            </View>
                          )}
                      </View>
                    </ComAccordionComp>
                  </View>

                  <View style={style.topMarginStyle}>
                    <ComAccordionComp
                      expanded={false}
                      title={translate(
                        'controleApresScanner.core.photosControle.title',
                      )}>
                      <View>
                        {!this.state.readonly && (
                          <Row size={100}>
                            <Col size={40} />

                            <Col size={20}>
                              <Button
                                title={translate(
                                  'controleApresScanner.core.photosControle.addImage',
                                )}
                                type={'solid'}
                                buttonStyle={style.buttonAction}
                                onPress={() => this.onAddPicture()}
                              />
                            </Col>

                            <Col size={40} />
                          </Row>
                        )}

                        <Row size={100}>
                          <Col size={100}>
                            <FlatList
                              data={
                                this.state.controleApresScannerVo
                                  .photosControleApresScanner
                              }
                              renderItem={(picture) =>
                                this.renderPicture(picture)
                              }
                              keyExtractor={(item) => item.urlPhoto}
                              horizontal={true}
                              onEndReached={this.loadMoreData}
                              onEndReachedThreshold={0.1}
                              ItemSeparatorComponent={() => (
                                <View style={styles.separator} />
                              )}
                              ListFooterComponent={this.renderFooter.bind(this)}
                            />
                          </Col>
                        </Row>
                      </View>
                    </ComAccordionComp>
                  </View>

                  <View style={style.topMarginStyle}>
                    <Row size={100}>
                      <Col size={40} />

                      <Col size={20}>
                        <Button
                          title={translate('transverse.confirmer')}
                          type={'solid'}
                          buttonStyle={style.buttonAction}
                          onPress={() => this.confirm()}
                        />
                      </Col>

                      <Col size={40} />
                    </Row>

                    <Row size={100}>
                      <Col size={40} />

                      <Col size={20}>
                        <Button
                          title={translate('transverse.back')}
                          type={'solid'}
                          buttonStyle={style.buttonAction}
                          onPress={() => this.back()}
                        />
                      </Col>

                      <Col size={40} />
                    </Row>
                  </View>
                </Grid>
              </View>
            )}

            {this.state.cameraMode && (
              <ComBadrCameraComp onTakePicture={this.onTakePicture} />
            )}

            {this.state.deleteMode && (
              <Modal
                isVisible={this.state.deleteMode}
                onBackdropPress={this.close}
                style={style.modalContainer}>
                <View>
                  <Text style={style.modalMessage}>
                    {translate(
                      'controleApresScanner.core.photosControle.removalModal.message',
                    )}
                  </Text>

                  <Button
                    title={translate('transverse.confirmer')}
                    type={'solid'}
                    buttonStyle={style.modalAction}
                    onPress={() => this.confirmPictureRemoval()}
                  />

                  <Button
                    title={translate('transverse.annuler')}
                    type={'solid'}
                    buttonStyle={style.modalAction}
                    onPress={() => this.cancelPictureRemoval()}
                  />
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
  return {...state.ctrlControleApresScannerReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  item: {
    padding: 10,
    height: 80,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CtrlControleApresScannerCoreComponent);
