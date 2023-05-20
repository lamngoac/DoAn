import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '~/components/Loader';
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

function Contact() {
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState([]);

    const [ctAddress, setCtAddress] = useState('');
    const [ctEmail, setCtEmail] = useState('');
    const [ctPhone, setCtPhone] = useState('');
    const [ctFax, setCtFax] = useState('');
    const [ctMap, setCtMap] = useState('');

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

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_POW_Contact: '*',
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
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAPContact/WA_POW_Contact_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setContact(result.Data.Lst_POW_Contact[0]);
                setCtAddress(result.Data.Lst_POW_Contact[0].ContactAddress);
                setCtEmail(result.Data.Lst_POW_Contact[0].ContactEmail);
                setCtPhone(result.Data.Lst_POW_Contact[0].ContactPhoneNo);
                setCtFax(result.Data.Lst_POW_Contact[0].ContactFax);
                setCtMap(result.Data.Lst_POW_Contact[0].ContactMapAPI);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    }, []);

    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_POW_Contact: '*',
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
                'POW_Contact.ContactAddress,POW_Contact.ContactPhoneNo,POW_Contact.ContactFax,POW_Contact.ContactEmail,POW_Contact.ContactMapAPI',
            POW_Contact: {
                ContactNo: contact.ContactNo,
                ContactAddress: ctAddress,
                ContactPhoneNo: ctPhone,
                ContactFax: ctFax,
                ContactEmail: ctEmail,
                ContactMapAPI: ctMap,
                FlagActive: '1',
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPContact/WA_POW_Contact_Update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Cập nhật thông tin liên lạc thành công', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    notify('Cập nhật thông tin liên lạc thất bại', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <h1 style={{ textAlign: 'center' }}>THÔNG TIN LIÊN LẠC TRAVEL.COM</h1>
                        <section className={cx('tour-sec')}>
                            <h2>Địa chỉ, thông tin liên lạc Travel.com</h2>
                            <div className={cx('divider')}></div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Địa chỉ</div>
                                    <input
                                        className={cx('std-input')}
                                        value={ctAddress}
                                        onChange={(e) => setCtAddress(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Email</div>
                                    <input
                                        className={cx('std-input')}
                                        value={ctEmail}
                                        onChange={(e) => setCtEmail(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Số điện thoại</div>
                                    <input
                                        className={cx('std-input')}
                                        value={ctPhone}
                                        onChange={(e) => setCtPhone(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Số Fax</div>
                                    <input
                                        className={cx('std-input')}
                                        value={ctFax}
                                        onChange={(e) => setCtFax(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Thông tin định vị Map</div>
                                    <textarea
                                        className={cx('std-input')}
                                        value={ctMap}
                                        onChange={(e) => setCtMap(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <div className={cx('submit')}>
                            <button className={cx('std-btn', 'btn-add')} onClick={() => handleSubmit()}>
                                Lưu thông tin
                            </button>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            );
        }
    }
}

export default Contact;
