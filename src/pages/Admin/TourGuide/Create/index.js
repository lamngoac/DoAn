import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function TourGuideCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [tgCode, setTgCode] = useState('');

    const [tgName, setTgName] = useState('');
    const [tgIDCardNo, setTgIDCardNo] = useState('');
    const [tgAddress, setTgAddress] = useState('');
    const [tgMobileNo, setTgMobileNo] = useState('');

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

        var raw_seq = JSON.stringify({
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
            Seq_Common: {
                SequenceType: 'TOURGUIDENO',
                Param_Prefix: '',
                Param_Postfix: '',
            },
        });

        var requestOptions_seq = {
            method: 'POST',
            headers: myHeaders,
            body: raw_seq,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DASeq/WA_Seq_Common_Get', requestOptions_seq)
            .then((response) => response.json())
            .then((result) => {
                setTgCode(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);
                setLoading(false);
            })
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
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Mst_TourGuide: {
                TGCode: tgCode,
                TGName: tgName,
                TGIDCardNo: tgIDCardNo,
                TGAgentAddress: tgAddress,
                TGMobileNo: tgMobileNo,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstTourGuide/WA_Mst_TourGuide_Create', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Tạo mới HDV thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/tourguides');
                    }, 1000);
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
                        <h1 style={{ textAlign: 'center' }}>Tạo mới HDV du lịch</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/tourguides')}>
                            Danh sách bài viết
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã HDV</div>
                                    <input className={cx('std-input')} value={tgCode} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Tên HDV</div>
                                    <input className={cx('cbb-tt')} onChange={(e) => setTgName(e.target.value)}></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Số CCCD</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setTgIDCardNo(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Số điện thoại</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setTgMobileNo(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Địa chỉ</div>
                                    <textarea
                                        className={cx('std-input')}
                                        onChange={(e) => setTgAddress(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <div className={cx('submit')}>
                            <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                                Tạo mới HDV
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default TourGuideCreate;
