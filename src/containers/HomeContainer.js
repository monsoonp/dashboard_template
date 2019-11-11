import React from "react";
import Index from "pages/Index";
import { connect } from "react-redux";
// import{bindActionCreators} from 'redux';

import { HomeActions } from "store/actionCreators";

const HomeContainer = ({ input, list }) => {
  const handleChange = e => {
    console.log(input);
    HomeActions.recordInput(e.target.value);
  };
  const handleInsert = () => {
    // const { input } = props;
    console.log(list);
    HomeActions.recordInsert(input);
    HomeActions.recordInput('');

  };

  // const { list } = props;
  return <Index input={handleChange} insert={handleInsert} list={list} />;
};

export default connect(state => ({
  input: state.input,
  list: state.list
}))(HomeContainer);
