import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';

export default class PlaquesImmatriculationResult extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}


  render() {
    return (
      <ScrollView>
        <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="descending">Dessert</DataTable.Title>
          <DataTable.Title sortDirection="descending" numeric>Calories</DataTable.Title>
          <DataTable.Title sortDirection="descending" numeric>Fat</DataTable.Title>
        </DataTable.Header>
 
        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => { console.log(page); }}
          label="1-2 of 6"
        />
      </DataTable>
      </ScrollView>
    );
  }
}
