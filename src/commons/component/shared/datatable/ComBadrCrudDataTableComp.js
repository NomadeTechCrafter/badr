import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  ComBadrKeyValueComp,
  ComBadrModalComp,
  ComBasicDataTableComp,
} from '../../index';
import {Button, TextInput} from 'react-native-paper';
import {
  createItem,
  synchronize,
  deleteItem,
  showCreateItem,
  updateItem,
  showUpdateItem,
} from '../../../state/actions/ComCrudDataTableAction';
import {Col, Row} from 'react-native-easy-grid';

class ComBadrCrudDataTableComp extends React.Component {
  constructor(props) {
    super(props);
    let actions = [
      {
        code: '',
        icon: 'pencil',
        component: 'button',
        action: (item, index) => this.onShowEditItem(index),
      },
      {
        code: '',
        icon: 'minus',
        color: 'red',
        component: 'button',
        action: (item) => this.onDeleteItem(item),
        width: 100,
      },
    ];

    this.state = {
      cols: actions.concat(props.cols ? props.cols : []),
    };
  }

  onShowNewItem = () => {
    this.showCreateItem();
  };

  onShowEditItem = (index) => {
    this.showUpdateItem(index);
  };

  onNewItem = (item) => {
    this.createItem(item);
  };
  onEditItem = (item) => {
    this.updateItem(item);
  };
  onDeleteItem = (item) => {
    this.deleteItem(item);
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    this.synchronizeItems(this.props.rows, null);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <ComBasicDataTableComp
          hasId={true}
          rows={this.props.items}
          cols={this.state.cols}
          paginate={true}
          maxResultsPerPage={10}
        />
        <Button style={{padding: 10}} onPress={this.onShowNewItem} icon="plus">
          New item
        </Button>

        <ComBadrModalComp
          visible={this.props.newItem || this.props.editItem}
          onDismiss={() =>
            this.props.newItem
              ? this.onNewItem(this.props.selectedItem)
              : this.onEditItem(this.props.selectedItem)
          }>
          {this.props.cols.map((col) => {
            return col?.renderForCreation ? (
              col?.renderForCreation(col, this.props.selectedItem)
            ) : (
              <View style={{padding: 20}}>
                <ComBadrKeyValueComp
                  libelle={col.libelle}
                  libelleSize={2}
                  children={
                    <TextInput
                      style={{margin: 10}}
                      placeholder={col.libelle}
                      value={this.props.selectedItem[col.code]}
                      onChangeText={(text) => {
                        const selected = {...this.props.selectedItem};
                        selected[col.code] = text;
                        this.synchronizeItems(null, selected);
                      }}
                    />
                  }
                />
              </View>
            );
          })}
        </ComBadrModalComp>
      </View>
    );
  }

  createItem = (item) => {
    let action = createItem({
      value: {
        item: item,
      },
    });
    this.props.dispatch(action);
  };
  showCreateItem = () => {
    let action = showCreateItem({
      value: {},
    });
    this.props.dispatch(action);
  };

  updateItem = (item) => {
    let action = updateItem({
      value: {
        item: item,
      },
    });
    this.props.dispatch(action);
  };

  showUpdateItem = (index) => {
    let action = showUpdateItem({
      value: {index: index},
    });
    this.props.dispatch(action);
  };

  deleteItem = (item) => {
    let action = deleteItem({
      value: {
        item: item,
        id: 'id',
      },
    });
    this.props.dispatch(action);
  };

  synchronizeItems = (items, selectedItem) => {
    let action = synchronize({
      value: {items: items, selectedItem: selectedItem},
    });
    this.props.dispatch(action);
  };

  get = () => {
    return this.props.items;
  };
}

mapStateToProps = (state) => {
  return state.crudDatatableReducer;
};

export default connect(mapStateToProps, null)(ComBadrCrudDataTableComp);
