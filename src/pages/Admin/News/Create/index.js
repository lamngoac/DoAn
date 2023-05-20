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

function NewsCreate() {
    const navigate = useNavigate();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const [loading, setLoading] = useState(false);
    const [typeList, setTypeList] = useState([]);
    const [newsNo, setNewsNo] = useState('');
    const [title, setTitle] = useState('');
    const [newstype, setNewstype] = useState('');
    const [themeImage, setThemeImage] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [newsdtl, setNewsdtl] = useState([{ NewsNo: '', Idx: '', ImagePath: '', Title: '', Content: '' }]);

    const [count, setCount] = useState(1);

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

    const handleAddDtlRow = () => {
        var newNewsDtl = [...newsdtl];
        newNewsDtl.push({ NewsNo: '', Idx: '', ImagePath: '', Title: '', Content: '' });
        setNewsdtl(newNewsDtl);
        setCount(count + 1);
    };

    const handleRemoveDtlRow = () => {
        if (count > 1) {
            var newNewsDtl = [...newsdtl];
            newNewsDtl.pop();
            setNewsdtl(newNewsDtl);
            setCount(count - 1);
        } else {
            notify('Không thể xóa bớt chi tiết', 'error');
        }
    };

    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            Rt_Cols_POW_NewsNews: '*',
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
            POW_NewsNews: {
                NewsNo: newsNo,
                Title: title,
                NewsType: newstype,
                ThemeImage: themeImage,
                Content: content,
                Author: author,
            },
            Lst_POW_NewsDetail: newsdtl,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPNewsNews/WA_POW_NewsNews_Create', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Tạo mới tin tức thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/news');
                    }, 1000);
                }
            })
            .catch((error) => console.log('error', error));
    };

    useEffect(() => {
        var raw = JSON.stringify({
            Rt_Cols_POW_NewsType: '*',
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
            Ft_RecordCount: '1000',
            Ft_WhereClause: "POW_NewsType.FlagActive = '1'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

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
                SequenceType: 'NEWSNO',
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
                setNewsNo(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);

                if (result.Success === true) {
                    fetch('/DAPNewsType/WA_POW_NewsType_Get', requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            setTypeList(result.Data.Lst_POW_NewsType);
                            setLoading(false);
                        })
                        .catch((error) => console.log('error', error));
                }
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
                        <h1 style={{ textAlign: 'center' }}>Tạo mới tin tức</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/news')}>
                            Danh sách tin tức
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã tin tức</div>
                                    <input className={cx('std-input')} value={newsNo} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Loại tin tức</div>
                                    <select className={cx('cbb-tt')} onChange={(e) => setNewstype(e.target.value)}>
                                        <option value="0">-- Chọn loại tin tức --</option>
                                        {typeList.map((item, index) => (
                                            <option key={index} value={item.NewsType}>
                                                {item.NewsName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Tác giả</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Ảnh chủ đề</div>
                                    <input
                                        type="file"
                                        className={cx('std-input')}
                                        onChange={(e) =>
                                            setThemeImage(`assets/imglcstorage/news/${e.target.files[0].name}`)
                                        }
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Tiêu đề tin tức</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Mô tả tin tức</div>
                                    <textarea
                                        className={cx('std-input')}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <section className={cx('tour-sec')}>
                            <h3>Chi tiết tin tức</h3>
                            <div className={cx('function')}>
                                <button className={cx('btn-add')} onClick={() => handleAddDtlRow()}>
                                    Thêm dòng
                                </button>
                                <button className={cx('btn-remove')} onClick={() => handleRemoveDtlRow()}>
                                    Bớt dòng
                                </button>
                            </div>
                        </section>
                        <section className={cx('tour-sec')}>
                            {Array.from({ length: count }, (e, i) => {
                                return (
                                    <div className={cx('divider')} key={i}>
                                        <div className={cx('row', 'dflex-sb')}>
                                            <div className={cx('row-item', 'width10')}>
                                                <div>Chỉ mục</div>
                                                <input
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newNewsDtl = [...newsdtl];
                                                        newNewsDtl[i].Idx = e.target.value;
                                                        newNewsDtl[i].NewsNo = newsNo;
                                                        setNewsdtl(newNewsDtl);
                                                    }}
                                                ></input>
                                            </div>
                                            <div className={cx('row-item', 'width70')}>
                                                <div>Ảnh minh họa</div>
                                                <input
                                                    type="file"
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newNewsDtl = [...newsdtl];
                                                        newNewsDtl[
                                                            i
                                                        ].ImagePath = `assets/imglcstorage/news/${e.target.files[0].name}`;
                                                        setNewsdtl(newNewsDtl);
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className={cx('row', 'dflex-sb')}>
                                            <div className={cx('row-item', 'width100')}>
                                                <div>Tiêu đề</div>
                                                <input
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newNewsDtl = [...newsdtl];
                                                        newNewsDtl[i].Title = e.target.value;
                                                        setNewsdtl(newNewsDtl);
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className={cx('row', 'dflex-sb')}>
                                            <div className={cx('row-item', 'width100')}>
                                                <div>Nội dung</div>
                                                <textarea
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newNewsDtl = [...newsdtl];
                                                        newNewsDtl[i].Content = e.target.value;
                                                        setNewsdtl(newNewsDtl);
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                        <div className={cx('submit')}>
                            <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                                Tạo mới tin tức
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default NewsCreate;
