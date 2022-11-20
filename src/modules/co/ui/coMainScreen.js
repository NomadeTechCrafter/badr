import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
/**Custom Components */
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrItemsPickerComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
  RechercheRefDum,
} from '../../../commons/component';
import translate from '../../../commons/i18n/ComI18nHelper';
import style from '../style/coStyle';
import {CO_CONSULTATION_REQUEST, criteresRecherche} from '../state/coConstants';
import {ComSessionService} from '../../../commons/services/session/ComSessionService';
import {TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import moment from 'moment/moment';
import * as ConsulterDumAction from '../../../commons/state/actions/ConsulterDumAction';
import {GENERIC_REQUEST} from '../../../commons/constants/generic/ComGenericConstants';
import * as COAction from '../state/actions/coAction';

const initialState = {
  login: ComSessionService.getInstance().getLogin(),
  dateDu: '',
  dateAu: '',
  matricule: '',
  referenceDS: '',
  referenceLot: '',
  codeLieuChargement: '',
  errorMessage: '',
  lieuChargement: {},
  critereRecherche: '',
  blocNumeroSerie: false,
  blocReference: false,
  blocReferenceDUM: false,
  blocDates: false,
  pays: 'MA',
  rows: [
    {
      identifiant: 809,
      reference: '2021MA0000075',
      dateEnregistrement: '28/01/2021 13:39:08',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '06',
      destination: 'TN',
      langue: 'FR',
      accordCode: 'QUAD',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'G0021540',
      defaultConverter: {},
      idPourRecherche: '2021MA0000075',
    },
    {
      identifiant: 808,
      reference: '2021MA0000074',
      dateEnregistrement: '26/01/2021 20:44:00',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'de transport',
      typeCertificat: '06',
      destination: 'TN',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'A8765786',
      defaultConverter: {},
      idPourRecherche: '2021MA0000074',
    },
    {
      identifiant: 795,
      reference: '2021MA0000061',
      dateEnregistrement: '18/01/2021 18:25:40',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '06',
      destination: 'DK',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'J5402150',
      defaultConverter: {},
      idPourRecherche: '2021MA0000061',
    },
    {
      identifiant: 794,
      reference: '2021MA0000060',
      dateEnregistrement: '18/01/2021 18:22:45',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'DK',
      langue: 'FR',
      accordCode: 'AELE',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'D5421888',
      defaultConverter: {},
      idPourRecherche: '2021MA0000060',
    },
    {
      identifiant: 793,
      reference: '2021MA0000059',
      dateEnregistrement: '18/01/2021 18:21:12',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'ES',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      destinataire:
        'mélanges constitués essentiellement d’hydrogènoalk,mélanges constitués essentiellement d’hydrogènoalk essentiellement d’hydrogènoalk',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'I5421800',
      defaultConverter: {},
      idPourRecherche: '2021MA0000059',
    },
    {
      identifiant: 792,
      reference: '2021MA0000058',
      dateEnregistrement: '18/01/2021 18:19:57',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'ES',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      destinataire:
        'mélanges constitués essentiellement d’hydrogènoalk,mélanges constitués essentiellement d’hydrogènoalk essentiellement d’hydrogènoalk',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'G5411111',
      defaultConverter: {},
      idPourRecherche: '2021MA0000058',
    },
    {
      identifiant: 791,
      reference: '2021MA0000057',
      dateEnregistrement: '18/01/2021 18:16:48',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'FR',
      langue: 'FR',
      accordCode: 'UK',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620210000002',
      versionDUM: '2',
      idDUM: '514366',
      destinataire: 'Nom ou raison sociale,Adresse complète',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'D5240000',
      defaultConverter: {},
      idPourRecherche: '2021MA0000057',
    },
    {
      identifiant: 790,
      reference: '2021MA0000056',
      dateEnregistrement: '18/01/2021 17:51:43',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'azsdzsz',
      typeCertificat: '07',
      destination: 'DK',
      langue: 'FR',
      accordCode: 'TR',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'Z1548963',
      defaultConverter: {},
      idPourRecherche: '2021MA0000056',
    },
    {
      identifiant: 789,
      reference: '2021MA0000055',
      dateEnregistrement: '18/01/2021 17:49:52',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'anspo',
      typeCertificat: '07',
      destination: 'DK',
      langue: 'FR',
      accordCode: 'AELE',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'B1255674',
      defaultConverter: {},
      idPourRecherche: '2021MA0000055',
    },
    {
      identifiant: 788,
      reference: '2021MA0000054',
      dateEnregistrement: '18/01/2021 17:45:55',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      typeCertificat: '05',
      destination: 'TN',
      langue: 'AR',
      exportateurAdresseAR: 'ثصبيصق',
      producteurAdresseAR: 'صثقصثق',
      importateurAdresseAR: 'صثصثق',
      cumul: false,
      showDest: false,
      valeurTotalArticleAR: 'ثيبصثب',
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      defaultConverter: {},
      idPourRecherche: '2021MA0000054',
    },
    {
      identifiant: 787,
      reference: '2021MA0000053',
      dateEnregistrement: '18/01/2021 17:44:07',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      typeCertificat: '02',
      destination: 'QA',
      langue: 'AR',
      exportateurAdresseAR: 'شسيشسي',
      producteurAdresseAR: 'شسيشي',
      importateurAdresseAR: 'ليلثقف',
      cumul: false,
      showDest: false,
      detailExpeditionAR: 'ثقفثقف',
      remarques: 'ثقفثقف',
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: '4568456',
      defaultConverter: {},
      idPourRecherche: '2021MA0000053',
    },
    {
      identifiant: 786,
      reference: '2021MA0000052',
      dateEnregistrement: '18/01/2021 17:42:04',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      typeCertificat: '03',
      destination: 'AE',
      langue: 'AR',
      exportateurAdresseAR: 'شسي',
      producteurAdresseAR: 'شسيي',
      importateurAdresseAR: 'شسي',
      cumul: false,
      showDest: false,
      detailExpeditionAR: 'شسي',
      remarques: 'شسي',
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: '1546878',
      defaultConverter: {},
      idPourRecherche: '2021MA0000052',
    },
    {
      identifiant: 785,
      reference: '2021MA0000051',
      dateEnregistrement: '18/01/2021 17:40:33',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'sdfsdf',
      typeCertificat: '01',
      destination: 'BY',
      langue: 'FR',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      defaultConverter: {},
      idPourRecherche: '2021MA0000051',
    },
    {
      identifiant: 784,
      reference: '2021MA0000050',
      dateEnregistrement: '18/01/2021 17:39:17',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'qqdfsdf',
      typeCertificat: '01',
      destination: 'BY',
      langue: 'FR',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      defaultConverter: {},
      idPourRecherche: '2021MA0000050',
    },
    {
      identifiant: 783,
      reference: '2021MA0000049',
      dateEnregistrement: '18/01/2021 17:34:24',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'DK',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      destinataire:
        "bandes d'une épaisseur ne dépassant pas 5 mm const,Bandes d'une épaissenr ne dépassant pas 5 mm contituées par une nappe de câbles en acier paraléllisés",
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'A5512254',
      defaultConverter: {},
      idPourRecherche: '2021MA0000049',
    },
    {
      identifiant: 782,
      reference: '2021MA0000048',
      dateEnregistrement: '18/01/2021 17:31:51',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'de transport',
      typeCertificat: '07',
      destination: 'ES',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      destinataire:
        'mélanges constitués essentiellement d’hydrogènoalk,mélanges constitués essentiellement d’hydrogènoalk essentiellement d’hydrogènoalk',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'B1224563',
      defaultConverter: {},
      idPourRecherche: '2021MA0000048',
    },
    {
      identifiant: 781,
      reference: '2021MA0000047',
      dateEnregistrement: '18/01/2021 17:30:46',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC3',
      moyenTransport: 'de transport',
      typeCertificat: '06',
      destination: 'ES',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      destinataire:
        'mélanges constitués essentiellement d’hydrogènoalk,mélanges constitués essentiellement d’hydrogènoalk essentiellement d’hydrogènoalk',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'B1234567',
      defaultConverter: {},
      idPourRecherche: '2021MA0000047',
    },
    {
      identifiant: 780,
      reference: '2021MA0000046',
      dateEnregistrement: '18/01/2021 17:09:20',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'TESTDEC5',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'FR',
      langue: 'FR',
      accordCode: 'UK',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620210000002',
      versionDUM: '2',
      idDUM: '514366',
      destinataire: 'Nom ou raison sociale,Adresse complète',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'K2333331',
      defaultConverter: {},
      idPourRecherche: '2021MA0000046',
    },
    {
      identifiant: 779,
      reference: '2021MA0000045',
      dateEnregistrement: '18/01/2021 16:31:24',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '02',
      destination: 'SY',
      langue: 'AR',
      exportateurAdresseAR: 'المصدر وعنوانه كاملا',
      producteurAdresseAR: 'المنتج و عنوانه كاملا  المصدر وعنوانه كاملا',
      importateurAdresseAR: 'المستورد وعنوانه كاملا',
      cumul: false,
      showDest: false,
      detailExpeditionAR: 'تفاصيل الشحن',
      remarques: 'ملاحظات',
      referenceDUM: '30906020190000114',
      versionDUM: '0',
      idDUM: '196849',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: '0001214',
      defaultConverter: {},
      idPourRecherche: '2021MA0000045',
    },
    {
      identifiant: 770,
      reference: '2021MA0000036',
      dateEnregistrement: '15/01/2021 15:52:13',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'ES',
      langue: 'FR',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      destinataire:
        'mélanges constitués essentiellement d’hydrogènoalk,mélanges constitués essentiellement d’hydrogènoalk essentiellement d’hydrogènoalk',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      defaultConverter: {},
      idPourRecherche: '2021MA0000036',
    },
    {
      identifiant: 769,
      reference: '2021MA0000035',
      dateEnregistrement: '15/01/2021 15:39:34',
      refArticlesCOVO: [],
      statut: 'Créé',
      codeDeclarant: 'CO-DEC2019',
      moyenTransport: 'Moyen de transport',
      typeCertificat: '07',
      destination: 'ES',
      langue: 'FR',
      accordCode: 'UE',
      cumul: false,
      showDest: false,
      referenceDUM: '30986620190000003',
      versionDUM: '0',
      idDUM: '202261',
      destinataire:
        'mélanges constitués essentiellement d’hydrogènoalk,mélanges constitués essentiellement d’hydrogènoalk essentiellement d’hydrogènoalk',
      regimeSpecial: false,
      regimeSpecialBeforeConfinment: false,
      opPourLequel: false,
      numeroSerieConfinement: 'X2547125',
      defaultConverter: {},
      idPourRecherche: '2021MA0000035',
    },
  ],
};

class COMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.coCols = [
      {
        code: 'numeroSerieConfinement',
        libelle: translate('co.numeroSerieConfinement'),
        width: 340,
      },
      {
        code: 'reference',
        libelle: translate('co.reference'),
        component: 'basic-button',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 250,
      },
      {
        code: 'referenceDUM',
        libelle: translate('co.referenceDUM'),
        component: 'basic-button',
        action: (row, index) => this.redirectToConsultationDUM(row, index),
        width: 250,
      },
      {
        code: 'versionDUM',
        libelle: translate('co.versionDUM'),
        width: 150,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('co.dateEnregistrement'),
        width: 250,
      },
      {
        code: '',
        libelle: translate('co.action'),
        component: 'basic-button',
        text: 'Traiter',
        action: (row, index) => this.traiter(row, index),
        width: 150,
      },
    ];
  }

  traiter = (row, index) => {
    console.log('traiter 001');
    console.log(JSON.stringify(row));
    console.log('traiter 002');
    console.log(JSON.stringify(index));
    console.log('traiter 003');
  };

  confirmer = () => {
    if (this.state.critereRecherche) {
      this.setState({
        errorMessage: '',
      });
    } else {
      this.setState({
        errorMessage:
          'Erreur : E00596 Critère de recherche : Valeur obligatoire.',
      });
    }
  };

  handleClear = () => {
    this.setState(initialState);
  };

  onCritereRecherchePickerChanged = (v, i) => {
    this.setState({
      critereRecherche: v.code,
      errorMessage: '',
    });
    switch (v.code) {
      case 'numeroSerie':
        this.setState({
          blocNumeroSerie: true,
          blocReference: false,
          blocReferenceDUM: false,
          blocDates: false,
        });
        break;
      case 'reference':
        this.setState({
          blocNumeroSerie: false,
          blocReference: true,
          blocReferenceDUM: false,
          blocDates: false,
        });
        break;
      case 'referenceDUM':
        this.setState({
          blocNumeroSerie: false,
          blocReference: false,
          blocReferenceDUM: true,
          blocDates: false,
        });
        break;
      case 'dates':
        this.setState({
          blocNumeroSerie: false,
          blocReference: false,
          blocReferenceDUM: false,
          blocDates: true,
        });
        break;

      default:
        break;
    }
  };

  redirectToConsultationCO(row, index) {
    // console.log('============================================');
    // console.log('============================================');
    // console.log(JSON.stringify(row?.referenceDum));
    // console.log('============================================');
    // console.log('============================================');
    let action = COAction.request(
      {
        type: CO_CONSULTATION_REQUEST,
        value: {
          jsonVO: {
            reference: row?.reference,
          },
        },
        command: 'recupererCertificatOrigineByRef',
      },
      this.props.navigation,
      'COConsultationDetail',
    );
    this.props.actions.dispatch(action);
  }

  redirectToConsultationDUM(row, index) {
    // console.log('============================================');
    // console.log('============================================');
    // console.log(JSON.stringify(row?.referenceDum));
    // console.log('============================================');
    // console.log('============================================');
    let action = ConsulterDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: {
            reference: row?.referenceDum,
            enregistre: true,
            identifiantOperateur: ComSessionService.getInstance().getOperateur(),
          },
          // cle: 'F',
        },
        command: 'ded.ConsulterDum',
        fromCO: true,
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  }

  render() {
    const titre = "Nombre d'éléments: " + this.state.rows?.length;
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('co.title')}
          subtitle={translate('co.subTitleTraiter')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
        <View>
          {this.state?.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state?.errorMessage} />
          )}
        </View>
        <ComBadrCardBoxComp style={style.cardBox}>
          <ComBadrCardWithTileComp
            title={translate('co.filtreRecherche.critereTitle')}>
            <ScrollView>
              <View>
                <ComBadrItemsPickerComp
                  label={translate('co.filtreRecherche.selectionnerCritere')}
                  selectedValue={this.state.critereRecherche}
                  items={criteresRecherche}
                  onValueChanged={(v, i) =>
                    this.onCritereRecherchePickerChanged(v, i)
                  }
                />
                <Grid>
                  {this.state.blocNumeroSerie && (
                    <Row>
                      <Col size={1} />
                      <Col size={8}>
                        <TextInput
                          mode="outlined"
                          label={translate('co.filtreRecherche.numeroSerie')}
                          value={this.state.numeroSerie}
                          onChangeText={(text) =>
                            this.setState({numeroSerie: text})
                          }
                        />
                      </Col>
                      <Col size={1} />
                    </Row>
                  )}

                  {this.state.blocReference && (
                    <Row>
                      <Col size={8}>
                        <TextInput
                          mode="outlined"
                          label={translate('co.filtreRecherche.annee')}
                          value={this.state.annee}
                          onChangeText={(text) => this.setState({annee: text})}
                        />
                      </Col>
                      <Col size={1} />
                      <Col size={3}>
                        <TextInput
                          disabled
                          mode="outlined"
                          value={this.state.pays}
                        />
                      </Col>
                      <Col size={1} />
                      <Col size={16}>
                        <TextInput
                          mode="outlined"
                          label={translate('co.filtreRecherche.reference')}
                          value={this.state.reference}
                          onChangeText={(text) =>
                            this.setState({reference: text})
                          }
                        />
                      </Col>
                    </Row>
                  )}
                  {this.state.blocReferenceDUM && (
                    <Row>
                      <RechercheRefDum />
                    </Row>
                  )}
                  {this.state.blocDates && (
                    <Row>
                      <Col>
                        <ComBadrDatePickerComp
                          dateFormat="DD/MM/YYYY"
                          value={
                            this.state.dateDu
                              ? moment(this.state.dateDu, 'DD/MM/yyyy', true)
                              : ''
                          }
                          labelDate={translate('consultationBLS.startDate')}
                          inputStyle={style.textInputsStyle}
                          onDateChanged={(date) =>
                            this.setState({
                              ...this.state,
                              dateDu: date,
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <ComBadrDatePickerComp
                          dateFormat="DD/MM/YYYY"
                          value={
                            this.state.dateAu
                              ? moment(this.state.dateAu, 'DD/MM/yyyy', true)
                              : ''
                          }
                          labelDate={translate('consultationBLS.endDate')}
                          inputStyle={style.textInputsStyle}
                          onDateChanged={(date) =>
                            this.setState({
                              ...this.state,
                              dateAu: date,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col size={20} />
                    <Col size={30}>
                      <ComBadrButtonIconComp
                        onPress={() => this.confirmer()}
                        icon="check"
                        style={style.buttonIcon}
                        loading={this.props.showProgress}
                        text={translate('transverse.confirmer')}
                      />
                    </Col>
                    <Col size={30}>
                      <ComBadrButtonIconComp
                        onPress={() => this.handleClear()}
                        icon="autorenew"
                        style={style.buttonIcon}
                        text={translate('transverse.retablir')}
                      />
                    </Col>
                    <Col size={20} />
                    {/* <Col size={20}>
                      <ComBadrLibelleComp>
                        <Button
                          mode="contained"
                          icon="check"
                          compact="true"
                          onPress={this.redirectToConsultationDUM.bind(
                            this,
                            this.state.rows[5].referenceDUM,
                            this.props.navigation,
                          )}>
                          {this.state.rows[5].referenceDUM}
                        </Button>
                      </ComBadrLibelleComp>
                    </Col> */}
                  </Row>
                </Grid>
              </View>
            </ScrollView>
          </ComBadrCardWithTileComp>
        </ComBadrCardBoxComp>
        {this.state.rows && (
          <ScrollView style={style.innerContainer}>
            <View>
              <ComAccordionComp badr title={titre} expanded={true}>
                <ComBasicDataTableComp
                  id="coLots"
                  rows={this.state.rows}
                  cols={this.coCols}
                  totalElements={this.state.rows?.length}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                />
              </ComAccordionComp>
            </View>
          </ScrollView>
        )}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(COMainScreen);
