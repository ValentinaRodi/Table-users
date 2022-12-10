import React, { useEffect, useState } from 'react';
import { Pagination } from "react-bootstrap";
import '../../style/tablePagination.scss';
import usePagination, { DOTS } from "./usePagination";

const TablePagination = ({
   totalCount,
   changeItemsPerPage,
   pageSize,
   onPageChange,
   currentPage,
   siblingsCount = 1
}) => {
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [pageSize]);

  const paginationRange = usePagination({ currentPage, totalCount, siblingsCount, pageSize })

  const handlePrevClick = () => {
    let changedPage = currentPage > 1 ? currentPage - 1 : currentPage
    onPageChange(changedPage);
  }

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  }

  return (
    <div className='custom-table__pagination'>
      <p className='pagination-page'>Страницы</p>
      <Pagination>
        <Pagination.Prev onClick={() => handlePrevClick()} disabled={currentPage === 1}/>
        {paginationRange.map((pageNumber, index) => {
          let current = index + 1;

          if (pageNumber === DOTS) {
            return <Pagination.Item key={index}>&#8230;</Pagination.Item>;
          }

          return <Pagination.Item
            key={index}
            active={currentPage === current}
            onClick={() => onPageChange(current)}
            disabled={(totalCount <= pageSize)}
          >
            {current}
          </Pagination.Item>
        })}
        <Pagination.Next onClick={() => handleNextClick()} disabled={currentPage === totalPages}/>
      </Pagination>
    </div>
  );
};

export default TablePagination;