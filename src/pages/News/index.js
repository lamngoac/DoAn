import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import NewsCard from '~/components/Card/NewsCard';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

function News() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

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
        WAUserCode: '',
        WAUserPassword: '',
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '1000',
        Ft_WhereClause: "POW_NewsNews.FlagActive = '1'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        setLoading(true);
        fetch('/DAPNewsNews/WA_POW_NewsNews_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result.Data.Lst_POW_NewsNews);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //console.log(data);

    if (loading) {
        return <Loader />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>
                        <h1>Thông tin du lịch</h1>
                        <div className={cx('border-line')}></div>
                    </div>
                    <div className={cx('list')}>
                        {data.map((item) => (
                            <NewsCard key={item.NewsNo} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default News;
