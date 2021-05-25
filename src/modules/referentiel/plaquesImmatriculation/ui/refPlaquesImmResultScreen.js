/** React Components */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {connect} from 'react-redux';
import {request} from '../state/actions/refPlaquesImmAction';
import {
  ComBadrModalComp,
  ComCopyPasteComp,
  ComDetailPlaqueComp,
  ComNumeroPlaqueComp,
  ComNumeroPlaqueRemorqueDiploComp,
} from '../../../../commons/component';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import style from '../style/refPlaquesImmStyle';
import {PLAQUES_IMM_REQUEST} from '../state/refPlaquesImmConstants';

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
    let action = request({
      type: PLAQUES_IMM_REQUEST,
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
    console.log('---------');
    console.log(item);
    console.log('---------');
    this.setState({item: item, showDetail: true});
  };

  render() {
    let pageCount = 0;
    let rows = [];
    if (this.props.value && this.props.value.resultBean) {
      rows = this.props.value.resultBean.rows;
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
                <DataTable.Title style={style.datatableTitle}>
                  {translate('plaquesImm.numeroChassis')}
                </DataTable.Title>
                <DataTable.Title style={style.datatableTitle}>
                  {translate('plaquesImm.proprietaire')}
                </DataTable.Title>
                <DataTable.Title style={style.datatableTitle}>
                  {translate('plaquesImm.numeroPlaqueImmNormale')}
                </DataTable.Title>
                <DataTable.Title style={style.datatableTitle}>
                  {translate('plaquesImm.numeroPlaqueImmDiplomatqiue')}
                </DataTable.Title>
                <DataTable.Title style={style.datatableTitle}>
                  {translate('plaquesImm.numeroPlaqueImmRemorque')}
                </DataTable.Title>
              </DataTable.Header>
              {rows ? (
                rows.map((item, index) => (
                  <DataTable.Row
                    key={item.propritaireIdentite + '-' + item.identifiantDMD}
                    onPress={() => this.onItemSelected(item)}>
                    <DataTable.Cell
                      style={style.datatableTitle}
                      children={
                        <ComCopyPasteComp
                          onPress={() => this.onItemSelected(item)}
                          value={item.vehiculeNumChassis}
                        />
                      }
                    />
                    <DataTable.Cell style={style.datatableTitle}>
                      {item.proprietaireNom} {item.proprietairePrenom} {'('}{' '}
                      {item.proprietaireNumeroIdentifiant} {')'}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={style.datatableTitle}
                      children={
                        <ComNumeroPlaqueComp
                          numero={item.vehiculeNumImmatComplet}
                        />
                      }
                    />
                    <DataTable.Cell
                      style={style.datatableTitle}
                      children={
                        <ComNumeroPlaqueRemorqueDiploComp
                          numero1={item.vehiculeNumImmatDiplo1}
                          numero2={item.vehiculeNumImmatDiplo2}
                        />
                      }
                    />

                    <DataTable.Cell
                      style={style.datatableTitle}
                      children={
                        <ComNumeroPlaqueRemorqueDiploComp
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
                    style={style.datatablePagination}
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

            <ComBadrModalComp
              visible={this.state.showDetail}
              onDismiss={this.onDismiss}>
              <ComDetailPlaqueComp data={this.state.item} />
            </ComBadrModalComp>
          </ScrollView>
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
