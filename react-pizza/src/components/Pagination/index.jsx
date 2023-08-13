import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

export default function Pagination({onChangepage}) {
  return (
    <>
        <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event)=>onChangepage(event.selected+1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  )
}