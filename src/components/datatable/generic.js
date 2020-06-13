import React from 'react';
import {Text, View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';
import {FAB} from 'react-native-paper';

/** i18n **/
import {translate} from '../../common/translations/i18n';

/** Custom Style **/
import {CustomStyleSheet} from '../../styles/index';

/** Loadash */
import _ from 'lodash';

/** Custom components */
import {BadrCircleProgressBar} from '../';

/** Storage **/
import {loadParsed} from '../../services/storage-service';

import {primaryColor} from '../../styles/index';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsBadrApiTable from '../../common/constants/components/badrApiTable';
import * as badrApiAction from '../../redux/actions/components/badrApiTable';

const FIRST_PAGINATION_SEPARATOR = ' / ';
const SECOND_PAGINATION_SEPARATOR = ' - ';
const screenWidth = Dimensions.get('window').width;

class BadrApiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {login: '', currentPage: 0, offset: 0};
  }

  loadUser = async () => {
    let user = await loadParsed('user');
    if (user) {
      this.setState({login: user.login});
      this.loadMore(user.login);
    }
  };

  componentDidMount = () => {
    this.loadUser();
  };

  componentDidUpdate(prevProps, prevState) {
    const {offset} = this.state;
    if (prevState.offset !== offset && this.props.paginateServerSide) {
      this.loadMore(this.state.login);
    }
  }

  loadMore = (login) => {
    /**
      Load more data ...
    */
    let action = this.buildSearchAction(login);
    this.props.actions.dispatch(action);
  };

  buildSearchAction = (login) => {
    var action = badrApiAction.request({
      type: ConstantsBadrApiTable.BADR_APITABLE_REQUEST,
      value: {
        login: login,
        module: this.props.module,
        command: this.props.command,
        typeService: this.props.typeService,
        searchObject: this.props.searchObject,
        pageSize: this.props.maxResultsPerPage,
        offset: this.state.offset,
      },
    });
    return action;
  };

  changeCurrentPage = (page) => {
    if (page < this.state.currentPage) {
      this.setState({
        offset: this.state.offset - this.props.maxResultsPerPage,
        currentPage: this.state.currentPage - 1,
      });
    } else {
      this.setState({
        offset: this.state.offset + this.props.maxResultsPerPage,
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    return this.buildDataTable();
  }

  buildPagination = (pageCount) => {
    return (
      <DataTable.Pagination
        style={{alignSelf: 'flex-start'}}
        page={this.state.currentPage}
        numberOfPages={pageCount}
        onPageChange={(page) => {
          this.changeCurrentPage(page);
        }}
        label={
          this.state.currentPage +
          1 +
          FIRST_PAGINATION_SEPARATOR +
          pageCount +
          SECOND_PAGINATION_SEPARATOR +
          pageCount
        }
      />
    );
  };

  scrollMore = () => {
    this.refs._horizontalScrollView.scrollTo({
      x: screenWidth,
    });
  };
  buildCell = (column, row) => {
    return (
      <Text
        style={
          column.action
            ? {
                color: primaryColor,
                textAlign: 'center',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }
            : {}
        }
        onPress={() => column.action(row)}>
        {_.get(row, column.code) != null ? String(_.get(row, column.code)) : ''}
      </Text>
    );
    // }
  };

  buildDataTable = () => {
    let data = [];
    if (this.props.resultArrayMapping) {
      data = _.get(this.props.data, this.props.resultArrayMapping);
    } else {
      data = this.props.data;
    }

    let totalElements = _.get(this.props.data, this.props.totalElementsMapping);
    let pageCount = 0;
    if (totalElements && data && data.length > 0) {
      console.log(totalElements);
      pageCount = Math.ceil(totalElements / this.props.maxResultsPerPage);
    }
    const totalWidth = _.sumBy(this.props.cols, function (col) {
      return col.width;
    });

    console.log(data);

    return (
      <View>
        <ScrollView
          ref="_horizontalScrollView"
          key="horizontalScrollView"
          horizontal={true}>
          <ScrollView key="verticalScrollView">
            <DataTable style={this.props.fullWidth ? {width: screenWidth} : {}}>
              <DataTable.Header>
                {this.props.cols.map((column, index) => (
                  <DataTable.Title
                    style={{
                      width: column.width,
                    }}>
                    {column.libelle}
                  </DataTable.Title>
                ))}
              </DataTable.Header>

              {data && data.length > 0
                ? data.map((row, index) => (
                    <DataTable.Row
                      key={row[this.props.id]}
                      onPress={() => this.props.onItemSelected(row)}>
                      {this.props.cols.map((column, index) => (
                        <DataTable.Cell
                          style={{
                            width: column.width,
                          }}
                          children={this.buildCell(column, row)}
                        />
                      ))}
                    </DataTable.Row>
                  ))
                : !this.props.showProgress && (
                    <View style={CustomStyleSheet.centerContainer}>
                      <Text>{translate('transverse.noRowFound')}</Text>
                    </View>
                  )}
              {!this.props.showProgress &&
                pageCount > 0 &&
                this.props.paginate &&
                this.buildPagination(pageCount)}

              {this.props.showProgress && (
                <View style={CustomStyleSheet.centerContainer}>
                  <BadrCircleProgressBar size={30} />
                </View>
              )}
            </DataTable>
          </ScrollView>
        </ScrollView>
        <FAB
          visible={
            !this.props.showProgress &&
            data &&
            data.length > 0 &&
            totalWidth > screenWidth
          }
          style={styles.fab}
          small
          icon="chevron-right"
          onPress={() => this.scrollMore()}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

function mapStateToProps(state) {
  return {...state.badrApiTable};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BadrApiTable);
