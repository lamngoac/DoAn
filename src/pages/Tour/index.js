import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBowlFood,
    faCarSide,
    faCartShopping,
    faClock,
    faHotel,
    faMapLocationDot,
    faMoneyCheckDollar,
    faPhone,
    faTicket,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faEnvelope, faFlag } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatMoney, formatDate } from '~/services/functionService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FAQCard from '~/components/Card/FAQCard';
import images from '~/assets/images';
import { todayDate } from '~/services/initDateService';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function Tour() {
    const param = useParams();
    const navigate = useNavigate();

    const [imgsLoaded, setImgsLoaded] = useState(false);
    const [tgloading, setTgLoading] = useState(true);

    const [tourGuide1, setTourGuide1] = useState('');
    const [tourGuide2, setTourGuide2] = useState('');

    const [tourDtl, setTourDtl] = useState([]);
    const [tourSchedule, setTourSchedule] = useState([]);
    const [tourScheduleDtl, setTourScheduleDtl] = useState([]);
    const [tourDestImg, setTourDestImg] = useState([]);
    const [faq, setFaq] = useState([]);

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

    var raw_FAQ = JSON.stringify({
        Rt_Cols_POW_FAQ: '*',
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
        Ft_RecordCount: '123456',
        Ft_WhereClause: '',
        Ft_Cols_Upd: '',
    });

    var requestOptions_FAQ = {
        method: 'POST',
        headers: myHeaders,
        body: raw_FAQ,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('http://localhost:3000/DAMstTour/WA_Mst_TourDetail_GetForViewAll', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourDtl(result.Data.Lst_Mst_TourDetail[0]);
                setTourSchedule(result.Data.Lst_Mst_TourSchedule);
                setTourScheduleDtl(result.Data.Lst_Mst_TourScheduleDetail);
                setTourDestImg(result.Data.Lst_Mst_TourDestImages);
                setImgsLoaded(true);

                // Get tour guide info
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');

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
                    Ft_WhereClause:
                        "Mst_TourGuide.TGCode = '" +
                        result.Data.Lst_Mst_TourDetail[0].TourGuide1 +
                        "' or Mst_TourGuide.TGCode = '" +
                        result.Data.Lst_Mst_TourDetail[0].TourGuide2 +
                        "'",
                    Ft_Cols_Upd: '',
                });

                var requestOptions_tg = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw_tg,
                    redirect: 'follow',
                };

                fetch('/DAMstTourGuide/WA_Mst_TourGuide_Get', requestOptions_tg)
                    .then((response) => response.json())
                    .then((result) => {
                        setTourGuide1(result.Data.Lst_Mst_TourGuide[0]);
                        setTourGuide2(result.Data.Lst_Mst_TourGuide[1]);
                        setTgLoading(false);
                    })
                    .catch((error) => console.log('error', error));
            })
            .catch((error) => console.log('error', error));

        fetch('http://localhost:3000/DAPFAQ/WA_POW_FAQ_Get', requestOptions_FAQ)
            .then((response) => response.json())
            .then((result) => setFaq(result.Data.Lst_POW_FAQ))
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Assign value
    const {
        TourCode,
        IDNo,
        TouristNumberLeft,
        TourGuide1,
        TourGuide2,
        DateStart,
        GatherDate,
        GatherTime,
        GatherAddress,
        mt_TourName,
        mt_TourDuration,
        mt_TourDayDuration,
        mt_TourTransport,
        mt_TourListDest,
        mt_TourFood,
        mt_TourHotel,
        mt_TourIdealTime,
        mt_TourIdealPeople,
        mt_TourPreferential,
        mt_TourStartPoint,
        mt_TourPrice,
        mt_TourImage1Path,
        mt_TourImage2Path,
        mt_TourImage3Path,
        mt_TourImage4Path,
    } = tourDtl;

    const handleBookTour = () => {
        // Check if user is logged in
        if (localStorage.getItem('account')) {
            navigate('/book/' + IDNo);
        } else {
            notify('Vui lòng đăng nhập để đặt tour', 'info');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    const handleSearchOther = () => {
        localStorage.setItem(
            'searchClause',
            `Mst_Tour.TourCode = '${TourCode}' and Mst_TourDetail.DateStart > '${todayDate}'`,
        );

        setTimeout(() => {
            navigate('/search');
        }, 1000);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <section className={cx('section-head')}>
                    <div className={cx('head-code')}>
                        <FontAwesomeIcon icon={faTicket} className={cx('fa-icon')} />
                        {TourCode} - {IDNo}
                    </div>
                    <div className={cx('head-title')}>
                        <div className={cx('head-name')}>
                            <h2>{mt_TourName}</h2>
                        </div>
                    </div>
                    <div className={cx('head-function')}>
                        <div className={cx('book-reg')}>
                            <span className={cx('book-price')}>{formatMoney(mt_TourPrice, 0)}₫</span>
                            <button className={cx('book-btn')} onClick={() => handleBookTour()}>
                                <FontAwesomeIcon icon={faCartShopping} className={cx('fa-icon')} />
                                Đặt ngay
                            </button>
                        </div>
                        <div className={cx('advise-reg')}>
                            <button className={cx('advise-btn')}>Liên hệ tư vấn</button>
                        </div>
                    </div>
                </section>
                <section className={cx('section-pic')}>
                    <div className={cx('frame-left')}>
                        {imgsLoaded ? (
                            <img
                                className={cx('image-one')}
                                src={require(`../../${mt_TourImage1Path}`)}
                                alt="Image_01"
                            />
                        ) : (
                            <img className={cx('image-one')} src={images.noimg} alt="Image_01" />
                        )}
                    </div>
                    <div className={cx('frame-right')}>
                        <div className={cx('frame-right-top')}>
                            <div className={cx('frame-right-top-left')}>
                                {imgsLoaded ? (
                                    <img
                                        className={cx('image-two')}
                                        src={require(`../../${mt_TourImage2Path}`)}
                                        alt="Image_01"
                                    />
                                ) : (
                                    <img className={cx('image-two')} src={images.noimg} alt="Image_01" />
                                )}
                            </div>
                            <div className={cx('frame-right-top-right')}>
                                {imgsLoaded ? (
                                    <img
                                        className={cx('image-two')}
                                        src={require(`../../${mt_TourImage3Path}`)}
                                        alt="Image_01"
                                    />
                                ) : (
                                    <img className={cx('image-two')} src={images.noimg} alt="Image_01" />
                                )}
                            </div>
                        </div>
                        <div className={cx('frame-right-bottom')}>
                            {imgsLoaded ? (
                                <img
                                    className={cx('image-three')}
                                    src={require(`../../${mt_TourImage4Path}`)}
                                    alt="Image_01"
                                />
                            ) : (
                                <img className={cx('image-three')} src={images.noimg} alt="Image_01" />
                            )}
                        </div>
                    </div>
                </section>
                <section className={cx('section-info')}>
                    <div className={cx('info-left')}>
                        <div className={cx('info-left-top')}>
                            <div className={cx('info-left-item', 'dflex')}>
                                <span>Khởi hành: {formatDate(DateStart + '')}</span>
                                <button className={cx('btn-other')} onClick={() => handleSearchOther()}>
                                    <FontAwesomeIcon icon={faCalendarAlt} className={cx('fa-icon')} />
                                    Ngày khác
                                </button>
                            </div>
                            <div className={cx('info-item')}>
                                Tập trung: {GatherTime} - {formatDate(GatherDate + '')}
                            </div>
                            <div className={cx('info-item')}>Thời gian: {mt_TourDayDuration} ngày</div>
                            <div className={cx('info-item')}>Nơi khởi hành: {mt_TourStartPoint}</div>
                            <div className={cx('info-item')}>Số chỗ còn nhận: {TouristNumberLeft}</div>
                        </div>
                        <div className={cx('info-left-bottom')}>
                            <div className={cx('info-left-bottom-title')}>Quý khách cần hỗ trợ?</div>
                            <div className={cx('info-left-bottom-content')}>
                                <a
                                    href="https://webcall.talking.vn/frame-click-to-call/new?code=tCEZl1-MKPuA6JU-czVAScCb0pPkHmPt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cx('phone-ct')}
                                >
                                    <FontAwesomeIcon icon={faPhone} className={cx('fa-icon')}></FontAwesomeIcon>
                                    <p>Gọi miễn phí qua internet</p>
                                </a>
                                <a href="mailto:info@vietravel.com" className={cx('mail-ct')}>
                                    <FontAwesomeIcon icon={faEnvelope} className={cx('fa-icon')}></FontAwesomeIcon>
                                    <p>Gửi yêu cầu hỗ trợ ngay</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-right')}>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faFlag} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Thời gian</div>
                            <div className={cx('item-content')}>{mt_TourDuration}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faCarSide} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Phương tiện di chuyển</div>
                            <div className={cx('item-content')}>{mt_TourTransport}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faMapLocationDot} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Điểm tham quan</div>
                            <div className={cx('item-content')}>{mt_TourListDest}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faBowlFood} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Ẩm thực</div>
                            <div className={cx('item-content')}>{mt_TourFood}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faHotel} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Khách sạn</div>
                            <div className={cx('item-content')}>{mt_TourHotel}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faClock} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Thời gian lý tưởng</div>
                            <div className={cx('item-content')}>{mt_TourIdealTime}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faUserGroup} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Đối tượng thích hợp</div>
                            <div className={cx('item-content')}>{mt_TourIdealPeople}</div>
                        </div>
                        <div className={cx('info-item')}>
                            <div className={cx('item-icon')}>
                                <FontAwesomeIcon icon={faMoneyCheckDollar} className={cx('fa-icon')} />
                            </div>
                            <div className={cx('item-title')}>Ưu đãi</div>
                            <div className={cx('item-content')}>{mt_TourPreferential}</div>
                        </div>
                    </div>
                </section>
                <section className={cx('section-dest')}>
                    <h2>Những địa điểm tham quan</h2>
                    <div className={cx('dest-list')}>
                        {tourDestImg.map((item, index) => (
                            <div className={cx('dest-item')} key={index}>
                                <img className={cx('img-dest')} alt="img" src={require(`../../${item.ImagePath}`)} />
                            </div>
                        ))}
                    </div>
                </section>
                <section className={cx('section-schedule')}>
                    <h2>Lịch trình</h2>
                    <div className={cx('schedule-content')}>
                        <div className={cx('mst-schdule')}>
                            {tourScheduleDtl.map((item, index) => (
                                <div className={cx('mst-item')} key={index}>
                                    <span className={cx('date-left')}>Ngày </span>
                                    <span className={cx('date-center')}>{item.Idx}</span>
                                    <span className={cx('date-right')}>
                                        {/* <span className={cx('date')}>{formatDate(tourDtlDate[index].ExactDate)}</span> */}
                                        <span className={cx('date')}>Thông tin ngày {item.Idx}</span>
                                        <span className={cx('location')}>{item.Title}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={cx('dtl-schdule')}>
                            {tourSchedule.map((item, index) => (
                                <div className={cx('dtl-item')} key={index}>
                                    <h3>{item.Title}</h3>
                                    <div className={cx('excerpt')}>
                                        <span className={cx('line')}></span>
                                        <div style={{ textAlign: 'justify' }}>{item.Content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className={cx('section-include')}>
                    <div className={cx('include-time')}>
                        <h2>Thông tin tập trung</h2>
                        <div className={cx('block')}>
                            <span style={{ width: '50%' }}>Ngày giờ tập trung</span>
                            <span style={{ width: '50%' }}>
                                {GatherDate} | {GatherTime}
                            </span>
                        </div>
                        <div className={cx('block')}>
                            <span style={{ width: '50%' }}>Nơi tập trung</span>
                            <span style={{ width: '50%' }}>{GatherAddress}</span>
                        </div>
                    </div>
                    <div className={cx('include-guide')}>
                        <h2>Thông tin hướng dẫn viên</h2>
                        {tgloading ? (
                            <div>Đang tải ...</div>
                        ) : (
                            <div className={cx('guide-item')} style={{ display: 'block' }}>
                                <div style={{ display: 'block' }}>
                                    <div>HDV dẫn đoàn</div>
                                    <div>{tourGuide1.TGName}</div>
                                    <div>{tourGuide1.TGAgentAddress}</div>
                                    <div>{tourGuide1.TGMobileNo}</div>
                                </div>
                                <div style={{ height: '40px' }}></div>
                                <div style={{ display: 'block' }}>
                                    <div>HDV dẫn đoàn</div>
                                    <div>{tourGuide2.TGName}</div>
                                    <div>{tourGuide2.TGAgentAddress}</div>
                                    <div>{tourGuide2.TGMobileNo}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                <section className={cx('section-notice')}>
                    <h2>Những thông tin cần lưu ý</h2>
                    <div className={cx('notice-content')}>
                        {faq.map((item, index) => (
                            <FAQCard data={item} key={index} />
                        ))}
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Tour;
