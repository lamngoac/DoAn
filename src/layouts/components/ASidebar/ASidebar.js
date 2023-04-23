import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ASidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function ASidebar() {
    // Set default date for datepicker
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const tmrdd = String(today.getDate() + 1).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;
    const tomorrowDate = yyyy + '-' + mm + '-' + tmrdd;

    const [date, setDate] = useState(todayDate);

    const handleDateChange = (e) => {
        setDate(e.target.value);
        //console.log('date', date);
        //console.log('e.target.value', e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar__header')}>Lọc kết quả</div>
                <div className={cx('sidebar__info')}>Du lịch trong nước</div>
                <div className={cx('sidebar__body')}>
                    <div className={cx('sidebar__body__item')}>
                        <h5>LOẠI HÌNH TOUR</h5>
                        <select className={cx('select-box')} id="sllLoaiHinhTour" name="sllLoaiHinhTour">
                            <option value="0">--- Tất cả ---</option>
                        </select>
                    </div>
                    <div className={cx('sidebar__body__item')}>
                        <h5>ĐIỂM ĐI</h5>
                        <select className={cx('select-box')} id="sllDiemDi" name="sllDiemDi">
                            <option value="30">TP. Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div className={cx('sidebar__body__item')}>
                        <h5>ĐIỂM ĐẾN</h5>
                        <select className={cx('select-box')} id="sllDiemDen" name="sllDiemDen">
                            <option value="0">--- Chọn điểm đến ---</option>
                        </select>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>SỐ NGÀY</h5>
                        <button className={cx('btn-option', 'mr16')}>1-3 ngày</button>
                        <button className={cx('btn-option')}>4-7 ngày</button>
                        <button className={cx('btn-option', 'mr16')}>8-14 ngày</button>
                        <button className={cx('btn-option')}>trên 14 ngày</button>
                    </div>
                    <div className={cx('sidebar__body__item')}>
                        <h5>NGÀY KHỞI HÀNH</h5>
                        <p className={cx('datepicker-wrap')}>
                            <FontAwesomeIcon icon={faCalendar} className={cx('fa-icon')} />
                            <input
                                type="date"
                                className={cx('input-pick')}
                                id="datePicker"
                                defaultValue={date}
                                min={tomorrowDate}
                                onChange={(e) => handleDateChange(e)}
                            ></input>
                        </p>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>SỐ NGƯỜI</h5>
                        <button className={cx('btn-option', 'mr16')}>1 người</button>
                        <button className={cx('btn-option')}>2 người</button>
                        <button className={cx('btn-option', 'mr16')}>3-5 người</button>
                        <button className={cx('btn-option')}>5+ người</button>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>DÒNG TOUR</h5>
                        <button className={cx('btn-option', 'mr16')}>Cao cấp</button>
                        <button className={cx('btn-option')}>Tiêu chuẩn</button>
                        <button className={cx('btn-option', 'mr16')}>Tiết kiệm</button>
                        <button className={cx('btn-option')}>Giá tốt</button>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>GIÁ TOUR</h5>
                        <div className={cx('flex-bw')}>
                            <input type="number" className={cx('price')} id="pricefrom" defaultValue={0} />
                            <span className={cx('price-separator')}>&nbsp;-&nbsp;</span>
                            <input type="number" className={cx('price')} id="priceto" defaultValue={100000000} />
                        </div>
                    </div>
                </div>
                <div className={cx('btn-bound')}>
                    <button className={cx('btn-search')} onClick={() => console.log('Hihi')}>
                        Tìm kiếm Tour
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ASidebar;
