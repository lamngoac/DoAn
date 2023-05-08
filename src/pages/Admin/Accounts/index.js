import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from '~/components/Table';
//import Pagination from '~/components/Pagination';

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
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

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
            Ft_Cols_Upd: "Sys_User.FlagActive = '1'",
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DASysUser/WA_Sys_User_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUsers(result.Data.Lst_Sys_User);
                setCount(result.Data.MySummaryTable.MyCount);
            })
            .catch((error) => console.log('error', error));
    }, []);

    // if localsotrage account does not exist or localStorage account is not admin, redirect to home page
    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (users) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('header')}>
                            <div className={cx('header-title')}>
                                <h1>Quản lý tài khoản</h1>
                            </div>
                            <div className={cx('header-count')}>Có tổng: {count} tài khoản</div>
                        </div>
                        <div className={cx('content')}>
                            <Table data={users} rowsPerPage={5} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div className={cx('wrapper')}>Loading...</div>;
        }
    }
}

export default Accounts;
