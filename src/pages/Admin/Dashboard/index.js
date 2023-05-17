import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { BookingDashboardTable } from '~/components/Table';
import Loader from '~/components/Loader';
//import images from '~/assets/images';

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

        setLoading(true);
        fetch('/DABook/WA_Book_Tour_Get_ForDashBoard', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setBookings(result.Data.Lst_Book_Tour);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    }, []);

    // if localsotrage account does not exist or localStorage account is not admin, redirect to home page
    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('commerical-sec')}>
                            <div className={cx('income')}>
                                <div className={cx('income-content')}>
                                    <div className={cx('income-value')}>100,150,000 đ</div>
                                    <div className={cx('income-icon', 'ii-up')}>
                                        <FontAwesomeIcon className={cx('ii-frame')} icon={faArrowUp} />
                                    </div>
                                </div>
                                <div className={cx('income-title')}>Doanh thu hôm nay</div>
                            </div>
                            <div className={cx('income')}>
                                <div className={cx('income-content')}>
                                    <div className={cx('income-value')}>100,150,000 đ</div>
                                    <div className={cx('income-icon', 'ii-up')}>
                                        <FontAwesomeIcon className={cx('ii-frame')} icon={faArrowUp} />
                                    </div>
                                </div>
                                <div className={cx('income-title')}>Doanh thu tháng này</div>
                            </div>
                            <div className={cx('income')}>
                                <div className={cx('income-content')}>
                                    <div className={cx('income-value')}>- 15,150,000 đ</div>
                                    <div className={cx('income-icon', 'ii-down')}>
                                        <FontAwesomeIcon className={cx('ii-frame')} icon={faArrowDown} />
                                    </div>
                                </div>
                                <div className={cx('income-title')}>Doanh thu so với tháng trước</div>
                            </div>
                        </section>
                        <section className={cx('booking-sec')}>
                            <div className={cx('booking-title')}>Thông tin đặt tour mới nhất</div>
                            <div className={cx('booking-table')}>
                                <BookingDashboardTable data={bookings} />
                            </div>
                        </section>
                        <section className={cx('amount-sec')}>
                            <div className={cx('amount')}>
                                <div className={cx('amount-value')}>Số tuyến tour: 25</div>
                                <div className={cx('amount-value')}>Số tour: 224</div>
                                <div className={cx('amount-title')}>Hiện đang hoạt động</div>
                            </div>
                            <div className={cx('amount')}>
                                <div className={cx('amount-value')}>Số lượt đặt tour: 224</div>
                                <div className={cx('amount-value')}>Số lượt khách hàng: 1025</div>
                                <div className={cx('amount-title')}>Tất cả</div>
                            </div>
                            <div className={cx('amount')}>
                                <div className={cx('amount-value')}>Số lượt đặt tour: 224</div>
                                <div className={cx('amount-value')}>Số lượt khách hàng: 1025</div>
                                <div className={cx('amount-title')}>Tháng này</div>
                            </div>
                        </section>
                    </div>
                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default Dashboard;
