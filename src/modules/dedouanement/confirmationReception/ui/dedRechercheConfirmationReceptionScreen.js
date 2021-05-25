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
import DedConfirmerCertificatReceptionAction from '../state/actions/DedConfirmerCertificatReceptionAction';
import initConfirmerLeCertificatDeReception from '../state/actions/dedInitConfirmerLeCertificatDeReceptionAction';
import styles from '../style/dedRechercheConfirmationReceptionStyle';



class DedRechercheConfirmationReceptionScreen extends React.Component {
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

  componentDidMount() {
  
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('DedRechercheConfirmationReceptionScreen focus start');
      this.setState({
        ...this.defaultState
      });
      console.log('DedRechercheConfirmationReceptionScreen focus end');

      let action = DedConfirmerCertificatReceptionAction.init(
        {
          type: CONFIRMER_CERTIFICAT_RECEPTION_INIT,
          value: {},


        },

      );
      this.props.dispatch(action);
    });
  }

componentWillUnmount() {
    console.log('componentWillUnmount');
    this._unsubscribe();
}

//accept just Number
onChangeInput = (input) => {
  let keyImput = _.keys(input)[0];
  this.setState({ [keyImput]: input[keyImput].replace(/[^0-9]/g, '') });
};
onChangeInputCle = (cle) => {
  this.setState({ cle: cle.replace(/[^A-Za-z]/g, '') });
};
addZeros = (input) => {
  let keyImput = _.keys(input)[0];
  if (input[keyImput] !== '') {
    this.setState({
      [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
    });
  }
};
retablir = () => {
  this.setState({ ...this.defaultState });
};

confirm = () => {
  this.setState({ showErrorMsg: true });
  if (this.state.regime && this.state.serie) {
    this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

    if (this.state.cle === this.state.cleValide) {
      let referenceDed =
        this.state.bureau +
        this.state.regime +
        this.state.annee +
        this.state.serie;
      let action = initConfirmerLeCertificatDeReception.request(
        {
          type: GENERIC_REQUEST,
          value: {
            jsonVO: {
              reference: referenceDed,
              enregistre: this.state.enregistree,
            },
            cle: this.state.cle,
          },
        },
        this.props.navigation,
      );
      this.props.dispatch(action);
    }
  }
};
hasErrors = (field) => {
  return this.state.showErrorMsg && _.isEmpty(this.state[field]);
};
isCleValide = () => {
  return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
};

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

render() {
  return (
    <View>
      <ComBadrToolbarComp
        navigation={this.props.navigation}
        icon="menu"
        title={translate('confimationReception.title')}
        subtitle={translate('confimationReception.subTitle')}
      />
    <ComContainerComp style={styles.container}>
      {this.props.errorMessage != null && (
        <ComBadrErrorMessageComp message={this.props.errorMessage} />
      )}
      <View style={styles.containerInputs}>
        <View>
          <TextInput
            error={this.hasErrors('bureau')}
            maxLength={3}
            keyboardType={'number-pad'}
            value={this.state.bureau}
            label={translate('transverse.bureau')}
            onChangeText={(val) => this.onChangeInput({ bureau: val })}
            onEndEditing={(event) =>
              this.addZeros({
                bureau: event.nativeEvent.text,
                maxLength: 3,
              })
            }
            style={CustomStyleSheet.largeInput}
          />
          <HelperText
            type="error"
            padding="none"
            visible={this.hasErrors('bureau')}>
            {translate('errors.donneeObligatoire', {
              champ: translate('transverse.bureau'),
            })}
          </HelperText>
        </View>

        <View>
          <TextInput
            error={this.hasErrors('regime')}
            maxLength={3}
            keyboardType={'number-pad'}
            value={this.state.regime}
            label={translate('transverse.regime')}
            onChangeText={(val) => this.onChangeInput({ regime: val })}
            onEndEditing={(event) =>
              this.addZeros({
                regime: event.nativeEvent.text,
                maxLength: 3,
              })
            }
            style={CustomStyleSheet.largeInput}
          />
          <HelperText
            type="error"
            padding="none"
            visible={this.hasErrors('regime')}>
            {translate('errors.donneeObligatoire', {
              champ: translate('transverse.regime'),
            })}
          </HelperText>
        </View>

        <View>
          <TextInput
            error={this.hasErrors('annee')}
            maxLength={4}
            keyboardType={'number-pad'}
            value={this.state.annee}
            label={translate('transverse.annee')}
            onChangeText={(val) => this.onChangeInput({ annee: val })}
            onEndEditing={(event) =>
              this.addZeros({
                annee: event.nativeEvent.text,
                maxLength: 4,
              })
            }
            style={CustomStyleSheet.largeInput}
          />
          <HelperText
            type="error"
            padding="none"
            visible={this.hasErrors('annee')}>
            {translate('errors.donneeObligatoire', {
              champ: translate('transverse.annee'),
            })}
          </HelperText>
        </View>

        <View>
          <TextInput
            error={this.hasErrors('serie')}
            maxLength={7}
            keyboardType={'number-pad'}
            value={this.state.serie}
            label={translate('transverse.serie')}
            onChangeText={(val) => this.onChangeInput({ serie: val })}
            onEndEditing={(event) =>
              this.addZeros({
                serie: event.nativeEvent.text,
                maxLength: 7,
              })
            }
            style={CustomStyleSheet.largeInput}
          />
          <HelperText
            type="error"
            padding="none"
            visible={this.hasErrors('serie')}>
            {translate('errors.donneeObligatoire', {
              champ: translate('transverse.serie'),
            })}
          </HelperText>
        </View>
      </View>

      <View style={styles.flexRow}>
        <View style={styles.alignEnd}>
          <TextInput
            error={this.isCleValide('cle')}
            maxLength={1}
            autoCapitalize={'characters'}
            value={this.state.cle}
            label={translate('transverse.cle')}
            onChangeText={(val) => this.onChangeInputCle(val)}
            style={CustomStyleSheet.mediumInput}
          />
          <HelperText
            type="error"
            padding="none"
            style={styles.cleHelperMsg}
            visible={this.isCleValide('cle')}>
            {translate('errors.cleNotValid', {
              cle: this.state.cleValide,
            })}
          </HelperText>
        </View>
        <View style={styles.alignStart}>
          <TextInput
            keyboardType={'number-pad'}
            value={this.state.numeroVoyage}
            maxLength={1}
            label={translate('transverse.nVoyage')}
            onChangeText={(val) => this.onChangeInput({ numeroVoyage: val })}
            style={CustomStyleSheet.mediumInput}
          />
        </View>
      </View>

      <View style={styles.containerBtn}>
        <ComBadrButtonIconComp
          onPress={this.confirm}
          icon="check"
          style={styles.btnConfirmer}
          loading={this.props.showProgress}
          text={translate('transverse.confirmer')}
        />

        <Button
          onPress={this.retablir}
          icon="autorenew"
          mode="contained"
          style={styles.btnRetablir}>
          {translate('transverse.retablir')}
        </Button>
      </View>

      
      </ComContainerComp>
      </View>
  );
}
}



const mapStateToProps = (state) => ({
  ...state.consulterDumReducer
 });

export default connect(mapStateToProps, null)(DedRechercheConfirmationReceptionScreen);
