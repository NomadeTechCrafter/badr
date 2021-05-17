import React from 'react';

import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';
/** REDUX **/
import {connect} from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationEntreeConstants';
import * as ConfirmationEntreeCRUDAction from '../state/actions/ecorExpConfirmationEntreeCRUDAction';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComBadrListComp,
  ComBadrNumericTextInputComp,
} from '../../../../commons/component';
import {Button, RadioButton, Text, TextInput} from 'react-native-paper';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import style from '../style/ecorExpConfirmationEntreeStyle';
import _ from 'lodash';

const initialState = {
  generateurNumScelleAu: '',
  generateurNumScelleDu: '',
  numeroScelle: '',
  messagesErreur: [],
  listeNombreDeScelles: [],
  messageVisibility: false,
  message: '',
  messageType: '',
  selectedItemListScelle: '',
  includeScelles: false,
  selectedScelle: {},
};
class EcorExpInformationEcorComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    //this.prepareState();
  }

  /*prepareState = () => {
    this.state = {
      ...this.state,
      initConfirmerEntreeVO: this.props.initConfirmerEntreeVO,
      listeNombreDeScelles: this.props.listeNombreDeScelles,
    };
  };*/

  componentDidMount() {
    this.setState({
      ...this.state,
      initConfirmerEntreeVO: this.props.initConfirmerEntreeVO,
      listeNombreDeScelles: this.props.listeNombreDeScelles,
    });
  }
  /* componentDidUpdate(prevProps, prevState) {
    console.log( '--------componentDidUpdate')
    }*/
  /*static getDerivedStateFromProps(props, state) {
    console.log(
      'EcorExpInformationEcorComp getDerivedStateFromProps',
      props.listeNombreDeScelles,
      state.listeNombreDeScelles,
    );
    if (props.listeNombreDeScelles !== state.listeNombreDeScelles) {
      console.log(' in if EcorExpInformationEcorComp getDerivedStateFromProps');
      return {
        listeNombreDeScelles: props.listeNombreDeScelles,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }*/

  genererNumeroScelle = () => {
    console.log('generateurNumScelleDu');
    let listeScelles = [];
    const {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    if (generateurNumScelleDu && generateurNumScelleAu) {
      if (
        generateurNumScelleDu.length === 8 &&
        generateurNumScelleAu.length === 8
      ) {
        var du = Number(generateurNumScelleDu);
        var au = Number(generateurNumScelleAu);
        if (au > du) {
          if (au - du <= 100) {
            console.log('generateurNumScelleDu ok condition');
            var nbScelle = du;
            for (var i = du; i <= au; i++) {
              listeScelles.push(('00000000' + nbScelle).slice(-8));
              nbScelle += 1;
            }
            console.log('generateurNumScelleDu listeScelles', listeScelles);

            this.setState(
              {
                ...this.state,
                listeNombreDeScelles: _.concat(
                  listeNombreDeScelles,
                  listeScelles,
                ),
                generateurNumScelleDu: '',
                generateurNumScelleAu: '',
              },
              () => this.updateVo(),
            );
            console.log('after set state genrete list ');
            this.generateurNumScelleDu.clear();
            this.generateurNumScelleAu.clear();
            this.props.setError(null);
          } else {
            this.props.setError(translate('errors.maxNombreScelle'));
          }
        } else {
          this.props.setError(translate('errors.numScelleInferieur'));
        }
      } else {
        this.props.setError(translate('errors.numScelleLongueur'));
      }
    }
  };

  addNumeroScelle = () => {
    const {numeroScelle, listeNombreDeScelles} = this.state;
    if (numeroScelle && numeroScelle.length === 8) {
      if (listeNombreDeScelles.length < 100) {
        if (_.indexOf(listeNombreDeScelles, numeroScelle) === -1) {
          this.setState(
            {
              ...this.state,
              listeNombreDeScelles: [...listeNombreDeScelles, numeroScelle],
              numeroScelle: '',
            },
            () => this.updateVo(),
          );
          this.numeroScelleInput.clear();
        } else {
          this.props.setError(translate('errors.numScelleExisteDeja'));
        }
      } else {
        this.props.setError(translate('errors.maxNombreScelle'));
      }
    } else {
      this.props.setError(translate('errors.numScelleLongueur'));
    }
  };

  deleteNumeroScelle = () => {
    const {selectedScelle, listeNombreDeScelles} = this.state;
    let selectedScelleIndex = _.indexOf(listeNombreDeScelles, selectedScelle);
    if (selectedScelle !== '' && selectedScelleIndex) {
      listeNombreDeScelles.splice(selectedScelleIndex, 1);
      this.setState(
        {
          selectedScelle: {},
        },
        () => this.updateVo(),
      );
    }
  };

  updateVo = () => {
    let initConfirmerEntreeVO = this.state.initConfirmerEntreeVO;
    let formattedListeScelles = {};
    this.state.listeNombreDeScelles.forEach((value) => {
      formattedListeScelles[value] = value;
    });
    initConfirmerEntreeVO.scelles = formattedListeScelles;
    let action = ConfirmationEntreeCRUDAction.updateVO({
      type: Constants.INITCONFIRMATIONENTREE_UPDATE_VO,
      value: initConfirmerEntreeVO,
    });
    this.props.dispatch(action);
  };
  renderBoxItem = ({item}) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={this.props.ecorIsSaved}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    console.log('in render');
    const {initConfirmerEntreeVO} = this.props;
    let {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
      numeroScelle,
    } = this.state;

    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Informations ECOR */}
        <ComAccordionComp
          title={translate('confirmationEntree.informationsEcor.title')}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <TextInput
                  mode={'outlined'}
                  maxLength={8}
                  value={initConfirmerEntreeVO.numeroPinceConfirmationEntree}
                  label={translate(
                    'confirmationEntree.informationsEcor.numeroPince',
                  )}
                  style={CustomStyleSheet.badrInputHeight}
                  onChangeText={(text) =>
                    this.setState({
                      initConfirmerEntreeVO: {
                        ...this.state.initConfirmerEntreeVO,
                        numeroPince: text,
                      },
                    })
                  }
                  disabled={this.props.ecorIsSaved}
                />
              </Col>
              <Col size={1} />
              <Col size={1}>
                <ComBadrNumericTextInputComp
                  maxLength={8}
                  value={initConfirmerEntreeVO.nombreScelleConfirmationEntree}
                  label={translate(
                    'confirmationEntree.informationsEcor.nombreScelles',
                  )}
                  onChangeBadrInput={(text) =>
                    this.setState({
                      initConfirmerEntreeVO: {
                        ...this.state.initConfirmerEntreeVO,
                        nombreDeScelles: text,
                      },
                    })
                  }
                  disabled={this.props.ecorIsSaved}
                />
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'confirmationEntree.informationsEcor.generateurScelle',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrNumericTextInputComp
                  onRef={(input) => {
                    this.generateurNumScelleDu = input;
                  }}
                  maxLength={8}
                  value={this.state.generateurNumScelleDu}
                  label={translate('transverse.du')}
                  onChangeBadrInput={(text) =>
                    this.setState({
                      generateurNumScelleDu: text,
                    })
                  }
                  disabled={this.props.ecorIsSaved}
                />
              </Col>
              <Col size={1} />
              <Col size={2}>
                <ComBadrNumericTextInputComp
                  onRef={(input) => {
                    this.generateurNumScelleAu = input;
                  }}
                  maxLength={8}
                  value={generateurNumScelleAu}
                  label={translate('transverse.au')}
                  onChangeBadrInput={(text) =>
                    this.setState({
                      generateurNumScelleAu: text,
                    })
                  }
                  disabled={this.props.ecorIsSaved}
                />
              </Col>
              <Col size={2} />
              <Col size={1}>
                <Button
                  mode="contained"
                  compact="true"
                  onPress={this.genererNumeroScelle}
                  disabled={this.props.ecorIsSaved}>
                  {translate('transverse.Ok')}

                </Button>
              </Col>
              <Col size={2} />
            </Row>
            <Row style={[CustomStyleSheet.whiteRow, style.rowListNumScelle]}>
              <Col size={5}>
                <ComBadrNumericTextInputComp
                  onRef={(input) => {
                    this.numeroScelleInput = input;
                  }}
                  maxLength={8}
                  value={numeroScelle}
                  label={translate(
                    'confirmationEntree.informationsEcor.numeroScelle',
                  )}
                  onChangeBadrInput={(text) => {
                    this.setState({
                      numeroScelle: text,
                    });
                  }}
                  disabled={this.props.ecorIsSaved}
                />
              </Col>
              <Col size={2} />

              <Col size={1}>
                <Button
                  onPress={this.addNumeroScelle}
                  icon="plus-box"
                  mode="contained"
                  compact="true"
                  style={style.btnActionList}
                  disabled={this.props.ecorIsSaved}
                />
                <Button
                  onPress={this.deleteNumeroScelle}
                  icon="delete"
                  mode="contained"
                  compact="true"
                  style={style.btnActionList}
                  disabled={this.props.ecorIsSaved}
                />
              </Col>
              <Col size={2} />

              <Col size={5} style={style.boxContainer}>
                <SafeAreaView style={style.boxSafeArea}>
                  {_.isEmpty(listeNombreDeScelles) && (
                    <Text style={style.boxItemText}>
                      {translate(
                        'confirmationEntree.informationsEcor.aucunElement',
                      )}
                    </Text>
                  )}

                  {!_.isEmpty(listeNombreDeScelles) && (
                    <FlatList
                      data={listeNombreDeScelles}
                      renderItem={(item) => this.renderBoxItem(item)}
                      keyExtractor={(item) => item}
                      nestedScrollEnabled={true}
                      disabled={this.props.ecorIsSaved}
                    />
                  )}
                </SafeAreaView>
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
function mapStateToProps(state) {
  return {...state.ecorExpConfirmationEntreeReducer};
}
export default connect(mapStateToProps, null)(EcorExpInformationEcorComp);
