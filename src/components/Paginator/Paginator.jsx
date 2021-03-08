import {useSelector} from 'react-redux';
import {useState} from 'react';
import './style.css';

const Paginator = ({totalBooks, changePage,currentPage}) => { 

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <p className="page-link" >
            <span aria-hidden="true">&laquo;</span>
          </p>

        </li>
        <li id="page-item-1" className="page-item active activetwo"  onClick={() => changePage(1,currentPage - 1 < 1 ? 1 : currentPage - 3)}>
          <p className="page-link">{currentPage - 1 < 1 ? 1 : currentPage - 3}</p>
        </li>
        <li id="page-item-2" className="page-item " onClick={() => changePage(2,currentPage -1 < 1 ? 2 : currentPage - 2)}>
          <p className="page-link">{currentPage - 1 < 1 ? 2 : currentPage - 2}</p>
        </li>
        <li id="page-item-3" className="page-item "onClick={() => changePage(3, currentPage - 1 < 1 ? 3 : currentPage - 1)}>
          <p className="page-link" >{currentPage - 1 < 1 ? 3 : currentPage - 1}</p>
        </li>


        <li id="page-item-4" className="page-item " onClick={() => changePage(4, currentPage === 1 ? 4 : currentPage)}>
          <p className="page-link">{currentPage === 1 ? 4 : currentPage}</p>
        </li>


        <li id="page-item-5" className="page-item " onClick={() => changePage(5, currentPage + 1 < 4 ? 5 : currentPage + 1)}>
          <p className="page-link">{currentPage + 1 < 4 ?  5 : currentPage + 1}</p>
        </li>
        <li id="page-item-6" className="page-item" onClick={() => changePage(6, currentPage + 2 < 4 ? 6 : currentPage + 2)}>
        <p className="page-link">{currentPage + 2 < 4 ? 6 : currentPage + 2}</p>
        </li>
        <li id="page-item-7" className="page-item " onClick={() => changePage(7, currentPage + 1 < 4 ? 7 : currentPage + 3)}>
          <p className="page-link">{currentPage + 1 < 4 ? 7 : currentPage + 3}</p>
        </li>

        <li className="page-item" >
          <p className="page-link">
            <span aria-hidden="true">&raquo;</span>
          </p>
        </li>
      </ul>
    </nav>
  );
}
 
export default Paginator;