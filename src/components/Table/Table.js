import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTable from '~/hooks/useTable';
import TableFooter from '../TableFooter/TableFooter';
import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { formatAccountType } from '~/services/functionService';
import { FormatDateTime, formatDate, formatMoney, compareDateToNow } from '~/services/functionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import

const cx = classNames.bind(styles);

var adminname = '';
var adminpassword = '';

if (localStorage.getItem('account') && JSON.parse(localStorage.getItem('account')).isAdmin === '1') {
    adminname = JSON.parse(localStorage.getItem('account')).username;
    adminpassword = JSON.parse(localStorage.getItem('account')).password;
} else {
    adminname = '';
    adminpassword = '';
}

const notify = (data, ntype = 'default') =>
    toast(data, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: ntype,
    });

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
    // const [page, setPage] = useState(1);
    // const { slice, range } = useTable(data, page, rowsPerPage);

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

const AdminTourDetailsTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const handleDeleteTour = (t1, t2) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Mst_TourDetail: {
                TourCode: t1,
                IDNo: t2,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstTour/WA_Mst_TourDetail_Delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Xóa thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch((error) => console.log('error', error));
    };

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
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Số tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Ngày KH
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Hiệu lực
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Nơi tập trung
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Chỗ còn
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.TourCode}</td>
                            <td className={cx('tableAdminCell')}>{el.IDNo}</td>
                            <td className={cx('tableAdminCell')}>{formatDate(el.DateStart)}</td>
                            <td className={cx('tableAdminCell')}>
                                {compareDateToNow(el.DateStart) ? (
                                    <div className={cx('active-stt')}>Còn hạn</div>
                                ) : (
                                    <div className={cx('inactive-stt')}>Hết hạn</div>
                                )}
                            </td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.GatherAddress}</td>
                            <td className={cx('tableAdminCell')}>
                                {el.TouristNumberLeft} / {el.TouristNumberAll}
                            </td>
                            <td className={cx('tableAdminCell')}>
                                <div className={cx('tableAdminCellAction')}>
                                    <button
                                        className={cx('btn-update')}
                                        onClick={() => {
                                            if (compareDateToNow(el.DateStart)) {
                                                navigate(`/admin/tourdetail/${el.IDNo}`);
                                            } else {
                                                notify('Tour đã hết hạn, không thể chỉnh sửa', 'warning');
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => {
                                            // window confirm: Yes to delete
                                            window.confirm('Bạn có chắc chắn muốn xóa tour này?') &&
                                                handleDeleteTour(el.TourCode, el.IDNo);
                                        }}
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

const AdminArticleTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const handleDeleteTour = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Mst_Article: {
                ArticleNo: id,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstArticle/WA_Mst_Article_Delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Xóa thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('Có lỗi xảy ra, vui lòng thử lại!', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Mã số bv
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Tiêu đề
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Mã tỉnh
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Hiển thị
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Tác giả
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Ngày post
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.ArticleNo}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.ArticleTitle}</td>
                            <td className={cx('tableAdminCell')}>{el.ProvinceCode}</td>
                            <td className={cx('tableAdminCell')}>
                                {el.FlagShow === '1' ? (
                                    <div className={cx('active-stt')}>Có</div>
                                ) : (
                                    <div className={cx('inactive-stt')}>Không</div>
                                )}
                            </td>
                            <td className={cx('tableAdminCell')}>{el.Author}</td>
                            <td className={cx('tableAdminCell')}>{formatDate(el.PostDTime)}</td>
                            <td className={cx('tableAdminCell')}>
                                <div className={cx('tableAdminCellAction')}>
                                    <button
                                        className={cx('btn-update')}
                                        onClick={() => {
                                            navigate(`/admin/article/${el.ArticleNo}`);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => {
                                            window.confirm('Bạn có chắc chắn muốn xóa bài viết này?') &&
                                                handleDeleteTour(el.ArticleNo);
                                        }}
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

const AdminFAQTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const handleDeleteFAQ = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_POW_FAQ: '*',
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '123456',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            POW_FAQ: {
                FAQNo: id,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPFAQ/WA_POW_FAQ_Delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Xóa FAQ thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('Có lỗi xảy ra, vui lòng thử lại!', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Mã FAQ
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '250px' }}>
                            Câu hỏi
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '260px' }}>
                            Câu trả lời
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Trạng thái
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.FAQNo}</td>
                            <td className={cx('tableAdminCell', 'text-overflow', 'align-left')}>{el.Question}</td>
                            <td className={cx('tableAdminCell', 'text-overflow', 'align-left')}>{el.Answer}</td>
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
                                        onClick={() => {
                                            navigate(`/admin/faq/${el.FAQNo}`);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => {
                                            window.confirm('Bạn có chắc chắn muốn xóa bài viết này?') &&
                                                handleDeleteFAQ(el.FAQNo);
                                        }}
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

const AdminContactEmailTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const handleDeleteTour = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            POW_ContactEmail: {
                CENo: id,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPContact/WA_POW_ContactEmail_Delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Xóa thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('Có lỗi xảy ra, vui lòng thử lại!', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Loại
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Tên KH
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Email
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            SĐT KH
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Tiêu đề
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            Ngày gửi
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.InformationType}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.CEName}</td>
                            <td className={cx('tableAdminCell')}>{el.CEEmail}</td>
                            <td className={cx('tableAdminCell')}>{el.CEMobileNo}</td>
                            <td className={cx('tableAdminCell')}>{el.CETitle}</td>
                            <td className={cx('tableAdminCell')}>{FormatDateTime(el.CreateDTime)}</td>
                            <td className={cx('tableAdminCell')}>
                                <div className={cx('tableAdminCellAction')}>
                                    <button
                                        className={cx('btn-update')}
                                        onClick={() => {
                                            navigate(`/admin/contactemail/${el.CENo}`);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => {
                                            window.confirm('Bạn có chắc chắn muốn xóa thông tin này?') &&
                                                handleDeleteTour(el.CENo);
                                        }}
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

const AdminNewsTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const handleDeleteTour = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            POW_NewsNews: {
                NewsNo: id,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPNewsNews/WA_POW_NewsNews_Delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Xóa thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('Có lỗi xảy ra, vui lòng thử lại!', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Mã tin
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '220px' }}>
                            Tiêu đề
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Loại
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '140px' }}>
                            Ngày đăng
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Trạng thái
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.NewsNo}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.Title}</td>
                            <td className={cx('tableAdminCell')}>{el.NewsType}</td>
                            <td className={cx('tableAdminCell')}>{formatDate(el.PostDTime)}</td>
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
                                        onClick={() => {
                                            navigate(`/admin/news/${el.NewsNo}`);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => {
                                            window.confirm('Bạn có chắc chắn muốn xóa bài viết này?') &&
                                                handleDeleteTour(el.NewsNo);
                                        }}
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

const AdminReportRevenueTable = ({ data, rowsPerPage }) => {
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
                            Mã tuyến Tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '200px' }}>
                            Tên tuyến Tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '100px' }}>
                            SL Tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            SL lượt đặt
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            SL khách đặt
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Đơn giá
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Tổng tiền
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.TourCode}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.TourName}</td>
                            <td className={cx('tableAdminCell')}>{el.TourDetailQty}</td>
                            <td className={cx('tableAdminCell')}>{el.BookingQty}</td>
                            <td className={cx('tableAdminCell')}>{el.BookingTouristQty}</td>
                            <td className={cx('tableAdminCell')}>{formatMoney(el.TourPrice, 0)}</td>
                            <td className={cx('tableAdminCell')}>{formatMoney(el.BookingPrice, 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

const AdminReportTouristTable = ({ data, rowsPerPage }) => {
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
                            Mã tuyến Tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Mã Tour
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Ngày đi
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            Ngày về
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            SL khách nhận
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            SL lượt đặt
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            SL khách đặt
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.TourCode}</td>
                            <td className={cx('tableAdminCell')}>{el.IDNo}</td>
                            <td className={cx('tableAdminCell')}>{formatDate(el.DateStart)}</td>
                            <td className={cx('tableAdminCell')}>{formatDate(el.DateEnd)}</td>
                            <td className={cx('tableAdminCell')}>{el.TourTouristNumber}</td>
                            <td className={cx('tableAdminCell')}>{el.BookingCount}</td>
                            <td className={cx('tableAdminCell')}>{el.BookingTouristQty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

const AdminTourGuideTable = ({ data, rowsPerPage }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const handleDeleteTour = (id) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Mst_TourGuide: {
                TGCode: id,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstTourGuide/WA_Mst_TourGuide_Delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Xóa thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('Có lỗi xảy ra, vui lòng thử lại!', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <table className={cx('tableAdmin')}>
                <thead className={cx('tableAdminRowHeader')}>
                    <tr>
                        <th className={cx('tableAdminHeader')} style={{ width: '55px' }}>
                            STT
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            Mã HDV
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Tên
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            CCCD
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '150px' }}>
                            Địa chỉ
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '130px' }}>
                            TGMobileNo
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '110px' }}>
                            Trạng thái
                        </th>
                        <th className={cx('tableAdminHeader')} style={{ width: '120px' }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el, index) => (
                        <tr className={cx('tableAdminRowItems')} key={index}>
                            <td className={cx('tableAdminCell')}>{(page - 1) * rowsPerPage + index + 1}</td>
                            <td className={cx('tableAdminCell')}>{el.TGCode}</td>
                            <td className={cx('tableAdminCell')}>{el.TGName}</td>
                            <td className={cx('tableAdminCell')}>{el.TGIDCardNo}</td>
                            <td className={cx('tableAdminCell', 'text-overflow')}>{el.TGAgentAddress}</td>
                            <td className={cx('tableAdminCell')}>{el.TGMobileNo}</td>
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
                                        onClick={() => {
                                            navigate(`/admin/tourguide/${el.TGCode}`);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => {
                                            window.confirm('Bạn có chắc chắn muốn xóa HDV này?') &&
                                                handleDeleteTour(el.TGCode);
                                        }}
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

export {
    BookingHistoryTable,
    BookingDashboardTable,
    AdminAccoutTable,
    AdminTourTable,
    AdminTourScheduleTable,
    AdminTourDetailsTable,
    AdminArticleTable,
    AdminFAQTable,
    AdminContactEmailTable,
    AdminNewsTable,
    AdminReportRevenueTable,
    AdminReportTouristTable,
    AdminTourGuideTable,
};
