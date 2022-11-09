import {default as React} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {
  ComBadrErrorMessageComp, ComBadrInfoMessageComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
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
    console.log(
      'recherche init',
      JSON.stringify(props.route.params.declarationRI),
    );
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

  confirmer = () => {
    this.setState({showErrorMsg: true});

    var action = dedInitierControlAction.request(
      {
        type: Constants.DED_INIT_CONTROLE_COMMUN_REQUEST,
        value: {
          reference: this.props?.route.params.declarationRI.dedReferenceVO.reference,
          numeroVoyage: '',
          enregistre: true,
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
          {this.props.errorMessage != null && (
              <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.messageInfo != null && (
              <ComBadrInfoMessageComp message={this.props.messageInfo} />
          )}
          <DedInfosCommunsBlock
            dedRef={this.props?.route.params.declarationRI.dedReferenceVO}
          />
          <ComBasicDataTableComp
            ref="_badrTable"
            id="resultatInitCtrl"
            rows={[{...this.props?.route.params.declarationRI.dedReferenceVO}]}
            cols={this.cols}
            totalElements={1}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
          />
        </View>
        <View style={{padding: 50}}>
          <Button
            onPress={this.confirmer}
            icon="check"
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
