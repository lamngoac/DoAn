import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTable from '~/hooks/useTable';
import TableFooter from '../TableFooter/TableFooter';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { formatAccountType } from '~/services/functionService';
import { FormatDateTime, formatDate, formatMoney } from '~/services/functionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import

const cx = classNames.bind(styles);

const AdminAccoutTable = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const handleClickChangeStt = (e) => {
        const myvaue = e.split(',');

        if (myvaue[0] === '1') {
            var raw1 = JSON.stringify({
                ServiceCode: 'WEBAPP',
                Tid: '20181020.143018.986818',
                TokenID: 'TOCKENID.IDOCNET',
                RefreshToken: '',
                UtcOffset: '7',
                GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
                GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
                WAUserCode: 'SYSADMIN',
                WAUserPassword: '123456',
                FlagIsDelete: '0',
                FlagAppr: '0',
                FlagIsEndUser: '0',
                FuncType: null,
                Ft_RecordStart: '0',
                Ft_RecordCount: '123456',
                Ft_WhereClause: '',
                Ft_Cols_Upd: 'Sys_User.FlagActive',
                Sys_User: {
                    UserCode: `${myvaue[1]}`,
                    FlagActive: '0',
                },
            });

            var requestOptions1 = {
                method: 'POST',
                headers: myHeaders,
                body: raw1,
                redirect: 'follow',
            };

            fetch('/DASysUser/WA_Sys_User_Activate', requestOptions1)
                .then((response) => response.json())
                .then((result) => {
                    if (result.Success === true) {
                        window.location.reload();
                    } else {
                        alert('Có lỗi xảy ra, vui lòng thử lại!');
                    }
                })
                .catch((error) => console.log('error', error));
        } else {
            var raw2 = JSON.stringify({
                ServiceCode: 'WEBAPP',
                Tid: '20181020.143018.986818',
                TokenID: 'TOCKENID.IDOCNET',
                RefreshToken: '',
                UtcOffset: '7',
                GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
                GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
                WAUserCode: 'SYSADMIN',
                WAUserPassword: '123456',
                FlagIsDelete: '0',
                FlagAppr: '0',
                FlagIsEndUser: '0',
                FuncType: null,
                Ft_RecordStart: '0',
                Ft_RecordCount: '123456',
                Ft_WhereClause: '',
                Ft_Cols_Upd: 'Sys_User.FlagActive',
                Sys_User: {
                    UserCode: `${myvaue[1]}`,
                    FlagActive: '1',
                },
            });

            var requestOptions2 = {
                method: 'POST',
                headers: myHeaders,
                body: raw2,
                redirect: 'follow',
            };

            fetch('/DASysUser/WA_Sys_User_Activate', requestOptions2)
                .then((response) => response.json())
                .then((result) => {
                    if (result.Success === true) {
                        window.location.reload();
                    } else {
                        alert('Có lỗi xảy ra, vui lòng thử lại!');
                    }
                })
                .catch((error) => console.log('error', error));
        }
    };

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader', 'width5')}>STT</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Tên tài khoản</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Tên người dùng</th>
                        <th className={cx('tableAdminHeader', 'width20')}>Email</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Số điện thoại</th>
                        <th className={cx('tableAdminHeader', 'width10')}>Loại TK</th>
                        <th className={cx('tableAdminHeader', 'width10')}>Trạng thái</th>
                        <th className={cx('tableAdminHeader', 'width10')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.UserCode}</td>
                            <td className={cx('tableAdminCell')}>{el.UserName}</td>
                            <td className={cx('tableAdminCell')}>{el.mctm_CustomerEmail}</td>
                            <td className={cx('tableAdminCell')}>{el.mctm_CustomerMobileNo}</td>
                            <td className={cx('tableAdminCell')}>{formatAccountType(el.FlagSysAdmin)}</td>
                            <td className={cx('tableAdminCell')}>
                                {el.FlagActive === '1' ? (
                                    <div className={cx('active-stt')}>Active</div>
                                ) : (
                                    <div className={cx('inactive-stt')}>Inactive</div>
                                )}
                            </td>
                            <td className={cx('tableAdminCell')}>
                                {el.FlagActive === '1' ? (
                                    <button
                                        className={cx('btn-update-stt')}
                                        value={[el.FlagActive, el.UserCode]}
                                        onClick={(e) => handleClickChangeStt(e.target.value)}
                                    >
                                        Khóa TK
                                    </button>
                                ) : (
                                    <button
                                        className={cx('btn-update-stt')}
                                        value={[el.FlagActive, el.UserCode]}
                                        onClick={(e) => handleClickChangeStt(e.target.value)}
                                    >
                                        Kích hoạt
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

const BookingHistoryTable = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={cx('table')}>
                <thead className={cx('tableRowHeader')}>
                    <tr>
                        <th className={cx('tableHeader')}>STT</th>
                        <th className={cx('tableHeader')}>Mã đặt Tour</th>
                        <th className={cx('tableHeader')}>Mã Tour</th>
                        <th className={cx('tableHeader')}>Tên Tour</th>
                        <th className={cx('tableHeader')}>Ngày khởi hành</th>
                        <th className={cx('tableHeader')}>SL chỗ đặt</th>
                        <th className={cx('tableHeader')}>Tổng tiền</th>
                        <th className={cx('tableHeader')}>Tên người đặt</th>
                        <th className={cx('tableHeader')}>SĐT người đặt</th>
                        <th className={cx('tableHeader')}>Thời gian đặt</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableRowItems')} key={index}>
                            <td className={cx('tableCell')}>{index + 1}</td>
                            <td className={cx('tableCell')}>{el.BookNo}</td>
                            <td className={cx('tableCell')}>{el.IDNo}</td>
                            <td className={cx('tableCell')}>haha</td>
                            <td className={cx('tableCell')}>haha</td>
                            <td className={cx('tableCell')}>{el.Qty}</td>
                            <td className={cx('tableCell')}>haha</td>
                            <td className={cx('tableCell')}>{el.RepName}</td>
                            <td className={cx('tableCell')}>{el.RepMobile}</td>
                            <td className={cx('tableCell', 'align-right')}>{FormatDateTime(el.CreateDTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

const BookingDashboardTable = ({ data, rowsPerPage }) => {
    //const [page, setPage] = useState(1);
    //const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader', 'width15')}>Mã đặt Tour</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Mã Tour</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Ngày khởi hành</th>
                        <th className={cx('tableAdminHeader', 'width10')}>SL chỗ đặt</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Tổng tiền</th>
                        <th className={cx('tableAdminHeader', 'width15')}>Thời gian đặt</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{el.BookNo}</td>
                            <td className={cx('tableAdminCell')}>{el.IDNo}</td>
                            <td className={cx('tableAdminCell')}>{formatDate(el.mtd_DateStart)}</td>
                            <td className={cx('tableAdminCell')}>{el.Qty}</td>
                            <td className={cx('tableAdminCell')}>{el.TotalPrice}</td>
                            <td className={cx('tableAdminCell', 'align-right')}>{FormatDateTime(el.CreateDTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <TableFooter range={range} slice={slice} setPage={setPage} page={page} /> */}
        </>
    );
};

const AdminTourTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Mã tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '240px' }}>
                            Tên tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '80px' }}>
                            Số ngày
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Số khách
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Giá tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Trạng thái
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.TourCode}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.TourName}</td>
                            <td className={cx('tableAdminCell')}>{el.TourDayDuration}</td>
                            <td className={cx('tableAdminCell')}>{el.TourTouristNumber}</td>
                            <td className={cx('tableAdminCell', 'align-right')}>{formatMoney(el.TourPrice, 0)}</td>
                            <td className={cx('tableAdminCell')}>
                                {el.FlagActive === '1' ? (
                                    <div className={cx('active-stt')}>Active</div>
                                ) : (
                                    <div className={cx('inactive-stt')}>Inactive</div>
                                )}
                            </td>
                            <td className={cx('tableAdminCell')}>
                                <div className={cx('tableAdminCellAction')}>
                                    <button
                                        className={cx('btn-update')}
                                        onClick={() => navigate(`/admin/tour/${el.TourCode}`)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

const AdminTourScheduleTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Mã tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '240px' }}>
                            Tên tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '80px' }}>
                            Số ngày
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Số khách
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Giá tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Trạng thái
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.TourCode}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.TourName}</td>
                            <td className={cx('tableAdminCell')}>{el.TourDayDuration}</td>
                            <td className={cx('tableAdminCell')}>{el.TourTouristNumber}</td>
                            <td className={cx('tableAdminCell', 'align-right')}>{formatMoney(el.TourPrice, 0)}</td>
                            <td className={cx('tableAdminCell')}>
                                {el.FlagActive === '1' ? (
                                    <div className={cx('active-stt')}>Active</div>
                                ) : (
                                    <div className={cx('inactive-stt')}>Inactive</div>
                                )}
                            </td>
                            <td className={cx('tableAdminCell')}>
                                <div className={cx('tableAdminCellAction')}>
                                    <button
                                        className={cx('btn-update')}
                                        onClick={() => navigate(`/admin/tourschedule/${el.TourCode}`)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export { BookingHistoryTable, AdminAccoutTable, BookingDashboardTable, AdminTourTable, AdminTourScheduleTable };
