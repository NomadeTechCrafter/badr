import View from ".";
import { connect } from "react-redux";

const mapStateToProps = state => ({...state.controleRechercheDumReducer});

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
