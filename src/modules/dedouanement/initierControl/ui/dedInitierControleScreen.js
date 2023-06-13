import {default as React} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
  ComBadrCardBoxComp,
  ComAccordionComp
} from '../../../../commons/component';


import translate from '../../../../commons/i18n/ComI18nHelper';
import DedInfosCommunsBlock from './dednfosCommunsBlock';
import {Button} from 'react-native-paper';
import styles from 'react-native-webview/lib/WebView.styles';
import * as Constants from '../state/dedInitierControlConstants';
import dedInitierControlAction from '../state/actions/dedInitierControlAction';

class DedInitierControleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedReferenceVO: props?.route.params.declarationRI.dedReferenceVO,
      decDepotPhysiqueVos:
        props?.route.params.declarationRI.decDepotPhysiqueVos,
      type: props?.route.params.declarationRI.typeDeclarationParam,
      success: false,
      messageInfo: props.messageInfo,
      errorMessage: props.errorMessage,
      couplee:props?.route.params.declarationRI.couplee,
      enAttenteCouplage:props?.route.params.declarationRI.enAttenteCouplage,
    };

    console.log('const_props_init', this.props);
    console.log('const_state_init', this.state);
    this.colCouple = [
      {
        code: 'referenceDUM',
        libelle: translate('resultatInitCtrl.ref'),
        width: 200,
      },
      {
        code: 'dateCreationDUM',
        libelle: translate('resultatInitCtrl.dateCreation'),
        width: 200,
      },
      {
        code: 'dateEnregDUM',
        libelle: translate('resultatInitCtrl.dateEnreg'),
        width: 200,
      },
    ];

    this.cols = [
      {
        code: 'numeroVersion',
        libelle: translate('resultatInitCtrl.id'),
        width: 150,
      },
      {
        code: 'type',
        libelle: translate('resultatInitCtrl.type'),
        width: 150,
      },
      {
        code: 'statusVersionCourante',
        libelle: translate('resultatInitCtrl.status'),
        width: 180,
      },
      {
        code: 'modeAquisition',
        libelle: translate('resultatInitCtrl.modeAquisition'),
        width: 180,
      },
      {
        code: 'codeInitiateur',
        libelle: translate('resultatInitCtrl.initiateur'),
        width: 100,
      },
      {
        code: 'dateCreation_VC',
        libelle: translate('resultatInitCtrl.dateCreation'),
        width: 150,
      },
      {
        code: 'dateEnregistrement_VC',
        libelle: translate('resultatInitCtrl.dateEnreg'),
        width: 150,
      },
    ];
  }
  static getDerivedStateFromProps(props, state) {
    console.log(
      'deriv_props_init',
      props?.route.params.declarationRI.dedReferenceVO,
    );
    console.log('succprop:successtate', props.success + ':' + state.success);
    console.log('deriv_state_init', state);
    //   console.log("derived status",JSON.stringify(props))
    if (state.success) {
      return {
        success: false,
        ...state,
        messageInfo: props.messageInfo,
        errorMessage: props.errorMessage,
        dedReferenceVO: {
          ...state.dedReferenceVO, // keep all other key-value pairs
          statusVersionCourante: 'Déposée', // update the value of specific key
        },
      };
    } else {
      return {
        ...state,
        success: false,
        errorMessage: null,
        messageInfo: null,
        decDepotPhysiqueVos: props?.route.params.declarationRI.decDepotPhysiqueVos,
        dedReferenceVO: props?.route.params.declarationRI.dedReferenceVO,
      };
    }
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        success: false,
      });
    });
  };
  confirmer = () => {
    this.setState({showErrorMsg: true, success: true});

    var action = dedInitierControlAction.request(
      {
        type: Constants.DED_INIT_CONTROLE_COMMUN_REQUEST,
        value: {
          reference: this.state.dedReferenceVO.reference,
          numeroVoyage: '',
          enregistre: true,
          identifiant:this.state.dedReferenceVO.identifiant,
          numVesrsCour:this.state.dedReferenceVO.numeroVersionCourante
        },
      },
      this.props.navigation,
      this.props.successRedirection,
    );
    this.props.dispatch(action);

    console.log('dispatch fired !!');
  };

    render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <ComBadrToolbarComp
            navigation={this.props.navigation}
            title={translate('initierControl.title')}
            subtitle={translate('initierControl.title')}

            icon="menu"
          />
          {this.state.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          )}
          {this.state.messageInfo != null && (
            <ComBadrInfoMessageComp message={this.state.messageInfo} />
          )}
          <DedInfosCommunsBlock
            dedRef={{
              reference: this.state.dedReferenceVO.reference,
              libelleRegime: this.state.dedReferenceVO.libelleRegime,
              type: this.state.type,
            }}
          />
          {!this.state.couplee&&!this.state.enAttenteCouplage&&
          <ComBasicDataTableComp
            ref="_badrTable"
            id="resultatInitCtrl"
            rows={[{...this.state.dedReferenceVO}]}
            cols={this.cols}
            totalElements={1}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
          />}
          {(this.state.couplee||this.state.enAttenteCouplage)&&
              <ComBadrCardBoxComp style={styles.cardBox}>
                            <ComAccordionComp
                                badr
                                title={translate('resultatInitCtrl.decEnAttente')+this.state.decDepotPhysiqueVos.length}
                             expanded={true}
                            >
          <ComBasicDataTableComp

            ref="_badrTable"
            id="resultatInitCtrl"
            rows={this.state.decDepotPhysiqueVos}
            cols={this.colCouple}
            // totalElements={1}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
          />
           </ComAccordionComp>
            </ComBadrCardBoxComp>}
        </View>
        <View style={{padding: 50}}>
          <Button
            onPress={this.confirmer}
            icon="check"
            disabled={this.state.success}
            compact="true"
            mode="contained"
            style={styles.btnConfirmer}
            loading={this.props.showProgress}>
            {translate('transverse.confirmer')}
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.initierControlReducer,
});

export default connect(mapStateToProps, null)(DedInitierControleScreen);