import classNames from 'classnames/bind';
import HomeTheme from '~/components/HomeTheme';
import Searchcbb from '~/components/Searchcbb/Searchcbb';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowsLeftRight,
    faBoxesStacked,
    faCreditCard,
    faHandHoldingDollar,
    faLaptopFile,
    faLocationDot,
    faMagnifyingGlass,
    faPhoneVolume,
    faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [provinces, setProvinces] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw_tour = JSON.stringify({
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
        Ft_WhereClause: "Mst_Province.FlagActive = '1' and Mst_Province.FlagMenuShow = '1'",
        Ft_Cols_Upd: '',
    });

    var requestOptions_tour = {
        method: 'POST',
        headers: myHeaders,
        body: raw_tour,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('DAMstProvince/WA_Mst_Province_Get', requestOptions_tour)
            .then((response) => response.json())
            .then((result) => setProvinces(result.Data.Lst_Mst_Province))
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <section className={cx('section-search')}>
                    <HomeTheme />
                    <div className={cx('search-line')}>
                        <div className={cx('search-title')}>Tìm kiếm tour du lịch</div>
                        <div className={cx('search-form')}>
                            <div className={cx('search-form-input')}>
                                <div className={cx('s-icon')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div className={cx('s-zone')}>
                                    <div className={cx('s-title')}>Điểm đi</div>
                                    <Searchcbb list={provinces} onChange={(event) => console.log(event)} />
                                </div>
                            </div>
                            <div className={cx('search-form-input')}>
                                <FontAwesomeIcon className={cx('icon-24')} icon={faArrowsLeftRight} />
                            </div>
                            <div className={cx('search-form-input')}>
                                <div className={cx('s-icon')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div className={cx('s-zone')}>
                                    <div className={cx('s-title')}>Điểm đến</div>
                                    <Searchcbb list={provinces} onChange={(event) => console.log(event)} />
                                </div>
                            </div>
                            <button className={cx('search-form-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </section>
                <section className={cx('section-tour')}>
                    <h1 className={cx('tour-title')}>Điểm đến yêu thích</h1>
                    <div className={cx('tour-list')}>
                        <div className={cx('tour-item')}>
                            <img
                                className={cx('item-img')}
                                src={require('../../assets/imglcstorage/tour/dc_211207_CAU THE HUC.jpg')}
                                alt="img"
                            ></img>
                            <div className={cx('tour-item-info')}>Hà Nội</div>
                        </div>
                        <div className={cx('tour-item')}>
                            <img
                                className={cx('item-img')}
                                src={require('../../assets/imglcstorage/tour/tf_220816120011_732199.jpg')}
                                alt="img"
                            ></img>
                            <div className={cx('tour-item-info')}>Đà Nẵng</div>
                        </div>
                        <div className={cx('tour-item')}>
                            <img
                                className={cx('item-img')}
                                src={require('../../assets/imglcstorage/tour/tfd_220809034230_110810.jpg')}
                                alt="img"
                            ></img>
                            <div className={cx('tour-item-info')}>Đà Lạt</div>
                        </div>
                        <div className={cx('tour-item')}>
                            <img
                                className={cx('item-img')}
                                src={require('../../assets/imglcstorage/tour/tfd_220215114450_674811.jpg')}
                                alt="img"
                            ></img>
                            <div className={cx('tour-item-info')}>Phú Quốc</div>
                        </div>
                    </div>
                </section>
                <section className={cx('section-more')}>
                    <h1>Vì sao chọn Vietravel</h1>
                    <div className={cx('more-list')}>
                        <div className={cx('more-item')}>
                            <FontAwesomeIcon className={cx('icon-more')} icon={faLaptopFile} />
                            <div className={cx('more-item-title')}>Mạng bán tour</div>
                            <div className={cx('more-item-content')}>Đầu tiên tại Việt Nam</div>
                        </div>
                        <div className={cx('more-item')}>
                            <FontAwesomeIcon className={cx('icon-more')} icon={faBoxesStacked} />
                            <div className={cx('more-item-title')}>Sản phẩm & Dịch vụ</div>
                            <div className={cx('more-item-content')}>Đa dạng – Chất lượng – An toàn</div>
                        </div>
                        <div className={cx('more-item')}>
                            <FontAwesomeIcon className={cx('icon-more')} icon={faHandHoldingDollar} />
                            <div className={cx('more-item-title')}>Giá cả</div>
                            <div className={cx('more-item-content')}>Luôn có mức giá tốt nhất</div>
                        </div>
                        <div className={cx('more-item')}>
                            <FontAwesomeIcon className={cx('icon-more')} icon={faPlaneDeparture} />
                            <div className={cx('more-item-title')}>Đặt tour</div>
                            <div className={cx('more-item-content')}>Dễ dàng & nhanh chóng chỉ với 3 bước</div>
                        </div>
                        <div className={cx('more-item')}>
                            <FontAwesomeIcon className={cx('icon-more')} icon={faCreditCard} />
                            <div className={cx('more-item-title')}>Thanh toán</div>
                            <div className={cx('more-item-content')}>An toàn & linh hoạt</div>
                        </div>
                        <div className={cx('more-item')}>
                            <FontAwesomeIcon className={cx('icon-more')} icon={faPhoneVolume} />
                            <div className={cx('more-item-title')}>Hỗ trợ</div>
                            <div className={cx('more-item-content')}>Hotline & trực tuyến (08h00 - 22h00)</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
