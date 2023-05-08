import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);

function Pagination({ lstitems, itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(lstitems.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(lstitems.length / itemsPerPage));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % lstitems.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    function Items({ currentItems }) {
        if (currentItems === null) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                {currentItems.map((item, index) => (
                    <div key={index}>
                        <span>{index + 1}</span>
                        <span>{item.UserCode}</span>
                        <span>{item.UserName}</span>
                        <span>{item.mctm_CustomerGender}</span>
                        <span>{item.mctm_CustomerMobileNo}</span>
                        <span>{item.mctm_CustomerEmail}</span>
                        <span>{item.FlagSysAdmin}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default Pagination;
