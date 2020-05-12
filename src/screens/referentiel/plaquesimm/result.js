import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import utf8 from 'utf8';

import {translate} from '../../../common/translations/i18n';

/**Custom Components */
import {
  NumeroPlaque,
  NumeroPlaqueDiplo,
  NumeroPlaqueRemorque,
  BadrModal,
  DetailPlaque,
  BadrCircleProgressBar,
  CopyPaste,
} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsPlaquesImm from '../../../common/constants/referentiel/plaquesImm';
import * as plaquesImmAction from '../../../redux/actions/referentiel/plaquesImm';

import {useScrollToTop} from '@react-navigation/native';

const MAX_RESULTS_PER_PAGE = 10;

function Albums() {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  return <ScrollView ref={ref}>{/* content */}</ScrollView>;
}

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

  changeCurrentPage = page => {
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

  buildSearchPlaquesImmAction = searchObject => {
    var action = plaquesImmAction.request({
      type: ConstantsPlaquesImm.PLAQUES_IMM_REQUEST,
      value: {
        login: this.props.route.params.login,
        rechercheObj: searchObject,
        pageSize: MAX_RESULTS_PER_PAGE,
        offset: this.state.offset,
      },
    });
    return action;
  };

  loadMore = searchState => {
    /**
      Load more data ...
    */
    let action = this.buildSearchPlaquesImmAction(searchState);
    this.props.actions.dispatch(action);
  };

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  onItemSelected = item => {
    this.scrollView.scrollTo({y: 0});
    this.setState({showDetail: true});
    this.setState({item: item});
  };

  render() {
    let pageCount = 0;
    let rows = [];
    let mItem = null;
    if (this.props.value && this.props.value.resultBean) {
      rows = this.props.value.resultBean.rows;
      pageCount = Math.round(
        this.props.value.totalNumberOfResult / MAX_RESULTS_PER_PAGE,
      );
    }

    return (
      <ScrollView horizontal={true} ref={ref => (this.scrollView = ref)}>
        {!this.props.showProgress && (
          <View>
            <DataTable ref={ref => (this.datatable = ref)}>
              <DataTable.Header>
                <DataTable.Title style={{width: 180}}>
                  {translate('referentiel.plaquesImm.numeroChassis')}
                </DataTable.Title>
                <DataTable.Title style={{width: 300}}>
                  {translate('referentiel.plaquesImm.proprietaire')}
                </DataTable.Title>
                <DataTable.Title style={{width: 200}}>
                  {translate('referentiel.plaquesImm.numeroPlaqueImmNormale')}
                </DataTable.Title>
                <DataTable.Title style={{width: 200}}>
                  {translate(
                    'referentiel.plaquesImm.numeroPlaqueImmDiplomatqiue',
                  )}
                </DataTable.Title>
                <DataTable.Title style={{width: 200}}>
                  {translate('referentiel.plaquesImm.numeroPlaqueImmRemorque')}
                </DataTable.Title>
              </DataTable.Header>
              {rows ? (
                rows.map((item, index) => (
                  <DataTable.Row
                    key={item.identifiantDMD}
                    onPress={() => this.onItemSelected(item)}>
                    <DataTable.Cell
                      style={{width: 180}}
                      children={<CopyPaste value={item.vehiculeNumChassis} />}
                    />
                    <DataTable.Cell style={{width: 300}}>
                      {item.proprietaireNom} {item.proprietaireNom} {'('}{' '}
                      {item.proprietaireNumeroIdentifiant} {')'}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{width: 200}}
                      children={
                        <NumeroPlaque numero={item.vehiculeNumImmatComplet} />
                      }
                    />
                    <DataTable.Cell
                      style={{width: 200}}
                      children={
                        <NumeroPlaqueDiplo
                          numero1={item.vehiculeNumImmatDiplo1}
                          numero2={item.vehiculeNumImmatDiplo2}
                        />
                      }
                    />

                    <DataTable.Cell
                      style={{width: 200}}
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
                <DataTable.Row />
              )}

              {!this.props.showProgress &&
                rows &&
                this.props.value &&
                this.props.value.totalNumberOfResult &&
                this.props.value.totalNumberOfResult > MAX_RESULTS_PER_PAGE && (
                  <DataTable.Pagination
                    style={{alignSelf: 'flex-start'}}
                    page={this.state.currentPage}
                    numberOfPages={pageCount}
                    onPageChange={page => {
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
          </View>
        )}
      </ScrollView>
    );
  }
}

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
