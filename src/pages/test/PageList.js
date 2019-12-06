import React, { useEffect } from "react";
import { PaginationItem, PaginationLink } from "reactstrap";

const PageList = ({
  page,
  setPage,
  scroll,
  setScroll,
  scrollLength,
  text,
  selectView
}) => {
  useEffect(() => {
    setPage(1);
    setScroll(1);
  }, [setPage, setScroll, text]);
  let result = [];
  /*
  let i = (scroll - 1) * 10 + 1;
  while ((i - 1) * 10 <= scrollLength) {
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
    if ((i - 1) * selectView <= scrollLength) {
      result.push(
        <PaginationItem className={`${page === i && "active"}`} key={i}>
          <PaginationLink onClick={e => paging(e, i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
  }
  return result;
};

export default PageList;
