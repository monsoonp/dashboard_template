import React from "react";
import Index from "pages/Index";
import { connect } from "react-redux";
// import{bindActionCreators} from 'redux';

import { HomeActions } from "store/actionCreators";

const HomeContainer = ({ input, list }) => {
  const handleChange = text => {
    console.log(input);
    return HomeActions.recordInput(text);
  };
  const handleInsert = () => {
    // const { input } = props;
    console.log(list);
    return HomeActions.recordInsert(input);
  };

  // const { list } = props;
  return <Index input={handleChange} insert={handleInsert} list={list} />;
};

export default connect(state => ({
  input: state.input,
  list: state.list
}))(HomeContainer);
