import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
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

function FAQUpdate() {
    const navigate = useNavigate();
    const param = useParams();

    const [loading, setLoading] = useState(false);
    //const [faqNo, setFaqNo] = useState('');
    const [fas, setFas] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flagActive, setFlagActive] = useState('');

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

    const handleSubmit = () => {
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
            Ft_Cols_Upd: 'POW_FAQ.FAQNo,POW_FAQ.Question,POW_FAQ.Answer,POW_FAQ.FlagActive',
            POW_FAQ: {
                FAQNo: fas.FAQNo,
                Question: question,
                Answer: answer,
                FlagActive: flagActive,
            },
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAPFAQ/WA_POW_FAQ_Update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Cập nhật thông tin FAQ thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/faqs');
                    }, 1000);
                } else {
                    notify('Cập nhật thông tin FAQ thất bại', 'error');
                    setLoading(false);
                }
            })
            .catch((error) => console.log('error', error));
    };

    useEffect(() => {
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
            Ft_WhereClause: `POW_FAQ.FAQNo = '${param.slug}'`,
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAPFAQ/WA_POW_FAQ_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setFas(result.Data.Lst_POW_FAQ[0]);
                setQuestion(result.Data.Lst_POW_FAQ[0].Question);
                setAnswer(result.Data.Lst_POW_FAQ[0].Answer);
                setFlagActive(result.Data.Lst_POW_FAQ[0].FlagActive);
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
                        <h1 style={{ textAlign: 'center' }}>Thông tin FAQ</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/faqs')}>
                            Danh sách FAQ
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã FAQ</div>
                                    <input className={cx('std-input')} value={fas.FAQNo} readOnly></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Câu hỏi</div>
                                    <input
                                        className={cx('std-input')}
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Câu trả lời</div>
                                    <textarea
                                        className={cx('std-input')}
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
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
                                Lưu thông tin FAQ
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default FAQUpdate;
