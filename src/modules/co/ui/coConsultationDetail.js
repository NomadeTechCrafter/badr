import React from 'react';
import {PermissionsAndroid, Platform, ScrollView, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonComp,
  ComBadrButtonRadioComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp,
  ComBadrCheckboxTreeComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp,
  ComBadrListComp,
  ComBadrPickerComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
} from '../../../commons/component';
/**Custom Components */
import translate from '../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../commons/styles/ComThemeStyle';
import {
  languesImpression,
  radioButtonsDataCumulAR,
  radioButtonsDataCumulFR,
  typesCertificats,
} from '../state/coConstants';
import coStyle from '../style/coStyle';
import ComBadrReferentielPickerComp from '../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import {getValueByPath} from '../../t6bis/utils/t6bisUtils';
import {GENERIC_ECI_REQUEST} from '../../ecorImport/enleverMarchandise/state/EcorImportConstants';
import {request} from '../state/actions/coAction';
import {GENERIC_REQUEST} from '../../../commons/constants/generic/ComGenericConstants';
import {ComSessionService} from '../../../commons/services/session/ComSessionService';
import {
  TYPE_SERVICE_SP,
  TYPE_SERVICE_UC,
} from '../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../commons/services/api/common/ComHttpHelperApi';
import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';

class COConsultationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentaire: '',
      selectedCachet: {},
      isAccepter: false,
      isRejeter: false,
      isAnnuler: false,
      showButtons: true,
      uor: null,
    };
    this.coCols = [
      {
        code: 'numeroOrdreArticle',
        libelle: translate('co.numeroOrdreArticle'),
        width: 50,
      },
      {
        code: 'paysOrigine',
        libelle: translate('co.paysOrigine'),
        width: 120,
      },
      {
        code: 'nomenclature',
        libelle: translate('co.nomenclature'),
        width: 120,
      },
      {
        code: 'nombreContenant',
        libelle: translate('co.nombreContenant'),
        width: 120,
      },
      {
        code: 'nature',
        libelle: translate('co.nature'),
        width: 150,
      },
      {
        code: 'quantite',
        libelle: translate('co.quantite'),
        width: 120,
      },
      {
        code: 'unite',
        libelle: translate('co.unite'),
        width: 120,
      },
      {
        code: 'groupArcticles',
        libelle: translate('co.groupArcticles'),
        width: 150,
      },
      {
        code: '',
        libelle: 'Action',
        component: 'basic-button',
        text: 'Complément',
        attrCondition: 'numeroOrdreArticle',
        action: (row, index) => this.complement(row, index),
        width: 180,
      },
    ];
    this.coFacturesCols = [
      {
        code: '',
        libelle: translate('co.id'),
        icon: 'eye',
        component: 'button',
        action: (row, index) => this.afficherFacture(row, index),
        width: 50,
      },
      {
        code: 'numeroFacture',
        libelle: translate('co.numeroFacture'),
        width: 120,
      },
      {
        code: 'dateFacture',
        libelle: translate('co.dateFacture'),
        width: 120,
      },
    ];
  }

  complement(row, index) {
    this.setState({
      selectedArticle: row,
    });
  }

  afficherFacture(row, index) {
    this.setState({
      selectedFacture: row,
    });
  }

  toShowDestinationAR(typeCertificat) {
    return (
      typeCertificat === '03' ||
      typeCertificat === '04' ||
      typeCertificat === '05'
    );
  }
  toShowDestination(typeCertificat) {
    return (
      typeCertificat === '06' ||
      typeCertificat === '07' ||
      typeCertificat === '01'
    );
  }

  toShowMoyenTransport(typeCertificat) {
    return (
      typeCertificat === '01' ||
      typeCertificat === '06' ||
      typeCertificat === '07'
    );
  }

  toShowDestinataire(typeCertificat) {
    return typeCertificat === '06' || typeCertificat === '07';
  }

  toShowAR(typeCertificat) {
    return (
      typeCertificat === '02' ||
      typeCertificat === '03' ||
      typeCertificat === '04' ||
      typeCertificat === '05'
    );
  }

  toShowDetailExpedition(typeCertificat) {
    return typeCertificat === '02' || typeCertificat === '03';
  }

  toShowValeurTotalArticleAR(typeCertificat) {
    return typeCertificat === '04' || typeCertificat === '05';
  }

  async accepter() {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite()
          ? ComSessionService.getInstance().getFonctionalite()
          : '9932',
        module: 'CO_LIB',
        commande: 'descriptionUniteOrganisationnelle',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: null,
    };
    const response = await ComHttpHelperApi.process(data);
    this.setState({
      isAccepter: true,
      isRejeter: false,
      isAnnuler: false,
      showButtons: false,
      uor: response?.data?.jsonVO,
    });
  }

  annuler() {
    this.setState({
      isAccepter: false,
      isRejeter: false,
      isAnnuler: true,
      showButtons: false,
      commentaire: '',
    });
  }

  rejeter() {
    this.setState({
      isAccepter: false,
      isRejeter: true,
      isAnnuler: false,
      showButtons: false,
      commentaire: '',
    });
  }

  async visualiser() {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
        module: 'CO_LIB',
        commande: 'visualiserCertificatOrigine',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: {
        reference: this.props.data?.reference,
      },
    };
    const response = await ComHttpHelperApi.process(data);
    this.downloadFile('CertificatOrigine.pdf', response.data?.jsonVO);
    console.log(JSON.stringify(response));
  }

  downloadFile = async (nameFile, base64File) => {
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
        let pdfLocation = RNFetchBlob.fs.dirs.DocumentDir + '/' + nameFile;
        RNFetchBlob.fs
          .writeFile(pdfLocation, base64File, 'base64')
          .then((result) => {
            if (Platform.OS === 'android') {
              RNFetchBlob.android.actionViewIntent(
                pdfLocation,
                'application/pdf',
              );
            } else {
              RNFetchBlob.ios.previewDocument(pdfLocation);
            }
            result.flush();
          });
      } else {
        console.log('External storage permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  async confirmer() {
    this.setState({
      errorMessage: '',
    });
    if (this.state.isAccepter) {
      if (!this.checkRequiredFields()) {
        const data = {
          dtoHeader: {
            userLogin: ComSessionService.getInstance().getLogin(),
            fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
            module: 'CO_LIB',
            commande: 'accepterCertificatOrigine',
            typeService: TYPE_SERVICE_UC,
          },
          jsonVO: {
            identifiant: this.props?.route?.params?.identifiant,
            idAgentValidation: ComSessionService.getInstance().getLogin(),
            commentaire: this.state.commentaire,
            cachet: this.state.selectedCachet?.code,
          },
        };
        const response = await ComHttpHelperApi.process(data);
        console.log(JSON.stringify(response?.data?.dtoHeader?.messagesInfo));
        console.log(JSON.stringify(response?.data?.dtoHeader?.messagesErreur));
        if (response?.data?.dtoHeader?.messagesErreur) {
          this.setState({
            errorMessage: response?.data?.dtoHeader?.messagesErreur,
          });
        } else {
          this.setState({
            errorMessage: '',
          });
        }
        if (response?.data?.dtoHeader?.messagesInfo) {
          this.setState({
            infoMessage: response?.data?.dtoHeader?.messagesInfo,
            isAccepter: false,
            isRejeter: false,
            isAnnuler: false,
            showButtons: false,
          });
        } else {
          this.setState({
            infoMessage: null,
          });
        }
      }
    }
    if (this.state.isRejeter) {
      if (!this.checkRequiredFieldsRejeter()) {
        const data = {
          dtoHeader: {
            userLogin: ComSessionService.getInstance().getLogin(),
            fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
            module: 'CO_LIB',
            commande: 'rejeterCertificatOrigine',
            typeService: TYPE_SERVICE_UC,
          },
          jsonVO: {
            identifiant: this.props?.route?.params?.identifiant,
            commentaire: this.state.commentaire,
          },
        };
        const response = await ComHttpHelperApi.process(data);
        console.log(JSON.stringify(response?.data?.dtoHeader?.messagesInfo));
        console.log(JSON.stringify(response?.data?.dtoHeader?.messagesErreur));
        if (response?.data?.dtoHeader?.messagesErreur) {
          this.setState({
            errorMessage: response?.data?.dtoHeader?.messagesErreur,
          });
        } else {
          this.setState({
            errorMessage: '',
          });
        }
        if (response?.data?.dtoHeader?.messagesInfo) {
          this.setState({
            infoMessage: response?.data?.dtoHeader?.messagesInfo,
            isAccepter: false,
            isRejeter: false,
            isAnnuler: false,
            showButtons: false,
          });
        } else {
          this.setState({
            infoMessage: null,
          });
        }
      }
    }
    if (this.state.isAnnuler) {
      if (!this.checkRequiredFieldsRejeter()) {
        const data = {
          dtoHeader: {
            userLogin: ComSessionService.getInstance().getLogin(),
            fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
            module: 'CO_LIB',
            commande: 'annulerCertificatOrigine',
            typeService: TYPE_SERVICE_UC,
          },
          jsonVO: {
            identifiant: this.props?.route?.params?.identifiant,
            commentaire: this.state.commentaire,
          },
        };
        const response = await ComHttpHelperApi.process(data);
        console.log(JSON.stringify(response?.data?.dtoHeader?.messagesInfo));
        console.log(JSON.stringify(response?.data?.dtoHeader?.messagesErreur));
        if (response?.data?.dtoHeader?.messagesErreur) {
          this.setState({
            errorMessage: response?.data?.dtoHeader?.messagesErreur,
          });
        } else {
          this.setState({
            errorMessage: '',
          });
        }
        if (response?.data?.dtoHeader?.messagesInfo) {
          this.setState({
            infoMessage: response?.data?.dtoHeader?.messagesInfo,
            isAccepter: false,
            isRejeter: false,
            isAnnuler: false,
            showButtons: false,
          });
        } else {
          this.setState({
            infoMessage: null,
          });
        }
      }
    }
  }

  retablir() {
    if (this.isAccepter) {
      this.comboCachets.clearInput();
    }
    this.setState({
      commentaire: '',
      selectedCachet: {},
      errorMessage: '',
      infoMessage: null,
    });
  }

  abandonner() {
    this.setState({
      isAccepter: false,
      isRejeter: false,
      isAnnuler: false,
      showButtons: true,
      commentaire: '',
      infoMessage: null,
      errorMessage: '',
    });
  }

  toShow(typeCertificat) {
    return (
      typeCertificat === '06' ||
      typeCertificat === '07' ||
      typeCertificat === '02' ||
      typeCertificat === '03'
    );
  }

  checkRequiredFields = () => {
    let msg = [];
    let required = false;
    let validation = false;

    if (_.isEmpty(this.state.commentaire)) {
      required = true;
      msg.push(translate('co.commentaire'));
    }
    if (!this.state.selectedCachet?.code) {
      required = true;
      msg.push(translate('co.cachet'));
    }

    if (required) {
      let message =
        translate('actifsCreation.avionsPrivees.champsObligatoires') + msg;
      if (validation) {
        message = msg;
      }
      this.setState({
        errorMessage: message,
      });
    } else {
      this.setState({
        errorMessage: null,
      });
    }
    return required;
  };

  checkRequiredFieldsRejeter = () => {
    let msg = [];
    let required = false;
    let validation = false;

    if (_.isEmpty(this.state.commentaire)) {
      required = true;
      msg.push(translate('co.commentaire'));
    }

    if (required) {
      let message =
        translate('actifsCreation.avionsPrivees.champsObligatoires') + msg;
      if (validation) {
        message = msg;
      }
      this.setState({
        errorMessage: message,
      });
    } else {
      this.setState({
        errorMessage: null,
      });
    }
    return required;
  };

  render() {
    const coFromWhichScreen = this.props?.route?.params?.coFromWhichScreen;

    const co = this.props.data;
    console.log(co.typeCertificat);
    let destinationCommand = '';
    let destinationParam = null;
    switch (co.typeCertificat) {
      case '01':
        destinationCommand = 'vctDestination';
        break;
      case '02':
        destinationCommand = 'vctDestinationLigueArabe';
        break;
      case '03':
        destinationCommand = 'vctDestinationLigueArabe';
        break;
      case '04':
        destinationCommand = 'vctDestinationJaune';
        break;
      case '05':
        destinationCommand = 'vctDestinationLigueArabe';
        break;
      case '06':
        destinationCommand = 'getCmbPays';
        destinationParam = {code: co?.paysDestination};
        break;
      case '07':
        destinationCommand = 'getCmbPays';
        destinationParam = {code: co?.paysDestination};
        break;
      default:
        destinationCommand = 'vctDestination';
        break;
    }
    return (
      <ScrollView>
        <View>
          <ComBadrToolbarComp
            navigation={this.props.navigation}
            icon="menu"
            title={translate('co.titleConsultation')}
            subtitle={translate('co.demandeCertificatOrigine')}
          />
          <View>
            {this.state?.errorMessage != null && (
              <ComBadrErrorMessageComp message={this.state?.errorMessage} />
            )}
            {this.state.infoMessage != null && (
              <ComBadrInfoMessageComp message={this.state?.infoMessage} />
            )}
          </View>
          {coFromWhichScreen &&
            coFromWhichScreen === 'TRAITER' &&
            this.state.showButtons && (
              <View style={coStyle.comContainerCompBtn}>
                <ComBadrButtonComp
                  style={coStyle.actionBtn}
                  onPress={() => {
                    this.accepter();
                  }}
                  text={translate('co.buttons.accepter')}
                />
                <ComBadrButtonComp
                  style={coStyle.actionBtn}
                  onPress={() => {
                    this.rejeter();
                  }}
                  text={translate('co.buttons.rejeter')}
                />
                <ComBadrButtonComp
                  style={coStyle.actionBtn}
                  onPress={() => {
                    this.visualiser();
                  }}
                  text={translate('co.buttons.visualiser')}
                />
              </View>
            )}
          {coFromWhichScreen &&
            coFromWhichScreen === 'ANNULER' &&
            this.state.showButtons && (
              <View style={coStyle.comContainerCompBtn}>
                <ComBadrButtonComp
                  style={coStyle.actionBtn}
                  onPress={() => {
                    this.annuler();
                  }}
                  text={translate('co.buttons.annuler')}
                />
              </View>
            )}
          {coFromWhichScreen &&
            coFromWhichScreen === 'CONSULTER' &&
            this.state.showButtons && 'Accepté' === co?.statut && (
              <View style={coStyle.comContainerCompBtn}>
                <ComBadrButtonComp
                  style={coStyle.actionBtn}
                  onPress={() => {
                    this.visualiser();
                  }}
                  text={translate('co.buttons.visualiser')}
                />
              </View>
            )}

          {this.state.isAccepter && (
            <ComBadrCardBoxComp style={coStyle.cardBox}>
              <ComBadrCardWithTileComp title={translate('co.intervention')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp>
                        {translate('co.requiredCachet')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                      <ComBadrPickerComp
                        onRef={(ref) => (this.comboCachets = ref)}
                        key="code"
                        selectedValue={this.state.selectedCachet}
                        cle="code"
                        libelle="libelle"
                        command="listeCachetCombo"
                        module="CO_LIB"
                        typeService="SP"
                        storeWithKey="code"
                        storeLibelleWithKey="libelle"
                        param={null}
                        onValueChange={(itemValue, itemIndex, selectedItem) =>
                          this.setState({
                            selectedCachet: selectedItem ? selectedItem : {},
                          })
                        }
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>{this.state.uor}</ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.commentaire')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={9}>
                      <TextInput
                        mode={'outlined'}
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.commentaire}
                        onChangeText={(text) =>
                          this.setState({
                            commentaire: text,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col />
                    <Col>
                      <ComBadrButtonComp
                        style={coStyle.actionBtn}
                        onPress={() => {
                          this.confirmer();
                        }}
                        text={translate('transverse.confirmer')}
                      />
                    </Col>
                    <Col>
                      <ComBadrButtonComp
                        style={coStyle.actionBtn}
                        onPress={() => {
                          this.retablir();
                        }}
                        text={translate('transverse.retablir')}
                      />
                    </Col>
                    <Col>
                      <ComBadrButtonComp
                        style={coStyle.actionBtn}
                        onPress={() => {
                          this.abandonner();
                        }}
                        text={translate('transverse.abandonner')}
                      />
                    </Col>
                    <Col />
                  </Row>
                </Grid>
              </ComBadrCardWithTileComp>
            </ComBadrCardBoxComp>
          )}
          {this.state.isRejeter && (
            <ComBadrCardBoxComp style={coStyle.cardBox}>
              <ComBadrCardWithTileComp title={translate('co.intervention')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.commentaire')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={9}>
                      <TextInput
                        mode={'outlined'}
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.commentaire}
                        onChangeText={(text) =>
                          this.setState({
                            commentaire: text,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col />
                    <Col>
                      <ComBadrButtonComp
                        style={coStyle.actionBtn}
                        onPress={() => {
                          this.confirmer();
                        }}
                        text={translate('transverse.confirmer')}
                      />
                    </Col>
                    <Col>
                      <ComBadrButtonComp
                        style={coStyle.actionBtn}
                        onPress={() => {
                          this.retablir();
                        }}
                        text={translate('transverse.retablir')}
                      />
                    </Col>
                    <Col>
                      <ComBadrButtonComp
                        style={coStyle.actionBtn}
                        onPress={() => {
                          this.abandonner();
                        }}
                        text={translate('transverse.abandonner')}
                      />
                    </Col>
                    <Col />
                  </Row>
                </Grid>
              </ComBadrCardWithTileComp>
            </ComBadrCardBoxComp>
          )}
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.referenceDUM')}
                  libelleSize={2}
                  value={co?.referenceDUM}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.reference')}
                  libelleSize={2}
                  value={co?.reference}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.operateurCertificatOrigine')}
                  libelleSize={2}
                  value={co?.soumissionnaire}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.cachet')}
                  libelleSize={2}
                  value={co?.cachet}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.dateEnregistrementDum')}
                  libelleSize={2}
                  value={co?.dateEnrDum}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.statut')}
                  libelleSize={2}
                  value={co?.statut}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.dateMLV')}
                  libelleSize={2}
                  value={co?.dateMlv}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.dateEnregistrement')}
                  libelleSize={2}
                  value={co?.dateHeureEnregistrement}
                />
              </Row>
              {co?.typeCertificat && this.toShow(co.typeCertificat) && (
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <ComBadrKeyValueComp
                    libelle={translate('co.accord')}
                    value={co?.accordCode}
                  />
                </Row>
              )}
            </Grid>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={1} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.typeCertificat')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={6}>
                  {/* <ComBadrItemsPickerComp
                    selectedValue={co?.typeCertificat}
                    items={typesCertificats}
                    disabled={true}
                  /> */}
                  <ComBadrPickerComp
                    disabled={true}
                    key="code"
                    selectedValue={co?.typeCertificat}
                    selected={co?.typeCertificat}
                    cle="code"
                    libelle="libelle"
                    command="getVctTypeCO"
                    module="CO_LIB"
                    // param={destinationParam}
                    typeService="SP"
                    storeWithKey="code"
                    storeLibelleWithKey="libelle"
                  />
                </Col>
                <Col size={1} />
              </Row>

              {co?.paysDestination &&
                this.toShowDestination(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destination')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      {/* {this.toShow1(co?.typeCertificat) && ( */}
                      <ComBadrPickerComp
                        disabled={true}
                        key="code"
                        selectedValue={co?.paysDestination}
                        selected={co?.paysDestination}
                        cle="code"
                        libelle="libelle"
                        command={destinationCommand}
                        module="REF_LIB"
                        param={destinationParam}
                        typeService="SP"
                        storeWithKey="code"
                        storeLibelleWithKey="libelle"
                      />
                    </Col>
                    <Col size={1} />
                  </Row>
                )}

              {co?.paysDestination &&
                this.toShowDestinationAR(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destination')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrPickerComp
                        disabled={true}
                        key="code"
                        selectedValue={co?.paysDestination}
                        selected={co?.paysDestination}
                        cle="code"
                        libelle="libelle"
                        command="vctDestinationLigueArabe"
                        param={null}
                        typeService="SP"
                        storeWithKey="code"
                        storeLibelleWithKey="libelle"
                      />
                    </Col>
                    <Col size={1} />
                  </Row>
                )}

              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={1} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.langue')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={6}>
                  <ComBadrItemsPickerComp
                    selectedValue={co?.langue}
                    items={languesImpression}
                    disabled={true}
                  />
                </Col>
                <Col size={1} />
              </Row>

              {co?.moyenTransport &&
                this.toShowMoyenTransport(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.moyenTransport')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {co?.moyenTransport}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1} />
                  </Row>
                )}
              {co?.accordsCodeList &&
                this.toShowMoyenTransport(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.cumulationApplied')}
                      </ComBadrLibelleComp>
                      {co?.typeCertificat && co?.typeCertificat === '06' && (
                        <Col size={5}>
                          <ComBadrButtonRadioComp
                            disabled={true}
                            value={String(co?.cumul)}
                            radioButtonsData={radioButtonsDataCumulFR}
                          />
                        </Col>
                      )}
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        <ComBadrListComp data={co?.accordsCodeList} />
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1} />
                  </Row>
                )}
              {co?.typeCertificat &&
                this.toShowDestinataire(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destinataire')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {co?.destinataire}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1} />
                  </Row>
                )}
            </Grid>
          </ComBadrCardBoxComp>
          {co?.typeCertificat && this.toShowAR(co?.typeCertificat) && (
            <ComBadrCardBoxComp>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={5}>
                    <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.exportateurAdresseAR}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    />
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {translate('co.exportateurAdresseAR')}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={5}>
                    <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.producteurAdresseAR}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    />
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {translate('co.producteurAdresseAR')}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.lightBlueRow}>
                  {co?.typeCertificat && co?.typeCertificat === '06' && (
                    <Col size={5}>
                      <ComBadrButtonRadioComp
                        disabled={true}
                        value={String(co?.cumul)}
                        radioButtonsData={radioButtonsDataCumulAR}
                      />
                    </Col>
                  )}
                  {co?.typeCertificat && co?.typeCertificat === '06' && (
                    <Col size={2}>
                      <ComBadrLibelleComp>
                        {translate('co.cumul')}
                      </ComBadrLibelleComp>
                    </Col>
                  )}
                  <Col size={5}>
                    <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.importateurAdresseAR}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    />
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {translate('co.importateurAdresseAR')}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                {co?.typeCertificat &&
                  this.toShowDetailExpedition(co?.typeCertificat) && (
                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col size={7} />
                      <Col size={5}>
                        <TextInput
                          mode={'outlined'}
                          disabled={true}
                          direction="rtl"
                          value={co?.detailExpeditionAR}
                          textAlign="right"
                          style={coStyle.paddingLeft}
                        />
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp>
                          {translate('co.detailExpeditionAR')}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                  )}
                {co?.typeCertificat &&
                  this.toShowDetailExpedition(co?.typeCertificat) && (
                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col size={7} />
                      <Col size={5}>
                        <TextInput
                          mode={'outlined'}
                          disabled={true}
                          direction="rtl"
                          value={co?.remarques}
                          textAlign="right"
                          style={coStyle.paddingLeft}
                        />
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp>
                          {translate('co.remarques')}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                  )}
              </Grid>
            </ComBadrCardBoxComp>
          )}
          <ComBadrCardBoxComp>
            <ComBasicDataTableComp
              id="coArticlesTable"
              rows={co?.refArticlesCOVO}
              cols={this.coCols}
              totalElements={co?.refArticlesCOVO?.length}
              maxResultsPerPage={10}
              paginate={true}
              showProgress={this.props.showProgress}
            />
          </ComBadrCardBoxComp>

          {co?.typeCertificat &&
            this.toShowValeurTotalArticleAR(co?.typeCertificat) && (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurTotalArticleAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurTotalArticleAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            )}

          {co?.typeCertificat &&
            this.toShowValeurTotalArticleAR(co?.typeCertificat) &&
            this.state.selectedArticle && (
              <ComBadrCardWithTileComp title={translate('co.elemProd')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={9}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.marqueAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.marqueAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.designationARCount}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.designationARCount')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.designationAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.articleDesignationAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.qteNetAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.qteNetAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.qteBrut}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.articleQteBrut')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.valeurLocalAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurLocalAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.valeurQTAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurQTAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardWithTileComp>
            )}

          {co?.typeCertificat &&
            this.toShowAR(co?.typeCertificat) &&
            this.toShowDetailExpedition(co?.typeCertificat) &&
            this.state.selectedArticle && (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={3} />
                    <Col size={9}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.designationAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.designationAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={7} />
                    <Col size={5}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.qteBrut}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.qteBrut')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            )}

          {co?.typeCertificat &&
            this.toShowMoyenTransport(co?.typeCertificat) &&
            this.state.selectedArticle && (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row>
                    <Col>
                      <ComBadrKeyValueComp
                        libelle={translate('co.descriptionMarchandise')}
                        libelleSize={3}
                        value={this.state.selectedArticle?.designation}
                      />
                    </Col>
                    <Col>
                      {this.state.selectedArticle?.type && (
                        <ComBadrKeyValueComp
                          libelle={translate('co.critereMarchandise')}
                          libelleSize={3}
                          value={this.state.selectedArticle?.type}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ComBadrKeyValueComp
                        libelle={translate('co.poidsBrute')}
                        libelleSize={3}
                        value={this.state.selectedArticle?.qteBrut}
                      />
                    </Col>
                    <Col>
                      {this.state.selectedArticle?.marque && (
                        <ComBadrKeyValueComp
                          libelle={translate('co.marque')}
                          libelleSize={3}
                          value={this.state.selectedArticle?.marque}
                        />
                      )}
                    </Col>
                    {this.state.selectedArticle?.critereOrigine && (
                      <Col>
                        <ComBadrKeyValueComp
                          libelle={translate('co.taux')}
                          libelleSize={2}
                          value={
                            this.state.selectedArticle?.critereOrigine + ' %'
                          }
                        />
                      </Col>
                    )}
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            )}

          {this.state.selectedArticle && (
            <ComBadrCardBoxComp>
              <ComBasicDataTableComp
                id="coFacturesTable"
                rows={this.state.selectedArticle?.refFacturesVO}
                cols={this.coFacturesCols}
                totalElements={
                  this.state.selectedArticle?.refFacturesVO?.length
                }
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
              />
            </ComBadrCardBoxComp>
          )}

          {this.state.selectedFacture && (
            <ComBadrCardBoxComp>
              <ComBadrKeyValueComp
                libelle={translate('co.numeroFacture')}
                libelleSize={2}
                value={this.state.selectedFacture?.numeroFacture}
              />
              <ComBadrKeyValueComp
                libelle={translate('co.dateFacture')}
                libelleSize={2}
                value={this.state.selectedFacture?.dateFacture}
              />
            </ComBadrCardBoxComp>
          )}
          {co?.typeCertificat &&
            this.toShowValeurTotalArticleAR(co?.typeCertificat) && (
              <ComBadrCardWithTileComp title={translate('co.elemProd')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdDevAR1}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdDevAR1}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.libElementProdDevAR1}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR1')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdDevAR2}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdDevAR2}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.libElementProdDevAR2}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR2')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdDevAR3}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdDevAR3}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.libElementProdDevAR3}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR3')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdExterneAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdExterneAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      {/* <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.libElementProdDevAR3}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    /> */}
                    </Col>
                    <Col size={11}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR4')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.sommeValeurElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.sommeQtElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      {/* <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.libElementProdDevAR3}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    /> */}
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR5')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurFinaleElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtFinaleElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      {/* <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.libElementProdDevAR3}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    /> */}
                    </Col>
                    <Col size={11}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR6')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardWithTileComp>
            )}
          {co?.numeroSerieConfinement && (
            <ComBadrKeyValueComp
              libelle={translate('co.numeroSerieConfinement')}
              libelleSize={6}
              value={co?.numeroSerieConfinement}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.coReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(COConsultationDetail);
