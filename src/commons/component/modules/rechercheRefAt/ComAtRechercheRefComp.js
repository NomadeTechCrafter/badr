import _ from 'lodash';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {accentColor} from '../../../styles/ComThemeStyle';
import {connect} from 'react-redux';
/**i18n */
import {CustomStyleSheet} from '../../../styles/ComThemeStyle';
import {ComBadrErrorMessageComp, ComContainerComp} from '../../';
import * as InitApurementAction from '../../../../modules/at/apurement/state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../../modules/at/apurement/state/atConstants';
/** Utils */
import ComUtils from '../../../utils/ComUtils';
import {translate} from '../../../i18n/ComI18nHelper';

class ComAtRechercheRefComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bureau: '',
      annee: '',
      numero: '',
      serie: '',
      showErrorMsg: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.qrCodeReducer.value &&
      nextProps.qrCodeReducer.value.data &&
      !nextProps.qrCodeReducer.qrFailed
    ) {
      this.setState({
        bureau: this.props.qrCodeReducer.value.data.slice(0, 3),
        annee: this.props.qrCodeReducer.value.data.slice(3, 7),
        numero: this.props.qrCodeReducer.value.data.slice(7, 10),
        serie: this.props.qrCodeReducer.value.data.slice(10, 17),
      });
    } else if (nextProps.qrCodeReducer && nextProps.qrCodeReducer.qrFailed) {
      this.setState({
        bureau: '',
        annee: '',
        numero: '',
        serie: '',
        showErrorMsg: false,
      });
    }
  }

  componentDidMount() {
    this.retablir();
  }

  retablir = () => {
    this.setState({
      bureau: '',
      annee: '',
      numero: '',
      serie: '',
      showErrorMsg: false,
    });
    this.initRechercheAt();
  };

  hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };

  afficherErreurMsg = () => {
    this.setState({showErrorMsg: true});
  };

  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
      });
    }
  };

  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    this.setState({[keyImput]: input[keyImput].replace(/[^0-9]/g, '')});
  };

  getReferenceAt = () =>
    ComUtils.concatReference(
      this.state.bureau,
      this.state.annee,
      this.state.numero,
      this.state.serie,
    );

  initRechercheAt() {
    var action = InitApurementAction.init({
      type: ConstantsAt.INIT_APUR_INIT,
      value: {},
    });
    this.props.dispatch(action);
  }

  apurManuelle = () => {
    this.afficherErreurMsg();
    let ref = this.getReferenceAt();
    if (ref && ref.length === 17) {
      this.props.onApurManuelle(ref);
    }
  };

  apurAutomatique = () => {
    this.afficherErreurMsg();
    let ref = this.getReferenceAt();
    if (ref && ref.length === 17) {
      this.props.onApurAutomatique(ref);
    }
  };

  handleConfirmATButton = () => {};

  onCloseMessageError = () => {
    this.retablir();
  };

  render() {
    return (
      <View style={styles.fabContainer}>
        <ComContainerComp style={styles.container}>
          <View style={styles.containerInputs}>
            {this.props.qrCodeReducer &&
              this.props.qrCodeReducer.errorMessage && (
                <ComBadrErrorMessageComp
                  onClose={this.onCloseMessageError}
                  message={this.props.qrCodeReducer.errorMessage}
                />
              )}
            <View>
              <TextInput
                error={this.hasErrors('bureau')}
                maxLength={3}
                keyboardType={'number-pad'}
                value={this.state.bureau}
                label={translate('transverse.bureau')}
                onChangeText={(val) => this.onChangeInput({bureau: val})}
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
                error={this.hasErrors('annee')}
                maxLength={4}
                keyboardType={'number-pad'}
                value={this.state.annee}
                label={translate('transverse.annee')}
                onChangeText={(val) => this.onChangeInput({annee: val})}
                onEndEditing={(event) => {
                  this.addZeros({
                    annee: event.nativeEvent.text,
                    maxLength: 4,
                  });
                }}
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
                error={this.hasErrors('numero')}
                maxLength={3}
                keyboardType={'number-pad'}
                value={this.state.numero}
                label={translate('transverse.numero')}
                onChangeText={(val) => this.onChangeInput({numero: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    numero: event.nativeEvent.text,
                    maxLength: 3,
                  })
                }
                style={CustomStyleSheet.largeInput}
              />
              <HelperText
                type="error"
                padding="none"
                visible={this.hasErrors('numero')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.numero'),
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
                onChangeText={(val) => this.onChangeInput({serie: val})}
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
          <Grid style={styles.gridContainer}>
            <Row>
              <Col style={styles.column} size={35}>
                <Button
                  loading={this.props.qrCodeReducer.showProgress}
                  mode="contained"
                  icon="check"
                  compact="true"
                  onPress={this.apurManuelle}
                  style={styles.btnConfirmer}>
                  {translate('at.apurement.normale')}
                </Button>
              </Col>
              <Col style={styles.column} size={35}>
                <Button
                  loading={this.props.qrCodeReducer.showProgress}
                  onPress={this.apurAutomatique}
                  mode="contained"
                  icon="check"
                  compact="true"
                  style={styles.btnConfirmer}>
                  {translate('at.apurement.automatique')}
                </Button>
              </Col>
              <Col style={styles.column} size={30}>
                <Button
                  onPress={() => this.retablir()}
                  icon="autorenew"
                  mode="contained"
                  style={styles.btnRetablir}>
                  {translate('transverse.retablir')}
                </Button>
              </Col>
            </Row>
          </Grid>
        </ComContainerComp>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  cleHelperMsg: {width: 150},
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  column: {padding: 10},
  gridContainer: {paddingRight: 25, paddingLeft: 25, width: '100%'},
  btnConfirmer: {
    color: accentColor,
    padding: 5,
  },
  btnRetablir: {
    color: accentColor,
    padding: 5,
  },
});

const mapStateToProps = (state) => {
  let clonedState = {
    initApurementReducer: {...state.initApurementReducer},
    qrCodeReducer: {...state.qrCodeReducer},
  };
  return clonedState;
};

export default connect(mapStateToProps, null)(ComAtRechercheRefComp);
