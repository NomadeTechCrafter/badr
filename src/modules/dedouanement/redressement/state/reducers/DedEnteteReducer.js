/**Constants */
import * as Constants from '../DedRedressementConstants';
import _ from 'lodash';
/** i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { AUCUN, FLAG_OPER_DECLARANT, FLAG_OPER_ENGAGE_DEST, FLAG_OPER_ENGAGE_EXP, FLAG_OPER_ENGAGE_LEQUEL, SEPARATEUR } from '../../utils/DedConstants';

const initialState = {
  showProgress: false,
  errorMessage: '',
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.CALCULER_DELAI_TRANSIT_INIT:
      nextState.showProgress = true;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.CALCULER_DELAI_TRANSIT_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.CALCULER_DELAI_TRANSIT_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.data.dedReferenceVO.delaiTransit = action.value.jsonVO;
      return nextState;
    case Constants.CALCULER_DELAI_TRANSIT_FAILED:
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
    case Constants.TRAITER_NUM_RC_INIT:
      nextState.showProgress = true;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.TRAITER_NUM_RC_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.data = action.value.data;
      return nextState;
    case Constants.TRAITER_NUM_RC_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      this.setNomAndAdresseForOE(nextState,action.value.data, action.value.dedDumOperateurVO, action.value.operateurEngageFlag, action.value.typeOperateur);

      
      return nextState;
    case Constants.TRAITER_NUM_RC_FAILED:
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
    case Constants.CONSULTER_AMP_DED_INIT:
      nextState.showProgress = true;
      nextState.messageInfo = null;
      nextState.errorMessage = null;
      return nextState;
    case Constants.CONSULTER_AMP_DED_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.data = action.value.data;
      return nextState;
    case Constants.CONSULTER_AMP_DED_SUCCESS:
      nextState.errorMessage = null;
      nextState.showProgress = false;
      nextState.listAMPI = action.value.data;


      return nextState;
    case Constants.CONSULTER_AMP_DED_FAILED:
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
    default:
      return nextState ? nextState : initialState;
  }
};


updateInfosOperateur = (nextState, operateurEngage, dedDumOperateurVO, typeOperateur) => {
  console.log('updateInfosOperateur ---------------------------------------------------------------------------------------');
  console.log('typeOperateur', typeOperateur);
  console.log('FLAG_OPER_ENGAGE_EXP === typeOperateur', FLAG_OPER_ENGAGE_EXP === typeOperateur);
  console.log('dedDumOperateurVO.codeCentreRC',dedDumOperateurVO.codeCentreRC);
  console.log('dedDumOperateurVO.numeroRC', dedDumOperateurVO.numeroRC);
  console.log('!_.isEmpty(dedDumOperateurVO.codeCentreRC)', !_.isEmpty(dedDumOperateurVO.codeCentreRC));
  console.log(' !_.isEmpty(dedDumOperateurVO.numeroRC)', !_.isEmpty(dedDumOperateurVO.numeroRC));
  console.log('operateurEngage', operateurEngage);
  console.log('operateurEngage.ifu  ', operateurEngage.ifu);

  console.log(nextState.data);
  if (FLAG_OPER_ENGAGE_EXP === typeOperateur) {
    nextState.nomAdresseOperateurExpediteurDisabled = false;
    if (!_.isEmpty(dedDumOperateurVO.codeCentreRC) && !_.isEmpty(dedDumOperateurVO.numeroRC)) {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurExpediteurR = operateurEngage.refAdresse.adresse;
      nextState.data.dedDumSectionEnteteVO.nomOperateurExpediteurR = operateurEngage.nomOperateur;
    } else {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurExpediteurS = operateurEngage.refAdresse.adresse;
      nextState.data.dedDumSectionEnteteVO.nomOperateurExpediteurS = operateurEngage.nomOperateur;
    }
    nextState.data.dedDumSectionEnteteVO.ifuExpediteur = operateurEngage.ifu;
    nextState.data.dedDumSectionEnteteVO.activiteOperateurExpediteurR = '';
   
    if (!_.isEmpty(operateurEngage.nomOperateur)) {
      nextState.nomAdresseOperateurExpediteurDisabled=true;
    } else {
      nextState.nomAdresseOperateurExpediteurDisabled=false;
    }
  
      if (operateurEngage.natureActivite!= null) {
        nextState.data.dedDumSectionEnteteVO.activiteOperateurExpediteurR = operateurEngage.natureActivite.libelle;
        if (operateurEngage.activite != null) {
          nextState.data.dedDumSectionEnteteVO.activiteOperateurExpediteurR = operateurEngage.natureActivite.libelle +SEPARATEUR +operateurEngage.activite;
        }
      } else {
        nextState.data.dedDumSectionEnteteVO.activiteOperateurExpediteurR = AUCUN;
        if (operateurEngage.activite != null) {
          nextState.data.dedDumSectionEnteteVO.activiteOperateurExpediteurR = operateurEngage.activite;
        }
      }
    
    
  }
  if (FLAG_OPER_ENGAGE_DEST === typeOperateur) {
    nextState.nomAdresseOperateurDestinataireDisabled = false;
    if (!_.isEmpty(dedDumOperateurVO.codeCentreRC) && !_.isEmpty(dedDumOperateurVO.numeroRC)) {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurDestinataireR = operateurEngage.refAdresse.adresse;
      nextState.data.dedDumSectionEnteteVO.nomOperateurDestinataireR = operateurEngage.nomOperateur;
    } else {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurDestinataireS = operateurEngage.refAdresse.adresse;
      nextState.data.dedDumSectionEnteteVO.nomOperateurDestinataireS = operateurEngage.nomOperateur;
    }
    nextState.data.dedDumSectionEnteteVO.ifuDestinataire = operateurEngage.ifu;
    nextState.data.dedDumSectionEnteteVO.activiteOperateurDestinataireR = '';

    if (!_.isEmpty(operateurEngage.nomOperateur)) {
      nextState.nomAdresseOperateurDestinataireDisabled = true;
    } else {
      nextState.nomAdresseOperateurDestinataireDisabled = false;
    }

    if (operateurEngage.natureActivite != null) {
      nextState.data.dedDumSectionEnteteVO.activiteOperateurDestinataireR = operateurEngage.natureActivite.libelle;
      if (operateurEngage.activite != null) {
        nextState.data.dedDumSectionEnteteVO.activiteOperateurDestinataireR = operateurEngage.natureActivite.libelle + SEPARATEUR + operateurEngage.activite;
      }
    } else {
      nextState.data.dedDumSectionEnteteVO.activiteOperateurDestinataireR = AUCUN;
      if (operateurEngage.activite != null) {
        nextState.data.dedDumSectionEnteteVO.activiteOperateurDestinataireR = operateurEngage.activite;
      }
    }


  }

  if (FLAG_OPER_ENGAGE_LEQUEL === typeOperateur) {
    if (!_.isEmpty(dedDumOperateurVO.codeCentreRC) && !_.isEmpty(dedDumOperateurVO.numeroRC)) {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurPourLequel = operateurEngage.refAdresse.adresse;
      nextState.data.dedDumSectionEnteteVO.nomOperateurPourLequel = operateurEngage.nomOperateur;
    } 
    nextState.data.dedDumSectionEnteteVO.ifuOperateurPourLequel = operateurEngage.ifu;
    nextState.data.dedDumSectionEnteteVO.activiteOperateurPourLequel = '';

    

    if (operateurEngage.natureActivite != null) {
      nextState.data.dedDumSectionEnteteVO.activiteOperateurPourLequel = operateurEngage.natureActivite.libelle;
      if (operateurEngage.activite != null) {
        nextState.data.dedDumSectionEnteteVO.activiteOperateurPourLequel = operateurEngage.natureActivite.libelle + SEPARATEUR + operateurEngage.activite;
      }
    } else {
      nextState.data.dedDumSectionEnteteVO.activiteOperateurPourLequel = AUCUN;
      if (operateurEngage.activite != null) {
        nextState.data.dedDumSectionEnteteVO.activiteOperateurPourLequel = operateurEngage.activite;
      }
    }


  }
}

setNomAndAdresseForOE = (nextState, operateurEngage, dedDumOperateurVO, operEngageFlag, typeOperateur) => {
  console.log('operEngageFlag', operEngageFlag);
  console.log(nextState.data);
  console.log('setNomAndAdresseForOE');
  console.log( operateurEngage);
  if (operateurEngage == null || operEngageFlag == null || operEngageFlag===AUCUN) {
    this.viderExpediteurDestinataire(nextState, dedDumOperateurVO,typeOperateur);
    return;
  }
  this.updateInfosOperateur(nextState, operateurEngage, dedDumOperateurVO, typeOperateur);
}

viderExpediteurDestinataire = (nextState, dedDumOperateurVO, typeOperateur) => {
  console.log('viderExpediteurDestinataire');
  console.log(nextState,dedDumOperateurVO, typeOperateur);
  if (FLAG_OPER_ENGAGE_EXP.equals(typeOperateur)) {
    nextState.nomAdresseOperateurExpediteurDisabled = false;
    if (!_.isEmpty(dedDumOperateurVO.codeCentreRC) && !_.isEmpty(dedDumOperateurVO.numeroRC)) {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurExpediteurR = '';
      nextState.data.dedDumSectionEnteteVO.nomOperateurExpediteurR = '';
    } else {
      nextState.data.dedDumSectionEnteteVO.adresseOperateurExpediteurS = '';
      nextState.data.dedDumSectionEnteteVO.nomOperateurExpediteurS = '';
    }
    nextState.data.dedDumSectionEnteteVO.ifuExpediteur = '';
    nextState.data.dedDumSectionEnteteVO.activiteOperateurExpediteurR = '';
  }
  /* else if (FLAG_OPER_ENGAGE_DEST.equals(typeOperateur)) {
    webBean.getSectionEnteteWebBean().setNomAdresseOperateurDestinataireDisabled(false);
    webBean.getSectionEnteteWebBean().setAdresseOperateurDestinataire(DedCstPresentation.AUCUN);
    webBean.getSectionEnteteWebBean().setNomOperateurDestinataire(DedCstPresentation.AUCUN);
    webBean.getSectionEnteteWebBean().setActiviteOperateurDestinataire(DedCstPresentation.AUCUN);
  } else if (FLAG_OPER_ENGAGE_LEQUEL.equals(typeOperateur)) {
    DedViewUtils.setAdresseOperateurPourLequel(webBean.getSectionEnteteWebBean(), DedCstPresentation.AUCUN);
    DedViewUtils.setNomOperateurPourLequel(webBean.getSectionEnteteWebBean(), DedCstPresentation.AUCUN);
    DedViewUtils.setActiviteOperateurPourLequel(webBean.getSectionEnteteWebBean(), DedCstPresentation.AUCUN);
  } else if (FLAG_OPER_DECLARANT.equals(typeOperateur)) {
    webBean.getSectionEnteteWebBean().setNomAdresseOperateurExpediteurDisabled(false);
    webBean.getSectionEnteteWebBean().getVo().setAdresseOperateurDeclarant(DedCstPresentation.AUCUN);
    webBean.getSectionEnteteWebBean().getVo().setNomOperateurDeclarant(DedCstPresentation.AUCUN);
    webBean.getSectionEnteteWebBean().getVo().setIfuDeclarant(DedCstPresentation.AUCUN);
    webBean.getSectionEnteteWebBean().getVo().setIOperateurDeclarant(null);
    webBean.getSectionEnteteWebBean().getVo().setActiviteDeclarant(DedCstPresentation.AUCUN);
  } */
}
