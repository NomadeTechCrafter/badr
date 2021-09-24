/**Constants */
import * as Constants from '../atConstants';
import _ from 'lodash';
/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
/** i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {},
  depassementDelai: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INIT_APUR_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.INIT_APUR_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.INIT_APUR_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      construireComposantsAapurer(nextState.data);
      return nextState;
    case Constants.INIT_APUR_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.INIT_APUR_INIT:
      return initialState;
    case Constants.PREPARE_APUR_CONFIRM:
      prepareConfirm(action.value, nextState);
      return nextState;
    case Constants.PREPARE_APUR_REMOVE:
      prepareRemove(action.value, nextState);
      return nextState;
    case Constants.CREATE_APUR_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.messageInfo = null;
      return nextState;
    case Constants.CREATE_APUR_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.CREATE_APUR_CLEAR_MSG:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      return nextState;
    case Constants.CREATE_APUR_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      construireComposantsAapurer(nextState.data);
      if (
        action.value.dtoHeader &&
        action.value.dtoHeader.messagesInfo &&
        action.value.dtoHeader.messagesInfo.length > 0
      ) {
        nextState.successMessage = action.value.dtoHeader.messagesInfo[0];
      }
      return nextState;
    case Constants.CREATE_APUR_FAILED:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.CREATE_APURAUTO_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case Constants.CREATE_APURAUTO_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.CREATE_APURAUTO_SUCCESS:
      if (action.value.dtoHeader && action.value.dtoHeader.messagesInfo) {
        nextState.messageInfo = action.value.dtoHeader.messagesInfo[0];
      }
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      return nextState;
    case Constants.CREATE_APURAUTO_FAILED:
      nextState.showProgress = false;
      nextState.messageInfo = null;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur
          ? action.value.dtoHeader.messagesErreur
          : action.value;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.INIT_APURAUTO_REQUEST:
      nextState.displayError = false;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      nextState.data = {};
      return nextState;
    case Constants.INIT_APURAUTO_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.INIT_APURAUTO_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data = action.value.jsonVO;
      return nextState;
    case Constants.INIT_APURAUTO_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;
    case Constants.VERIFIER_DELAI_DEPASSEMENT_REQUEST:
      return nextState;
    case Constants.VERIFIER_DELAI_DEPASSEMENT_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.VERIFIER_DELAI_DEPASSEMENT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.depassementDelai = action.value.jsonVO;
      return nextState;
    case Constants.VERIFIER_DELAI_DEPASSEMENT_FAILED:
      nextState.showProgress = false;
      nextState.displayError = true;
      if (action.value.dtoHeader) {
        nextState.errorMessage = action.value.dtoHeader.messagesErreur;
      } else {
        nextState.errorMessage = translate('errors.technicalIssue');
      }
      return nextState;

    default:
      if (nextState.successMessage) {
        delete nextState.successMessage;
      }
      nextState.showProgress = false;
      return nextState.data ? nextState : initialState;
  }
};

const prepareConfirm = (incomingValue, state) => {
  const listComposants = incomingValue.listComposantAapurer;
  const exportateur = incomingValue.exportateur;
  const motif = incomingValue.motif;
  let selectedApurements = [];
  let allTypes = '';
  if (listComposants && listComposants.length > 0) {
    let iteration = 0;
    listComposants.forEach((composant) => {
      let newComponent = {
        idComposant: composant.idComposant,
        exportateur: exportateur,
        modeApur: composant.modeApurementComposant
          ? composant.modeApurementComposant
          : composant.modeApur,
        typeComposant: composant.typeComposant,
        informationAffichee: composant.informationAffichee,
      };
      selectedApurements.push(newComponent);
      _.remove(state.data.composantsApures, {
        idComposant: composant.idComposant,
      });
      if (iteration === listComposants.length - 1) {
        allTypes += ' - ' + composant.typeComposant;
      } else {
        allTypes += composant.typeComposant + ' - ';
      }
      iteration++;
    });
  }
  let newApurementVO = {
    bureauApur: {
      code: ComSessionService.getInstance().getCodeBureau(),
      libelle: ComSessionService.getInstance().getNomBureauDouane(),
    },
    arrondApur: {
      code: ComSessionService.getInstance().getCodeArrondissement(),
      libelle: ComSessionService.getInstance().getLibelleArrondissement(),
    },
    typeComposApur: allTypes,
    dateApurement: incomingValue.dateApurement,
    motifDateApur: motif,
    apurementComposantVOs: selectedApurements,
  };
  if (!state.data.apurementVOs) {
    state.data.apurementVOs = [];
  }
  state.data.apurementVOs.push(newApurementVO);
};

const prepareRemove = (incomingValue, state) => {
  if (state.data.apurementVOs[incomingValue.index]) {
    const scairedApurementComponent =
      state.data.apurementVOs[incomingValue.index].apurementComposantVOs;
    scairedApurementComponent.forEach((composant) => {
      if (!state.data.composantsApures) {
        state.data.composantsApures = [];
      }
      composant.selected = false;
      let found = false;
      _.find(state.data.composantsApures, function (item) {
        found = item.idComposant === composant.idComposant;
      });
      if (!found) {
        state.data.composantsApures.push(composant);
      }
    });
    state.data.apurementVOs.splice(incomingValue.index, 1);
  }
};

const construireComposantsAapurer = (admissionTempVO) => {
  admissionTempVO.composantsApures = [];
  var listeIdDejaApure = [];
  if (admissionTempVO.apurementVOs && admissionTempVO.apurementVOs.length > 0) {
    admissionTempVO.apurementVOs.forEach(function (value, key) {
      value.apurementComposantVOs.forEach(function (subValue, subKey) {
        listeIdDejaApure.push(subValue.idComposant);
      });
    });
  }

  buildVehiculeVOs(admissionTempVO, listeIdDejaApure);
  buildRemorqueVOs(admissionTempVO, listeIdDejaApure);
  buildMotoQuadVOs(admissionTempVO, listeIdDejaApure);
  buildJetskyVOs(admissionTempVO, listeIdDejaApure);
  buildBateauPlaisanceVOs(admissionTempVO, listeIdDejaApure);
  buildPneumatiqueVos(admissionTempVO, listeIdDejaApure);
  buildKartingVOs(admissionTempVO, listeIdDejaApure);
  buildArmeVos(admissionTempVO, listeIdDejaApure);
  buildDronesVos(admissionTempVO, listeIdDejaApure);
  buildMarchandiseVos(admissionTempVO, listeIdDejaApure);
};

const buildVehiculeVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.vehiculeVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.vehicule');
      value.informationAffichee =
        translate('at.composants.matricule') +
        value.matricule +
        translate('at.composants.pays') +
        value.paysMatricule.libelle;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildRemorqueVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.remorqueVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.remorque');
      value.informationAffichee =
        translate('at.composants.type') + value.type.libelle;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildMotoQuadVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.motoQuadVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      var informationAffichee = '';
      if (value.matricule !== '') {
        informationAffichee =
          translate('at.composants.matricule') + value.matricule;
      } else {
        informationAffichee =
          translate('at.composants.matricule') + value.numChassis;
      }
      value.typeComposant = translate('at.composants.motoQuad');
      value.informationAffichee = informationAffichee;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};
const buildJetskyVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.jetSkiVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.jetsky');
      value.informationAffichee =
        translate('at.composants.serie') + value.serie;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildBateauPlaisanceVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.bateauPlaisanceVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.bateauPlaisance');
      value.informationAffichee =
        translate('at.composants.matricule') +
        value.matricule +
        translate('at.composants.pays') +
        value.pavillion.libelle;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildPneumatiqueVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.pneumatiqueVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.pneumatique');
      value.informationAffichee =
        translate('at.composants.serie') + value.serie;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildKartingVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.kartingVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.karting');
      value.informationAffichee =
        translate('at.composants.serie') + value.serie;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildArmeVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.armeVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.arme');
      value.informationAffichee =
        translate('at.composants.serie') + value.serie;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildDronesVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.droneVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = value.drone
        ? translate('at.composants.drone')
        : translate('at.composants.enginVolant');
      value.informationAffichee =
        translate('at.composants.serie') + value.serie;
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildMarchandiseVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.marchandiseVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = translate('at.composants.marchandise');
      value.informationAffichee =
        translate('at.composants.designation') + ' : ' +
        value.designation +
        (value.nature
          ? translate('at.composants.nature') + value.nature.libelle
          : '');
      value.modeApurementComposant = {
        code: '001',
        libelle: translate('at.composants.reexportation'),
      };
      admissionTempVO.composantsApures.push(value);
    }
  });
};
