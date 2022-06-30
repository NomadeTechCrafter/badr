import _ from 'lodash';
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { CATEGORIE_COMPLEMENTAIRE, CATEGORIE_GLOBALE_INIT, CATEGORIE_GLOBALE_VOY, CATEGORIE_NORMALE, CATEGORIE_PROVISOIRE_INIT, CATEGORIE_PROVISOIRE_VOY, CATEGORIE_SIMPLIFIEE_APU, CATEGORIE_SIMPLIFIEE_DEC, CATEGORIE_TRYPTIQUE_APU, CATEGORIE_TRYPTIQUE_DEC, TYPEDED_APURSIMPLIFIEE, TYPEDED_APURTRIPTYQUE, TYPEDED_DSIMPLIFIEE, TYPEDED_DTRIPTYQUE, TYPEDED_DUM, TYPEDED_DUMGLOB_INIT, TYPEDED_DUMPROV_INIT, TYPEDED_SOUSDUM_GLOB, TYPEDED_SOUSDUM_PROV } from './DedConstants';

export const getValueByPath = (key, object, reducer) => {
  if (key === 'dedDumSectionEnteteVO.typeDUM' || key === 'sousDum') {
    //console.log('----getValueByPath--', JSON.stringify(object));
  }

  return _.get(object, key)
    ? _.get(object, key)
    : _.get(object, reducer + '.data.' + key);
};

export const cleDS = (obj) => {
  var alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  obj = obj % 23;
  alpha = alpha.charAt(obj);
  return alpha;
};

export const addZeros = (input, maxLength) => {
  return _.padStart(input, maxLength, '0');

};

export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};

export const getAnnee = (reference) => {
  return reference ? reference.substring(6, 10) : '';
};

export const getBureau = (reference) => {
  return reference ? reference.substring(0, 3) : '';
};

export const getRegime = (reference) => {
  return reference ? reference.substring(3, 6) : '';
};

export const getSerie = (reference) => {
  return reference ? reference.substring(10, 17) : '';
};

export const getCategorieDum = (typeDum, isSousDum) => {
  // console.log('getCategorieDum typeDum :', typeDum);
  if (typeDum == '01') {
    return '1';
  } else if (typeDum == '02') {
    return isSousDum ? '4' : '2';
  } else if (typeDum == '04') {
    return '4';
  } else if (typeDum == '99') {
    return '99';
  }
};

export const initDedCategorie = (typeDeclarationParam, refDumInit) => {

  let categorie = CATEGORIE_COMPLEMENTAIRE;

  if (typeDeclarationParam == TYPEDED_APURSIMPLIFIEE) {
    categorie = CATEGORIE_SIMPLIFIEE_APU;
  } else if (typeDeclarationParam == TYPEDED_DSIMPLIFIEE) {
    categorie = CATEGORIE_SIMPLIFIEE_DEC;
  } else if (typeDeclarationParam == TYPEDED_APURTRIPTYQUE) {
    categorie = CATEGORIE_TRYPTIQUE_APU;
  } else if (typeDeclarationParam == TYPEDED_DTRIPTYQUE) {
    categorie = CATEGORIE_TRYPTIQUE_DEC;
  } else if (typeDeclarationParam == TYPEDED_DUM) {
    categorie = CATEGORIE_NORMALE;
  } else if (typeDeclarationParam == TYPEDED_DUMGLOB_INIT) {
    categorie = CATEGORIE_GLOBALE_INIT;
  } else if (typeDeclarationParam == TYPEDED_DUMPROV_INIT) {
    categorie = CATEGORIE_PROVISOIRE_INIT;
  } else if (typeDeclarationParam == TYPEDED_SOUSDUM_PROV) {
    categorie = CATEGORIE_PROVISOIRE_VOY;
  } else if (typeDeclarationParam == TYPEDED_SOUSDUM_GLOB) {
    categorie = CATEGORIE_GLOBALE_VOY;
  }

  if (!_.isEmpty(refDumInit)) {
    categorie = CATEGORIE_PROVISOIRE_VOY;
  }


  return categorie;
}

export const downloadFile = async (nameFile, base64File) => {
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

export const newDeclarationFacture = () => {
  return {
    numero: null,
    fournisseur: null,
    dateFacture: null,
    valeur: null,
    devise: null,
    deviseLibelle: null
  };
}

export const newPreapurement = () => {
  return {
    dateArrivee: null,
    lieuChargement: '',
    modeTransport: null,
    moyenTransport: null,
    nombreContenant: null,
    numeroOrdre: null,
    poidsLot: null,
    preapAnnee: null,
    preapBureau: null,
    preapRegime: null,
    preapSerie: null,
    referenceLot: null,
    typeDS: '',
    descLieuChargement: null,
    destinataire: null,
    referenceDS: null,
    natureMarchandise: null,
    idLot: null,
    numeroBAD: null,
    numeroOrdre: -1,
    preapCle:null
  };
}