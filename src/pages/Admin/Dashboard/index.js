import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { BookingDashboardTable } from '~/components/Table';
import Loader from '~/components/Loader';
import { caculateFLDateMonth, formatMoney } from '~/services/functionService';

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

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [reports, setReports] = useState([]);

    const neededDate = caculateFLDateMonth();

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_Book_Tour: '*',
            Rt_Cols_Book_TourDetail: '*',
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
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        var raw_rp = JSON.stringify({
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
            strMonthFrom: `${neededDate.firstDateOfMonth} 00:00:00`,
            strMonthTo: `${neededDate.lastDateOfMonth} 23:59:59`,
            strDayFrom: `${neededDate.firstMomentOfDay} 00:00:00`,
            strDayTo: `${neededDate.lastMomentOfDay} 23:59:59`,
        });

        var requestOptions_rp = {
            method: 'POST',
            headers: myHeaders,
            body: raw_rp,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/Report/WA_Rpt_Over_Dashboard', requestOptions_rp)
            .then((response) => response.json())
            .then((result) => {
                setReports(result.Data.Lst_Rpt_Over_Dashboard[0]);
                if (result.Success === true) {
                    fetch('/DABook/WA_Book_Tour_Get_ForDashBoard', requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            setBookings(result.Data.Lst_Book_Tour);
                            setLoading(false);
                        })
                        .catch((error) => console.log('error', error));
                }
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentData = useMemo(() => {
        let computedData = bookings;

        return computedData;
    }, [bookings]);

    // if localsotrage account does not exist or localStorage account is not admin, redirect to home page
    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('commerical-sec')}>
                            <div className={cx('income')}>
                                <div className={cx('income-content')}>
                                    <div className={cx('income-value')}>{formatMoney(reports.DayIncome, 0)} đ</div>
                                    <div className={cx('income-icon', 'ii-up')}>
                                        <FontAwesomeIcon className={cx('ii-frame')} icon={faArrowUp} />
                                    </div>
                                </div>
                                <div className={cx('income-title')}>Doanh thu hôm nay</div>
                            </div>
                            <div className={cx('income')}>
                                <div className={cx('income-content')}>
                                    <div className={cx('income-value')}>{formatMoney(reports.MonthIncome, 0)} đ</div>
                                    <div className={cx('income-icon', 'ii-up')}>
                                        <FontAwesomeIcon className={cx('ii-frame')} icon={faArrowUp} />
                                    </div>
                                </div>
                                <div className={cx('income-title')}>Doanh thu tháng này</div>
                            </div>
                            {/* <div className={cx('income')}>
                                <div className={cx('income-content')}>
                                    <div className={cx('income-value')}>- 15,150,000 đ</div>
                                    <div className={cx('income-icon', 'ii-down')}>
                                        <FontAwesomeIcon className={cx('ii-frame')} icon={faArrowDown} />
                                    </div>
                                </div>
                                <div className={cx('income-title')}>Doanh thu so với tháng trước</div>
                            </div> */}
                        </section>
                        <section className={cx('booking-sec')}>
                            <div className={cx('booking-title')}>Thông tin đặt tour mới nhất</div>
                            <div className={cx('booking-table')}>
                                <BookingDashboardTable data={currentData} rowsPerPage={5} />
                            </div>
                        </section>
                        <section className={cx('amount-sec')}>
                            <div className={cx('amount')}>
                                <div className={cx('amount-value')}>Số tuyến tour: {reports.ActiveTourCount}</div>
                                <div className={cx('amount-value')}>Số tour: {reports.ActiveTourDetailCount}</div>
                                <div className={cx('amount-title')}>Hiện đang hoạt động</div>
                            </div>
                            <div className={cx('amount')}>
                                <div className={cx('amount-value')}>Số lượt đặt tour: {reports.BookingCountAll}</div>
                                <div className={cx('amount-value')}>
                                    Số lượt khách hàng: {reports.BookingTouristCountAll}
                                </div>
                                <div className={cx('amount-title')}>Tất cả</div>
                            </div>
                            <div className={cx('amount')}>
                                <div className={cx('amount-value')}>Số lượt đặt tour: {reports.BookingCountMonth}</div>
                                <div className={cx('amount-value')}>
                                    Số lượt khách hàng: {reports.BookingTouristCountMonth}
                                </div>
                                <div className={cx('amount-title')}>Tháng này</div>
                            </div>
                        </section>
                    </div>
                </div>
            );
        }
    }
}

export default Dashboard;
