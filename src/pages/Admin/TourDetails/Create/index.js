import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { addDays, formatDateLTS } from '~/services/functionService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function TourDetailCreate() {
    const navigate = useNavigate();

    const [idNo, setIdNo] = useState('');
    const [tours, setTours] = useState([]);
    const [tourGuides, setTourGuides] = useState([]);

    const [tourCode, setTourCode] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [touristNumber, setTouristNumber] = useState(0);
    const [tg1, setTg1] = useState('');
    const [tg2, setTg2] = useState('');
    const [gatherTime, setGatherTime] = useState('');
    const [gatherPlace, setGatherPlace] = useState('');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    useEffect(() => {
        var raw_seq = JSON.stringify({
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
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Seq_Common: {
                SequenceType: 'TOURDETAILCODE',
                Param_Prefix: '',
                Param_Postfix: '',
            },
        });

        var requestOptions_seq = {
            method: 'POST',
            headers: myHeaders,
            body: raw_seq,
            redirect: 'follow',
        };

        var raw_tour = JSON.stringify({
            Rt_Cols_Mst_Tour: '*',
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '123456',
            Ft_WhereClause: "Mst_Tour.FlagActive = '1'",
            Ft_Cols_Upd: '',
        });

        var requestOptions_tour = {
            method: 'POST',
            headers: myHeaders,
            body: raw_tour,
            redirect: 'follow',
        };

        var raw_tg = JSON.stringify({
            Rt_Cols_Mst_TourGuide: '*',
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: 'SYSADMIN',
            WAUserPassword: '123456',
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: "Mst_TourGuide.FlagActive = '1'",
            Ft_Cols_Upd: '',
        });

        var requestOptions_tg = {
            method: 'POST',
            headers: myHeaders,
            body: raw_tg,
            redirect: 'follow',
        };

        fetch('/DASeq/WA_Seq_Common_Get', requestOptions_seq)
            .then((response) => response.json())
            .then((result) => {
                setIdNo(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);
            })
            .catch((error) => console.log('error', error));

        fetch('/DAMstTour/WA_Mst_Tour_Get', requestOptions_tour)
            .then((response) => response.json())
            .then((result) => setTours(result.Data.Lst_Mst_Tour))
            .catch((error) => console.log('error', error));

        fetch('/DAMstTourGuide/WA_Mst_TourGuide_Get', requestOptions_tg)
            .then((response) => response.json())
            .then((result) => setTourGuides(result.Data.Lst_Mst_TourGuide))
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleDateTour = (date) => {
        setDateStart(date);
        var duration = 0;
        var touristNumber = 0;
        tours.forEach((item) => {
            if (item.TourCode === tourCode) {
                duration = item.TourDayDuration;
                touristNumber = item.TourTouristNumber;
            }
        });
        setDateEnd(addDays(date, duration));
        setTouristNumber(touristNumber);
    };

    const handleSubmit = () => {
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
            Ft_Cols_Upd: '',
            Mst_TourDetail: {
                TourCode: tourCode,
                IDNo: idNo,
                DateStart: dateStart,
                DateEnd: formatDateLTS(dateEnd + ''),
                TouristNumberAll: touristNumber,
                TouristNumberLeft: touristNumber,
                TourGuide1: tg1,
                TourGuide2: tg2,
                GatherDate: dateStart,
                GatherTime: gatherTime,
                GatherAddress: gatherPlace,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstTour/WA_Mst_TourDetail_Create', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Tạo mới tour thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/tourdetails');
                    }, 1000);
                }
            })
            .catch((error) => console.log('error', error));
    };

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1 style={{ textAlign: 'center' }}>Tạo mới tuyến Tour</h1>
                    <button className={cx('btn-return')} onClick={() => navigate('/admin/tourdetails')}>
                        Danh sách tour
                    </button>
                    <section className={cx('tour-sec')}>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Mã tuyến tour</div>
                                <select className={cx('cbb-tt')} onChange={(e) => setTourCode(e.target.value)}>
                                    {tours.map((item, index) => (
                                        <option key={index} value={item.TourCode}>
                                            {item.TourCode} - {item.TourName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Mã chi tiết tour</div>
                                <input className={cx('std-input')} value={idNo} readOnly></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Ngày khởi hành tour</div>
                                <input
                                    type="date"
                                    className={cx('std-input')}
                                    onChange={(e) => handleDateTour(e.target.value)}
                                ></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Giờ tập trung</div>
                                <input
                                    type="time"
                                    className={cx('std-input')}
                                    onChange={(e) => setGatherTime(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Nơi tập trung</div>
                                <input
                                    className={cx('std-input')}
                                    onChange={(e) => setGatherPlace(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Hướng dẫn viên dẫn đoàn</div>
                                <select className={cx('cbb-tt')} onChange={(e) => setTg1(e.target.value)}>
                                    {tourGuides.map((item, index) => (
                                        <option key={index} value={item.TGCode}>
                                            {item.TGCode} - {item.TGName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Hướng dẫn viên tiễn</div>
                                <select className={cx('cbb-tt')} onChange={(e) => setTg2(e.target.value)}>
                                    {tourGuides.map((item, index) => (
                                        <option key={index} value={item.TGCode}>
                                            {item.TGCode} - {item.TGName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>
                    <div className={cx('submit')}>
                        <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                            Tạo mới tour
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default TourDetailCreate;
