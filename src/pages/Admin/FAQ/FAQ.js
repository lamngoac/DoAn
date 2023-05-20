import classNames from 'classnames/bind';
import styles from './FAQ.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AdminFAQTable } from '~/components/Table';
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

function FAQ() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [searchstring, setSearchstring] = useState('');
    const [faqs, setFaqs] = useState([]);
    const [count, setCount] = useState(0);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    useEffect(() => {
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
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAPFAQ/WA_POW_FAQ_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setFaqs(result.Data.Lst_POW_FAQ);
                setCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hadleClickSearch = () => {
        if (searchstring) {
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
                Ft_WhereClause: `POW_FAQ.FAQNo like '%${searchstring}%' or POW_FAQ.Question like '%${searchstring}%' or POW_FAQ.Answer like '%${searchstring}%'`,
                Ft_Cols_Upd: '',
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DAPFAQ/WA_POW_FAQ_Get', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setFaqs(result.Data.Lst_POW_FAQ);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        } else {
            var raw_org = JSON.stringify({
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
                Ft_WhereClause: `POW_FAQ.FAQNo like '%${searchstring}%' or POW_FAQ.Question like '%${searchstring}%' or POW_FAQ.Answer like '%${searchstring}%'`,
                Ft_Cols_Upd: '',
            });

            var requestOptions_org = {
                method: 'POST',
                headers: myHeaders,
                body: raw_org,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DAPFAQ/WA_POW_FAQ_Get', requestOptions_org)
                .then((response) => response.json())
                .then((result) => {
                    setFaqs(result.Data.Lst_POW_FAQ);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        }

        setSearchstring('');
    };

    const currentData = useMemo(() => {
        let computedData = faqs;
        return computedData;
    }, [faqs]);

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>Quản lý FAQ</h1>
                        </section>
                        <section className={cx('function-sec')}>
                            <button className={cx('btn-add-tour')} onClick={() => navigate('/admin/faq/create')}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                &nbsp; Thêm mới FAQ
                            </button>
                        </section>
                        <section className={cx('search-sec')}>
                            <div className={cx('amount-row')}>
                                Có tổng: <span className={cx('hl-info')}>{count}</span> bản ghi
                            </div>
                            <div className={cx('search-row')}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm FAQ"
                                    onChange={(e) => setSearchstring(e.target.value)}
                                />
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminFAQTable data={currentData} rowsPerPage={6} />
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

export default FAQ;
