import React from 'react';
import { View } from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import { Checkbox, TextInput, Button } from 'react-native-paper';
import { primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { TYPE_SERVICE_SP } from '../../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

export default class DedRedressementDetailArticleLiquidationBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aliquider: this.props.article.aliquider,
      cols: [
        { code: 'code', libelle: 'Code', width: 150 },
        { code: 'type', libelle: 'Type', width: 150 },
        { code: 'numeroArticle', libelle: 'Numero Article', width: 150 },
        { code: 'libelle', libelle: 'Libelle', width: 150 },
        { code: 'value', libelle: 'Value', width: 150 },
      ]
    }
  }

  calculerPTI = async () => {
    const dateEffectiveEnregistrement = (this.props.dedDumSectionEnteteVO?.dateHeureEffectiveEnregistrement) ? this.props.dedDumSectionEnteteVO?.dateHeureEffectiveEnregistrement : this.props.dedReferenceVO?.dateEnregistrement_VI

    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : '2052',
        module: 'DED_LIB',
        commande: 'ded.calculerPTI',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        "dedDumProprieteTIInputVO": {
          "codeRegime": this.props.dedReferenceVO?.refRegime,
          "enteteVo": this.props.dedDumSectionEnteteVO,
          "articleVo": this.props.article,
          "dedReferenceVO": this.props.dedReferenceVO,
          // "occasionnelle": redServiceWS.getDumData().occasionnelle
        }, "dedDumUniteNormaliseeVO": {
          "refNgp": this.props.article?.refNgp,
          "dateEffectiveEnregistrement": dateEffectiveEnregistrement,
          "enregistree": this.props.dedReferenceVO?.enregistree,
          "dateEnregistrement_VI": this.props.dedReferenceVO?.dateEnregistrement_VI,
          "dateCreation_VC": this.props.dedReferenceVO?.dateCreation_VC,
          "combinee": this.props.dedDumSectionEnteteVO?.combinee
        },
        "previouseCodeNgp": this.props.article?.refNgp
      },
    };

    const response = await ComHttpHelperApi.process(data);


    console.log('================================================== response ===============================================================');
    console.log(JSON.stringify(response));
    console.log('================================================== response ===============================================================');
    if (response && response.data && response.data.jsonVO && response.data.jsonVO?.length > 0) {
      this.setState({
        dedDumProprieteTIVO: response.data.jsonVO
      })
    } else {
      this.setState({
        dedDumProprieteTIVO: [
        //   {
        //   'code': 'Code',
        //   'type': 'Type',
        //   'numeroArticle': 'Numero Article',
        //   'libelle': 'Libelle',
        //   'value': 'value'
        // }, {
        //   'code': 'Code',
        //   'type': 'Type',
        //   'numeroArticle': 'Numero Article',
        //   'libelle': 'Libelle',
        //   'value': 'value'
        //   }
        ]
      })
    }
  };


  update() {

    // console.log('================================================== this.props.data ===============================================================');
    // console.log(JSON.stringify(this.props.data));
    // console.log('================================================== this.props.data ===============================================================');
    // console.log('================================================== this.props.article ===============================================================');
    // console.log(JSON.stringify(this.props.article));
    // console.log('================================================== this.props.article ===============================================================');
    // console.log('================================================== getLibelleNGP ===============================================================');
    // console.log('================================================== getLibelleNGP ===============================================================');
    this.setState(previousState => ({
      aliquider: previousState.aliquider,
    }), () => {
      this.props.update({
        aliquider: this.state?.aliquider,
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp title="Liquidation" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="A liquider : "
              libelleSize={3}
              disabled={!this.props.edition}
              children={
                <Checkbox
                  color={primaryColor}
                  disabled={!this.props.edition}
                  status={this.state.aliquider === "false"
                    ? 'unchecked'
                    : 'checked'
                  }
                  onPress={() => {
                    this.setState({
                      aliquider: this.state.aliquider === "false" ? "true" : "false",
                    })
                    this.update();
                  }}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Propriété T.I. "
              libelleSize={1}
              children={
                <Button
                  style={{ width: 100, margin: 10 }}
                  mode="contained"
                  disabled={!this.props.edition}
                  color={primaryColor}

                  onPress={() => this.calculerPTI()}
                >
                  OK
                </Button>
              }
            />
            <ComBadrKeyValueComp
              libelle="(*) Cette action sauvegarde l'article avant de calculer les P. TI"
              libelleSize={10}
            />
          </DedRedressementRow>

          {((this.state.dedDumProprieteTIVO?.length) > 0 &&
            <DedRedressementRow>
              <ComBasicDataTableComp
                rows={this.state.dedDumProprieteTIVO}
                cols={this.state.cols}
                totalElements={this.state.dedDumProprieteTIVO?.length}
                maxResultsPerPage={5}
                paginate={true}
              />
            </DedRedressementRow>
          )}
        </ComAccordionComp>
      </View>
    );
  }
}
