import classNames from 'classnames/bind';
import styles from './ASidebar.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { tomorrowDate } from '~/services/initDateService';

const cx = classNames.bind(styles);

function ASidebar() {
    const navigate = useNavigate();

    const [listProvinceLong, setListProvinceLong] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_Mst_Province: '*',
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
            Ft_RecordCount: '1000',
            Ft_WhereClause: "Mst_Province.FlagActive = '1'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstProvince/WA_Mst_Province_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setListProvinceLong(result.Data.Lst_Mst_Province);
            })
            .catch((error) => console.log('error', error));
    }, []);

    const [strTouristCount, setStrTouristCount] = useState('');
    const [sttBtnTouristCount1, setSttBtnTouristCount1] = useState(false);
    const [sttBtnTouristCount2, setSttBtnTouristCount2] = useState(false);
    const [sttBtnTouristCount3, setSttBtnTouristCount3] = useState(false);
    const [sttBtnTouristCount4, setSttBtnTouristCount4] = useState(false);

    var strTourType = '';
    const [sttBtnTourType1, setSttBtnTourType1] = useState(false);
    const [sttBtnTourType2, setSttBtnTourType2] = useState(false);
    const [sttBtnTourType3, setSttBtnTourType3] = useState(false);
    const [sttBtnTourType4, setSttBtnTourType4] = useState(false);

    var strTourDuration = '';
    const [sttBtnTourDuration1, setSttBtnTourDuration1] = useState(false);
    const [sttBtnTourDuration2, setSttBtnTourDuration2] = useState(false);
    const [sttBtnTourDuration3, setSttBtnTourDuration3] = useState(false);
    const [sttBtnTourDuration4, setSttBtnTourDuration4] = useState(false);

    var strStartPoint = '';
    var strEndPoint = '';
    var strDate = '';

    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(100000000);
    const [date, setDate] = useState('');

    //const [totalSS, setTotalSS] = useState('');

    const hadleTouristCount = (i, stt) => {
        if (stt === true) {
            if (i === '1') {
                setStrTouristCount(' and Mst_TourDetail.TouristNumberLeft >= 1');
            } else if (i === '2') {
                setStrTouristCount(' and Mst_TourDetail.TouristNumberLeft >= 2');
            } else if (i === '3') {
                setStrTouristCount(' and Mst_TourDetail.TouristNumberLeft >= 5');
            } else {
                setStrTouristCount(' and Mst_TourDetail.TouristNumberLeft > 5');
            }
        } else {
            setStrTouristCount('');
        }
    };

    const handleTourType = () => {
        //
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSearchAll = () => {
        if (!sttBtnTourType1 && !sttBtnTourType2 && !sttBtnTourType3 && !sttBtnTourType4) {
            strTourType = '';
        } else {
            strTourType = ` and Mst_Tour.TourType in ${sttBtnTourType1 ? "'1'," : ''}${sttBtnTourType2 ? "'2'," : ''}${
                sttBtnTourType3 ? "'3'," : ''
            }${sttBtnTourType4 ? "'4'" : ''}`;
        }

        if (sttBtnTourDuration1) {
            strTourDuration = ' and Mst_Tour.TourDayDuration >= 1 and Mst_Tour.TourDayDuration <= 3';
        }

        if (sttBtnTourDuration2) {
            strTourDuration = ' and Mst_Tour.TourDayDuration >= 4 and Mst_Tour.TourDayDuration <= 7';
        }

        if (sttBtnTourDuration3) {
            strTourDuration = ' and Mst_Tour.TourDayDuration >= 8 and Mst_Tour.TourDayDuration <= 14';
        }

        if (sttBtnTourDuration4) {
            strTourDuration = ' and Mst_Tour.TourDayDuration >= 15';
        }

        if (startPoint) {
            strStartPoint = ` and Mst_Tour.TourStartPoint like '%${startPoint}%'`;
        }

        if (endPoint) {
            strEndPoint = ` and Mst_Tour.TourListDest like '%${endPoint}%'`;
        }

        if (date) {
            strDate = ` and Mst_TourDetail.DateStart >= '${date}'`;
        }

        setTimeout(() => {
            localStorage.setItem(
                'searchClause',
                `Mst_Tour.TourPrice >= ${priceFrom} and Mst_Tour.TourPrice <= ${priceTo}${date ? strDate : ''}${
                    startPoint ? strStartPoint : ''
                }${endPoint ? strEndPoint : ''}${strTouristCount ? strTouristCount : ''}${
                    strTourType ? strTourType : ''
                }${strTourDuration ? strTourDuration : ''}`,
            );

            // if location now = '/search' reload pages or move to '/search'
            if (window.location.pathname === '/search') {
                window.location.reload();
            } else {
                navigate('/search');
            }
        }, 1000);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar__header')}>Lọc kết quả</div>
                <div className={cx('sidebar__info')}>Du lịch trong nước</div>
                <div className={cx('sidebar__body')}>
                    <div className={cx('sidebar__body__item')}>
                        <h5>ĐIỂM ĐI</h5>
                        <select
                            className={cx('select-box')}
                            id="sllDiemDi"
                            name="sllDiemDi"
                            onChange={(e) => setStartPoint(e.target.value)}
                        >
                            <option value="">--- Tất cả ---</option>
                            {listProvinceLong.map((item, index) => {
                                return (
                                    <option key={index} value={item.ProvinceName}>
                                        {item.ProvinceName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('sidebar__body__item')}>
                        <h5>ĐIỂM ĐẾN</h5>
                        <select
                            className={cx('select-box')}
                            id="sllDiemDen"
                            name="sllDiemDen"
                            onChange={(e) => setEndPoint(e.target.value)}
                        >
                            <option value="">--- Tất cả ---</option>
                            {listProvinceLong.map((item, index) => {
                                return (
                                    <option key={index} value={item.ProvinceName}>
                                        {item.ProvinceName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>SỐ NGÀY</h5>
                        <button
                            className={cx('btn-option', 'mr16', {
                                btnActive: sttBtnTourDuration1 === true,
                            })}
                            onClick={() => {
                                setSttBtnTourDuration1(!sttBtnTourDuration1);
                                setSttBtnTourDuration2(false);
                                setSttBtnTourDuration3(false);
                                setSttBtnTourDuration4(false);
                            }}
                        >
                            1-3 ngày
                        </button>
                        <button
                            className={cx('btn-option', {
                                btnActive: sttBtnTourDuration2 === true,
                            })}
                            onClick={() => {
                                setSttBtnTourDuration2(!sttBtnTourDuration2);
                                setSttBtnTourDuration1(false);
                                setSttBtnTourDuration3(false);
                                setSttBtnTourDuration4(false);
                            }}
                        >
                            4-7 ngày
                        </button>
                        <button
                            className={cx('btn-option', 'mr16', {
                                btnActive: sttBtnTourDuration3 === true,
                            })}
                            onClick={() => {
                                setSttBtnTourDuration3(!sttBtnTourDuration3);
                                setSttBtnTourDuration1(false);
                                setSttBtnTourDuration2(false);
                                setSttBtnTourDuration4(false);
                            }}
                        >
                            8-14 ngày
                        </button>
                        <button
                            className={cx('btn-option', {
                                btnActive: sttBtnTourDuration4 === true,
                            })}
                            onClick={() => {
                                setSttBtnTourDuration4(!sttBtnTourDuration4);
                                setSttBtnTourDuration1(false);
                                setSttBtnTourDuration2(false);
                                setSttBtnTourDuration3(false);
                            }}
                        >
                            trên 14 ngày
                        </button>
                    </div>
                    <div className={cx('sidebar__body__item')}>
                        <h5>NGÀY KHỞI HÀNH</h5>
                        <p className={cx('datepicker-wrap')}>
                            <FontAwesomeIcon icon={faCalendar} className={cx('fa-icon')} />
                            <input
                                type="date"
                                className={cx('input-pick')}
                                id="datePicker"
                                placeholder="Chọn ngày khởi hành"
                                min={tomorrowDate}
                                formatDate="dd/MM/yyyy"
                                onChange={(e) => handleDateChange(e)}
                            ></input>
                        </p>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>SỐ NGƯỜI</h5>
                        <button
                            className={cx('btn-option', 'mr16', {
                                btnActive: sttBtnTouristCount1 === true,
                            })}
                            value="1"
                            onClick={(e) => {
                                setSttBtnTouristCount1(!sttBtnTouristCount1);
                                setSttBtnTouristCount2(false);
                                setSttBtnTouristCount3(false);
                                setSttBtnTouristCount4(false);
                                hadleTouristCount(e.target.value, !sttBtnTouristCount1);
                            }}
                        >
                            1 người
                        </button>
                        <button
                            className={cx('btn-option', {
                                btnActive: sttBtnTouristCount2 === true,
                            })}
                            value="2"
                            onClick={(e) => {
                                setSttBtnTouristCount2(!sttBtnTouristCount2);
                                setSttBtnTouristCount1(false);
                                setSttBtnTouristCount3(false);
                                setSttBtnTouristCount4(false);
                                hadleTouristCount(e.target.value, !sttBtnTouristCount2);
                            }}
                        >
                            2 người
                        </button>
                        <button
                            className={cx('btn-option', 'mr16', {
                                btnActive: sttBtnTouristCount3 === true,
                            })}
                            value="3"
                            onClick={(e) => {
                                setSttBtnTouristCount3(!sttBtnTouristCount3);
                                setSttBtnTouristCount1(false);
                                setSttBtnTouristCount2(false);
                                setSttBtnTouristCount4(false);
                                hadleTouristCount(e.target.value, !sttBtnTouristCount3);
                            }}
                        >
                            3-5 người
                        </button>
                        <button
                            className={cx('btn-option', {
                                btnActive: sttBtnTouristCount4 === true,
                            })}
                            value="4"
                            onClick={(e) => {
                                setSttBtnTouristCount4(!sttBtnTouristCount4);
                                setSttBtnTouristCount1(false);
                                setSttBtnTouristCount2(false);
                                setSttBtnTouristCount3(false);
                                hadleTouristCount(e.target.value, !sttBtnTouristCount4);
                            }}
                        >
                            5+ người
                        </button>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>DÒNG TOUR</h5>
                        <button
                            className={cx('btn-option', 'mr16', {
                                btnActive: sttBtnTourType1 === true,
                            })}
                            value="1"
                            onClick={() => {
                                setSttBtnTourType1(!sttBtnTourType1);
                                handleTourType();
                            }}
                        >
                            Cao cấp
                        </button>
                        <button
                            className={cx('btn-option', {
                                btnActive: sttBtnTourType2 === true,
                            })}
                            value="2"
                            onClick={() => {
                                setSttBtnTourType2(!sttBtnTourType2);
                                handleTourType();
                            }}
                        >
                            Tiêu chuẩn
                        </button>
                        <button
                            className={cx('btn-option', 'mr16', {
                                btnActive: sttBtnTourType3 === true,
                            })}
                            value="3"
                            onClick={() => {
                                setSttBtnTourType3(!sttBtnTourType3);
                                handleTourType();
                            }}
                        >
                            Tiết kiệm
                        </button>
                        <button
                            className={cx('btn-option', {
                                btnActive: sttBtnTourType4 === true,
                            })}
                            value="4"
                            onClick={() => {
                                setSttBtnTourType4(!sttBtnTourType4);
                                handleTourType();
                            }}
                        >
                            Giá tốt
                        </button>
                    </div>
                    <div className={cx('sidebar__body__item', 'dflex')}>
                        <h5 className={cx('w100')}>GIÁ TOUR</h5>
                        <div className={cx('flex-bw')}>
                            <input
                                type="number"
                                className={cx('price')}
                                id="pricefrom"
                                defaultValue={0}
                                onChange={(e) => setPriceFrom(e.target.value)}
                            />
                            <span className={cx('price-separator')}>&nbsp;-&nbsp;</span>
                            <input
                                type="number"
                                className={cx('price')}
                                id="priceto"
                                defaultValue={100000000}
                                onChange={(e) => setPriceTo(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('btn-bound')}>
                    <button className={cx('btn-search')} onClick={() => handleSearchAll()}>
                        Tìm kiếm Tour
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ASidebar;
