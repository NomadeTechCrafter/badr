import React from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrModalComp,
  ComBasicDataTableComp,
  ComDetailPlaqueComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import RNFetchBlob from 'rn-fetch-blob';
import {downloadFile} from 'react-native-fs';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import {IconButton, Text} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
class DedRedressementDocumentsExigiblesBlock extends React.Component {
  buildDemandesCols = () => {
    return [
      {
        code: 'portee',
        libelle: translate('dedouanement.documents.num'),
        width: 250,
      },
      {
        code: '',
        libelle: '',
        width: 60,
        component: 'button',
        icon: 'file-eye',
        action: (row, index) => this.getListeFichiersCharge(row, index),
      },
      {
        code: 'typeDocument',
        libelle: translate('dedouanement.documents.doc'),
        width: 250,
      },
      {
        code: 'portee',
        libelle: translate('dedouanement.documents.portee'),
        width: 250,
      },
      {
        code: 'numeroOrdreArticle',
        libelle: translate('dedouanement.documents.numArticles'),
        width: 250,
      },
      {
        code: 'statutRejeteString',
        libelle: translate('dedouanement.documents.statut'),
        width: 250,
      },
    ];
  };

  buildDemandesCols2 = () => {
    return [
      {
        code: 'qualite_signataire',
        libelle: translate('dedouanement.documents.enQualiteDe'),
        width: 250,
      },
      {
        code: 'ident_signataire',
        libelle: translate('dedouanement.documents.par'),
        width: 250,
      },
      {
        code: 'date_signature',
        libelle: translate('dedouanement.documents.le'),
        width: 250,
      },
      {
        code: 'numeroTransaction',
        libelle: translate('dedouanement.documents.numTransaction'),
        width: 250,
      },
    ];
  };

  buildDemandesCols3 = () => {
    return [
      {
        code: 'render',
        libelle: translate('dedouanement.documents.fichier'),
        width: 250,
        render: (row) => {
          return (
            <Row>
              <IconButton
                icon="file-eye"
                color={primaryColor}
                size={40}
                onPress={() => this.consulterFichier(row)}
              />
              <Text>
                {row.nomFichier +
                  '\n\r' +
                  translate('dedouanement.documents.ref') +
                  row.refDocument +
                  '\n\r' +
                  translate('dedouanement.documents.signe') +
                  row.signee}
              </Text>
            </Row>
          );
        },
      },
      {
        code: 'render',
        libelle: translate('dedouanement.documents.enQualiteDe'),
        width: 250,
        render: (row) => {
          return _.join(
            _.map(row.traceSignatureVO, 'qualite_signataire'),
            '\n\r \n\r',
          );
        },
      },
      {
        code: 'render',
        libelle: translate('dedouanement.documents.par'),
        width: 250,
        render: (row) => {
          return _.join(
            _.map(row.traceSignatureVO, 'ident_signataire'),
            '\n\r \n\r',
          );
        },
      },
      {
        code: 'render',
        libelle: translate('dedouanement.documents.le'),
        width: 250,
        render: (row) => {
          return _.join(
            _.map(row.traceSignatureVO, 'date_signature'),
            '\n\r \n\r',
          );
        },
      },
      {
        code: 'numeroTransaction',
        libelle: translate('dedouanement.documents.numTransaction'),
        width: 250,
      },
      {
        code: 'formatedDate',
        libelle: translate('dedouanement.documents.dateChargement'),
        width: 250,
      },
    ];
  };

  getListeFichiersCharge = (row, index) => {
    console.log('---getListeFichiersCharge----', row);
    this.setState({ListeFichiersCharge: row.listeFichiers, showDetail: true});
  };

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  constructor(props) {
    super(props);
    this.state = {
      demandesCols: this.buildDemandesCols(),
      demandesCols2: this.buildDemandesCols2(),
      demandesCols3: this.buildDemandesCols3(),
      showDetail: false,
      ListeFichiersCharge: [],
    };
  }
  componentDidMount() {
    this.getTraceSignatureDUM();
    this.getDocumentsExigiblesDUM();
  }

