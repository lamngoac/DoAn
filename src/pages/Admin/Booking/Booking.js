import classNames from 'classnames/bind';
import styles from './Booking.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AdminBookingTable } from '~/components/Table';
import Loader from '~/components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Booking() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [searchstring, setSearchstring] = useState('');
    const [bookings, setBookings] = useState([]);
    const [count, setCount] = useState(0);

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
            Ft_RecordCount: '1000',
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
        fetch('/DABook/WA_Book_Tour_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setBookings(result.Data.Lst_Book_Tour);
                setCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    }, []);

    const hadleClickSearch = () => {
        if (searchstring) {
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
                Ft_RecordCount: '1000',
                Ft_WhereClause: `Book_Tour.BookNo like '%${searchstring}%' or Book_Tour.TourCode like '%${searchstring}%' or Book_Tour.IDNo like '%${searchstring}%' or Book_Tour.UserCode like '%${searchstring}%'`,
                Ft_Cols_Upd: '',
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DABook/WA_Book_Tour_Get', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setBookings(result.Data.Lst_Book_Tour);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setSearchstring('');
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        } else {
            var myHeaders_org = new Headers();
            myHeaders_org.append('Content-Type', 'application/json');

            var raw_org = JSON.stringify({
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
                Ft_RecordCount: '1000',
                Ft_WhereClause: '',
                Ft_Cols_Upd: '',
            });

            var requestOptions_org = {
                method: 'POST',
                headers: myHeaders_org,
                body: raw_org,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DABook/WA_Book_Tour_Get', requestOptions_org)
                .then((response) => response.json())
                .then((result) => {
                    setBookings(result.Data.Lst_Book_Tour);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        }
    };

    const currentData = useMemo(() => {
        let computedData = bookings;
        return computedData;
    }, [bookings]);

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>Quản lý đặt Tour</h1>
                        </section>
                        <section className={cx('function-sec')}></section>
                        <section className={cx('search-sec')}>
                            <div className={cx('amount-row')}>
                                Có tổng: <span className={cx('hl-info')}>{count}</span> bản ghi
                            </div>
                            <div className={cx('search-row')}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    onChange={(e) => setSearchstring(e.target.value)}
                                />
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminBookingTable data={currentData} rowsPerPage={5} />
                        </section>
                    </div>
                    <ToastContainer />
                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default Booking;
