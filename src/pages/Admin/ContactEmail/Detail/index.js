import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function ContactEmailDetail() {
    const navigate = useNavigate();
    const param = useParams();

    const [loading, setLoading] = useState(false);
    const [ctEmail, setCtEmail] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_POW_ContactEmail: '*',
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
            Ft_WhereClause: "POW_ContactEmail.CENo = '" + param.slug + "'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPContact/WA_POW_ContactEmail_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCtEmail(result.Data.Lst_POW_ContactEmail[0]);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <h1 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT LIÊN HỆ</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/contactemail')}>
                            QL thông tin liên hệ
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã thông tin</div>
                                    <input className={cx('std-input')} value={ctEmail.CENo} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Hiển thị</div>
                                    <input className={cx('std-input')} value={ctEmail.InformationType} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Tên KH</div>
                                    <input className={cx('std-input')} value={ctEmail.CEName} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Số điện thoại KH</div>
                                    <input className={cx('std-input')} value={ctEmail.CEMobileNo} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Email</div>
                                    <input className={cx('std-input')} value={ctEmail.CEEmail} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Địa chỉ</div>
                                    <input className={cx('std-input')} value={ctEmail.CEAddress} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Công ty</div>
                                    <input className={cx('std-input')} value={ctEmail.CECompanyName} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Số khách</div>
                                    <input className={cx('std-input')} value={ctEmail.CETouristNumber} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Tiêu đề</div>
                                    <input className={cx('std-input')} value={ctEmail.CETitle} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Nội dung</div>
                                    <textarea className={cx('std-input')} value={ctEmail.CEContent} readOnly></textarea>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            );
        }
    }
}

export default ContactEmailDetail;
