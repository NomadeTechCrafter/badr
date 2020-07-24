import React from 'react';
import {Text, View, ScrollView, Dimensions} from 'react-native';
import {IconButton} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';

/** Custom Style **/
import {CustomStyleSheet} from '../../../styles';
import {primaryColor} from '../../../../styles';

/** i18n **/
import {translate} from '../../../i18n';

/** Loadash */
import _ from 'lodash';

const FIRST_PAGINATION_SEPARATOR = ' / ';
const SECOND_PAGINATION_SEPARATOR = ' - ';
const screenWidth = Dimensions.get('window').width;

export default class BadrTable extends React.Component {
  constructor(props) {
    super(props);
    let checkedItems = [];
    this.props.rows.forEach((element) => {
      checkedItems.push({checked: false});
    });
    this.state = {currentPage: 0, offset: 0, checkedItems: checkedItems};
  }

  clearSelection = () => {
    let checkedItems = [];
    this.props.rows.forEach((element) => {
      checkedItems.push({checked: false});
    });
    this.setState({checkedItems: checkedItems});
    console.log('clear selection ...');
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

  reset = () => {
    console.log('reset fired');
    this.setState({offset: 0, currentPage: 0});
  };

  render() {
    return this.buildDataTable();
  }

  buildPagination = (pageCount) => {
    return (
      <DataTable.Pagination
        style={styles.pagination}
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

  componentDidMount = () => {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  };

  scrollMore = () => {
    this._horizontalScrollView.scrollTo({x: screenWidth});
  };

  buildDataTable = () => {
    const pageCount = Math.ceil(
      this.props.totalElements / this.props.maxResultsPerPage,
    );
    return (
      <View>
        <ScrollView
          ref={(node) => {
            this._horizontalScrollView = node;
          }}
          key="horizontalScrollView"
          horizontal={true}>
          <ScrollView key="verticalScrollView">
            <DataTable style={this.props.fullWidth ? {width: screenWidth} : {}}>
              <DataTable.Header>
                {this.props.hasId && (
                  <DataTable.Title style={styles.datatableTitle}>
                    ID
                  </DataTable.Title>
                )}

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
                      onPress={() => {
                        if (this.props.onItemSelected) {
                          this.props.onItemSelected(row);
                        }
                      }}>
                      {this.props.hasId && (
                        <DataTable.Cell style={styles.datatableCell}>
                          {index + 1}
                        </DataTable.Cell>
                      )}

                      {this.props.cols.map((column, colindex) => {
                        return column.component ? (
                          <View style={{width: column.width}}>
                            {column.component === 'checkbox' && (
                              <Checkbox
                                color={primaryColor}
                                status={
                                  this.state.checkedItems &&
                                  this.state.checkedItems.length > 0 &&
                                  this.state.checkedItems[index] &&
                                  this.state.checkedItems[index].checked
                                    ? 'checked'
                                    : 'unchecked'
                                }
                                onPress={() => {
                                  let items = this.state.checkedItems;
                                  items[index] = {
                                    checked: items[index]
                                      ? !items[index].checked
                                      : false,
                                  };
                                  this.setState({checkedItems: items});
                                  row.selected = items[index].checked;
                                  console.log(row.selected);
                                  column.action(row, index);
                                }}
                              />
                            )}

                            {column.component === 'button' &&
                              !row[column.attrCondition] && (
                                <IconButton
                                  icon={column.icon ? column.icon : 'minus'}
                                  color={
                                    column.color ? column.color : primaryColor
                                  }
                                  size={20}
                                  onPress={() => column.action(row, index)}
                                />
                              )}
                          </View>
                        ) : (
                          <DataTable.Cell style={{width: column.width}}>
                            {_.get(row, column.code) != null
                              ? String(_.get(row, column.code))
                              : ''}
                          </DataTable.Cell>
                        );
                      })}
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
      </View>
    );
  };
}

const styles = {
  datatableCell: {width: 50},
  pagination: {alignSelf: 'flex-start'},
  datatableTitle: {width: 50},
};
