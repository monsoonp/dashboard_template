import React, { useEffect, useState } from "react";
import { FormGroup, Input } from "reactstrap"; //Form, Label, CustomInput
const TableSearch = ({ tableList, search, setSearch }) => {
  const list = [
    "id",
    "pageName",
    "visitors",
    "users",
    "bounceRate",
    "checkTime"
  ];
  const listName = [
    "INDEX",
    "PAGE NAME",
    "VISITORS",
    "USERS",
    "BOUNCE RATE",
    "DATE"
  ];
  const [select, setSelect] = useState([]);
  const bindSelect = async () => {
    try {
      const response = await fetch(`/admin/home/selecter`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
      const resJson = await response.json();
      setSelect(resJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (select.length === 0) {
      bindSelect();
    }
  });
  return (
    <tr>
      {list.map((e, i) => (
        <th
          key={i}
          scope="col"
          // onClick={() => sorter(`${e}`)}
        >
          {i === 0 ? (
            <></>
          ) : (
            <FormGroup className="m-0">
              {/*<Label for="exampleEmail">{listName[i]}</Label>*/}
              {i === 1 ? (
                <Input
                  type="select"
                  name="select"
                  id={listName[i]}
                  bsSize="sm"
                  onChange={val =>
                    setSearch({ ...search, [e]: val.target.value })
                  }
                >
                  <option value="">default</option>
                  {select.map((val, i) => (
                    <option key={i}>{val.pageName}</option>
                  ))}
                </Input>
              ) : (
                <Input
                  type={i < 5 ? "number" : "date"}
                  name={`${listName[i]}`}
                  id={e}
                  placeholder={`${listName[i]}`}
                  bsSize="sm"
                  onChange={val =>
                    setSearch({ ...search, [e]: val.target.value })
                  }
                />
              )}
            </FormGroup>
          )}
        </th>
      ))}
    </tr>
  );
};

export default TableSearch;
