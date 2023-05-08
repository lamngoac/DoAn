import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdminHeader() {
    const navigate = useNavigate();

    const handleClickLogout = () => {
        localStorage.removeItem('account');
        navigate('/');
    };

    const handleClickDashboard = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('head-title')} onClick={() => handleClickDashboard()}>
                TRANG QUẢN TRỊ HỆ THỐNG
            </div>
            <div className={cx('frame-logout')}>
                <button className={cx('btn-logout')} onClick={() => handleClickLogout()}>
                    <span className={cx('logout-icon')}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                    <span className={cx('logout-title')}>ĐĂNG XUẤT</span>
                </button>
            </div>
        </div>
    );
}

export default AdminHeader;
