import classNames from 'classnames/bind';
import styles from './RptTourist.module.scss';
import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Loader from '~/components/Loader';
import { AdminReportTouristTable } from '~/components/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from '~/services/functionService';

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

function RptTourist() {
    const [loading, setLoading] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [report, setReport] = useState([]);

    const hadleClickSearch = () => {
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
            Ft_RecordCount: '123456',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            DateFrom: `${dateFrom} 00:00:00`,
            DateTo: `${dateTo} 23:59:59`,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/Report/WA_Rpt_TourTourist', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setReport(result.Data.Lst_Rpt_TourTourist);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    };

    const currentData = useMemo(() => {
        let computedData = report;

        return computedData;
    }, [report]);

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>BÁO CÁO LƯỢNG KHÁCH</h1>
                        </section>
                        <div className={cx('divider')}></div>
                        <h3>
                            Tìm kiếm theo ngày: {dateFrom && formatDate(dateFrom)} - {dateTo && formatDate(dateTo)}
                        </h3>
                        <section className={cx('search-sec')}>
                            <div className={cx('search-row')}>
                                <div>Từ ngày (tháng/ngày/năm)</div>
                                <input type="date" onChange={(e) => setDateFrom(e.target.value)} />
                            </div>
                            <div className={cx('search-row')}>
                                <div>Đến ngày (tháng/ngày/năm)</div>
                                <input type="date" onChange={(e) => setDateTo(e.target.value)} />
                            </div>
                            <div className={cx('search-row')}>
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminReportTouristTable data={currentData} rowsPerPage={5} />
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

export default RptTourist;
