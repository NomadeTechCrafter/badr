/**Constants */
import * as Constants from '../../../common/constants/at/at';
import _ from 'lodash';

/** Inmemory session */
import {Session} from '../../../common/session';
/** i18n */
import {translate} from '../../../common/translations/i18n';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
  data: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.INIT_APUR_REQUEST:
      nextState.displayError = false;
      nextState.errorMessage = null;
      nextState.data = {};
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
      nextState.data = {};
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
      console.log('--> PREPARE_APUR_CONFIRM...');
      return nextState;
    case Constants.PREPARE_APUR_REMOVE:
      prepareRemove(action.value, nextState);
      console.log('--> PREPARE_APUR_REMOVE...');
      return nextState;
    default:
      nextState.showProgress = true;
      return initialState;
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
        modeApur: composant.modeApur,
        typeComposant: composant.typeComposant,
        informationAffichee: composant.informationAffichee,
      };
      selectedApurements.push(newComponent);
      _.remove(state.data.composantsApures, {
        idComposant: composant.idComposant,
      });
      if (iteration === listComposants.length - 1) {
        allTypes += composant.typeComposant;
      } else {
        allTypes += composant.typeComposant + ' - ';
      }
      iteration++;
    });
  }
  let newApurementVO = {
    bureauApur: {
      code: Session.getInstance().getCodeBureau(),
      libelle: Session.getInstance().getNomBureauDouane(),
    },
    arronfApur: {
      code: Session.getInstance().getCodeArrondissement(),
      libelle: Session.getInstance().getLibelleArrondissement(),
    },
    typeComposantApur: allTypes,
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
      value.typeComposant = 'Vehicule';
      value.informationAffichee =
        'Matricule : ' +
        value.matricule +
        ' / Pays : ' +
        value.paysMatricule.libelle;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildRemorqueVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.remorqueVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Remorque';
      value.informationAffichee = 'Matricule : ' + value.matricule;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
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
        informationAffichee = 'Matricule : ' + value.matricule;
      } else {
        informationAffichee = 'Matricule : ' + value.numChassis;
      }
      value.typeComposant = 'Moto / Quad';
      value.informationAffichee = informationAffichee;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};
const buildJetskyVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.jetSkiVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Jet Ski';
      value.informationAffichee = 'Série : ' + value.serie;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildBateauPlaisanceVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.bateauPlaisanceVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Bateau de plaisance';
      value.informationAffichee =
        'Matricule : ' +
        value.matricule +
        ' / Pays : ' +
        value.pavillion.libelle;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildPneumatiqueVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.pneumatiqueVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Pneumatique';
      value.informationAffichee = 'Série : ' + value.serie;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildKartingVOs = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.kartingVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Karting';
      value.informationAffichee = 'Série : ' + value.serie;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildArmeVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.armeVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Arme';
      value.informationAffichee = 'Série : ' + value.serie;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildDronesVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.droneVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = value.drone ? 'Drone' : 'Engin volant';
      value.informationAffichee = 'Série : ' + value.serie;
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};

const buildMarchandiseVos = (admissionTempVO, listeIdDejaApure) => {
  admissionTempVO.marchandiseVOs.forEach(function (value, key) {
    if (listeIdDejaApure.indexOf(value.idComposant) === -1) {
      value.selected = false;
      value.typeComposant = 'Marchandise';
      value.informationAffichee =
        'Désignation : ' +
        value.designation +
        (value.nature ? ' / Nature : ' + value.nature.libelle : '');
      value.modeApur = {code: '001', libelle: 'Réexportation'};
      admissionTempVO.composantsApures.push(value);
    }
  });
};
