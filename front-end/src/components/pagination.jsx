import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';

const Pagination = props => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null
    
    const pages = _.range(1, pageCount + 1);

    return <div>
        <div className='d-flex justify-content-center py-2'>
            <ul className="pagination" style={{ marginBottom: 0 }}>
                { pages.map(page => (
                    <li className={ page === currentPage ? 'page-item active' : 'page-item'} key={ page }>
                        <button className="page-link" onClick={ () => onPageChange(page) }>{ page }</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}
 
export default Pagination;