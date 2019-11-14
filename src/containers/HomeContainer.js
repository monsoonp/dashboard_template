import React from "react";
import Index from "pages/Index";
import { connect } from "react-redux";
// import{bindActionCreators} from 'redux';

import { HomeActions } from "store/actionCreators";

const HomeContainer = ({ input, list, start, end }) => {
  const handleChange = e => {
    // console.log("change: %s", input);
    HomeActions.recordInput(e.target.value);
  };
  const handleInsert = () => {
    // const { input } = props;
    // console.log(list);
    HomeActions.recordInsert(input);
    HomeActions.recordInput("");
  };
  const setStart = value => {
    HomeActions.setStart(value);
  };
  const setEnd = value => {
    HomeActions.setEnd(value);
  };

  // const { list } = props;
  return (
    <Index
      input={handleChange}
      insert={handleInsert}
      list={list}
      text={input}
      start={start}
      end={end}
      setStart={setStart}
      setEnd={setEnd}
    />
  );
};
const mapStateToProps = ({ home }) => {
  // console.log(state.home);
  return {
    input: home.get("input"),
    list: home.get("list"),
    start: home.get("start"),
    end: home.get("end")
  };
};
export default connect(mapStateToProps)(HomeContainer);
