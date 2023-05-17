import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import Loader from '~/components/Loader';
import { BookingHistoryTable } from '~/components/Table';

const cx = classNames.bind(styles);

function BookingHistory() {
    const [loading, setLoading] = useState(false);
    const [bookhis, setBookhis] = useState([]);
    const [bookhisdtl, setBookhisdtl] = useState([]);
    const [bookCount, setBookCount] = useState(0);

    const username = JSON.parse(localStorage.getItem('account')).username;
    const password = JSON.parse(localStorage.getItem('account')).password;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        Rt_Cols_Book_Tour: '*',
        Rt_Cols_Book_TourDetail: '*',
        ServiceCode: 'WEBAPP',
        Tid: '20181020.143018.986818',
        TokenID: 'TOCKENID.IDOCNET',
        RefreshToken: '',
        UtcOffset: '7',
        GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
        GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
        WAUserCode: username,
        WAUserPassword: password,
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '123456',
        Ft_WhereClause: `Book_Tour.UserCode = '${username}'`,
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
        fetch('/DABook/WA_Book_Tour_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setBookhis(result.Data.Lst_Book_Tour);
                setBookhisdtl(result.Data.Lst_Book_TourDetail);
                setBookCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loader />
            ) : (
                <div className={cx('inner')}>
                    <div className={cx('title')}>Lịch sử đặt Tour</div>
                    <div className={cx('book-count')}>
                        Có tổng: <b>{bookCount}</b> bản ghi
                    </div>
                    <div className={cx('content')}>
                        <BookingHistoryTable data={bookhis} rowsPerPage={5} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingHistory;
