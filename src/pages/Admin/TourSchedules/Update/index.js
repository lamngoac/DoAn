import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
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

function TourscheduleUpdate() {
    const param = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [tour, setTour] = useState({});
    const [tourSchedule, setTourSchedule] = useState([]);
    const [tourScheduleDetails, setTourScheduleDetails] = useState([]);
    const [count, setCount] = useState(0);

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

        setLoading(true);
        fetch('/DAMstTour/WA_Mst_Tour_GetAll', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTour(result.Data.Lst_Mst_Tour[0]);
                setTourSchedule(result.Data.Lst_Mst_TourSchedule);
                setTourScheduleDetails(result.Data.Lst_Mst_TourScheduleDetail);
                setCount(result.Data.Lst_Mst_TourSchedule.length);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddSchedule = () => {
        if (count >= tour.TourDayDuration) {
            alert('Số ngày lịch trình đã thừa hoặc đã đủ');
            return;
        } else {
            setCount(count + 1);
            const newTourSchedule = [...tourSchedule];
            newTourSchedule.push({ TourCode: tour.TourCode, DateNo: '', Title: '', Content: '' });
            const newTourScheduleDetails = [...tourScheduleDetails];
            newTourScheduleDetails.push({ TourCode: tour.TourCode, Idx: '', Title: '' });
            setTourSchedule(newTourSchedule);
            setTourScheduleDetails(newTourScheduleDetails);
        }
    };

    const handleRemoveSchedule = () => {
        if (count <= tour.TourDayDuration) {
            alert('Số ngày lịch trình đang thiếu hoặc đã đủ');
            return;
        } else {
            setCount(count - 1);
            const newTourSchedule = [...tourSchedule];
            newTourSchedule.pop();
            const newTourScheduleDetails = [...tourScheduleDetails];
            newTourScheduleDetails.pop();
            setTourSchedule(newTourSchedule);
            setTourScheduleDetails(newTourScheduleDetails);
        }
    };

    const handleSubmit = () => {
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
                TourCode: tour.TourCode,
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
                TourCode: tour.TourCode,
            },
            Lst_Mst_TourScheduleDetail: tourScheduleDetails,
        });

        var requestOptions_tsd = {
            method: 'POST',
            headers: myHeaders,
            body: raw_tsd,
            redirect: 'follow',
        };

        fetch('/DAMstTourSchedule/WA_Mst_TourSchedule_Save', requestOptions_ts)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    fetch('/DAMstTourScheduleDetail/WA_Mst_TourScheduleDetail_Save', requestOptions_tsd)
                        .then((response) => response.json())
                        .then((result) => {
                            if (result.Success === true) {
                                navigate('/admin/tourschedules');
                            }
                        })
                        .catch((error) => console.log('error', error));
                }
            })
            .catch((error) => console.log('error', error));
    };

    const currentTS = useMemo(() => {
        let tempData = tourSchedule;
        return tempData;
    }, [tourSchedule]);

    const currentTSD = useMemo(() => {
        let tempData = tourScheduleDetails;
        return tempData;
    }, [tourScheduleDetails]);

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1 style={{ textAlign: 'center' }}>THÔNG TIN LỊCH TRÌNH TOUR</h1>
                    <section className={cx('tour-sec')}>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div className={cx('row-item-title')}>Mã Tour</div>
                                <input className={cx('std-input')} value={tour.TourCode} readOnly></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div className={cx('row-item-title')}>Thời gian tour</div>
                                <input className={cx('std-input')} value={tour.TourDuration} readOnly></input>
                            </div>
                        </div>
                    </section>
                    <section className={cx('tour-sec')}>
                        <div>Số ngày hiện có lịch trình: {count}</div>
                        <div className={cx('btn')}>
                            <button className={cx('btn-add')} onClick={() => handleAddSchedule()}>
                                Thêm ngày lịch trình
                            </button>
                        </div>
                        <div className={cx('btn')}>
                            <button className={cx('btn-remove')} onClick={() => handleRemoveSchedule()}>
                                Bớt ngày lịch trình
                            </button>
                        </div>
                    </section>
                    <section className={cx('tour-sec')}>
                        <h3>LỊCH TRÌNH RÚT GỌN</h3>
                        {currentTSD.map((item, index) => {
                            return (
                                <div className={cx('row', 'dflex-sb')} key={index}>
                                    <div className={cx('row-item', 'width10')}>
                                        <div className={cx('row-item-title')}>Ngày thứ</div>
                                        <input
                                            type="number"
                                            className={cx('std-input')}
                                            value={item.Idx}
                                            onChange={(e) => {
                                                const newTourScheduleDetails = [...tourScheduleDetails];
                                                newTourScheduleDetails[index].Idx = parseInt(e.target.value);
                                                setTourScheduleDetails(newTourScheduleDetails);
                                            }}
                                        ></input>
                                    </div>
                                    <div className={cx('row-item', 'width80')}>
                                        <div className={cx('row-item-title')}>Tiêu đề</div>
                                        <input
                                            className={cx('std-input')}
                                            value={item.Title}
                                            onChange={(e) => {
                                                const newTourScheduleDetails = [...tourScheduleDetails];
                                                newTourScheduleDetails[index].Title = e.target.value;
                                                setTourScheduleDetails(newTourScheduleDetails);
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                    <section className={cx('tour-sec')}>
                        <h3>LỊCH TRÌNH CHI TIẾT</h3>
                        {currentTS.map((item, index) => {
                            return (
                                <div className={cx('row', 'dflex-sb', 'dflex-wrap')} key={index}>
                                    <div className={cx('row-item', 'width10')}>
                                        <div className={cx('row-item-title')}>Ngày thứ</div>
                                        <input
                                            type="number"
                                            className={cx('std-input')}
                                            value={item.DateNo}
                                            onChange={(e) => {
                                                const newTourSchedule = [...tourSchedule];
                                                newTourSchedule[index].DateNo = parseInt(e.target.value);
                                                setTourSchedule(newTourSchedule);
                                            }}
                                        ></input>
                                    </div>
                                    <div className={cx('row-item', 'width80')}>
                                        <div className={cx('row-item-title')}>Tiêu đề</div>
                                        <input
                                            className={cx('std-input')}
                                            value={item.Title}
                                            onChange={(e) => {
                                                const newTourSchedule = [...tourSchedule];
                                                newTourSchedule[index].Title = e.target.value;
                                                setTourSchedule(newTourSchedule);
                                            }}
                                        ></input>
                                    </div>
                                    <div className={cx('row-item', 'width100')}>
                                        <div className={cx('row-item-title')}>Nội dung</div>
                                        <textarea
                                            className={cx('std-input')}
                                            value={item.Content}
                                            onChange={(e) => {
                                                const newTourSchedule = [...tourSchedule];
                                                newTourSchedule[index].Content = e.target.value;
                                                setTourSchedule(newTourSchedule);
                                            }}
                                        ></textarea>
                                    </div>
                                    <div className={cx('divider')}></div>
                                </div>
                            );
                        })}
                    </section>
                    <div className={cx('submit')}>
                        <button className={cx('btn-submit')} onClick={() => handleSubmit()}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TourscheduleUpdate;
