import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import utf8 from 'utf8';

/**Custom Components */
import {NumeroPlaque} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
class PlaquesImmatriculationResult extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let rows = [];
    let mItem = null;
    if (this.props.value && this.props.value.resultBean) {
      rows = this.props.value.resultBean.rows;
      rows.map(item => {
        mItem = item.vehiculeNumImmatComplet;
      });
    }

    console.log(utf8);
    return (
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="ascending">
              N° de chassis
            </DataTable.Title>
            <DataTable.Title sortDirection="descending">
              Propriétaire
            </DataTable.Title>
            <DataTable.Title sortDirection="descending">
              N° d'immatriculation normale
            </DataTable.Title>
          </DataTable.Header>

          {rows.map(item => (
            <DataTable.Row key={item.identifiantDMD}>
              <DataTable.Cell>{item.vehiculeNumChassis}</DataTable.Cell>
              <DataTable.Cell>
                {item.proprietaireNom} {item.proprietaireNom} {'('}{' '}
                {item.proprietaireNumeroIdentifiant} {')'}
              </DataTable.Cell>
              <DataTable.Cell
                children={
                  <NumeroPlaque numero={item.vehiculeNumImmatComplet} />
                }
              />
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
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
