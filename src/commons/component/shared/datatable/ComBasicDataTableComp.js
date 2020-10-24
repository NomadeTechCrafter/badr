import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {DefaultTheme, IconButton} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';

/** Custom Style **/
import {
  dataTableStyles,
  CustomStyleSheet,
  primaryColor,
} from '../../../styles/ComThemeStyle';

/** i18n **/
import {translate} from '../../../i18n/ComI18nHelper';

/** Loadash */
import _ from 'lodash';

const FIRST_PAGINATION_SEPARATOR = ' / ';
const SECOND_PAGINATION_SEPARATOR = ' - ';

export default class ComBasicDataTableComp extends React.Component {
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

  showValues = (row, code, render) => {
    if (code && code.includes(',')) {
      let result = '';
      let cols = code.split(',');
      cols.forEach((col) => {
        let colVal = col;
        if (col && col.includes(':')) {
          colVal = col.split(':')[1];
          let colLabel = col.split(':')[0];
          result +=
            ' ' + translate(colLabel) + ' : ' + String(_.get(row, colVal));
        } else {
          result += ' ' + String(_.get(row, col));
        }
      });
      return result;
    } else if (code && render) {
      return render(row);
    }
    //return String(_.has(row, code)) === 'true' ? String(_.get(row, code)) : '';
    return String(_.get(row, code) ? _.get(row, code) : '');
  };

  buildCellChildren = (row, column) => {
    return (
      <View
        style={{
          ...dataTableStyles.dataTableItemStyle,
          width: column.width,
        }}>
        <Text>
          {this.showValues(row, column.code) != null
            ? this.showValues(row, column.code, column.render)
            : ''}
        </Text>
      </View>
    );
  };

  buildDataTable = () => {
    const pageCount = Math.ceil(
      this.props.rows.length / this.props.maxResultsPerPage,
    );
    return (
      <View style={styles.width100}>
        <ScrollView
          style={styles.width100}
          ref={(node) => {
            this.horizontalScrollView = node;
          }}
          key="horizontalScrollView"
          horizontal={true}>
          <ScrollView key="verticalScrollView" style={styles.width100}>
            <DataTable style={styles.width100}>
              <DataTable.Header>
                {this.props.hasId && (
                  <DataTable.Title
                    style={styles.datatableTitle}
                    numberOfLines={2}>
                    ID
                  </DataTable.Title>
                )}

                {this.props.cols.map((column, index) => (
                  <DataTable.Title
                    style={{
                      color: primaryColor,
                      width: column.width,
                    }}
                    numberOfLines={2}
                    theme={DefaultTheme}
                    children={
                      <Text style={dataTableStyles.dataTableHeaderStyle}>
                        {column.libelle}
                      </Text>
                    }
                  />
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
                      key={row[this.props?.id]}
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
                          this.buildCellChildren(row, column)
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

const styles = StyleSheet.create({
  datatableCell: {width: 50},
  pagination: {alignSelf: 'flex-start'},
  datatableTitle: {width: 50},
  width100: {width: '100%'},
});
