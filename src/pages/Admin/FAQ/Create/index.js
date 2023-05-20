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

function FAQCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [faqNo, setFaqNo] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    useEffect(() => {
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
                SequenceType: 'FAQNO',
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

        setLoading(true);
        fetch('/DASeq/WA_Seq_Common_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setFaqNo(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_POW_FAQ: '*',
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
            POW_FAQ: {
                FAQNo: faqNo,
                Question: question,
                Answer: answer,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPFAQ/WA_POW_FAQ_Create', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Tạo mới FAQ thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/faqs');
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
                        <h1 style={{ textAlign: 'center' }}>Tạo mới FAQ</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/faqs')}>
                            Danh sách FAQ
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã FAQ</div>
                                    <input className={cx('std-input')} value={faqNo} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Câu hỏi</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Câu trả lời</div>
                                    <textarea
                                        className={cx('std-input')}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <div className={cx('submit')}>
                            <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                                Tạo mới FAQ
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default FAQCreate;
