import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import MiniItem from '~/components/MiniItem';

const cx = classNames.bind(styles);

function Article(props) {
    const [mstdata, setMstdata] = useState([]);
    const [dtldata, setDtldata] = useState([]);

    const param = useParams();

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
        Ft_WhereClause: "Mst_Article.FlagActive = '1' and Mst_Article.ArticleNo = '" + param.slug + "'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('http://localhost:3000/DAMstArticle/WA_Mst_Article_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setMstdata(result.Data.Lst_Mst_Article[0]);
                setDtldata(result.Data.Lst_Mst_ArticleDetail);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { ArticleTitle, ArticleDesc, Author, PostDTime } = mstdata;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('mst-data')}>
                    <div className={cx('title')}>{ArticleTitle}</div>
                    <div className={cx('desc')}>{ArticleDesc}</div>
                    <div className={cx('crdate')}>
                        {Author} &nbsp; {PostDTime}
                    </div>
                </div>
                <div className={cx('dtl-data')}>
                    {dtldata.map((item, index) => (
                        <MiniItem key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Article;
