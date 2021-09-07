import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {Col, Row} from 'react-native-easy-grid';

import InfoCommon from '../common/AtInfoCommonScreen';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import * as CreateApurementAction from '../../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import {ComSessionService} from '../../../../../../commons/services/session/ComSessionService';

import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../../commons/component';
import moment from 'moment';

class AtEntete extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      errorMessage: null,
    };
  }

  

  componentDidMount = () => {
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const atVo: any = this.props.initApurement.data;
    return (
      <View style={styles.fabContainer}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}>
          <ComBadrToolbarComp
            back={true}
            navigation={this.props.navigation}
            title={translate('at.title')}
            subtitle={translate('at.apurement.title')}
            icon="menu"
          />

          {atVo != null && atVo.atEnteteVO != null && (
            <ComContainerComp>
              {this.props.initApurement.errorMessage != null && (
                <View style={styles.messages}>
                  <ComBadrErrorMessageComp
                    message={this.props.initApurement.errorMessage}
                  />
                </View>
              )}
              {this.props.initApurement.successMessage != null && (
                <View>
                  <ComBadrInfoMessageComp
                    message={this.props.initApurement.successMessage}
                  />
                </View>
              )}

              {this.state.errorMessage != null && (
                <View style={styles.messages}>
                  <ComBadrErrorMessageComp
                    onClose={() => {
                      this.setState({errorMessage: ''});
                    }}
                    message={this.state.errorMessage}
                  />
                </View>
              )}

              {/* Information commun */}
              <InfoCommon
                bureau={atVo.atEnteteVO.bureau}
                annee={atVo.atEnteteVO.annee}
                numeroOrdre={atVo.atEnteteVO.numeroOrdre}
                serie={atVo.atEnteteVO.serie}
                dateEnregistrement={atVo.atEnteteVO.dateEnregistrement}
                dateCreation={atVo.atEnteteVO.dateCreation}
                numVersion={atVo.atEnteteVO.numVersion}
                etat={atVo.atEnteteVO.etatAt.libelle}
              />
              )}
            </ComContainerComp>
          )}
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.atRechercheReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AtEntete);

const styles = StyleSheet.create({
  fabContainer: {
    height: '100%',
  },
  badrActionsStyle: {justifyContent: 'flex-end'},
  messages: {justifyContent: 'center', alignItems: 'center'},
  btnActions: {margin: 2},
  actionsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 15,
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputApur: {
    ...CustomStyleSheet.largeInput,
    marginBottom: 10,
  },
  textInputsStyle: {
    padding: 10,
  },
});
