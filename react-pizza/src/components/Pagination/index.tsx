import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps={
  onChangepage:(page:number) => void
}

const Pagination:React.FC<PaginationProps> = ({onChangepage}) =>{
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
export default Pagination ; 