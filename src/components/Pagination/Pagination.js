import classNames from 'classnames/bind';
import { usePagination, DOTS } from '~/hooks/usePagination';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination(props) {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={cx('pagination-container', 'pagination-bar')}>
            {/* Left navigation arrow */}
            <li
                className={cx('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <div className={cx('arrow', 'left')} />
            </li>
            {paginationRange.map((pageNumber, index) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li className={cx('pagination-item', 'dots')}>&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li
                        key={index}
                        className={cx('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={cx('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <div className={cx('arrow', 'right')} />
            </li>
        </ul>
    );
}

export default Pagination;
