import _ from 'lodash';
import { default as React } from 'react';
import { View } from 'react-native';
/** REDUX **/
import { connect } from 'react-redux';
import DedRechercheRedressementScreen from '../../redressement/ui/DedRechercheRedressementScreen';



class DedTraiterValeurScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <DedRechercheRedressementScreen navigation={this.props.navigation} from='TRAITER_VALEUR' />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.consulterDumReducer
});

export default connect(mapStateToProps, null)(DedTraiterValeurScreen);

