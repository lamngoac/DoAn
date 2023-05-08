import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Navigate } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Dashboard() {
    // if localsotrage account does not exist or localStorage account is not admin, redirect to home page
    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('tour-zone')}>
                        <div className={cx('zone-title')}>Thông tin tuyến Tour</div>
                        <div className={cx('zone-over')}>Tổng tuyến tour đang hoạt động: 65</div>
                        <div className={cx('zone-content')}>
                            <div className={cx('tour-item')}>Số lượng tuyến tour (Cao cấp): 12</div>
                            <div className={cx('tour-item')}>Số lượng tuyến tour (Tiêu chuẩn): 23</div>
                            <div className={cx('tour-item')}>Số lượng tuyến tour (Tiết kiệm): 20</div>
                            <div className={cx('tour-item')}>Số lượng tuyến tour (Giá tốt): 10</div>
                        </div>
                    </div>
                    <div className={cx('tourdtl-zone')}>
                        <div className={cx('zone-title')}>Thông tin chi tiết Tour</div>
                        <div className={cx('zone-over')}>Số lượng tour đang hoạt động: 150</div>
                        <div className={cx('zone-content')}>
                            <div className={cx('tour-item')}>Số lượng tour đã có khách đặt: 122</div>
                            <div className={cx('tour-item')}>Thời gian trung bình tour: 3 ngày</div>
                            <div className={cx('tour-item')}>Giá tour thấp nhất: 1,200,000 đ</div>
                            <div className={cx('tour-item')}>Giá tour cao nhất: 40,500,000 đ</div>
                        </div>
                    </div>
                    <div className={cx('book-zone')}>
                        <div className={cx('zone-title')}>Thông tin đặt tour</div>
                        <div className={cx('zone-over')}>Tổng số lượng đặt tour: 150</div>
                        <div className={cx('zone-content')}>
                            <div className={cx('tour-item')}>Số lượng khách đã đặt tour: 24</div>
                            <div className={cx('tour-item')}>Số lượng khách tham gia tour: 250</div>
                            <div className={cx('tour-item')}>Phần trăm lấp đầy tour: 78%</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
