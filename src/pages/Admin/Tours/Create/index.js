import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function CreateTour() {
    const navigate = useNavigate();
    const [tourCode, setTourCode] = useState('');
    const [tourName, setTourName] = useState('');
    const [tourType, setTourType] = useState('1');
    const [tourDesc, setTourDesc] = useState('');
    const [tourThemePath, setTourThemePath] = useState('');
    const [tourImage1Path, setTourImage1Path] = useState('');
    const [tourImage2Path, setTourImage2Path] = useState('');
    const [tourImage3Path, setTourImage3Path] = useState('');
    const [tourImage4Path, setTourImage4Path] = useState('');
    const [tourDayDuration, setTourDayDuration] = useState(1);
    const [tourNightDuration, setTourNightDuration] = useState(0);
    const [tourTouristNumber, setTourTouristNumber] = useState(1);
    const [tourTransport, setTourTransport] = useState('');
    const [tourListDest, setTourListDest] = useState('');
    const [tourFood, setTourFood] = useState('');
    const [tourHotel, setTourHotel] = useState('');
    const [tourIdealTime, setTourIdealTime] = useState('');
    const [tourIdealPeople, setTourIdealPeople] = useState('');
    const [tourPreferential, setTourPreferential] = useState('');
    const [tourStartPoint, setTourStartPoint] = useState('');
    const [tourPrice, setTourPrice] = useState('');

    const [tourDestImages, setTourDestImages] = useState([]);

    const [tourSchedule, setTourSchedule] = useState([{ DateNo: '', Title: '', Content: '' }]);
    const [tourScheduleDetail, setTourScheduleDetail] = useState([{ Idx: '', Title: '' }]);

    const TourType = [
        {
            TourType: '1',
            TourTypeName: 'Cao cấp',
        },
        {
            TourType: '2',
            TourTypeName: 'Tiêu chuẩn',
        },
        {
            TourType: '3',
            TourTypeName: 'Tiết kiệm',
        },
        {
            TourType: '4',
            TourTypeName: 'Giá tốt',
        },
    ];

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

    const changeLengthTourSchedule = (data) => {
        var length = tourSchedule.length;
        var tmp = parseInt(data);
        if (data) {
            if (length < tmp) {
                for (var i = length; i < tmp; i++) {
                    tourSchedule.push({ DateNo: '', Title: '', Content: '' });
                    tourScheduleDetail.push({ Idx: '', Title: '' });
                }
            } else if (length > tmp) {
                tourSchedule.splice(tourDayDuration, length - tmp);
                tourScheduleDetail.splice(tourDayDuration, length - tmp);
            } else {
                return;
            }
        }
    };

    const handleFileEvent = (e) => {
        const choosenFiles = Array.prototype.slice.call(e.target.files);
        const choosenFilesPreview = [];
        choosenFiles.forEach((file) => {
            choosenFilesPreview.push({ ImagePath: `assets/imglcstorage/tour/${file.name}` });
            setTourDestImages(choosenFilesPreview);
        });
    };

    const handleSubmit = () => {
        var raw_tour = JSON.stringify({
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
            Mst_Tour: {
                TourCode: tourCode,
                TourName: tourName,
                TourType: tourType,
                TourDesc: tourDesc,
                TourThemePath: tourThemePath,
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
            },
        });

        var requestOptions_tour = {
            method: 'POST',
            headers: myHeaders,
            body: raw_tour,
            redirect: 'follow',
        };

        var raw_destimg = JSON.stringify({
            Rt_Cols_Mst_TourDestImages: '*',
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
            Mst_TourDestImages: {
                TourCode: tourCode,
            },
            Lst_Mst_TourDestImages: tourDestImages,
        });

        var requestOptions_destimg = {
            method: 'POST',
            headers: myHeaders,
            body: raw_destimg,
            redirect: 'follow',
        };

        var raw_ts = JSON.stringify({
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
            Mst_TourSchedule: {
                TourCode: tourCode,
            },
            Lst_Mst_TourSchedule: tourSchedule,
        });

        var requestOptions_ts = {
            method: 'POST',
            headers: myHeaders,
            body: raw_ts,
            redirect: 'follow',
        };

        var raw_tsd = JSON.stringify({
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
            Mst_TourScheduleDetail: {
                TourCode: tourCode,
            },
            Lst_Mst_TourScheduleDetail: tourScheduleDetail,
        });

        var requestOptions_tsd = {
            method: 'POST',
            headers: myHeaders,
            body: raw_tsd,
            redirect: 'follow',
        };

        fetch('/DAMstTour/WA_Mst_Tour_Create', requestOptions_tour)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    fetch('/TourDestImages/WA_Mst_TourDestImages_Save', requestOptions_destimg)
                        .then((response) => response.json())
                        .then((result) => console.log(result))
                        .catch((error) => console.log('error', error));

                    fetch('/DAMstTourScheduleDetail/WA_Mst_TourScheduleDetail_Save', requestOptions_tsd)
                        .then((response) => response.json())
                        .then((result) => console.log(result))
                        .catch((error) => console.log('error', error));

                    fetch('/DAMstTourSchedule/WA_Mst_TourSchedule_Save', requestOptions_ts)
                        .then((response) => response.json())
                        .then((result) => {
                            if (result.Success === true) {
                                notify('Tạo mới tuyến tour thành công', 'success');
                                setTimeout(() => {
                                    navigate('/admin/tours');
                                }, 1000);
                            }
                        })
                        .catch((error) => console.log('error', error));
                }
            })
            .catch((error) => console.log('error', error));
    };

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
            SequenceType: 'TOURCODE',
            Param_Prefix: '',
            Param_Postfix: '',
        },
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('/DASeq/WA_Seq_Common_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourCode(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);
                setTourDesc('Du lịch trong nước');
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 style={{ textAlign: 'center' }}>Tạo mới tuyến Tour</h1>
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
                                type="file"
                                //value={tourThemePath}
                                onChange={(e) => setTourThemePath(`assets/imglcstorage/tour/${e.target.files[0].name}`)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 1</div>
                            <input
                                className={cx('std-input')}
                                type="file"
                                //value={tourImage1Path}
                                onChange={(e) =>
                                    setTourImage1Path(`assets/imglcstorage/tour/${e.target.files[0].name}`)
                                }
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 2</div>
                            <input
                                className={cx('std-input')}
                                type="file"
                                //value={tourImage2Path}
                                onChange={(e) =>
                                    setTourImage2Path(`assets/imglcstorage/tour/${e.target.files[0].name}`)
                                }
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row', 'dflex-sb')}>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 3</div>
                            <input
                                className={cx('std-input')}
                                type="file"
                                //value={tourImage3Path}
                                onChange={(e) =>
                                    setTourImage3Path(`assets/imglcstorage/tour/${e.target.files[0].name}`)
                                }
                            ></input>
                        </div>
                        <div className={cx('row-item')}>
                            <div>Link ảnh chi tiết 4</div>
                            <input
                                className={cx('std-input')}
                                type="file"
                                //value={tourImage4Path}
                                onChange={(e) =>
                                    setTourImage4Path(`assets/imglcstorage/tour/${e.target.files[0].name}`)
                                }
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
                                    changeLengthTourSchedule(e.target.value);
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
                                value={tourPrice}
                                onChange={(e) => setTourPrice(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row-item')}>
                            <div>Ảnh các điểm đến (Chọn được nhiều ảnh)</div>
                            <input
                                className={cx('std-input')}
                                type="file"
                                multiple
                                //value={tourDestImages}
                                onChange={(e) => {
                                    //setTourDestImages(e.target.files);
                                    handleFileEvent(e);
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className={cx('tour-schedule')}>
                        <h2>Lịch trình tuyến Tour</h2>
                        {Array.from({ length: tourDayDuration }, (data, i) => {
                            return (
                                <div className={cx('row', 'dflex-sb')} key={i}>
                                    <div className={cx('row-item', 'width10')}>
                                        <div>Ngày thứ</div>
                                        <input
                                            className={cx('std-input')}
                                            onChange={(e) => {
                                                const newTourSchedule = [...tourSchedule];
                                                newTourSchedule[i].DateNo = e.target.value;
                                                setTourSchedule(newTourSchedule);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('row-item', 'width30')}>
                                        <div>Tiêu đề</div>
                                        <input
                                            className={cx('std-input')}
                                            onChange={(e) => {
                                                const newTourSchedule = [...tourSchedule];
                                                newTourSchedule[i].Title = e.target.value;
                                                setTourSchedule(newTourSchedule);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('row-item', 'width50')}>
                                        <div>Nội dung</div>
                                        <input
                                            className={cx('std-input')}
                                            onChange={(e) => {
                                                const newTourSchedule = [...tourSchedule];
                                                newTourSchedule[i].Content = e.target.value;
                                                setTourSchedule(newTourSchedule);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('tour-schedule')}>
                        <h2>Chi tiết lịch trình Tour</h2>
                        {Array.from({ length: tourDayDuration }, (data, i) => {
                            return (
                                <div className={cx('row', 'dflex-sb')} key={i}>
                                    <div className={cx('row-item', 'width10')}>
                                        <div>Ngày thứ</div>
                                        <input
                                            className={cx('std-input')}
                                            onChange={(e) => {
                                                const newTourScheduleDetail = [...tourScheduleDetail];
                                                newTourScheduleDetail[i].Idx = e.target.value;
                                                setTourScheduleDetail(newTourScheduleDetail);
                                            }}
                                        />
                                    </div>
                                    <div className={cx('row-item', 'width90')}>
                                        <div>Tiêu đề</div>
                                        <input
                                            className={cx('std-input')}
                                            onChange={(e) => {
                                                const newTourScheduleDetail = [...tourScheduleDetail];
                                                newTourScheduleDetail[i].Title = e.target.value;
                                                setTourScheduleDetail(newTourScheduleDetail);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <div className={cx('submit')}>
                    <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                        Tạo mới tuyến tour
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateTour;
