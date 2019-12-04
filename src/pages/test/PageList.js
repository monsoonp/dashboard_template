import React, { useEffect } from "react";
import { PaginationItem, PaginationLink } from "reactstrap";

const PageList = ({ page, setPage, scroll }) => {
  useEffect(() => {});
  let result = [];
  /*
  let i = (scroll - 1) * 10 + 1;
  while (i <= scroll * 10) {
    result.push(
      <PaginationItem className={`${i === page && "active"}`} key={i}>
        <PaginationLink onClick={() => setPage(i)}>{i}</PaginationLink>
      </PaginationItem>
    );
    i++;
  }
  return result;
  */
  const paging = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    setPage(i);
  };
  for (let i = (scroll - 1) * 10 + 1; i <= scroll * 10; i++) {
    result.push(
      <PaginationItem className={`${page === i && "active"}`} key={i}>
        <PaginationLink onClick={e => paging(e, i)}>{i}</PaginationLink>
      </PaginationItem>
    );
  }
  return result;
};

export default PageList;
