import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
        navigate('/register');
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
                        <label>Số điện thoại hoặc Email &nbsp;</label>
                        <span className={cx('danger')}>*</span>
                        <input className={cx('form-control')} type="text" placeholder="Tài khoản" />
                    </div>
                    <div className={cx('login-item')}>
                        <label>Mật khẩu &nbsp;</label>
                        <span className={cx('danger')}>*</span>
                        <input className={cx('form-control')} type="password" placeholder="Mật khẩu" />
                    </div>
                    <div className={cx('br-h48')}></div>
                    <button className={cx('btn-login', 'btn')}>
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
        </div>
    );
}

export default Login;
