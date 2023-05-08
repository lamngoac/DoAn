import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FormatDateTime, formatDate, formatMoney } from '~/services/functionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Confirm() {
    const param = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [bookedTour, setBookedTour] = useState([]);
    const [bookedTourDtl, setBookedTourDtl] = useState([]);
    const IDNo = JSON.parse(localStorage.getItem('bookedTour')).IDNo;
    const [tour, setTour] = useState([]);

    const { BookNo, TotalPrice, CreateDTime, RepName, RepEmail, RepMobile } = bookedTour;
    const { mt_TourName, DateStart, DateEnd } = tour;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw_book = JSON.stringify({
        Rt_Cols_Book_Tour: '*',
        Rt_Cols_Book_TourDetail: '*',
        ServiceCode: 'WEBAPP',
        Tid: '20181020.143018.986818',
        TokenID: 'TOCKENID.IDOCNET',
        RefreshToken: '',
        UtcOffset: '7',
        GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
        GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
        WAUserCode: 'lamnh',
        WAUserPassword: '123456',
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '123456',
        Ft_WhereClause: "Book_Tour.BookNo = '" + param.slug + "'",
        Ft_Cols_Upd: '',
    });

    var requestOptions_book = {
        method: 'POST',
        headers: myHeaders,
        body: raw_book,
        redirect: 'follow',
    };

    var raw = JSON.stringify({
        Rt_Cols_Mst_TourDetail: '*',
        ServiceCode: 'WEBAPP',
        Tid: '20181020.143018.986818',
        TokenID: 'TOCKENID.IDOCNET',
        RefreshToken: '',
        UtcOffset: '7',
        GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
        GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
        WAUserCode: '',
        WAUserPassword: '',
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '123456',
        Ft_WhereClause: "Mst_TourDetail.IDNo = '" + IDNo + "'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('/DABook/WA_Book_Tour_Get', requestOptions_book)
            .then((response) => response.json())
            .then((result) => {
                setBookedTour(result.Data.Lst_Book_Tour[0]);
                setBookedTourDtl(result.Data.Lst_Book_TourDetail);
            })
            .catch((error) => console.log('error', error));

        fetch('/DAMstTour/WA_Mst_TourDetail_GetForView', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTour(result.Data.Lst_Mst_TourDetail[0]);
            })
            .catch((error) => console.log('error', error));

        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoaded) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>Xác nhận đặt tour</div>
                    <div className={cx('status')}>
                        <span>Trạng thái: </span>
                        <span className={cx('hl-success')}>THÀNH CÔNG</span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-title')}>Thông tin đặt tour</div>
                        <div className={cx('content-info')}>
                            <div className={cx('info-item')}>
                                <span className={cx('info-item-title')}>Mã đặt tour:</span>
                                <span className={cx('info-item-value')}>&nbsp;#{BookNo}</span>
                            </div>
                            <div className={cx('info-item')}>
                                <span className={cx('info-item-title')}>Tên tour:</span>
                                <span className={cx('info-item-value')}>&nbsp;{mt_TourName}</span>
                            </div>
                            <div className={cx('info-item')}>
                                <span className={cx('info-item-title')}>Ngày bắt đầu:</span>
                                <span className={cx('info-item-value')}>&nbsp;{DateStart}</span>
                            </div>
                            <div className={cx('info-item')}>
                                <span className={cx('info-item-title')}>Ngày kết thúc:</span>
                                <span className={cx('info-item-value')}>&nbsp;{DateEnd}</span>
                            </div>
                            <div className={cx('info-item')}>
                                <div className={cx('info-item-title')}>Người đặt tour</div>
                                <div className={cx('booker-item')}>
                                    <div className={cx('booker-item-title')}>Họ và tên: {RepName}</div>
                                    <div className={cx('booker-item-title')}>Email: {RepEmail}</div>
                                    <div className={cx('booker-item-title')}>Số điện thoại: {RepMobile}</div>
                                </div>
                            </div>
                            <div className={cx('info-item')}>
                                <div className={cx('info-item-title')}>Danh sách khách hàng</div>
                                <div className={cx('pass-list')}>
                                    {bookedTourDtl.map((item, index) => {
                                        return (
                                            <div className={cx('pass-item')} key={index}>
                                                <div className={cx('pass-item-title')}>Họ và tên: {item.FullName}</div>
                                                <div className={cx('pass-item-title')}>Giới tính: {item.Gender}</div>
                                                <div className={cx('pass-item-title')}>
                                                    Ngày sinh: {formatDate(item.DateOfBirth)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={cx('info-item')}>
                                <span className={cx('info-item-title')}>Tổng tiền:</span>
                                <span className={cx('info-item-value', 'price')}>
                                    &nbsp;{formatMoney(TotalPrice, 0)} đ
                                </span>
                            </div>
                            <div className={cx('info-item')}>
                                <span className={cx('info-item-title')}>Thời gian đặt:</span>
                                <span className={cx('info-item-value')}>&nbsp;{FormatDateTime(CreateDTime)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('tick-icon')}>
                        <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>Đang tải</div>;
    }
}

export default Confirm;
