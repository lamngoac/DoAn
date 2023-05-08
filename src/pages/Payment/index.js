import classNames from 'classnames/bind';
import styles from './index.module.scss';
import images from '~/assets/images';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatMoney } from '~/services/functionService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Payment() {
    const navigate = useNavigate();

    const [imgsLoaded, setImgsLoaded] = useState(false);
    const [tourDtl, setTourDtl] = useState([]);
    const passengers = JSON.parse(localStorage.getItem('bookedTourDtl'));
    const bookif = JSON.parse(localStorage.getItem('bookedTour'));
    const tourid = JSON.parse(localStorage.getItem('bookedTour')).IDNo;
    const username = JSON.parse(localStorage.getItem('account')).username;
    const password = JSON.parse(localStorage.getItem('account')).password;

    const { mt_TourName, DateStart, DateEnd, mt_TourThemePath, mt_TourPrice } = tourDtl;

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

    // Function handle radio input change
    const handleRadioChange = (e) => {
        // if Momo is selected, vnpay is not
        if (e.target.value === 'momo') {
            document.getElementById('vnpay').checked = false;
        }
        // if vnpay is selected, momo is not
        if (e.target.value === 'vnpay') {
            document.getElementById('momo').checked = false;
        }
    };

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

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
        Ft_WhereClause: "Mst_TourDetail.IDNo = '" + tourid + "'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('/DAMstTour/WA_Mst_TourDetail_GetForView', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourDtl(result.Data.Lst_Mst_TourDetail[0]);
                setImgsLoaded(true);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePayment = () => {
        var raw_book = JSON.stringify({
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
            Book_Tour: bookif,
            Lst_Book_TourDetail: passengers,
        });

        var requestOptions_book = {
            method: 'POST',
            headers: myHeaders,
            body: raw_book,
            redirect: 'follow',
        };

        fetch('/DABook/WA_Book_Tour_Create', requestOptions_book)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Đặt tour thành công!', 'success');
                    setTimeout(() => {
                        navigate('/confirm/' + bookif.BookNo);
                    }, 500);
                } else {
                    notify('Đặt tour không thành công!', 'error');
                    setTimeout(() => {
                        navigate(-1);
                    }, 500);
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('headline')}>
                <span className={cx('hmain')}>1. Nhập thông tin</span>
                <FontAwesomeIcon className={cx('hicon')} icon={faChevronRight} />
                <span className={cx('hsub')}>2. Thanh toán</span>
            </div>
            <div className={cx('content')}>
                <section className={cx('book')}>
                    <div className={cx('tour-frame')}>
                        {imgsLoaded ? (
                            <div className={cx('tour')}>
                                <div className={cx('tour-img')}>
                                    <img
                                        className={cx('tour-img')}
                                        src={require(`../../${mt_TourThemePath}`)}
                                        alt="tourimage"
                                    />
                                </div>
                                <div className={cx('tour-info')}>
                                    <div className={cx('tour-name')}>{mt_TourName}</div>
                                    <div className={cx('tour-date-start')}>
                                        Ngày bắt đầu hành trình: {formatDate(DateStart)}
                                    </div>
                                    <div className={cx('tour-date-end')}>
                                        Ngày kết thúc hành trình: {formatDate(DateEnd)}
                                    </div>
                                    <div className={cx('tour-quantity')}>Số chỗ đặt: {bookif.Qty}</div>
                                    <div className={cx('tour-price')}>Giá tour: {formatMoney(mt_TourPrice, 0)}</div>
                                    <div className={cx('tour-total-price')}>
                                        Tổng cộng: {formatMoney(bookif.TotalPrice, 0)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('tour')}>Đang tải...</div>
                        )}
                    </div>
                    <div className={cx('book-frame')}>
                        <div className={cx('book-info')}>
                            <h2>Hành khách đặt chỗ</h2>
                            {passengers.map((passenger, index) => (
                                <div className={cx('pass-item')} key={index}>
                                    <div className={cx('pass-name')}>Họ và tên: {passenger.FullName}</div>
                                    <div className={cx('pass-gender')}>Giới tính: {passenger.Gender}</div>
                                    <div className={cx('pass-birthday')}>
                                        Ngày sinh: {formatDate(passenger.DateOfBirth)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className={cx('payment')}>
                    <div className={cx('payment-method-title')}>Phương thức thanh toán</div>
                    <div className={cx('payment-method')}>
                        <div className={cx('method-item')}>
                            <input type="radio" id="Momo" defaultChecked onChange={(e) => handleRadioChange(e)} />
                            <div className={cx('method-icon')}>
                                <img className={cx('method-icon')} src={images.momo} alt="momo" />
                            </div>
                            <div className={cx('method-name')}>Thanh toán qua ví Momo</div>
                        </div>
                        {/* <div className={cx('method-item')}>
                            <input type="radio" id="vnpay" onChange={(e) => handleRadioChange(e)} />
                            <div className={cx('method-icon')}>
                                <img className={cx('method-icon')} src={images.vnpay} alt="vnpay" />
                            </div>
                            <div className={cx('method-name')}>Thanh toán qua ví VN Pay</div>
                        </div> */}
                    </div>
                    <div className={cx('payment-frame')} onClick={() => handlePayment()}>
                        <button className={cx('btn-pay')}>Thanh toán</button>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Payment;
