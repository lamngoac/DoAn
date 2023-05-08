import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatMoney } from '~/services/functionService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Book() {
    const param = useParams();
    const navigate = useNavigate();
    const UserCode = JSON.parse(localStorage.getItem('account')).username;

    const [imgsLoaded, setImgsLoaded] = useState(false);
    const [tourDtl, setTourDtl] = useState([]);
    const [bookNo, setBookNo] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [remark, setRemark] = useState('');
    const [repName, setRepName] = useState('');
    const [repEmail, setRepEmail] = useState('');
    const [repMobile, setRepMobile] = useState('');
    const [repAddress, setRepAddress] = useState('');
    const [passengers, setPassengers] = useState([{ FullName: '', Gender: '', DateOfBirth: '' }]);

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

    const {
        IDNo,
        TourCode,
        mt_TourName,
        DateStart,
        DateEnd,
        TouristNumberLeft,
        mt_TourThemePath,
        mt_TourDayDuration,
        mt_TourStartPoint,
        mt_TourPrice,
    } = tourDtl;

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
        Ft_WhereClause: "Mst_TourDetail.IDNo = '" + param.slug + "'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    var raw_Seq = JSON.stringify({
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
        Ft_WhereClause: '',
        Ft_Cols_Upd: '',
        Seq_Common: {
            SequenceType: 'BOOKNO',
            Param_Prefix: '',
            Param_Postfix: '',
        },
    });

    var requestOptions_Seq = {
        method: 'POST',
        headers: myHeaders,
        body: raw_Seq,
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

        fetch('/DASeq/WA_Seq_Common_Get', requestOptions_Seq)
            .then((response) => response.json())
            .then((result) => {
                setBookNo(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function:
    const handleQuantityUp = () => {
        if (quantity < TouristNumberLeft) {
            // Add new item to passengers array
            setPassengers(passengers.concat({ FullName: '', Gender: '', DateOfBirth: '' }));
            setQuantity(quantity + 1);
        } else {
            notify('Số lượng khách đặt không được vượt quá số lượng chỗ còn nhận', 'warning');
        }
    };

    const handleQuantityDown = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            // remove last item of passengers array
            setPassengers(passengers.slice(0, passengers.length - 1));
            //setPassengers(passengers.slice(0, passengers.length - 1));
        } else {
            notify('Số lượng khách đặt tối thiểu là 1', 'warning');
        }
    };

    const handleBookTour = () => {
        localStorage.setItem(
            'bookedTour',
            JSON.stringify({
                BookNo: bookNo,
                TourCode,
                IDNo,
                UserCode,
                Qty: quantity,
                TotalPrice: mt_TourPrice * quantity,
                BookStatus: 'PENDING',
                Remark: remark,
                RepName: repName,
                RepEmail: repEmail,
                RepMobile: repMobile,
                RepAddress: repAddress,
            }),
        );

        localStorage.setItem('bookedTourDtl', JSON.stringify(passengers));

        setTimeout(() => {
            console.log(localStorage.getItem('bookedTour'));
            console.log(localStorage.getItem('bookedTourDtl'));
            navigate('/payment/' + bookNo);
        }, 1000);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('headline')}>
                <span className={cx('hmain')}>1. Nhập thông tin</span>
                <FontAwesomeIcon className={cx('hicon')} icon={faChevronRight} />
                <span className={cx('hsub')}>2. Thanh toán</span>
            </div>
            <div className={cx('tour-booked')}>
                <div className={cx('tour-frame')}>
                    <div className={cx('tour-themeimg')}>
                        {imgsLoaded ? (
                            <img className={cx('img-frame')} src={require(`../../${mt_TourThemePath}`)} alt="img" />
                        ) : (
                            <img className={cx('img-frame')} src={images.noimg} alt="img" />
                        )}
                    </div>
                    <div className={cx('tour-info')}>
                        <div className={cx('t-price')}>
                            <span style={{ color: 'var(--bs-primary)' }}>
                                <b>{formatMoney(mt_TourPrice, 0)}</b>
                            </span>
                            <span>/khách</span>
                        </div>
                        <div className={cx('t-name')}>{mt_TourName}</div>
                        <div className={cx('t-code')}>
                            Mã Tour &nbsp;
                            <b>
                                {TourCode} - {IDNo}
                            </b>
                        </div>
                        {imgsLoaded ? (
                            <div className={cx('t-date')}>
                                Khởi hành &nbsp; <b>{formatDate(DateStart)}</b>
                            </div>
                        ) : (
                            <div className={cx('t-date')}>Khởi hành 01/01/2023</div>
                        )}
                        <div className={cx('t-period')}>
                            Thời gian &nbsp; <b>{mt_TourDayDuration}</b>
                        </div>
                        <div className={cx('t-depart')}>
                            Nơi khởi hành &nbsp; <b>{mt_TourStartPoint}</b>
                        </div>
                        <div className={cx('t-left')}>
                            Số chỗ còn nhận &nbsp; <b>{TouristNumberLeft}</b>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('inner')}>
                <section className={cx('section-tour')}>
                    <div className={cx('title')}>Tổng quan về chuyến đi</div>
                    <div className={cx('communicate')}>
                        <div className={cx('sub-title')}>Thông tin liên lạc</div>
                        <div className={cx('form-group')}>
                            <div className={cx('form-item')}>
                                <label className={cx('label-item')} htmlFor="name">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    onChange={(e) => setRepName(e.target.value)}
                                />
                            </div>
                            <div className={cx('form-item')}>
                                <label className={cx('label-item')} htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    onChange={(e) => setRepEmail(e.target.value)}
                                />
                            </div>
                            <div className={cx('form-item')}>
                                <label className={cx('label-item')} htmlFor="mobile">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    autoComplete="off"
                                    onChange={(e) => setRepMobile(e.target.value)}
                                />
                            </div>
                            <div className={cx('form-item')}>
                                <label className={cx('label-item')} htmlFor="address">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    autoComplete="off"
                                    onChange={(e) => setRepAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('passenger')}>
                        <div className={cx('p-quantity')}>
                            <h2>Hành khách</h2>
                            <div className={cx('p-quantity-line')}>
                                <div className={cx('p-quantity-item')}>Số lượng khách</div>
                                <div className={cx('p-quantity-item')}>
                                    <button className={cx('btn-quantity')} onClick={() => handleQuantityUp()}>
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </button>
                                    <div>{quantity}</div>
                                    <button className={cx('btn-quantity')} onClick={() => handleQuantityDown()}>
                                        <FontAwesomeIcon icon={faCircleMinus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('passenger-info')}>
                        <div className={cx('sub-title')}>Thông tin hành khách</div>
                        {/* when quantity = n , generate n line of info-line */}
                        {Array.from({ length: quantity }, (data, i) => {
                            return (
                                <div className={cx('info-line')} key={i}>
                                    <div className={cx('info-item', 'width25')}>
                                        <label htmlFor="name">Họ và tên</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Vui lòng nhập họ tên"
                                            onChange={(e) => {
                                                const newPassengers = [...passengers];
                                                newPassengers[i].FullName = e.target.value;
                                                setPassengers(newPassengers);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('info-item')}>
                                        <label htmlFor="gender">Giới tính</label>
                                        <input
                                            type="text"
                                            id="gender"
                                            name="gender"
                                            onChange={(e) => {
                                                const newPassengers = [...passengers];
                                                newPassengers[i].Gender = e.target.value;
                                                setPassengers(newPassengers);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('info-item')}>
                                        <label htmlFor="bod">Ngày sinh</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            onChange={(e) => {
                                                const newPassengers = [...passengers];
                                                newPassengers[i].DateOfBirth = e.target.value;
                                                setPassengers(newPassengers);
                                            }}
                                        />
                                    </div>
                                    {/* <div className={cx('info-item')}>
                                        <label htmlFor="bod">Tháng sinh</label>
                                        <input
                                            type="text"
                                            id="month"
                                            name="month"
                                            onChange={(e) => {
                                                const newPassengers = [...passengers];
                                                newPassengers[i].dtlmonth = e.target.value;
                                                setPassengers(newPassengers);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('info-item')}>
                                        <label htmlFor="bod">Năm sinh</label>
                                        <input
                                            type="text"
                                            id="year"
                                            name="year"
                                            onChange={(e) => {
                                                const newPassengers = [...passengers];
                                                newPassengers[i].dtlyear = e.target.value;
                                                setPassengers(newPassengers);
                                            }}
                                        />
                                    </div> */}
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('note')}>
                        <div className={cx('sub-title')}>Quý khách có ghi chú lưu ý gì, hãy nói với chúng tôi !</div>
                        <div className={cx('note-frame')}>
                            <h4>Ghi chú</h4>
                            <textarea
                                className={cx('note-text')}
                                name="note"
                                id="note"
                                cols="30"
                                rows="5"
                                placeholder="Vui lòng ghi lời nhắn vào đây"
                                onChange={(e) => setRemark(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </section>
                <section className={cx('section-book')}>
                    <div className={cx('title')}>Tóm tắt chuyến đi</div>
                    {imgsLoaded ? (
                        <div className={cx('book-frame')}>
                            <div className={cx('tour-overview')}>
                                <div className={cx('tour-img')}>
                                    <img src={require(`../../${mt_TourThemePath}`)} alt="img" />
                                </div>
                                <div className={cx('tour-name')}>{mt_TourName}</div>
                            </div>
                            <div className={cx('tour-period')}>
                                <div className={cx('tour-period-item')}>
                                    <div>Ngày bắt đầu chuyến đi</div>
                                    <div>{formatDate(DateStart)}</div>
                                </div>
                                <div className={cx('tour-period-item')}>
                                    <div>Ngày kết thúc chuyến đi</div>
                                    <div>{formatDate(DateEnd)}</div>
                                </div>
                            </div>
                            <div className={cx('tour-touristnum')}>
                                <span>Hành khách</span>
                                <span>&nbsp;{quantity} người</span>
                            </div>
                            <div className={cx('tour-price')}>
                                <span>Giá tour</span>
                                <span>
                                    &nbsp; {quantity} &nbsp; x &nbsp; {formatMoney(mt_TourPrice, 0)}
                                </span>
                            </div>
                            <div className={cx('tour-totalprice')}>
                                <span>TỔNG CỘNG</span>
                                <span style={{ color: 'var(--bs-primary)' }}>
                                    {formatMoney(quantity * mt_TourPrice, 0)} đ
                                </span>
                            </div>
                            <button className={cx('btn-book')} onClick={() => handleBookTour()}>
                                Đặt ngay
                            </button>
                        </div>
                    ) : (
                        <div>Loading</div>
                    )}
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Book;
