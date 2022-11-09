import {default as React} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';
import translate from '../../../../commons/i18n/ComI18nHelper';
import * as RechecheDumAction from '../../../../commons/state/actions/rechercheDum';
import * as Constants from '../../../../commons/constants/components/rechercheRefDum';
import {load} from '../../../../commons/services/async-storage/ComStorageService';

class DedInitierListControleScreen extends React.Component {
  defaultState = {
    login: '',
    numeroVoyage: '',
    showErrorMsg: false,
  };
  componentDidMount() {
    load('user', false, true).then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }
  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie === '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    console.log('recherche init', JSON.stringify(this.props));

    this.cols = [
      {
        code: 'dedo_num_enreg',
        libelle: translate('resultatInitCtrl.reference'),
        width: 150,
      },
      {
        code: 'numeroVersion',
        libelle: translate('resultatInitCtrl.id'),
        width: 150,
      },

      {
        code: 'nomOperateurDeclarant',
        libelle: translate('resultatInitCtrl.opeDeclarant'),
        width: 180,
      },
      {
        code: 'nomOperateurSoumissionaire',
        libelle: translate('resultatInitCtrl.opeSouimiss'),
        width: 180,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('resultatInitCtrl.dateEnreg'),
        width: 150,
      },
      {
        code: 'dateEnvoiValeur',
        libelle: translate('resultatInitCtrl.dateEnvoiValeur'),
        width: 100,
      },
      {
        code: 'nbrArticles',
        libelle: translate('resultatInitCtrl.nbrArticles'),
        width: 150,
      },
      {
        code: 'drnIntervention',
        libelle: translate('resultatInitCtrl.drnIntervention'),
        width: 150,
      },
      {
        code: 'agentCote',
        libelle: translate('resultatInitCtrl.agentCote'),
        width: 150,
      },
      {
        code: '',
        libelle: 'Action',
        width: 50,
        component: 'button',
        icon: 'eye',
        action: (row, index) => {
         // alert(JSON.stringify(row))
          var data = {
            reference: row.dedo_num_enreg,
            numeroVoyage: this.state.numeroVoyage,
            enregistre: true,
          };
          var action = RechecheDumAction.request(
            {
              type: Constants.RECHERCHEREFDUM_REQUEST,
              value: {
                login: this.state.login,
                commande: 'ded.initInitierControle',
                module: 'DED_LIB',
                typeService: 'UC',
                data: data,
              },
            },
            this.props.navigation,
            'DedInitierControleScreen',
          );
          this.props.dispatch(action);
        },
      },
    ];
  }

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

          <ComBasicDataTableComp
            ref="_badrTable"
            id="resultatInitListCtrl"
            rows={this.props?.route?.params?.data}
            cols={this.cols}
            totalElements={1}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
          />
        </View>
        {/*<View style={{padding: 50}}>
          <Button
            onPress={this.confirmer}
            icon="check"
            compact="true"
            mode="contained"
            style={styles.btnConfirmer}
            loading={this.props.showProgress}>
            {translate('transverse.confirmer')}
          </Button>
        </View>*/}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.initierControlReducer,
});

export default connect(mapStateToProps, null)(DedInitierListControleScreen);
