import React from 'react';
import {Text, View} from 'react-native';

/**Custom Components */
import {BadrTable} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsControleVehicules from '../../../common/constants/referentiel/controleVehicules';
import * as controleVehiculesAction from '../../../redux/actions/referentiel/controleVehicules';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

class ControleVehiculesResult extends React.Component {
  constructor(props) {
    super(props);

    this.cols = [
      {code: 'numeroChassis', libelle: 'Numero chassis', width: 250},
      {code: 'numeroCarteGrise', libelle: 'Numero carte grise', width: 200},
      {code: 'matricule', libelle: 'Matricule', width: 200},
      {code: 'message', libelle: 'Message', width: 200},
      {code: 'status', libelle: 'Statut', width: 200},
    ];
  }

  onItemSelected = row => {
    console.log(row);
  };

  componentDidMount() {
    console.log('init...');
  }

  componentDidUpdate() {
    if (this.props.route.params.first) {
      this.refs._badrTable.reset();
    }
  }

  render() {
    console.log(this.props.data.length);
    return (
      <View>
        <BadrTable
          ref="_badrTable"
          id="numeroChassis"
          rows={this.props.data}
          cols={this.cols}
          onItemSelected={this.onItemSelected}
          totalElements={this.props.data.length}
          maxResultsPerPage={5}
          paginate={true}
          showProgress={this.props.showProgress}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.controleVehiculesReducer};
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
)(ControleVehiculesResult);
