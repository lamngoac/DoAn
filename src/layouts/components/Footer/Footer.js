import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footer-line')}>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Du lịch trong nước</h3>
                        <ul className={cx('footer-list')}></ul>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Dòng tour</h3>
                        <ul className={cx('footer-list')}></ul>
                    </div>
                    <div className={cx('footer-item', 'wide50')}>
                        <h3 className={cx('footer-title')}>Ứng dụng di động</h3>
                    </div>
                </div>
                <div className={cx('footer-line')}>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Liên hệ</h3>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Thông tin</h3>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Newsletter</h3>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Chứng nhận</h3>
                    </div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                <p>Bản quyền của Vietravel ® 2016. Bảo lưu mọi quyền.</p>
                <p>
                    Ghi rõ nguồn <Link to={'/'}>www.travel.com.vn</Link> ® khi sử dụng lại thông tin từ website này.
                </p>
                <p>Số giấy phép kinh doanh lữ hành Quốc tế: 79-234/2014/TCDL-GP LHQT</p>
            </div>
        </footer>
    );
}

export default Footer;
