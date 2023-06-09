import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Navigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { AdminAccoutTable } from '~/components/Table';
import Loader from '~/components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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

function Accounts() {
    const [searchstring, setSearchstring] = useState('');
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    useEffect(() => {
        var raw = JSON.stringify({
            Rt_Cols_Sys_User: '*',
            Rt_Cols_Sys_UserInGroup: '*',
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
        fetch('/DASysUser/WA_Sys_User_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUsers(result.Data.Lst_Sys_User);
                setCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hadleClickSearch = () => {
        if (searchstring) {
            var raw = JSON.stringify({
                Rt_Cols_Sys_User: '*',
                Rt_Cols_Sys_UserInGroup: '*',
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
                Ft_WhereClause: `Sys_User.UserCode like '%${searchstring}%' or Sys_User.UserName like '%${searchstring}%'`,
                Ft_Cols_Upd: '',
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DASysUser/WA_Sys_User_Get', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setUsers(result.Data.Lst_Sys_User);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                    setSearchstring('');
                })
                .catch((error) => console.log('error', error));
        } else {
            var raw1 = JSON.stringify({
                Rt_Cols_Sys_User: '*',
                Rt_Cols_Sys_UserInGroup: '*',
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
            fetch('/DASysUser/WA_Sys_User_Get', requestOptions1)
                .then((response) => response.json())
                .then((result) => {
                    setUsers(result.Data.Lst_Sys_User);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        }
    };

    const currentData = useMemo(() => {
        let computedData = users;
        return computedData;
    }, [users]);

    // if localsotrage account does not exist or localStorage account is not admin, redirect to home page
    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('header')}>
                            <div className={cx('header-title')}>
                                <h1>Quản lý tài khoản</h1>
                            </div>
                            <div className={cx('header-count')}>
                                Có tổng: &nbsp;
                                <span className={cx('hl-info')}>{count}</span> tài khoản
                            </div>
                        </div>
                        <div className={cx('search-bar')}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm tài khoản"
                                onChange={(e) => setSearchstring(e.target.value)}
                            />
                            <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                            </button>
                        </div>
                        <div className={cx('content')}>
                            <AdminAccoutTable data={currentData} rowsPerPage={6} />
                        </div>
                    </div>
                </div>
            );
        } else {
            <Loader />;
        }
    }
}

export default Accounts;
