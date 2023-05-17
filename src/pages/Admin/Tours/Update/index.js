import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TourType, FlagActive } from '~/services/variableService';
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

function UpdateTour() {
    const navigate = useNavigate();
    const param = useParams();

    const [tourCode, setTourCode] = useState('');
    const [tourName, setTourName] = useState('');
    const [tourType, setTourType] = useState('');
    const [tourDesc, setTourDesc] = useState('');
    const [tourThemePath, setTourThemePath] = useState('');
    const [tourImage1Path, setTourImage1Path] = useState('');
    const [tourImage2Path, setTourImage2Path] = useState('');
    const [tourImage3Path, setTourImage3Path] = useState('');
    const [tourImage4Path, setTourImage4Path] = useState('');
    const [tourDayDuration, setTourDayDuration] = useState(1);
    const [tourNightDuration, setTourNightDuration] = useState('');
    const [tourTouristNumber, setTourTouristNumber] = useState('');
    const [tourTransport, setTourTransport] = useState('');
    const [tourListDest, setTourListDest] = useState('');
    const [tourFood, setTourFood] = useState('');
    const [tourHotel, setTourHotel] = useState('');
    const [tourIdealTime, setTourIdealTime] = useState('');
    const [tourIdealPeople, setTourIdealPeople] = useState('');
    const [tourPreferential, setTourPreferential] = useState('');
    const [tourStartPoint, setTourStartPoint] = useState('');
    const [tourPrice, setTourPrice] = useState('');
    const [flagActive, setFlagActive] = useState('');

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

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    useEffect(() => {
        var raw = JSON.stringify({
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
            Ft_WhereClause: "Mst_Tour.TourCode = '" + param.slug + "'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstTour/WA_Mst_Tour_GetAll', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourCode(result.Data.Lst_Mst_Tour[0].TourCode);
                setTourName(result.Data.Lst_Mst_Tour[0].TourName);
                setTourType(result.Data.Lst_Mst_Tour[0].TourType);
                setTourDesc(result.Data.Lst_Mst_Tour[0].TourDesc);
                setTourThemePath(result.Data.Lst_Mst_Tour[0].TourThemePath);
                setTourImage1Path(result.Data.Lst_Mst_Tour[0].TourImage1Path);
                setTourImage2Path(result.Data.Lst_Mst_Tour[0].TourImage2Path);
                setTourImage3Path(result.Data.Lst_Mst_Tour[0].TourImage3Path);
                setTourImage4Path(result.Data.Lst_Mst_Tour[0].TourImage4Path);
                setTourDayDuration(result.Data.Lst_Mst_Tour[0].TourDayDuration);
                setTourNightDuration(result.Data.Lst_Mst_Tour[0].TourNightDuration);
                setTourTouristNumber(result.Data.Lst_Mst_Tour[0].TourTouristNumber);
                setTourTransport(result.Data.Lst_Mst_Tour[0].TourTransport);
                setTourListDest(result.Data.Lst_Mst_Tour[0].TourListDest);
                setTourFood(result.Data.Lst_Mst_Tour[0].TourFood);
                setTourHotel(result.Data.Lst_Mst_Tour[0].TourHotel);
                setTourIdealTime(result.Data.Lst_Mst_Tour[0].TourIdealTime);
                setTourIdealPeople(result.Data.Lst_Mst_Tour[0].TourIdealPeople);
                setTourPreferential(result.Data.Lst_Mst_Tour[0].TourPreferential);
                setTourStartPoint(result.Data.Lst_Mst_Tour[0].TourStartPoint);
                setTourPrice(result.Data.Lst_Mst_Tour[0].TourPrice);
                setFlagActive(result.Data.Lst_Mst_Tour[0].FlagActive);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        var raw_update = JSON.stringify({
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
            Ft_Cols_Upd:
                'Mst_Tour.TourName ,Mst_Tour.TourType,Mst_Tour.TourImagePath,Mst_Tour.TourDuration,Mst_Tour.TourDayDuration,Mst_Tour.TourNightDuration,Mst_Tour.TourTouristNumber,Mst_Tour.TourTransport,Mst_Tour.TourListDest,Mst_Tour.TourFood,Mst_Tour.TourHotel,Mst_Tour.TourIdealTime,Mst_Tour.TourIdealPeople,Mst_Tour.TourPreferential,Mst_Tour.TourStartPoint,Mst_Tour.TourPrice,Mst_Tour.TourImage1Path,Mst_Tour.TourImage2Path,Mst_Tour.TourImage3Path,Mst_Tour.TourImage4Path,Mst_Tour.FlagActive',
            Mst_Tour: {
                TourCode: tourCode,
                TourName: tourName,
                TourType: tourType,
                TourDesc: tourDesc,
                TourImagePath: tourThemePath,
                TourDuration: `${tourDayDuration} ngày ${tourNightDuration} đêm`,
                TourDayDuration: tourDayDuration,
                TourNightDuration: tourNightDuration,
                TourTouristNumber: tourTouristNumber,
                TourTransport: tourTransport,
                TourListDest: tourListDest,
                TourFood: tourFood,
                TourHotel: tourHotel,
                TourIdealTime: tourIdealTime,
                TourIdealPeople: tourIdealPeople,
                TourPreferential: tourPreferential,
                TourStartPoint: tourStartPoint,
                TourPrice: tourPrice,
                TourImage1Path: tourImage1Path,
                TourImage2Path: tourImage2Path,
                TourImage3Path: tourImage3Path,
                TourImage4Path: tourImage4Path,
                FlagActive: flagActive,
            },
        });

        var requestOptions_update = {
            method: 'POST',
            headers: myHeaders,
            body: raw_update,
            redirect: 'follow',
        };

        fetch('/DAMstTour/WA_Mst_Tour_Update', requestOptions_update)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Cập nhật thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/tours');
                    }, 1000);
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT</h1>
                <button className={cx('btn-return')} onClick={() => navigate('/admin/tours')}>
                    QL tuyến tour
                </button>
                <section className={cx('tour-sec')}>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Mã tuyến tour</div>
                            <input className={cx('std-input')} readOnly value={tourCode}></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Thông tin nhanh</div>
                            <input className={cx('std-input')} readOnly value={tourDesc}></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Tên tuyến tour</div>
                            <input
                                className={cx('std-input')}
                                value={tourName}
                                onChange={(e) => setTourName(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Loại tuyến tour</div>
                            <select
                                className={cx('cbb-tt')}
                                value={tourType}
                                onChange={(e) => setTourType(e.target.value)}
                            >
                                {TourType.map((item, index) => (
                                    <option value={item.TourType} key={index}>
                                        {item.TourTypeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row-item')}>
                            <div>Link ảnh nền</div>
                            <input
                                className={cx('std-input')}
                                value={tourThemePath}
                                onChange={(e) => setTourThemePath(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 1</div>
                            <input
                                className={cx('std-input')}
                                value={tourImage1Path}
                                onChange={(e) => setTourImage1Path(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 2</div>
                            <input
                                className={cx('std-input')}
                                value={tourImage2Path}
                                onChange={(e) => setTourImage2Path(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 3</div>
                            <input
                                className={cx('std-input')}
                                value={tourImage3Path}
                                onChange={(e) => setTourImage3Path(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 4</div>
                            <input
                                className={cx('std-input')}
                                value={tourImage4Path}
                                onChange={(e) => setTourImage4Path(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Thời gian tour (ngày)</div>
                            <input
                                className={cx('std-input')}
                                type="number"
                                value={tourDayDuration}
                                onChange={(e) => {
                                    setTourDayDuration(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Thời gian tour (đêm)</div>
                            <input
                                className={cx('std-input')}
                                type="number"
                                value={tourNightDuration}
                                onChange={(e) => setTourNightDuration(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Số khách nhận</div>
                            <input
                                className={cx('std-input')}
                                type="number"
                                value={tourTouristNumber}
                                onChange={(e) => setTourTouristNumber(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Thông tin ưu đãi</div>
                            <input
                                className={cx('std-input')}
                                value={tourPreferential}
                                onChange={(e) => setTourPreferential(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Danh sách điểm đến</div>
                            <input
                                className={cx('std-input')}
                                value={tourListDest}
                                onChange={(e) => setTourListDest(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Phương tiện di chuyển</div>
                            <input
                                className={cx('std-input')}
                                value={tourTransport}
                                onChange={(e) => setTourTransport(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Ẩm thực</div>
                            <input
                                className={cx('std-input')}
                                value={tourFood}
                                onChange={(e) => setTourFood(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Chỗ nghỉ</div>
                            <input
                                className={cx('std-input')}
                                value={tourHotel}
                                onChange={(e) => setTourHotel(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Thời gian lý tưởng</div>
                            <input
                                className={cx('std-input')}
                                value={tourIdealTime}
                                onChange={(e) => setTourIdealTime(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Đối tượng lý tưởng</div>
                            <input
                                className={cx('std-input')}
                                value={tourIdealPeople}
                                onChange={(e) => setTourIdealPeople(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Nơi bắt đầu</div>
                            <input
                                className={cx('std-input')}
                                value={tourStartPoint}
                                onChange={(e) => setTourStartPoint(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Giá niêm yết</div>
                            <input
                                className={cx('std-input')}
                                type="number"
                                value={tourPrice}
                                onChange={(e) => setTourPrice(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row-item')}>
                            <div>Trạng thái</div>
                            <select
                                className={cx('cbb-tt')}
                                value={flagActive}
                                onChange={(e) => setFlagActive(e.target.value)}
                            >
                                {FlagActive.map((item, index) => (
                                    <option value={item.FlagActive} key={index}>
                                        {item.FlagActiveName}
                                    </option>
                                ))}
                            </select>
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

export default UpdateTour;
