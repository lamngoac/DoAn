import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '~/components/Loader';

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

function TourDetailUpdate() {
    const navigate = useNavigate();
    const param = useParams();

    const [loading, setLoading] = useState(false);
    const [tourdetail, setTourDetail] = useState({});
    const [gatherTime, setGatherTime] = useState('');
    const [gatherPlace, setGatherPlace] = useState('');

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
            Rt_Cols_Mst_TourDetail: '*',
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

        setLoading(true);
        fetch('/DAMstTour/WA_Mst_TourDetail_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourDetail(result.Data.Lst_Mst_TourDetail[0]);
                setGatherTime(result.Data.Lst_Mst_TourDetail[0].GatherTime);
                setGatherPlace(result.Data.Lst_Mst_TourDetail[0].GatherAddress);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        if (gatherTime === '') {
            notify('Vui lòng nhập giờ tập trung', 'error');
            return;
        } else if (gatherPlace === '') {
            notify('Vui lòng nhập địa điểm tập trung', 'error');
            return;
        } else {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            var raw = JSON.stringify({
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
                Ft_WhereClause: '',
                Ft_Cols_Upd: 'Mst_TourDetail.GatherAddress, Mst_TourDetail.GatherTime',
                Mst_TourDetail: {
                    TourCode: tourdetail.TourCode,
                    IDNo: tourdetail.IDNo,
                    GatherAddress: gatherPlace,
                    GatherTime: gatherTime,
                },
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            fetch('/DAMstTour/WA_Mst_TourDetail_Update', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.Success === true) {
                        notify('Cập nhật thông tin chi tiết tour thành công', 'success');
                        setTimeout(() => {
                            navigate('/admin/tourdetails');
                        }, 1000);
                    } else {
                        notify(result.Message, 'error');
                    }
                })
                .catch((error) => console.log('error', error));
        }
    };

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT TOUR</h1>
                    <button className={cx('btn-return')} onClick={() => navigate('/admin/tourdetails')}>
                        QL chi tiết tour
                    </button>
                    <section className={cx('tour-sec')}>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Mã tuyến tour</div>
                                <input className={cx('std-input')} readOnly value={tourdetail.TourCode}></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Mã tour</div>
                                <input className={cx('std-input')} readOnly value={tourdetail.IDNo}></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Ngày khởi hành</div>
                                <input
                                    type="date"
                                    className={cx('std-input')}
                                    readOnly
                                    value={tourdetail.DateStart}
                                ></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Ngày kết thúc</div>
                                <input
                                    type="date"
                                    className={cx('std-input')}
                                    readOnly
                                    value={tourdetail.DateEnd}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Giờ tập trung</div>
                                <input
                                    type="time"
                                    className={cx('std-input')}
                                    value={gatherTime}
                                    onChange={(e) => setGatherTime(e.target.value)}
                                ></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Địa điểm tập trung</div>
                                <input
                                    className={cx('std-input')}
                                    value={gatherPlace}
                                    onChange={(e) => setGatherPlace(e.target.value)}
                                ></input>
                            </div>
                        </div>
                    </section>
                    <div className={cx('submit')}>
                        <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                            Lưu thông tin
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default TourDetailUpdate;
