import React, { useEffect } from "react";
import { DownArrow, UpArrow } from "styled-icons/boxicons-solid";

const TableTitle = ({ sort, sorter }) => {
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

  useEffect(() => {});
  return (
    <tr>
      {list.map((e, i) => (
        <th key={i} scope="col" onClick={() => sorter(`${e}`)}>
          {listName[i]}
          {sort.value === `${e}` &&
            (sort.asc ? (
              <UpArrow size="12" color="#afafaf" />
            ) : (
              <DownArrow size="12" color="#afafaf" />
            ))}
        </th>
      ))}
    </tr>
  );
};

export default TableTitle;
