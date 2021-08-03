import _ from 'lodash';
import { default as React } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
/** REDUX **/
import { connect } from 'react-redux';
import {
  ComBadrToolbarComp,
  ComContainerComp
} from '../../../../commons/component';
import {
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp
} from '../../../../commons/component/index';
import { GENERIC_REQUEST } from '../../../../commons/constants/generic/ComGenericConstants';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import { CONFIRMER_CERTIFICAT_RECEPTION_INIT } from '../../redressement/state/DedRedressementConstants';
import DedRechercheRedressementScreen from '../../redressement/ui/DedRechercheRedressementScreen';
import DedConfirmerCertificatReceptionAction from '../state/actions/dedConfirmerEnvoyerValeurAction';
import initConfirmerLeCertificatDeReception from '../state/actions/dedInitConfirmerEnvoyerValeurAction';
import styles from '../style/dedEnvoyerValeurStyle';



class DedEnvoyerValeurScreen extends React.Component {
  defaultState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    cleValide: '',
    login: '',
    numeroVoyage: '',
    showErrorMsg: false,
    sousReservePaiementMLV: false,
    enregistree: true,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  // componentDidMount() {

  //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
  //     console.log('DedRechercheConfirmationReceptionScreen focus start');
  //     this.setState({
  //       ...this.defaultState
  //     });
  //     console.log('DedRechercheConfirmationReceptionScreen focus end');

  //     let action = DedConfirmerCertificatReceptionAction.init(
  //       {
  //         type: CONFIRMER_CERTIFICAT_RECEPTION_INIT,
  //         value: {},
  //       },

  //     );
  //     this.props.dispatch(action);
  //   });
  // }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  //   this._unsubscribe();
  // }

  // //accept just Number
  // onChangeInput = (input) => {
  //   let keyImput = _.keys(input)[0];
  //   this.setState({ [keyImput]: input[keyImput].replace(/[^0-9]/g, '') });
  // };
  // onChangeInputCle = (cle) => {
  //   this.setState({ cle: cle.replace(/[^A-Za-z]/g, '') });
  // };
  // addZeros = (input) => {
  //   let keyImput = _.keys(input)[0];
  //   if (input[keyImput] !== '') {
  //     this.setState({
  //       [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
  //     });
  //   }
  // };
  // retablir = () => {
  //   this.setState({ ...this.defaultState });
  // };

  // confirm = () => {
  //   this.setState({ showErrorMsg: true });
  //   if (this.state.regime && this.state.serie) {
  //     this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

  //     if (this.state.cle === this.state.cleValide) {
  //       let referenceDed =
  //         this.state.bureau +
  //         this.state.regime +
  //         this.state.annee +
  //         this.state.serie;
  //       let action = initConfirmerLeCertificatDeReception.request(
  //         {
  //           type: GENERIC_REQUEST,
  //           value: {
  //             jsonVO: {
  //               reference: referenceDed,
  //               enregistre: this.state.enregistree,
  //             },
  //             cle: this.state.cle,
  //           },
  //         },
  //         this.props.navigation,
  //       );
  //       this.props.dispatch(action);
  //     }
  //   }
  // };
  // hasErrors = (field) => {
  //   return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  // };
  // isCleValide = () => {
  //   return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
  // };

  // cleDUM = function (regime, serie) {
  //   let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  //   if (serie.length > 6) {
  //     let firstSerie = serie.substring(0, 1);
  //     if (firstSerie === '0') {
  //       serie = serie.substring(1, 7);
  //     }
  //   }
  //   let obj = regime + serie;
  //   let RS = obj % 23;
  //   alpha = alpha.charAt(RS);
  //   return alpha;
  // };

  render() {
    return (
      <View>
        <DedRechercheRedressementScreen />
      </View>
    );
  }
}



const mapStateToProps = (state) => ({
  ...state.consulterDumReducer
});

export default connect(mapStateToProps, null)(DedEnvoyerValeurScreen);

