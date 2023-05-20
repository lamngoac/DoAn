import classNames from 'classnames/bind';
import styles from './News.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AdminNewsTable } from '~/components/Table';
import Loader from '~/components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function News() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [searchstring, setSearchstring] = useState('');
    const [news, setNews] = useState([]);
    const [count, setCount] = useState(0);

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
            WAUserCode: 'sysadmin',
            WAUserPassword: '123456',
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
        fetch('/DAPNewsNews/WA_POW_NewsNews_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setNews(result.Data.Lst_POW_NewsNews);
                setCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));
    }, []);

    const curentData = useMemo(() => {
        let computedNews = news;

        return computedNews;
    }, [news]);

    const hadleClickSearch = () => {};

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>Quản lý tin tức</h1>
                        </section>
                        <section className={cx('function-sec')}>
                            <button className={cx('btn-add-tour')} onClick={() => navigate('/admin/news/create')}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                &nbsp; Thêm mới tin tức
                            </button>
                        </section>
                        <section className={cx('search-sec')}>
                            <div className={cx('amount-row')}>
                                Có tổng: <span className={cx('hl-info')}>{count}</span> bản ghi
                            </div>
                            <div className={cx('search-row')}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tin tức"
                                    onChange={(e) => setSearchstring(e.target.value)}
                                />
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminNewsTable data={curentData} rowsPerPage={6} />
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

export default News;
