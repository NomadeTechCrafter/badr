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
import ComBadrButtonIconComp from '../buttons/ComBadrButtonIconComp';

const FIRST_PAGINATION_SEPARATOR = ' / ';
const SECOND_PAGINATION_SEPARATOR = ' - ';

export default class ComBasicDataTableComp extends React.Component {
  constructor(props) {
    super(props);
    let checkedItems = [];
    if (this.props.rows) {
      this.props.rows.forEach((element) => {
        checkedItems.push({checked: element?.isRowSelected});
      });
    }
    this.state = {currentPage: 0, offset: 0, checkedItems: checkedItems};
  }

  clearSelection = () => {
    let checkedItems = [];
    if (this.props.rows) {
      this.props.rows.forEach((element) => {
        checkedItems.push({checked: false});
      });
    }
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

  static getDerivedStateFromProps(nextProps, prevState) {
    let checkedItems = [];
    if (nextProps.rows) {
      nextProps.rows.forEach((element) => {
        checkedItems.push({checked: element?.isRowSelected});
      });
      if (
        !_.isEmpty(checkedItems) &&
        _.findIndex(checkedItems, 'checked') > -1 &&
        prevState.checkedItems !== checkedItems
      ) {
        return {
          checkedItems: checkedItems,
        };
      }
    }
    return null;
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

  showValues = (row, code, value, render) => {
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
    } else if (value) {
      return String(value);
    }
    return String(_.has(row, code)) === 'true' ? String(_.get(row, code)) : '';
    // return String(_.get(row, code) ? _.get(row, code) : '');
  };

  buildCellChildren = (row, column, index) => {
    return (
      <View
        style={{
          ...dataTableStyles.dataTableItemStyle,
          width: column.width,
        }}
        key={index}>
        <Text>
          {this.showValues(row, column.code, column.value) != null
            ? this.showValues(row, column.code, column.value, column.render)
            : ''}
        </Text>
      </View>
    );
  };

  buildDataTable = () => {
    const pageCount = Math.ceil(
      this.props.rows?.length / this.props.maxResultsPerPage,
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
            <DataTable style={(styles.width100, {marginBottom: 20})}>
              <DataTable.Header
                style={{backgroundColor: this.props.badr ? '#ecf0f1' : null}}>
                {this.props.hasId && (
                  <DataTable.Title
                    style={styles.datatableTitle}
                    numberOfLines={2}>
                    {this.props.libelleIdCol ? this.props.libelleIdCol : 'ID'}
                  </DataTable.Title>
                )}

                {this.props.cols.map((column, index) => (
                  <DataTable.Title
                    key={index}
                    style={{
                      color: primaryColor,
                      width: column.width,
                    }}
                    numberOfLines={2}
                    theme={DefaultTheme}
                    children={
                      <Text
                        style={
                          this.props.badr
                            ? dataTableStyles.dataTableHeaderStyle2
                            : dataTableStyles.dataTableHeaderStyle
                        }>
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
                      key={index}
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
                          <View style={{width: column.width}} key={colindex}>
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
                                disabled={
                                  this.props.readonly
                                    ? this.props.readonly
                                    : false
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
                            {column.component === 'radio' && (
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
                                disabled={
                                  this.props.readonly
                                    ? this.props.readonly
                                    : false
                                }
                                onPress={() => {
                                  let items = this.state.checkedItems;
                                  items.forEach((item) => {
                                    item.checked = false;
                                  });
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
                                  size={column.size ? column.size : 20}
                                  onPress={() => column.action(row, index)}
                                />
                              )}

                            {column.component === 'basic-button' &&
                              row[column.attrCondition] && (
                                <ComBadrButtonIconComp
                                  style={styles.width90}
                                  text={
                                    column.text ? column.text : row[column.code]
                                  }
                                  onPress={() => column.action(row, index)}
                                />
                              )}
                          </View>
                        ) : (
                          this.buildCellChildren(row, column, colindex)
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
                this.props.rows?.length > this.props.maxResultsPerPage &&
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
  width90: {width: '90%'},
});
