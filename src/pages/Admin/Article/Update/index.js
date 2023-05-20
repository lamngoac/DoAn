import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '~/components/Loader';
import { FlagShow } from '~/services/variableService';

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
    const [article, setArticle] = useState({});
    const [articleDetails, setArticleDetails] = useState([]);

    const [title, setTitle] = useState('');
    const [themepath, setThemepath] = useState('');
    const [desc, setDesc] = useState('');
    const [flagshow, setFlagshow] = useState('');

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
            Rt_Cols_Mst_Article: '*',
            Rt_Cols_Mst_ArticleDetail: '*',
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
            Ft_WhereClause: "Mst_Article.ArticleNo = '" + param.slug + "'",
            Ft_Cols_Upd: '',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DAMstArticle/WA_Mst_Article_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setArticle(result.Data.Lst_Mst_Article[0]);
                setArticleDetails(result.Data.Lst_Mst_ArticleDetail);
                setTitle(result.Data.Lst_Mst_Article[0].ArticleTitle);
                setThemepath(result.Data.Lst_Mst_Article[0].ArticleThemePath);
                setDesc(result.Data.Lst_Mst_Article[0].ArticleDesc);
                setFlagshow(result.Data.Lst_Mst_Article[0].FlagShow);
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
            Ft_Cols_Upd: '',
            Mst_Article: {
                ArticleNo: article.ArticleNo,
                ArticleTitle: title,
                ArticleDesc: desc,
                ArticleThemePath: themepath,
                FlagShow: flagshow,
            },
            Lst_Mst_ArticleDetail: articleDetails,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstArticle/WA_Mst_Article_Update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Cập nhật thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/articles');
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
                    <button className={cx('btn-return')} onClick={() => navigate('/admin/articles')}>
                        QL bài viết
                    </button>
                    <section className={cx('tour-sec')}>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Mã bài viết</div>
                                <input className={cx('std-input')} value={article.ArticleNo} readOnly></input>
                            </div>
                            <div className={cx('row-item')}>
                                <div>Hiển thị</div>
                                <select
                                    className={cx('cbb-tt')}
                                    value={flagshow}
                                    onChange={(e) => setFlagshow(e.target.value)}
                                >
                                    {FlagShow.map((item, index) => (
                                        <option key={index} value={item.FlagShow}>
                                            {item.FlagShowName}
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
                            <div className={cx('row-item')}>
                                <div>Ảnh minh họa</div>
                                <input
                                    className={cx('std-input')}
                                    value={themepath}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('row', 'dflex-sb')}>
                            <div className={cx('row-item')}>
                                <div>Mô tả</div>
                                <textarea
                                    className={cx('std-input')}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </section>
                    <section className={cx('tour-sec')}>
                        <h3>Chi tiết bài viết</h3>
                        <div className={cx('divider')}></div>
                        {articleDetails.map((item, index) => (
                            <div key={index}>
                                <div className={cx('row', 'dflex-sb')}>
                                    <div className={cx('row-item', 'width10')}>
                                        <div>Mục số</div>
                                        <input
                                            className={cx('std-input')}
                                            value={item.Idx}
                                            onChange={(e) => {
                                                let temp = [...articleDetails];
                                                temp[index].Idx = e.target.value;
                                                setArticleDetails(temp);
                                            }}
                                        ></input>
                                    </div>
                                    <div className={cx('row-item', 'width80')}>
                                        <div>Tiêu đề</div>
                                        <input
                                            className={cx('std-input')}
                                            value={item.Title}
                                            onChange={(e) => {
                                                let temp = [...articleDetails];
                                                temp[index].Title = e.target.value;
                                                setArticleDetails(temp);
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className={cx('row', 'dflex-sb')}>
                                    <div className={cx('row-item', 'width100')}>
                                        <div>Nội dung</div>
                                        <textarea
                                            className={cx('std-input')}
                                            value={item.ArticleContent}
                                            onChange={(e) => {
                                                let temp = [...articleDetails];
                                                temp[index].ArticleContent = e.target.value;
                                                setArticleDetails(temp);
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

export default ArticleUpdate;
