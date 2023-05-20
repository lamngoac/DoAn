import classNames from 'classnames/bind';
import styles from './ContactEmail.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Loader from '~/components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContactEmailTable } from '~/components/Table';

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

function ContactEmail() {
    const [loading, setLoading] = useState(false);
    const [searchstring, setSearchstring] = useState('');
    const [count, setCount] = useState(0);
    const [ctEmails, setCtEmails] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    useEffect(() => {
        var raw = JSON.stringify({
            Rt_Cols_POW_ContactEmail: '*',
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
        fetch('/DAPContact/WA_POW_ContactEmail_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCtEmails(result.Data.Lst_POW_ContactEmail);
                setCount(result.Data.MySummaryTable.MyCount);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentData = useMemo(() => {
        let computedData = ctEmails;

        return computedData;
    }, [ctEmails]);

    const hadleClickSearch = () => {
        if (searchstring) {
            var raw = JSON.stringify({
                Rt_Cols_POW_ContactEmail: '*',
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
                Ft_WhereClause: `POW_ContactEmail.InformationType like '%${searchstring}%' or POW_ContactEmail.CEName like '%${searchstring}%' or POW_ContactEmail.CEEmail like '%${searchstring}%' or POW_ContactEmail.CEMobileNo like '%${searchstring}%'`,
                Ft_Cols_Upd: '',
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DAPContact/WA_POW_ContactEmail_Get', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setCtEmails(result.Data.Lst_POW_ContactEmail);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setTimeout(() => {
                        setLoading(false);
                    }, 100);
                })
                .catch((error) => console.log('error', error));
        } else {
            var raw1 = JSON.stringify({
                Rt_Cols_POW_ContactEmail: '*',
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

            var requestOptions1 = {
                method: 'POST',
                headers: myHeaders,
                body: raw1,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DAPContact/WA_POW_ContactEmail_Get', requestOptions1)
                .then((response) => response.json())
                .then((result) => {
                    setCtEmails(result.Data.Lst_POW_ContactEmail);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setTimeout(() => {
                        setLoading(false);
                    }, 100);
                })
                .catch((error) => console.log('error', error));
        }

        setSearchstring('');
    };

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>Quản lý Email liên lạc</h1>
                        </section>
                        <section className={cx('function-sec')}></section>
                        <section className={cx('search-sec')}>
                            <div className={cx('amount-row')}>
                                Có tổng: <span className={cx('hl-info')}>{count}</span> bản ghi
                            </div>
                            <div className={cx('search-row')}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm thông tin"
                                    onChange={(e) => setSearchstring(e.target.value)}
                                />
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminContactEmailTable data={currentData} rowsPerPage={6} />
                        </section>
                    </div>
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default ContactEmail;
