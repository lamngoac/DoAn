import classNames from 'classnames/bind';
import styles from './TourDetails.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Loader from '~/components/Loader';
import { AdminTourDetailsTable } from '~/components/Table';
import { ToastContainer, toast } from 'react-toastify';
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

function TourDetails() {
    const navigate = useNavigate();
    const [searchstring, setSearchstring] = useState('');
    const [loading, setLoading] = useState(false);
    const [tourdetails, setTourdetails] = useState([]);
    const [count, setCount] = useState(0);

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
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        setLoading(true);
        fetch('/DAMstTour/WA_Mst_TourDetail_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTourdetails(result.Data.Lst_Mst_TourDetail);
                setCount(result.Data.MySummaryTable.MyCount);
                setLoading(false);
            })
            .catch((error) => console.log('error', error));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentData = useMemo(() => {
        let tmp = tourdetails;
        return tmp;
    }, [tourdetails]);

    const hadleClickSearch = () => {
        if (searchstring) {
            var raw = JSON.stringify({
                Rt_Cols_Mst_TourDetail: '*',
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
                Ft_WhereClause: `Mst_TourDetail.TourCode like '%${searchstring}%' or Mst_TourDetail.IDNo like '%${searchstring}%'`,
                Ft_Cols_Upd: '',
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DAMstTour/WA_Mst_TourDetail_Get', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setTourdetails(result.Data.Lst_Mst_TourDetail);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        } else {
            var raw_org = JSON.stringify({
                Rt_Cols_Mst_TourDetail: '*',
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
            });

            var requestOptions_org = {
                method: 'POST',
                headers: myHeaders,
                body: raw_org,
                redirect: 'follow',
            };

            setLoading(true);
            fetch('/DAMstTour/WA_Mst_TourDetail_Get', requestOptions_org)
                .then((response) => response.json())
                .then((result) => {
                    setTourdetails(result.Data.Lst_Mst_TourDetail);
                    setCount(result.Data.MySummaryTable.MyCount);
                    setLoading(false);
                })
                .catch((error) => console.log('error', error));
        }

        setSearchstring('');
    };

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (!loading) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <section className={cx('title-sec')}>
                            <h1>Quản lý thông tin chi tiết tour</h1>
                        </section>
                        <section className={cx('function-sec')}>
                            <button className={cx('btn-add-tour')} onClick={() => navigate('/admin/tourdetail/create')}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                &nbsp; Thêm mới tour
                            </button>
                        </section>
                        <section className={cx('search-sec')}>
                            <div className={cx('amount-row')}>
                                Có tổng: <span className={cx('hl-info')}>{count}</span> bản ghi
                            </div>
                            <div className={cx('search-row')}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tour"
                                    onChange={(e) => setSearchstring(e.target.value)}
                                />
                                <button type="button" className={cx('btn-search')} onClick={() => hadleClickSearch()}>
                                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </section>
                        <section className={cx('table-sec')}>
                            <AdminTourDetailsTable data={currentData} rowsPerPage={6} />
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

export default TourDetails;
