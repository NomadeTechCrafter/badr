import React from 'react';
import {ComRedressementRechercheRefComp} from '../../../../commons/component';

class DedRechercheRedressementScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <ComRedressementRechercheRefComp navigation={this.props.navigation} />
    );
  }
}

export default DedRechercheRedressementScreen;
