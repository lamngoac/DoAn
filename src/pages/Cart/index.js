import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import { formatDate, formatMoney } from '~/services/functionService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
    const navigate = useNavigate();

    const cartExist = localStorage.getItem('cart');

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Get cart from local storage
    // const getTourFromCart = () => {
    //     const data = localStorage.getItem('cart') || {};
    //     return JSON.parse(data);
    // };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartString = [cart].toString();

    //Convert cart from Object to string and add '' to each item
    cartString = cartString.split(',').map((item) => `'${item}'`);
    //console.log(cartString.toString());
    var sq = cartString.toString();

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
        Ft_WhereClause: `Mst_TourDetail.IDNo in ${sq}`,
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('http://localhost:3000/DAMstTour/WA_Mst_TourDetail_GetForView', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result.Data.Lst_Mst_TourDetail);
                setIsLoaded(true);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickRemove = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter((item) => item !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    };

    const handleClickBook = (id) => {
        //console.log(id);
        const user = JSON.parse(localStorage.getItem('account'));
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/book/${id}`);
        }
    };

    if (cartExist) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>GIỎ HÀNG</div>
                    <div className={cx('desc')}>Các sản phẩm bạn quan tâm:</div>
                    <table>
                        <thead>
                            <tr>
                                <th className={cx('w50')}>STT</th>
                                <th className={cx('w100')}>Mã tour</th>
                                <th className={cx('w200')}>Ngày khởi hành</th>
                                <th className={cx('w100')}>Giá tour</th>
                                <th className={cx('w200')}>Số lượng chỗ còn nhận</th>
                                <th className={cx('w300')}>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoaded ? (
                                cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className={cx('w50')}>{index + 1}</td>
                                        <td className={cx('w100')}>{item}</td>
                                        <td className={cx('w200')}>{formatDate(data[index].DateStart)}</td>
                                        <td className={cx('w100')}>{formatMoney(data[index].mt_TourPrice, 0)} đ</td>
                                        <td className={cx('w200')}>{data[index].TouristNumberLeft}</td>
                                        <td className={cx('w300')}>
                                            <button
                                                className={cx('btn', 'btn-remove', 'mr16')}
                                                onClick={() => handleClickRemove(item)}
                                            >
                                                Xóa
                                            </button>
                                            <button
                                                className={cx('btn', 'btn-book')}
                                                value={item}
                                                onClick={(e) => handleClickBook(e.target.value)}
                                            >
                                                Đặt tour
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>GIỎ HÀNG</div>
                    <div className={cx('desc')}>Không có sản phẩm nào trong giở hàng</div>
                    <table>
                        <thead>
                            <tr>
                                <th className={cx('w50')}>STT</th>
                                <th className={cx('w100')}>Mã tour</th>
                                <th className={cx('w200')}>Ngày khởi hành</th>
                                <th className={cx('w100')}>Giá tour</th>
                                <th className={cx('w200')}>Số lượng chỗ còn nhận</th>
                                <th className={cx('w300')}>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Cart;
