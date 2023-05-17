import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import ASidebar from '~/layouts/components/ASidebar';
import TourCard from '~/components/Card/TourCard';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function Travel() {
    const [currentPage, setCurrentPage] = useState(1);
    const [tourList, setTourList] = useState([]);
    const [tourCount, setTourCount] = useState(0);

    let PageSize = 12;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        Rt_Cols_Mst_TourDetail: '*',
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
        Ft_RecordCount: '123456',
        Ft_WhereClause: '',
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        //setLoading(true);
        fetch('http://localhost:3000/DAMstTour/WA_Mst_TourDetail_GetForView', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourList(result.Data.Lst_Mst_TourDetail);
                setTourCount(result.Data.MySummaryTable.MyCount);
                //setLoading(false);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tourList.slice(firstPageIndex, lastPageIndex);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, tourList]);

    const sortOnPrice = (e) => {
        // when the sort-by-price select box is changed, change tourList items order to its TourPrice value
        if (e.target.value === 'asc') {
            setTourList(
                tourList.sort((a, b) => {
                    return a.mt_TourPrice - b.mt_TourPrice;
                }),
            );
        } else if (e.target.value === 'desc') {
            setTourList(
                tourList.sort((a, b) => {
                    return b.mt_TourPrice - a.mt_TourPrice;
                }),
            );
        } else {
            setTourList(tourList);
        }

        setCurrentPage(1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ASidebar />
                <div className={cx('content')}>
                    <section className={cx('over-title')}>
                        <h1 className={cx('main-title')}>Du lịch trong nước</h1>
                        <div className={cx('main-desc')}>
                            <p>
                                Trải dài khắp 3 miền Bắc, Trung, Nam; nơi nào cũng mang thiên nhiên và cảnh đẹp hùng vĩ,
                                danh lanh thắng cảnh và cả di tích mang nhiều giá trị. Mỗi tỉnh thành phố hay vùng đất
                                nào cũng là một địa điểm gợi ý du lịch tuyệt vời cho bất kì ai
                            </p>
                        </div>
                    </section>
                    <section className={cx('over-content')}>
                        <div className={cx('content-nav')}>
                            <div className={cx('nav-item')}>
                                Chúng tôi tìm thấy <b>{tourCount}</b> tours cho Quý khách.
                            </div>
                            <div className={cx('nav-item')}>
                                <span>Sắp sếp theo</span>
                                <select
                                    className={cx('select-box')}
                                    onChange={(e) => {
                                        sortOnPrice(e);
                                    }}
                                >
                                    <option value="0">--- CHỌN ---</option>
                                    <option value="asc">GIÁ TĂNG DẦN</option>
                                    <option value="desc">GIÁ GIẢM DẦN</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('content-list')}>
                            {currentData.map((tour) => (
                                <TourCard key={tour.IDNo} data={tour} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalCount={tourCount}
                            pageSize={PageSize}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo(0, 100);
                            }}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Travel;
