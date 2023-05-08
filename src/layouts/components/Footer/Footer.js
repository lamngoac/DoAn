import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import images from '~/assets/images';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const [province, setProvince] = useState([]);
    const [tourType, setTourType] = useState([]);
    const [contact, setContact] = useState([]);

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
        Ft_WhereClause: "Mst_Province.FlagActive = '1' and Mst_Province.FlagMenuShow = '1'",
        Ft_Cols_Upd: '',
    });

    var raw_tt = JSON.stringify({
        Rt_Cols_Mst_TourType: '*',
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
        Ft_WhereClause: '',
        Ft_Cols_Upd: '',
    });

    var raw_ct = JSON.stringify({
        Rt_Cols_POW_Contact: '*',
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

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    var requestOptions_tt = {
        method: 'POST',
        headers: myHeaders,
        body: raw_tt,
        redirect: 'follow',
    };

    var requestOptions_ct = {
        method: 'POST',
        headers: myHeaders,
        body: raw_ct,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('http://localhost:3000/DAMstProvince/WA_Mst_Province_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => setProvince(result.Data.Lst_Mst_Province))
            .catch((error) => console.log('error', error));

        fetch('http://localhost:3000/DAMstTourType/WA_Mst_TourType_Get', requestOptions_tt)
            .then((response) => response.json())
            .then((result) => setTourType(result.Data.Lst_Mst_TourType))
            .catch((error) => console.log('error', error));

        fetch('http://localhost:3000/DAPContact/WA_POW_Contact_Get', requestOptions_ct)
            .then((response) => response.json())
            .then((result) => setContact(result.Data.Lst_POW_Contact[0]))
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footer-line')}>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Du lịch trong nước</h3>
                        <ul className={cx('footer-list')}>
                            {province.map((item, index) => (
                                <li className={cx('item-w50')} key={index}>
                                    {item.ProvinceName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Dòng tour</h3>
                        <ul className={cx('footer-list')}>
                            {tourType.map((item, index) => (
                                <li className={cx('item-w100')} key={index}>
                                    {item.TourTypeName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('footer-item', 'wide50')}>
                        <h3 className={cx('footer-title')}>Ứng dụng di động</h3>
                        <div className={cx('footer-list')}>
                            <div className={cx('item-w50', 'dblock')}>
                                <img src={images.appstore} alt="appstore" />
                                <div style={{ paddingLeft: '8px' }}>Android</div>
                                <img src={images.android} alt="android" />
                            </div>
                            <div className={cx('item-w50', 'dblock')}>
                                <img src={images.googleplay} alt="googleplay" />
                                <div style={{ paddingLeft: '8px' }}>iOS</div>
                                <img src={images.ios} alt="iOS" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('footer-line')}>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Liên hệ</h3>
                        <div className={cx('footer-list')}>
                            <div className={cx('item-w100')}>{contact.ContactAddress}</div>
                            <div className={cx('item-w100')}>{contact.ContactPhoneNo}</div>
                            <div className={cx('item-w100')}>{contact.ContactFax}</div>
                            <div className={cx('item-w100')}>{contact.ContactEmail}</div>
                        </div>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Mạng xã hội</h3>
                        <div className={cx('footer-list')}>
                            <div className={cx('item-w100')}>
                                <a className={cx('link-logo')} href="https://www.facebook.com/vietravel/">
                                    <img className={cx('img-logo')} src={images.facebook} alt="facebook" />
                                </a>
                                <a
                                    className={cx('link-logo')}
                                    href="https://www.youtube.com/channel/UCY4diIi4ZvrcZIfpLTTM11g"
                                >
                                    <img className={cx('img-logo')} src={images.youtube} alt="youtube" />
                                </a>
                                <a className={cx('link-logo')} href="https://zalo.me/vietravel/">
                                    <img className={cx('img-logo')} src={images.zalo} alt="zalo" />
                                </a>
                                <a
                                    className={cx('link-logo')}
                                    href="https://invite.viber.com/?g2=AQB8wC0DUgDueEuLGo5BAeemjjx4ry%2Fe5vhdAApryxsvJron7Hxr0xmLNk%2FISS2j&lang=vi"
                                >
                                    <img className={cx('img-logo')} src={images.call} alt="call" />
                                </a>
                                <a className={cx('link-logo')} href="https://www.instagram.com/vietravel/">
                                    <img className={cx('img-logo')} src={images.instagram} alt="instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Thông tin</h3>
                        <div className={cx('footer-list')}>
                            <div className={cx('item-w100')}>Tin tức</div>
                        </div>
                    </div>
                    <div className={cx('footer-item', 'wide25')}>
                        <h3 className={cx('footer-title')}>Chứng nhận</h3>
                        <div className={cx('footer-list')}>
                            <div className={cx('item-w100', 'mb16')}>
                                <img src={images.dcma} alt="dmca" />
                            </div>
                            <div className={cx('item-w100')}>
                                <img src={images.verified} alt="verified" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('copy-right')}>
                <p>Bản quyền của Vietravel ® 2016. Bảo lưu mọi quyền.</p>
                <p>
                    Ghi rõ nguồn <Link to={'/'}>www.travel.com.vn</Link> ® khi sử dụng lại thông tin từ website này.
                </p>
                <p>Số giấy phép kinh doanh lữ hành Quốc tế: 79-234/2014/TCDL-GP LHQT</p>
            </div>
        </footer>
    );
}

export default Footer;