  getDocumentsExigiblesDUM = () => {
    let idDec = getValueByPath('dedReferenceVO.identifiant', this.props.data);
    let numVersion = getValueByPath(
      'dedReferenceVO.numeroVersionCourante',
      this.props.data,
    );

    var data = {
      idDec: idDec,
      numVersion: numVersion,
    };
    this.callRedux({
      command: 'ded.recupererDocumentsExigiblesDUM',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  getTraceSignatureDUM = () => {
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props,
    );
    let codeRegime = getValueByPath(
      'dedReferenceVO.refRegime',
      this.props,
    );
    var data = {
      identifiantDUM: identifiantDUM,
      numeroVersion: numeroVersion,
      codeRegime: codeRegime,
    };
    this.callRedux({
      command: 'ded.getTraceSignatureDUM',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  consulterDeclaration = () => {
    let idDeclaration = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props,
    );

    var data = {
      idDeclaration: idDeclaration,
      numeroVersion: numeroVersion,
    };
    this.callRedux({
      command: 'ded.consulterFichierPdfDumSign',
      typeService: 'SP',
      jsonVO: data,
    });
  };
  consulterFichier = (fichier) => {
    this.callRedux({
      command: 'ded.consulterFichier',
      typeService: 'SP',
      jsonVO: fichier.idFichier,
    });
  };

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
        RNFetchBlob.fs.writeFile(pdfLocation, base64File, 'base64').then((result) => {
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

  render() {
    let value1 = this.extractCommandData(
      'ded.getTraceSignatureDUM',
      'genericDedReducer',
    );
    let value = this.extractCommandData(
      'ded.recupererDocumentsExigiblesDUM',
      'genericDedReducer',
    );
    let fichierPdfDumSign = this.extractCommandData(
      'ded.consulterFichierPdfDumSign',
      'genericDedReducer',
    );
    let consulterFichier = this.extractCommandData(
      'ded.consulterFichier',
      'genericDedReducer',
    );
    if (!_.isNil(consulterFichier) && !_.isNil(consulterFichier.data)) {
      console.log('render file consulterFichier----', consulterFichier.data);
      this.downloadFile('test.pdf', consulterFichier.data);
    }
    if (!_.isNil(fichierPdfDumSign) && !_.isNil(fichierPdfDumSign.data)) {
      console.log('render file----', fichierPdfDumSign.data);
      this.downloadFile(
        fichierPdfDumSign.data.nomFichier,
        fichierPdfDumSign.data.contentByte,
      );
    }
    console.log('Accordion render  getTraceSignatureDUM', value);
    //console.log('Accordion render ded.recupererDocumentsExigiblesDUM', value1);
    return (
      <View style={styles.container}>
        <ComBadrButtonIconComp
          onPress={() => this.consulterDeclaration()}
          icon="file-eye"
          loading={this.props.showProgress}
          text={translate('dedouanement.documents.consulterDeclaration')}
        />
        {!_.isNil(value) && !_.isNil(value.data) && (
          <ComAccordionComp
            title={`Nombre total des demandes : ${
              getValueByPath('data', value) ? value.data.length : 0
            }`}
            expanded={true}>
            <ComBasicDataTableComp
              rows={getValueByPath('data', value)}
              cols={this.state.demandesCols}
              totalElements={
                getValueByPath('data', value) ? value.data.length : 0
              }
              maxResultsPerPage={5}
              paginate={true}
            />
          </ComAccordionComp>
        )}
        {!_.isNil(value1) && !_.isNil(value1.data) && (
          <ComAccordionComp
            title={`Nombre total des demandes : ${
              value1.data ? value1.data.length : 0
            }`}
            expanded={true}>
            <ComBasicDataTableComp
              rows={_.head(value1.data)}
              cols={this.state.demandesCols2}
              totalElements={value1.data ? value1.data.length : 0}
              maxResultsPerPage={5}
              paginate={true}
            />
          </ComAccordionComp>
        )}
        <ComBadrModalComp
          visible={this.state.showDetail}
          onDismiss={this.onDismiss}>
          <ComAccordionComp
            title={`Nombre total des demandes : ${
              this.state.ListeFichiersCharge
                ? this.state.ListeFichiersCharge.length
                : 0
            }`}
            expanded={true}>
            <ComBasicDataTableComp
              rows={this.state.ListeFichiersCharge}
              cols={this.state.demandesCols3}
              totalElements={
                this.state.ListeFichiersCharge
                  ? this.state.ListeFichiersCharge.length
                  : 0
              }
              maxResultsPerPage={5}
              paginate={true}
            />
          </ComAccordionComp>
        </ComBadrModalComp>
      </View>
    );
  }

  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      console.log('calling redux ...');
      this.props.dispatch(request({type: GENERIC_DED_REQUEST, value: jsonVO}));
    }
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_DED_INIT, value: {}}));
  };

  extractCommandData = (command, reducerName) => {
    return this.props[reducerName] && this.props[reducerName].picker
      ? this.props[reducerName].picker[command]
      : null;
  };

  /**
   * end
   * Redux
   */
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementDocumentsExigiblesBlock);
