import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '~/components/Loader';
import { formatDate, FormatDateTime } from '~/services/functionService';

const cx = classNames.bind(styles);

var adminname = '';
var adminpassword = '';

if (localStorage.getItem('account') && JSON.parse(localStorage.getItem('account')).isAdmin === '1') {
    adminname = JSON.parse(localStorage.getItem('account')).username;
    adminpassword = JSON.parse(localStorage.getItem('account')).password;
} else {
    adminname = '';
    adminpassword = '';
}

function ArticleUpdate() {
    const navigate = useNavigate();
    const param = useParams();

    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState({});
    const [bookingDetail, setBookingDetail] = useState([]);

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

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_Book_Tour: '*',
            Rt_Cols_Book_TourDetail: '*',
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: "Book_Tour.BookNo = '" + param.slug + "'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DABook/WA_Book_Tour_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setBooking(result.Data.Lst_Book_Tour[0]);
                setBookingDetail(result.Data.Lst_Book_TourDetail);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT</h1>
                    <button className={cx('btn-return')} onClick={() => navigate('/admin/articles')}>
                        QL bài viết
                    </button>
                    <section className={cx('tour-sec')}>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Mã đặt tour</div>
                                <input className={cx('std-input')} value={booking.BookNo} readOnly></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Mã Tour</div>
                                <input className={cx('cbb-tt')} value={booking.IDNo} readOnly></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item', 'width100')}>
                                <div>Tên tour</div>
                                <input className={cx('std-input')} value={booking.mt_TourName} readOnly></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Tổng giá</div>
                                <input className={cx('std-input')} value={booking.TotalPrice} readOnly></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Thời gian đặt</div>
                                <input className={cx('std-input')} value={booking.CreateDTime} readOnly></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Tên người đặt</div>
                                <input className={cx('std-input')} value={booking.RepName} readOnly></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Số điện thoại người đặt</div>
                                <input className={cx('std-input')} value={booking.RepMobile} readOnly></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item', 'width100')}>
                                <div>Ghi chú của khách</div>
                                <input className={cx('std-input')} value={booking.Remark} readOnly></input>
                            </div>
                        </div>
                    </section>
                    <section className={cx('tour-sec')}>
                        <h3>Chi tiết đặt tour</h3>
                        <div className={cx('divider')}></div>
                        {bookingDetail.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className={cx('row', 'dflex-sb')}>
                                        <div className={cx('row-item', 'width40')}>
                                            <div>Tên khách</div>
                                            <input className={cx('std-input')} value={item.FullName} readOnly></input>
                                        </div>
                                        <div className={cx('row-item', 'width20')}>
                                            <div>Giới tính</div>
                                            <input className={cx('std-input')} value={item.Gender} readOnly></input>
                                        </div>
                                        <div className={cx('row-item', 'width30')}>
                                            <div>Ngày sinh</div>
                                            <input
                                                className={cx('std-input')}
                                                value={formatDate(item.DateOfBirth + '')}
                                                readOnly
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                    <div className={cx('submit')}></div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default ArticleUpdate;
