import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { formatDate } from '~/services/functionService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function AccInfo() {
    const navigate = useNavigate();
    const username = JSON.parse(localStorage.getItem('account')).username;
    const password = JSON.parse(localStorage.getItem('account')).password;

    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [renewpassword, setRenewpassword] = useState('');

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
        WAUserCode: username,
        WAUserPassword: password,
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '123456',
        Ft_WhereClause: `Sys_User.UserCode = '${username}'`,
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        setLoading(true);
        fetch('/DASysUser/WA_Sys_User_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUser(result.Data.Lst_Sys_User[0]);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        UserCode,
        mctm_CustomerCode,
        mctm_CustomerName,
        mctm_CustomerGender,
        mctm_CustomerMobileNo,
        mctm_CustomerAddress,
        mctm_CustomerEmail,
        mctm_CustomerBOD,
        mctm_CustomerIDCardNo,
    } = user;

    const handleChangePassword = () => {
        if (oldpassword === '' || newpassword === '' || renewpassword === '') {
            notify('Vui lòng nhập đủ thông tin mật khẩu', 'warning');
        } else if (oldpassword !== password) {
            notify('Mật khẩu cũ không đúng', 'warning');
        } else if (newpassword !== renewpassword) {
            notify('Mật khẩu mới không khớp', 'warning');
        } else if (oldpassword === newpassword) {
            notify('Mật khẩu mới không được trùng mật khẩu cũ', 'warning');
        } else {
            var raw_change = JSON.stringify({
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
                Sys_User: {
                    UserPassword: oldpassword,
                    UserPasswordNew: newpassword,
                },
            });

            var requestOptions_change = {
                method: 'POST',
                headers: myHeaders,
                body: raw_change,
                redirect: 'follow',
            };

            fetch('/DASysUser/WA_Sys_User_ChangePassword', requestOptions_change)
                .then((response) => response.json())
                .then((result) => {
                    if (result.Success === true) {
                        notify('Đổi mật khẩu thành công', 'success');
                        setTimeout(() => {
                            localStorage.removeItem('account');
                            localStorage.removeItem('bookedTour');
                            localStorage.removeItem('bookedTourDtl');
                            localStorage.removeItem('cart');
                            navigate('/login');
                            window.location.reload();
                        }, 1000);
                    } else {
                        notify('Đổi mật khẩu không thành công', 'error');
                    }
                })
                .catch((error) => console.log('error', error));
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('container')}>
                            <div className={cx('title')}>
                                <div className={cx('title-icon')}>
                                    <FontAwesomeIcon className={cx('title-icon-frame')} icon={faUser} />
                                </div>
                                <div className={cx('title-text')}>Thông tin tài khoản</div>
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Tên đăng nhập:</div>
                                    <div className={cx('item-value')}>{UserCode}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Mã người dùng:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerCode}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Tên người dùng:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerName}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Giới tính:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerGender}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Ngày sinh:</div>
                                    <div className={cx('item-value')}>{formatDate(mctm_CustomerBOD)}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Số CCCD:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerIDCardNo}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Điện thoại:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerMobileNo}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Email:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerEmail}</div>
                                </div>
                                <div className={cx('content-item')}>
                                    <div className={cx('item-label')}>Địa chỉ:</div>
                                    <div className={cx('item-value')}>{mctm_CustomerAddress}</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('password-zone')}>
                            <div className={cx('fix-shown')}>
                                <div className={cx('zone-title')}>Quản lý mật khẩu</div>
                                <button className={cx('btn-open')} onClick={() => setIsShown(!isShown)}>
                                    Mở rộng
                                </button>
                            </div>
                            {isShown ? (
                                <div className={cx('fix-hidden')}>
                                    <div className={cx('pass-frame')}>
                                        <div className={cx('pass-label')}>Mật khẩu cũ:</div>
                                        <input
                                            className={cx('pass-input')}
                                            type="password"
                                            onChange={(e) => setOldpassword(e.target.value)}
                                        />
                                        <div className={cx('new-label')}>
                                            <b>Mật khẩu mới</b>
                                        </div>
                                        <input
                                            className={cx('new-input')}
                                            type="password"
                                            onChange={(e) => setNewpassword(e.target.value)}
                                        />
                                        <div className={cx('new-label')}>
                                            <b>Nhập lại Mật khẩu mới</b>
                                        </div>
                                        <input
                                            className={cx('new-input')}
                                            type="password"
                                            onChange={(e) => setRenewpassword(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className={cx('btn-change-password')}
                                        onClick={() => handleChangePassword()}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </div>
    );
}

export default AccInfo;
