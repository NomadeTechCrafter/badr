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
import {BadrFloatingButton} from '../';

const FIRST_PAGINATION_SEPARATOR = ' / ';
const SECOND_PAGINATION_SEPARATOR = ' - ';
const screenWidth = Dimensions.get('window').width;
export default class BadrTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 0, offset: 0};
  }

  changeCurrentPage = page => {
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

  reset = () => {
    console.log('reset fired');
    this.setState({offset: 0, currentPage: 0});
  };

  render() {
    return this.buildDataTable();
  }

  buildPagination = pageCount => {
    return (
      <DataTable.Pagination
        style={{alignSelf: 'flex-start'}}
        page={this.state.currentPage}
        numberOfPages={pageCount}
        onPageChange={page => {
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
    this.refs._horizontalScrollView.scrollTo({x: screenWidth});
  };

  buildDataTable = () => {
    const totalWidth = _.sumBy(this.props.cols, function(col) {
      return col.width;
    });

    const pageCount = Math.ceil(
      this.props.totalElements / this.props.maxResultsPerPage,
    );

    console.log('offset = ' + this.state.offset);
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
                  <DataTable.Title style={{width: column.width}}>
                    {column.libelle}
                  </DataTable.Title>
                ))}
              </DataTable.Header>

              {this.props.rows && this.props.rows.length > 0
                ? (this.props.paginate
                    ? _(this.props.rows)
                        .slice(this.state.offset)
                        .take(this.props.maxResultsPerPage)
                        .value()
                    : this.props.rows
                  ).map((row, index) => (
                    <DataTable.Row
                      key={row[this.props.id]}
                      onPress={() => this.props.onItemSelected(row)}>
                      {this.props.cols.map((column, index) => (
                        <DataTable.Cell style={{width: column.width}}>
                          {' '}
                          {row[column.code]}
                        </DataTable.Cell>
                      ))}
                    </DataTable.Row>
                  ))
                : !this.props.showProgress && (
                    <View style={CustomStyleSheet.centerContainer}>
                      <Text>{translate('transverse.noRowFound')}</Text>
                    </View>
                  )}
              {pageCount > 0 &&
                this.props.rows.length > this.props.maxResultsPerPage &&
                this.props.paginate &&
                this.buildPagination(pageCount)}
            </DataTable>
          </ScrollView>
        </ScrollView>
        <FAB
          visible={
            this.props.rows &&
            this.props.rows.length > 0 &&
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
