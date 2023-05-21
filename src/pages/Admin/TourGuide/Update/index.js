import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '~/components/Loader';
import { FlagActive } from '~/services/variableService';

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

function ArticleUpdate() {
    const navigate = useNavigate();
    const param = useParams();

    const [loading, setLoading] = useState(false);
    const [tourGuide, setTourGuide] = useState({});

    const [tgName, setTgName] = useState('');
    const [tgIDCardNo, setTgIDCardNo] = useState('');
    const [tgAddress, setTgAddress] = useState('');
    const [tgMobileNo, setTgMobileNo] = useState('');
    const [flagActive, setFlagActive] = useState('1');

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
            Rt_Cols_Mst_TourGuide: '*',
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
            Ft_WhereClause: "Mst_TourGuide.TGCode = '" + param.slug + "'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAMstTourGuide/WA_Mst_TourGuide_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourGuide(result.Data.Lst_Mst_TourGuide[0]);
                setTgName(result.Data.Lst_Mst_TourGuide[0].TGName);
                setTgIDCardNo(result.Data.Lst_Mst_TourGuide[0].TGIDCardNo);
                setTgAddress(result.Data.Lst_Mst_TourGuide[0].TGAgentAddress);
                setTgMobileNo(result.Data.Lst_Mst_TourGuide[0].TGMobileNo);
                setFlagActive(result.Data.Lst_Mst_TourGuide[0].FlagActive);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            Ft_Cols_Upd:
                'Mst_TourGuide.TGIDCardNo, Mst_TourGuide.TGAgentAddress, Mst_TourGuide.TGMobileNo, Mst_TourGuide.FlagActive',
            Mst_TourGuide: {
                TGCode: tourGuide.TGCode,
                TGName: tgName,
                TGIDCardNo: tgIDCardNo,
                TGAgentAddress: tgAddress,
                TGMobileNo: tgMobileNo,
                FlagActive: flagActive,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstTourGuide/WA_Mst_TourGuide_Update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Cập nhật thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/tourguides');
                    }, 1000);
                } else {
                    notify('Cập nhật thất bại', 'error');
                }
            })
            .catch((error) => console.log('error', error));
    };

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT</h1>
                    <button className={cx('btn-return')} onClick={() => navigate('/admin/tourguides')}>
                        QL Hướng dẫn viên
                    </button>
                    <section className={cx('tour-sec')}>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Mã HDV</div>
                                <input className={cx('std-input')} value={tourGuide.TGCode} readOnly></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Tên HDV</div>
                                <input className={cx('cbb-tt')} value={tgName} readOnly></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Số CCCD</div>
                                <input
                                    className={cx('std-input')}
                                    value={tgIDCardNo}
                                    onChange={(e) => setTgIDCardNo(e.target.value)}
                                ></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Số điện thoại</div>
                                <input
                                    className={cx('std-input')}
                                    value={tgMobileNo}
                                    onChange={(e) => setTgMobileNo(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Địa chỉ</div>
                                <textarea
                                    className={cx('std-input')}
                                    value={tgAddress}
                                    onChange={(e) => setTgAddress(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Trạng thái</div>
                                <select
                                    className={cx('std-input')}
                                    value={flagActive}
                                    onChange={(e) => setFlagActive(e.target.value)}
                                >
                                    {FlagActive.map((item, index) => (
                                        <option key={index} value={item.FlagActive}>
                                            {item.FlagActiveName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    <div className={cx('submit')}>
                        <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                            Lưu thông tin
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default ArticleUpdate;
