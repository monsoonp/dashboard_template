import React, { useEffect } from "react";
// import Index from "pages/Index";
import Home from "pages/Home";
import { connect, useDispatch } from "react-redux";
// import{bindActionCreators} from 'redux';

import { HomeActions, FetchActions } from "store/actionCreators";

const HomeContainer = ({ input, list, start, end, fetch_list }) => {
  const { fetchRequest, fetchSuccess, fetchError } = FetchActions;
  const dispatch = useDispatch();
  const bindFetch = async () => {
    const URL = "/admin/home/list";
    return await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(res => res.json());
    /*
      .then(resjs => {
        // setTest_list(resjs);
      })
      .catch(err => {
        console.log(err);
        // setTest_list(test_data);
      });
      */
  };
  const callFetch = () => {
    return dispatch => {
      dispatch(fetchRequest());
      bindFetch()
        .then(resjs => {
          dispatch(fetchSuccess(resjs));
        })
        .catch(err => {
          console.log(err);
          dispatch(fetchError());
        });
      /*
      .then(([response, json]) => {
        if (response.status === 200) {
          dispatch(fetchSuccess(json));
        } else {
          dispatch(fetchError());
        }
      });
      */
    };
  };

  const handleChange = e => {
    // console.log("change: %s", input);
    HomeActions.recordInput(e.target.value);
    // HomeActions.testInput(e.target.value); // 비동기
  };
  const handleInsert = () => {
    // const { input } = props;
    // console.log(list);
    HomeActions.recordInsert(input);
    HomeActions.recordInput("");
  };
  const handleUpdate = id => {
    HomeActions.recordUpdate(id);
  };
  const handleDelete = id => {
    HomeActions.recordDelete(id);
  };

  const setStart = value => {
    HomeActions.setStart(value);
  };
  const setEnd = value => {
    HomeActions.setEnd(value);
  };

  useEffect(() => {
    dispatch(callFetch());
  });
  // const { list } = props;
  return (
    <Home
      input={handleChange}
      insert={handleInsert}
      list={list}
      text={input}
      start={start}
      end={end}
      setStart={setStart}
      setEnd={setEnd}
      update={handleUpdate}
      remove={handleDelete}
      data={fetch_list}
    />
  );
};
const mapStateToProps = ({ home }) => {
  // console.log(state.home);
  return {
    input: home.get("input"),
    list: home.get("list"),
    start: home.get("start"),
    end: home.get("end"),
    fetch_list: home.get("fetch_list")
  };
};
export default connect(mapStateToProps)(HomeContainer);
