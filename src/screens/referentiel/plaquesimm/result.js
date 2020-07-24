/** React Components */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

/** Inmemory session */
import {Session} from '../../../commons/services/session/Session';

/** i18n **/
import {translate} from '../../../commons/i18n';

/**Custom Components */
import {
  NumeroPlaque,
  NumeroPlaqueDiplo,
  NumeroPlaqueRemorque,
  BadrModal,
  DetailPlaque,
  CopyPaste,
} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsPlaquesImm from '../../../common/constants/referentiel/plaquesImm';
import * as plaquesImmAction from '../../../redux/actions/referentiel/plaquesImm';

const MAX_RESULTS_PER_PAGE = 10;

class PlaquesImmatriculationResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      currentPage: 0,
      showDetail: false,
      item: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const {offset} = this.state;
    if (prevState.offset !== offset) {
      console.log('-------');
      console.log(this.ref);
      console.log('-------');
      this.loadMore(this.props.route.params.searchState);
    }
  }

  changeCurrentPage = (page) => {
    if (page < this.state.currentPage) {
      this.setState({
        offset: this.state.offset - MAX_RESULTS_PER_PAGE,
        currentPage: this.state.currentPage - 1,
      });
    } else {
      this.setState({
        offset: this.state.offset + MAX_RESULTS_PER_PAGE,
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  buildSearchPlaquesImmAction = (searchObject) => {
    var action = plaquesImmAction.request({
      type: ConstantsPlaquesImm.PLAQUES_IMM_REQUEST,
      value: {
        rechercheObj: searchObject,
        pageSize: MAX_RESULTS_PER_PAGE,
        offset: this.state.offset,
      },
    });
    return action;
  };

  loadMore = (searchState) => {
    /**
      Load more data ...
    */
    let action = this.buildSearchPlaquesImmAction(searchState);
    this.props.actions.dispatch(action);
  };

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  onItemSelected = (item) => {
    // this.scrollView.scrollTo({y: 0});
    this.setState({showDetail: true});
    this.setState({item: item});
  };

  render() {
    let pageCount = 0;
    let rows = [];
    if (this.props.value && this.props.value.resultBean) {
      rows = this.props.value.resultBean.rows;
      console.log(rows);
      pageCount = Math.round(
        this.props.value.totalNumberOfResult / MAX_RESULTS_PER_PAGE,
      );
    }
    return (
      <ScrollView key="horizontalScrollView" horizontal={true}>
        {!this.props.showProgress && (
          <ScrollView key="verticalScrollView">
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.datatableTitle}>
                  {translate('referentiel.plaquesImm.numeroChassis')}
                </DataTable.Title>
                <DataTable.Title style={styles.datatableTitle}>
                  {translate('referentiel.plaquesImm.proprietaire')}
                </DataTable.Title>
                <DataTable.Title style={styles.datatableTitle}>
                  {translate('referentiel.plaquesImm.numeroPlaqueImmNormale')}
                </DataTable.Title>
                <DataTable.Title style={styles.datatableTitle}>
                  {translate(
                    'referentiel.plaquesImm.numeroPlaqueImmDiplomatqiue',
                  )}
                </DataTable.Title>
                <DataTable.Title style={styles.datatableTitle}>
                  {translate('referentiel.plaquesImm.numeroPlaqueImmRemorque')}
                </DataTable.Title>
              </DataTable.Header>
              {rows ? (
                rows.map((item, index) => (
                  <DataTable.Row
                    key={item.propritaireIdentite + '-' + item.identifiantDMD}
                    onPress={() => this.onItemSelected(item)}>
                    <DataTable.Cell
                      style={styles.datatableTitle}
                      children={<CopyPaste value={item.vehiculeNumChassis} />}
                    />
                    <DataTable.Cell style={styles.datatableTitle}>
                      {item.proprietaireNom} {item.proprietaireNom} {'('}{' '}
                      {item.proprietaireNumeroIdentifiant} {')'}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={styles.datatableTitle}
                      children={
                        <NumeroPlaque numero={item.vehiculeNumImmatComplet} />
                      }
                    />
                    <DataTable.Cell
                      style={styles.datatableTitle}
                      children={
                        <NumeroPlaqueDiplo
                          numero1={item.vehiculeNumImmatDiplo1}
                          numero2={item.vehiculeNumImmatDiplo2}
                        />
                      }
                    />

                    <DataTable.Cell
                      style={styles.datatableTitle}
                      children={
                        <NumeroPlaqueRemorque
                          numero1={item.vehiculeNumImmatRem1}
                          numero2={item.vehiculeNumImmatRem2}
                        />
                      }
                    />
                  </DataTable.Row>
                ))
              ) : (
                <View style={CustomStyleSheet.centerContainer}>
                  <Text>{translate('transverse.noRowFound')}</Text>
                </View>
              )}

              {!this.props.showProgress &&
                rows &&
                this.props.value &&
                this.props.value.totalNumberOfResult &&
                this.props.value.totalNumberOfResult > MAX_RESULTS_PER_PAGE && (
                  <DataTable.Pagination
                    style={styles.datatablePagination}
                    page={this.state.currentPage}
                    numberOfPages={pageCount}
                    onPageChange={(page) => {
                      if (
                        this.props.route.params &&
                        this.props.route.params.searchState
                      ) {
                        this.changeCurrentPage(page);
                      }
                    }}
                    label={
                      this.state.currentPage +
                      1 +
                      ' - ' +
                      pageCount +
                      ' / ' +
                      pageCount
                    }
                  />
                )}
            </DataTable>

            <BadrModal
              visible={this.state.showDetail}
              onDismiss={this.onDismiss}>
              <DetailPlaque data={this.state.item} />
            </BadrModal>
          </ScrollView>
        )}
      </ScrollView>
    );
  }
}
const styles = {
  datatableTitle: {width: 300},
  datatablePagination: {alignSelf: 'flex-start'},
};

function mapStateToProps(state) {
  return {...state.plaquesImmReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaquesImmatriculationResult);
