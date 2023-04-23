import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    // Get data from input when click btn search
    const handleSearch = () => {
        const value = document.querySelector('input').value;
        console.log(value);
        document.querySelector('input').value = '';
    };

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
}

export default Header;
