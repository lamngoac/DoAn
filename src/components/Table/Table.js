import React, { useState } from 'react';
import useTable from '~/hooks/useTable';
import TableFooter from '../TableFooter/TableFooter';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { formatAccountType } from '~/services/functionService';

const cx = classNames.bind(styles);

function Table({ data, rowsPerPage }) {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={cx('table')}>
                <thead className={cx('tableRowHeader')}>
                    <tr>
                        <th className={cx('tableHeader', 'width5')}>STT</th>
                        <th className={cx('tableHeader', 'width20')}>Tên tài khoản</th>
                        <th className={cx('tableHeader', 'width20')}>Tên người dùng</th>
                        <th className={cx('tableHeader', 'width30')}>Email</th>
                        <th className={cx('tableHeader', 'width15')}>Số điện thoại</th>
                        <th className={cx('tableHeader', 'width10')}>Loại TK</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableRowItems')} key={index}>
                            <td className={cx('tableCell')}>{index + 1}</td>
                            <td className={cx('tableCell')}>{el.UserCode}</td>
                            <td className={cx('tableCell')}>{el.UserName}</td>
                            <td className={cx('tableCell')}>{el.mctm_CustomerEmail}</td>
                            <td className={cx('tableCell')}>{el.mctm_CustomerMobileNo}</td>
                            <td className={cx('tableCell')}>{formatAccountType(el.FlagSysAdmin)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
}

export default Table;
