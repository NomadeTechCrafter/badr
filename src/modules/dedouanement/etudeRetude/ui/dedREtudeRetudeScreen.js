
import { default as React } from 'react';
import { View } from 'react-native';

/** REDUX **/
import { connect } from 'react-redux';
import DedRechercheRedressementScreen from '../../redressement/ui/DedRechercheRedressementScreen';



class DedREtudeRetudeScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.state = this.defaultState;
  }

  render() {
    return (
      <View>
        <DedRechercheRedressementScreen navigation={this.props.navigation} from='RETUDE_RETUDE' />
      </View>
    );
  }
}



const mapStateToProps = (state) => ({
  ...state.consulterDumReducer
});

export default connect(mapStateToProps, null)(DedREtudeRetudeScreen);

