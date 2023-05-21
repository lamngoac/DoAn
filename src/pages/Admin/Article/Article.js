import classNames from 'classnames/bind';
import styles from './Article.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AdminArticleTable } from '~/components/Table';
import Loader from '~/components/Loader';
import { ToastContainer } from 'react-toastify';
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

function Article() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [searchstring, setSearchstring] = useState('');
    const [articles, setArticles] = useState([]);
    const [count, setCount] = useState(0);

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
        fetch('/DAMstArticle/WA_Mst_Article_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setArticles(result.Data.Lst_Mst_Article);
                setCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    }, []);

    const hadleClickSearch = () => {
        if (searchstring) {
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
                Ft_WhereClause: `Mst_Article.ArticleNo like '%${searchstring}%' or Mst_Article.ArticleTitle like '%${searchstring}%'`,
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
                    setArticles(result.Data.Lst_Mst_Article);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setSearchstring('');
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        } else {
            var myHeaders_org = new Headers();
            myHeaders_org.append('Content-Type', 'application/json');

            var raw_org = JSON.stringify({
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
                Ft_WhereClause: '',
                Ft_Cols_Upd: '',
            });

            var requestOptions_org = {
                method: 'POST',
                headers: myHeaders_org,
                body: raw_org,
                redirect: 'follow',
            };

            //setLoading(true);
            fetch('/DAMstArticle/WA_Mst_Article_Get', requestOptions_org)
                .then((response) => response.json())
                .then((result) => {
                    setArticles(result.Data.Lst_Mst_Article);
                    setCount(result.Data.MySummaryTable.MyCount);
                    //setLoading(false);
                })
                .catch((error) => console.log('error', error));
        }
    };

    const currentData = useMemo(() => {
        let computedData = articles;
        return computedData;
    }, [articles]);

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>Quản lý bài viết</h1>
                        </section>
                        <section className={cx('function-sec')}>
                            <button className={cx('btn-add-tour')} onClick={() => navigate('/admin/article/create')}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                &nbsp; Thêm mới bài viết
                            </button>
                        </section>
                        <section className={cx('search-sec')}>
                            <div className={cx('amount-row')}>
                                Có tổng: <span className={cx('hl-info')}>{count}</span> bản ghi
                            </div>
                            <div className={cx('search-row')}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tuyến tour"
                                    onChange={(e) => setSearchstring(e.target.value)}
                                />
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminArticleTable data={currentData} rowsPerPage={6} />
                        </section>
                    </div>
                    <ToastContainer />
                </div>
            );
        } else {
            return <Loader />;
        }
    }
}

export default Article;
