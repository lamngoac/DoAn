import classNames from 'classnames/bind';
import styles from './index.module.scss';
//import { getDataKey } from '~/services/cartService';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Cart() {
    const [data, setData] = useState([]);

    // Get cart from local storage
    const getTourFromCart = () => {
        const data = localStorage.getItem('cart') || {};
        return JSON.parse(data);
    };

    const cart = getTourFromCart();
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
            .then((result) => setData(result.Data.Lst_Mst_TourDetail))
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>GIỎ HÀNG</div>
                <div className={cx('desc')}>Các sản phẩm quan tâm</div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>STT</th>
                            <th>Mã tour</th>
                            <th>Ngày khởi hành</th>
                            <th>Giá tour</th>
                            <th>Số lượng chỗ còn nhận</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{index + 1}</td>
                                <td>{item}</td>
                                <td>{data[index].DateStart}</td>
                                <td>{data[index].mt_TourPrice}</td>
                                <td>{data[index].TouristNumberLeft}</td>
                                <td>
                                    <button>Xóa</button>
                                    <button>Đặt tour</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Cart;
