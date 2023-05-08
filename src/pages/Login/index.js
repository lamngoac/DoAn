import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [isAdmin, setIsAdmin] = useState('0');

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

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const handleClickRegister = () => {
        // Clear localstorage name account
        // localStorage.removeItem('account');
        navigate('/register');
    };

    const handleClickLogin = () => {
        if (!username || !password) {
            notify('Vui lòng nhập đầy đủ thông tin!', 'warning');
        } else {
            var raw = JSON.stringify({
                ServiceCode: 'WEBAPP',
                Tid: '20181020.143018.986818',
                TokenID: 'TOCKENID.IDOCNET',
                RefreshToken: '',
                UtcOffset: '7',
                GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
                GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
                WAUserCode: username,
                WAUserPassword: password,
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

            fetch('http://localhost:3000/DASysUser/WA_Sys_User_Login', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.Success) {
                        notify('Đăng nhập thành công!', 'success');

                        // Check if user is admin
                        var raw_Check = JSON.stringify({
                            Rt_Cols_Sys_User: '*',
                            Rt_Cols_Sys_UserInGroup: '*',
                            ServiceCode: 'WEBAPP',
                            Tid: '20181020.143018.986818',
                            TokenID: 'TOCKENID.IDOCNET',
                            RefreshToken: '',
                            UtcOffset: '7',
                            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
                            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
                            WAUserCode: username,
                            WAUserPassword: password,
                            FlagIsDelete: '0',
                            FlagAppr: '0',
                            FlagIsEndUser: '0',
                            FuncType: null,
                            Ft_RecordStart: '0',
                            Ft_RecordCount: '123456',
                            Ft_WhereClause: '',
                            Ft_Cols_Upd: '',
                        });

                        var requestOptions_Check = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw_Check,
                            redirect: 'follow',
                        };

                        fetch('http://localhost:3000/DASysUser/WA_Sys_User_GetForCurrentUser', requestOptions_Check)
                            .then((response) => response.json())
                            .then((result) => {
                                // Save account to localStorage after setIsAdmin totally done
                                localStorage.setItem(
                                    'account',
                                    JSON.stringify({
                                        username,
                                        password,
                                        isAdmin: result.Data.Lst_Sys_User[0].FlagSysAdmin,
                                    }),
                                );

                                setTimeout(() => {
                                    if (result.Data.Lst_Sys_User[0].FlagSysAdmin === '1') {
                                        navigate('/admin/dashboard');
                                    } else {
                                        navigate('/');
                                    }
                                }, 2000);
                            })
                            .catch((error) => console.log('error', error));
                    } else {
                        notify('Đăng nhập không thành công!', 'error');
                    }
                })
                .catch((error) => console.log('error', error));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('form-header')}>
                    <h3>Chào mừng Quý khách đến với</h3>
                    <h2>Vietravel</h2>
                </div>
                <div className={cx('form-info')}>
                    <div className={cx('tag')}>ĐĂNG NHẬP</div>
                    <div className={cx('login-item')}>
                        <label>Tên đăng nhập &nbsp;</label>
                        <span className={cx('danger')}>*</span>
                        <input
                            className={cx('form-control')}
                            type="text"
                            placeholder="Tài khoản"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={cx('login-item')}>
                        <label>Mật khẩu &nbsp;</label>
                        <span className={cx('danger')}>*</span>
                        <input
                            className={cx('form-control')}
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('br-h48')}></div>
                    <button className={cx('btn-login', 'btn')} onClick={() => handleClickLogin()}>
                        <FontAwesomeIcon icon={faSignInAlt} className={cx('fa-icon')} />
                        Đăng nhập
                    </button>
                    <div className={cx('spirit')}>Hoặc</div>
                    <button className={cx('btn-register', 'btn')} onClick={() => handleClickRegister()}>
                        <FontAwesomeIcon icon={faRegistered} className={cx('fa-icon')} />
                        Đăng ký
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
