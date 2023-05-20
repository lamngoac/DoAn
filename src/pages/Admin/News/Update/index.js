import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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

function NewsUpdate() {
    const navigate = useNavigate();
    const param = useParams();

    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState({});
    const [newsDetail, setNewsDetail] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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

    useEffect(() => {
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
            Ft_WhereClause: "POW_NewsNews.NewsNo = '" + param.slug + "'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAPNewsNews/WA_POW_NewsNews_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setNews(result.Data.Lst_POW_NewsNews[0]);
                setNewsDetail(result.Data.Lst_POW_NewsDetail);
                setTitle(result.Data.Lst_POW_NewsNews[0].Title);
                setContent(result.Data.Lst_POW_NewsNews[0].Content);
                setFlagActive(result.Data.Lst_POW_NewsNews[0].FlagActive);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                NewsNo: news.NewsNo,
                Title: title,
                Content: content,
                FlagActive: flagActive,
            },
            Lst_POW_NewsDetail: newsDetail,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAPNewsNews/WA_POW_NewsNews_Update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Cập nhật thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/news');
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
                        <h1 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/news')}>
                            QL tin tức
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã tin</div>
                                    <input className={cx('std-input')} value={news.NewsNo} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Trạng thái</div>
                                    <select
                                        className={cx('cbb-tt')}
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
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Tiêu đề</div>
                                    <input
                                        className={cx('std-input')}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mô tả</div>
                                    <textarea
                                        className={cx('std-input')}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <section className={cx('tour-sec')}>
                            <h3>Chi tiết bài viết</h3>
                            <div className={cx('divider')}></div>
                            {newsDetail.map((item, index) => (
                                <div key={index}>
                                    <div className={cx('row', 'dflex-sb')}>
                                        <div className={cx('row-item', 'width10')}>
                                            <div>Mục số</div>
                                            <input
                                                className={cx('std-input')}
                                                value={item.Idx}
                                                onChange={(e) => {
                                                    let temp = [...newsDetail];
                                                    temp[index].Idx = e.target.value;
                                                    setNewsDetail(temp);
                                                }}
                                            ></input>
                                        </div>
                                        <div className={cx('row-item', 'width80')}>
                                            <div>Tiêu đề</div>
                                            <input
                                                className={cx('std-input')}
                                                value={item.Title}
                                                onChange={(e) => {
                                                    let temp = [...newsDetail];
                                                    temp[index].Title = e.target.value;
                                                    setNewsDetail(temp);
                                                }}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className={cx('row', 'dflex-sb')}>
                                        <div className={cx('row-item', 'width100')}>
                                            <div>Nội dung</div>
                                            <textarea
                                                className={cx('std-input')}
                                                value={item.Content}
                                                onChange={(e) => {
                                                    let temp = [...newsDetail];
                                                    temp[index].Content = e.target.value;
                                                    setNewsDetail(temp);
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
}

export default NewsUpdate;
