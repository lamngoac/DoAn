import classNames from 'classnames/bind';
import { useEffect, useState, useMemo } from 'react';
import styles from './index.module.scss';
import ArticleCard from '~/components/Card/ArticleCard';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function Advertise() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    let PageSize = 10;

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
        WAUserCode: 'SYSADMIN',
        WAUserPassword: '123456',
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '1000',
        Ft_WhereClause: "Mst_Article.FlagActive = '1'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('DAMstArticle/WA_Mst_Article_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result.Data.Lst_Mst_Article);
                setCount(result.Data.MySummaryTable.MyCount);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>
                    <h1>Non Nước Việt Nam</h1>
                    <div className={cx('border-line')}></div>
                </div>
                <div className={cx('list')}>
                    {currentData.map((item) => (
                        <ArticleCard key={item.ArticleNo} data={item} />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalCount={count}
                    pageSize={PageSize}
                    onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo(0, 100);
                    }}
                />
            </div>
        </div>
    );
}

export default Advertise;
