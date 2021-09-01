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

  constructor(props) {
    super(props);
    // this.state = this.defaultState;
  }

  render() {
    return (
      <View>
        <DedRechercheRedressementScreen navigation={this.props.navigation} from='ENVOYER_VALEUR' />
      </View>
    );
  }
}



const mapStateToProps = (state) => ({
  ...state.consulterDumReducer
});

export default connect(mapStateToProps, null)(DedEnvoyerValeurScreen);

