import _ from 'lodash';
import React, {Component} from 'react';
import {View} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
/**i18n */
import {CustomStyleSheet} from '../../../styles';
import {Container} from '../../';
import * as InitApurementAction from '../../../../modules/at/apurement/state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../../modules/at/apurement/state/atApurementConstants';
/** Utils */
import Utils from '../../../utils/Util';
import {translate} from '../../../i18n/I18nHelper';

class RechecheRefAt extends Component {
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
    // if (nextProps.qrCodeReducer !== this.props.qrCodeReducer) {
    if (this.props.qrCodeReducer.value && this.props.qrCodeReducer.value.data) {
      this.setState({
        bureau: this.props.qrCodeReducer.value.data.slice(0, 3),
        annee: this.props.qrCodeReducer.value.data.slice(3, 7),
        numero: this.props.qrCodeReducer.value.data.slice(7, 10),
        serie: this.props.qrCodeReducer.value.data.slice(10, 17),
      });
    }
    // }
  }

  componentDidMount() {
    console.log('componentDidMount FIls');
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

  _hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };

  afficherErreurMsg = () => {
    this.setState({showErrorMsg: true});
  };

  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input['maxLength'], '0'),
      });
    }
  };

  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    this.setState({[keyImput]: input[keyImput].replace(/[^0-9]/g, '')});
  };

  getReferenceAt = () =>
    Utils.concatReference(
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

  render() {
    return (
      <View style={styles.fabContainer}>
        <Container style={styles.container}>
          <View style={styles.containerInputs}>
            <View>
              <TextInput
                error={this._hasErrors('bureau')}
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
                visible={this._hasErrors('bureau')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.bureau'),
                })}
              </HelperText>
            </View>

            <View>
              <TextInput
                error={this._hasErrors('annee')}
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
                visible={this._hasErrors('annee')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.annee'),
                })}
              </HelperText>
            </View>

            <View>
              <TextInput
                error={this._hasErrors('numero')}
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
                visible={this._hasErrors('numero')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.numero'),
                })}
              </HelperText>
            </View>

            <View>
              <TextInput
                error={this._hasErrors('serie')}
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
                visible={this._hasErrors('serie')}>
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
                  {translate('at.apurement.manuelle')}
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
        </Container>
      </View>
    );
  }
}

const styles = {
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
    color: '#FFF',
    padding: 5,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
};

const mapStateToProps = (state) => {
  let clonedState = {
    initApurementReducer: {...state.initApurementReducer},
    qrCodeReducer: {...state.qrCodeReducer},
  };
  return clonedState;
};

export default connect(mapStateToProps, null)(RechecheRefAt);
