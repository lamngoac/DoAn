import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFax, faLocationDot, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import { InfoType } from '~/services/variableService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function Contact() {
    const [loading, setLoading] = useState(false);
    const [ceNo, setCeNo] = useState('');
    const [contactInfo, setContactInfo] = useState([]);

    const [infoType, setInfoType] = useState(InfoType[0].InfoType);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [guest, setGuest] = useState(0);
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
                SequenceType: 'CONTACTEMAILNO',
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

        var raw_ct = JSON.stringify({
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

        var requestOptions_ct = {
            method: 'POST',
            headers: myHeaders,
            body: raw_ct,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAPContact/WA_POW_Contact_Get', requestOptions_ct)
            .then((response) => response.json())
            .then((result) => {
                setContactInfo(result.Data.Lst_POW_Contact[0]);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch((error) => console.log('error', error));

        fetch('/DASeq/WA_Seq_Common_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => setCeNo(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark))
            .catch((error) => console.log('error', error));
    }, []);

    const handleSubmit = () => {
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
            POW_ContactEmail: {
                CENo: ceNo,
                InformationType: infoType,
                CEName: name,
                CEEmail: email,
                CEMobileNo: phone,
                CECompanyName: company,
                CETouristNumber: guest,
                CEAddress: address,
                CETitle: title,
                CEContent: content,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPContact/WA_POW_ContactEmail_Create', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Gửi thông tin thành công!', 'success');
                } else {
                    notify('Gửi không thành công!', 'error');
                }
            })
            .catch((error) => console.log('error', error));

        setInfoType(InfoType[0].InfoType);
        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setGuest(0);
        setAddress('');
        setTitle('');
        setContent('');

        // Clear all input and textarea
        var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        var textareas = document.getElementsByTagName('textarea');
        for (i = 0; i < textareas.length; i++) {
            textareas[i].value = '';
        }
    };

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1 style={{ textAlign: 'center', color: '#fd5056' }}>Thông tin liên hệ</h1>
                    <div className={cx('divider')}></div>
                    <h4 style={{ textAlign: 'center' }}>
                        Để có thể đáp ứng được các yêu cầu và các ý kiến đóng góp của quý khách một cách nhanh chóng vui
                        lòng xin liên hệ
                    </h4>
                    <section className={cx('content')}>
                        <div className={cx('contact-mail')}>
                            <h3 style={{ color: '#fd5056' }}>Gửi thông tin</h3>
                            <div className={cx('divider')}></div>
                            <div className={cx('row')}>
                                <div className={cx('row-item', 'width30')}>
                                    <div className={cx('required')}>Loại thông tin</div>
                                    <select className={cx('cbb-tt')} onChange={(e) => setInfoType(e.target.value)}>
                                        {InfoType.map((item, index) => (
                                            <option key={index} value={item.InfoType}>
                                                {item.InfoType}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={cx('row-item', 'width30')}>
                                    <div className={cx('required')}>Họ tên</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item', 'width30')}>
                                    <div className={cx('required')}>Email</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row-item', 'width30')}>
                                    <div className={cx('required')}>Điện thoại</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setPhone(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item', 'width30')}>
                                    <div>Tên công ty</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setCompany(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item', 'width30')}>
                                    <div>Số khách</div>
                                    <input
                                        type="number"
                                        className={cx('std-input')}
                                        onChange={(e) => setGuest(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Địa chỉ</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setAddress(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div className={cx('required')}>Tiêu đề</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div className={cx('required')}>Nội dung</div>
                                    <textarea
                                        className={cx('std-input')}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className={cx('submit-area')}>
                                <button className={cx('btn-submit')} onClick={() => handleSubmit()}>
                                    Gửi đi
                                </button>
                            </div>
                        </div>
                        <div className={cx('contact-map')}>
                            <h3 style={{ color: '#fd5056' }}>Địa chỉ liên lạc cụ thể</h3>
                            <div className={cx('divider')}></div>
                            <h2>TRỤ SỞ</h2>
                            <div className={cx('divider')}></div>
                            <div className={cx('al-row')}>
                                <FontAwesomeIcon className={cx('fa-icon')} icon={faLocationDot} />
                                <span>{contactInfo.ContactAddress}</span>
                            </div>
                            <div className={cx('al-row')}>
                                <FontAwesomeIcon className={cx('fa-icon')} icon={faPhoneFlip} />
                                <span>Tel: {contactInfo.ContactPhoneNo}</span>
                            </div>
                            <div className={cx('al-row')}>
                                <FontAwesomeIcon className={cx('fa-icon')} icon={faFax} />
                                <span>Fax: {contactInfo.ContactFax}</span>
                            </div>
                            <div className={cx('al-row')}>
                                <FontAwesomeIcon className={cx('fa-icon')} icon={faEnvelope} />
                                <span>Email: {contactInfo.ContactEmail}</span>
                            </div>
                            <div className={cx('map-frame')}>
                                <iframe
                                    src={contactInfo.ContactMapAPI}
                                    title="ggmap"
                                    style={{
                                        width: '500px',
                                        height: '450px',
                                        style: 'border:0',
                                        allowfullscreen: '',
                                        loading: 'lazy',
                                        referrerpolicy: 'no-referrer-when-downgrade',
                                    }}
                                ></iframe>
                            </div>
                        </div>
                    </section>
                    <ToastContainer />
                </div>
            </div>
        );
    }
}

export default Contact;
