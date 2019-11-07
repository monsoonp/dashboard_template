import React from "react";
import * as Home from "pages/Index";
import { connect } from "react-redux";
// import{bindActionCreators} from 'redux';

import { HomeActions } from "store/actionCreators";

const HomeContainer = props => {
  const handleChange = input => {
    return HomeActions.recordInput(input);
  };
  const handleInsert = () => {
    const { input } = props;
    return HomeActions.recordInsert(input);
  };

  return (
    <Home input={handleChange} insert={handleInsert} list={props.test_list} />
  );
};

export default connect(state => ({
  input: state.input
}))(HomeContainer);
