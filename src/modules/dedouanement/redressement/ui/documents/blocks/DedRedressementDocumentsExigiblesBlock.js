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
import {IconButton, Text, Title} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
class DedRedressementDocumentsExigiblesBlock extends React.Component {
  documentsExigiblesCols = () => {
    return [
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
        render: (row) => {
          return (
              <Text>
              {row.typeDocument +
                  '(' +
                row.codeDocumentExigible +
                  ')'}
              </Text>
          );
        },
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

  listeFichiersChargeCols = () => {
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
    this.setState({ListeFichiersCharge: row.listeFichiers, showDetail: true});
  };

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  constructor(props) {
    super(props);
    this.state = {
      documentsExigiblesCols: this.documentsExigiblesCols(),
      listeFichiersChargeCols: this.listeFichiersChargeCols(),
      showDetail: false,
      ListeFichiersCharge: [],
    };
  }

  componentDidMount() {
    this.getDocumentsExigiblesDUM();
  }
  getDocumentsExigiblesDUM = () => {
    let idDec = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
      'consulterDumReducer',
    );
    let numVersion = getValueByPath(
      'dedReferenceVO.numeroVersionCourante',
      this.props,
      'consulterDumReducer',
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
        RNFetchBlob.fs.writeFile(pdfLocation, base64File, 'base64').then(() => {
          if (Platform.OS === 'android') {
            RNFetchBlob.android.actionViewIntent(
              pdfLocation,
              'application/pdf',
            );
          } else {
            RNFetchBlob.ios.previewDocument(pdfLocation);
          }
        });
      } else {
        console.log('External storage permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let documentsExigibles = this.extractCommandData(
      'ded.recupererDocumentsExigiblesDUM',
      'genericDedReducer',
    );

    let consulterFichier = this.extractCommandData(
      'ded.consulterFichier',
      'genericDedReducer',
    );

    if (!_.isNil(consulterFichier) && !_.isNil(consulterFichier.data)) {
      this.downloadFile('test.pdf', consulterFichier.data);
    }

    return (
      <View style={styles.container}>
        {/*Accordion Documents Exigibles*/}
        <ComAccordionComp
          title={translate('dedouanement.documents.documentsExigibles')}
          expanded={true}>
          {!_.isNil(documentsExigibles) &&
            !_.isNil(documentsExigibles.data) && (
              <ComBasicDataTableComp
                hasId={true}
                libelleIdCol={translate('dedouanement.documents.num')}
                rows={documentsExigibles.data}
                cols={this.state.documentsExigiblesCols}
                totalElements={
                  documentsExigibles.data ? documentsExigibles.data.length : 0
                }
                maxResultsPerPage={5}
                paginate={true}
              />
            )}
        </ComAccordionComp>
        {/*Modal Liste des fichiers chargés*/}
        <ComBadrModalComp
          visible={this.state.showDetail}
          onDismiss={this.onDismiss}>
          <Title>
            {translate('dedouanement.documents.listeFichiersCharges')}
          </Title>
          <ComBasicDataTableComp
            rows={this.state.ListeFichiersCharge}
            cols={this.state.listeFichiersChargeCols}
            totalElements={
              this.state.ListeFichiersCharge
                ? this.state.ListeFichiersCharge.length
                : 0
            }
            maxResultsPerPage={5}
            paginate={true}
          />
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
