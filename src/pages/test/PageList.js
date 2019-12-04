/* eslint-disable no-loop-func */
import React from "react";
import { PaginationItem, PaginationLink } from "reactstrap";

const PageList = ({ page, setPage, scroll, setScroll }) => {
  let result = [];
  for (var i = (scroll - 1) * 10 + 1; i <= scroll * 10; i++) {
    result.push(
      <PaginationItem className={`${i === page && "active"}`} key={i}>
        <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
      </PaginationItem>
    );
    return result;
  }
};

export default PageList;
