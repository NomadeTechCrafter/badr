import React from 'react';
import {View} from 'react-native';

/**Custom Components */
import {ComBasicDataTableComp} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';

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

  onItemSelected = (row) => {};

  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.route.params.first) {
      this.refs._badrTable.reset();
    }
  }

  render() {
    return (
      <View>
        <ComBasicDataTableComp
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
