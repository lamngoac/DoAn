import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    // Function for dropdown menu user
    function onSelect({ key }) {
        switch (key) {
            case '1':
                console.log('Thông tin tài khoản');
                break;
            case '2':
                console.log('Thông tin đặt tour');
                break;
            case '3':
                localStorage.removeItem('account');
                localStorage.removeItem('bookedTour');
                localStorage.removeItem('bookedTourDtl');
                localStorage.removeItem('cart');
                navigate('/');
                window.location.reload();
                break;
            default:
                break;
        }
    }

    function onVisibleChange(visible) {
        console.log(visible);
    }

    const mi_style = {
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '12px',
        cursor: 'pointer',
    };

    const menuCallback = () => (
        <Menu onSelect={onSelect}>
            <MenuItem key="1" style={mi_style}>
                Thông tin tài khoản
            </MenuItem>
            <Divider />
            <MenuItem key="2" style={mi_style}>
                Thông tin đặt tour
            </MenuItem>
            <Divider />
            <MenuItem key="3" style={mi_style}>
                Đăng xuất
            </MenuItem>
        </Menu>
    );
    // Get data from input when click btn search
    const handleSearch = () => {
        const value = document.querySelector('input').value;
        console.log(value);
        document.querySelector('input').value = '';
    };

    if (!localStorage.getItem('account')) {
        return (
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('left-side')}>
                        <div className={cx('logo')}>
                            <Link to={'/'}>
                                <img src={images.logo} alt="logo" />
                            </Link>
                        </div>
                        <div className={cx('social')}>
                            <Link to={'/travel'}>
                                <div className={cx('sc-item')}>Du lịch</div>
                            </Link>
                            <Link to={'/advertise'}>
                                <div className={cx('sc-item')}>Non nước Việt Nam</div>
                            </Link>
                            <Link to={'/about'}>
                                <div className={cx('sc-item')}>Giới thiệu</div>
                            </Link>
                            <Link to={'/news'}>
                                <div className={cx('sc-item')}>Tin tức</div>
                            </Link>
                            <Link to={'/contact'}>
                                <div className={cx('sc-item')}>Liên hệ</div>
                            </Link>
                            <Link to={'/cart'}>
                                <div className={cx('sc-item')}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('right-side')}>
                        <div className={cx('search')}>
                            <input type="text" placeholder="Tìm kiếm" spellCheck={false} />
                            <button className={cx('btn-search')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                        <div className={cx('user', 'al-right')}>
                            <Link to={'/login'}>
                                <button className={cx('btn-login')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    } else {
        const account = JSON.parse(localStorage.getItem('account'));

        return (
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('left-side')}>
                        <div className={cx('logo')}>
                            <Link to={'/'}>
                                <img src={images.logo} alt="logo" />
                            </Link>
                        </div>
                        <div className={cx('social')}>
                            <Link to={'/travel'}>
                                <div className={cx('sc-item')}>Du lịch</div>
                            </Link>
                            <Link to={'/advertise'}>
                                <div className={cx('sc-item')}>Non nước Việt Nam</div>
                            </Link>
                            <Link to={'/about'}>
                                <div className={cx('sc-item')}>Giới thiệu</div>
                            </Link>
                            <Link to={'/news'}>
                                <div className={cx('sc-item')}>Tin tức</div>
                            </Link>
                            <Link to={'/contact'}>
                                <div className={cx('sc-item')}>Liên hệ</div>
                            </Link>
                            <Link to={'/cart'}>
                                <div className={cx('sc-item')}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('right-side')}>
                        <div className={cx('search')}>
                            <input type="text" placeholder="Tìm kiếm" spellCheck={false} />
                            <button className={cx('btn-search')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                        <Dropdown
                            trigger={['click']}
                            overlay={menuCallback}
                            animation="slide-up"
                            onVisibleChange={onVisibleChange}
                        >
                            <div className={cx('user-info')}>
                                <div className={cx('user-tag')}>
                                    <img className={cx('img-acc')} src={images.useracc} alt="info" />
                                </div>
                                <span className={cx('user-name')}>
                                    <b>{account.username}</b>!
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
