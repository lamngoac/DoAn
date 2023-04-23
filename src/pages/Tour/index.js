import classNames from 'classnames/bind';
import styles from './index.module.scss';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import images from '~/assets/images';
import { faCalendarAlt, faEnvelope, faFlag } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Tour() {
    const param = useParams();

    const [imgsLoaded, setImgsLoaded] = useState(false);

    const [tourDtl, setTourDtl] = useState([]);
    const [tourDtlDate, setTourDtlDate] = useState([]);
    const [tourSchedule, setTourSchedule] = useState([]);
    const [tourScheduleDtl, setTourScheduleDtl] = useState([]);
    const [tourDestImg, setTourDestImg] = useState([]);

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

    useEffect(() => {
        fetch('http://localhost:3000/DAMstTour/WA_Mst_TourDetail_GetForViewAll', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourDtl(result.Data.Lst_Mst_TourDetail[0]);
                setTourDtlDate(result.Data.Lst_Mst_TourDetailDate);
                setTourSchedule(result.Data.Lst_Mst_TourSchedule);
                setTourScheduleDtl(result.Data.Lst_Mst_TourScheduleDetail);
                setTourDestImg(result.Data.Lst_Mst_TourDestImage);
                setImgsLoaded(true);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? '-' : '';

            let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
            let j = i.length > 3 ? i.length % 3 : 0;

            return (
                negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
                (decimalCount
                    ? decimal +
                      Math.abs(amount - i)
                          .toFixed(decimalCount)
                          .slice(2)
                    : '')
            );
        } catch (e) {
            console.log(e);
        }
    }

    // Assign value
    const {
        TourCode,
        IDNo,
        DateStart,
        TouristNumberLeft,
        TourGuide1,
        TourGuide2,
        GatherDate,
        GatherTime,
        GatherAddress,
        GoFlightNo,
        ReturnFlightNo,
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
                            <button className={cx('book-btn')}>
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
                                <span>Khởi hành 06/05/2023 - Giờ đi: 17:45</span>
                                <button className={cx('btn-other')}>
                                    <FontAwesomeIcon icon={faCalendarAlt} className={cx('fa-icon')} />
                                    Ngày khác
                                </button>
                            </div>
                            <div className={cx('info-item')}>
                                Tập trung {GatherTime} ngày {GatherDate}
                            </div>
                            <div className={cx('info-item')}>Thời gian {mt_TourDayDuration} ngày</div>
                            <div className={cx('info-item')}>Nơi khởi hành {mt_TourStartPoint}</div>
                            <div className={cx('info-item')}>Số chỗ còn nhận {TouristNumberLeft}</div>
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
                    <div className={cx('dest-list')}></div>
                </section>
                <section className={cx('section-schedule')}>
                    <div className={cx('mst-schdule')}></div>
                    <div className={cx('dtl-schdule')}></div>
                </section>
                <section className={cx('section-include')}>
                    <div className={cx('tour-flight')}></div>
                    <div className={cx('tour-include')}>
                        <div className={cx('include-time')}></div>
                        <div className={cx('include-guide')}></div>
                    </div>
                </section>
                <section className={cx('section-notice')}></section>
            </div>
        </div>
    );
}

export default Tour;
