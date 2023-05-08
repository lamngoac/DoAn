import classNames from 'classnames/bind';
import styles from './AdminSidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faFileExcel, faNewspaper, faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressBook,
    faChartSimple,
    faCircleInfo,
    faFilePen,
    faMailReply,
    faToriiGate,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminSidebar() {
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý tài khoản</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faToriiGate} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý tuyến Tour</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý chi tiết Tour</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faChartSimple} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý tin quảng bá</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý tin tức</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faAddressBook} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý liên lạc</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý FAQ</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faMailReply} />
                    </div>
                    <div className={cx('nav-title')}>Quản lý tin Email</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faFileExcel} />
                    </div>
                    <div className={cx('nav-title')}>Báo cáo lượng khách</div>
                </div>
                <div className={cx('nav-item')} onClick={() => navigate('/admin/accounts')}>
                    <div className={cx('nav-icon')}>
                        <FontAwesomeIcon icon={faFilePen} />
                    </div>
                    <div className={cx('nav-title')}>Báo cáo doanh thu</div>
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;
