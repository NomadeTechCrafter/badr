/**Constants */
import _, { method } from 'lodash';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import DedRedressementApi from '../../service/api/DedRedressementApi';
import { CONST_STRING_1, CONST_STRING_2, TYPE_CAUTION_BANQUE, TYPE_CAUTION_CONSIGNATION, TYPE_CAUTION_MIXTE } from '../../utils/DedConstants';
import { effacerRubCautionBancaire, effacerRubriqueCaution, effacerValeursBanqueConsign, getValueByPath } from '../../utils/DedUtils';
import { INIT_CAUTION_SECTION_FAILED, INIT_CAUTION_SECTION_INIT, INIT_CAUTION_SECTION_IN_PROGRESS, INIT_CAUTION_SECTION_SUCCESS } from '../DedRedressementConstants';

export function request(action, callback) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        let dedDumSectionCautionVO = action.value.dedDumSectionCautionVO;
        let numDecisionCaution = dedDumSectionCautionVO?.numDecision;
        let dedDumVO = action.value;
        console.log('dedDumVO 1', dedDumVO);
        if (!_.isEmpty(numDecisionCaution) && !_.isNull(numDecisionCaution)) {
            DedRedressementApi.fillCautionInfos(dedDumSectionCautionVO).then((response) => {

                const messagesErreurs = getValueByPath(
                    'data.dtoHeader.messagesErreur',
                    response,
                );
                if (
                    response &&
                    response.data &&
                    response.data.jsonVO &&
                    !messagesErreurs
                ) {
                    console.log('debut  ');
                    dedDumSectionCautionVO = response.data.jsonVO;
                    dedDumVO = { ...dedDumVO, dedDumSectionCautionVO: { ...dedDumSectionCautionVO } };
                    console.log('dedDumVO 2', dedDumVO);
                    ({ dedDumSectionCautionVO, dedDumVO } = processDedDum(dedDumSectionCautionVO, dedDumVO, dispatch));
                    console.log('dedDumVO 3', dedDumVO);
                    callback(dedDumVO);
                    console.log('dedDumVO 4', dedDumVO);
                    console.log('fin ');
                } else {
                    console.log('else : ');
                    dispatch(failed(messagesErreurs));
                }
            })
                .catch((e) => {
                    console.log('catch : ',e);
                    dispatch(failed(translate('errors.technicalIssue')));
                });
        } else {
            dedDumVO = effacerRubCautionBancaire(dedDumVO);
            dedDumVO = effacerRubriqueCaution(dedDumVO);
            ({ dedDumSectionCautionVO, dedDumVO } = processDedDum(dedDumSectionCautionVO, dedDumVO, dispatch));
            callback(dedDumVO);
        }
        


    };
}

function processDedDum(dedDumSectionCautionVO, dedDumVO, dispatch) {
    console.log('suite : ');
    dedDumSectionCautionVO = dedDumVO.dedDumSectionCautionVO;
    let banqueChecked = dedDumSectionCautionVO?.banqueConsign;
    console.log('banqueChecked : ', banqueChecked);
    let typeCaution = dedDumSectionCautionVO?.typeCaution;
    console.log('typeCaution : ', typeCaution);
    if (typeCaution == TYPE_CAUTION_BANQUE) {
        dedDumVO = { ...dedDumVO, dedDumSectionCautionVO: { ...dedDumVO.dedDumSectionCautionVO, banqueConsign: CONST_STRING_1 } };


    }
    else if (typeCaution == TYPE_CAUTION_MIXTE) {
        dedDumVO = { ...dedDumVO, dedDumSectionCautionVO: { ...dedDumVO.dedDumSectionCautionVO, banqueConsign: CONST_STRING_1 } };
        if (banqueChecked == CONST_STRING_2) {
            dedDumVO = effacerValeursBanqueConsign(dedDumVO);
        }

    } else if (typeCaution == TYPE_CAUTION_CONSIGNATION) {
        dedDumVO = effacerValeursBanqueConsign(dedDumVO);
        dedDumVO = { ...dedDumVO, dedDumSectionCautionVO: { ...dedDumVO.dedDumSectionCautionVO, banqueConsign: CONST_STRING_2 } };
    } else {
        console.log('typeCaution : mon cas');
        dedDumVO = effacerValeursBanqueConsign(dedDumVO);
        dedDumVO = effacerRubCautionBancaire(dedDumVO);
        dedDumVO = { ...dedDumVO, dedDumSectionCautionVO: { ...dedDumVO.dedDumSectionCautionVO, banqueConsign: '' } };
    }
    console.log('dedDumSectionCautionVO?.demandeDispenseCaution', dedDumSectionCautionVO?.demandeDispenseCaution);
    dedDumSectionCautionVO = dedDumVO.dedDumSectionCautionVO;
    let demandeDispenseCaution = dedDumSectionCautionVO?.demandeDispenseCaution;
    if (demandeDispenseCaution !== 'true') {
        dedDumVO = { ...dedDumVO, dedDumSectionCautionVO: { ...dedDumVO.dedDumSectionCautionVO, demandeDispenseCaution: 'false' } };
    }


    dispatch(success(dedDumVO));
    return { dedDumSectionCautionVO, dedDumVO };
}

export function inProgress(action) {
    return {
        type: INIT_CAUTION_SECTION_IN_PROGRESS,
        value: action.value
    };
}

export function init(action) {
    return {
        type: INIT_CAUTION_SECTION_INIT,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: INIT_CAUTION_SECTION_SUCCESS,
        value: {
            data: data
        },
    };
}

export function failed(data) {
    return {
        type: INIT_CAUTION_SECTION_FAILED,
        value: {
            data: data
        },
    };
}

export default {
    request,
    init,
    success,
    failed,
    inProgress,
};