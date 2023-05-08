import classNames from 'classnames/bind';
import styles from './TourCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCirclePlus, faCoins, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '~/services/functionService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function TourCard({ data = {}, ...passProps }) {
    const navigate = useNavigate();

    const notify = (data, ntype = 'default') =>
        toast(data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: ntype,
        });

    const {
        TourCode,
        IDNo,
        DateStart,
        TouristNumberLeft,
        GatherTime,
        mt_TourName,
        mtt_TourTypeName,
        mt_TourThemePath,
        mt_TourDayDuration,
        mt_TourNightDuration,
        mt_TourStartPoint,
        mt_TourPrice,
    } = data;

    function handleClickDetail() {
        navigate(`/tour/${IDNo}`);
    }

    function handleClickBook() {
        // Check if user is logged in
        if (localStorage.getItem('account')) {
            navigate('/book/' + IDNo);
        } else {
            notify('Vui lòng đăng nhập để đặt tour', 'info');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }

    // If localstorage is empty, create new cart, else push to cart
    function handleClickAddToCart(id) {
        if (localStorage.getItem('cart') == null || localStorage.getItem('cart') === undefined) {
            localStorage.setItem('cart', JSON.stringify(id));
        } else {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            // Convert card from string to array
            if (typeof cart === 'string') {
                cart = [cart];
            }
            // Check if id is already in cart
            if (cart.indexOf(id) !== -1) {
                return;
            } else {
                cart.push(id);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            //localStorage.setItem('cart', null);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('frame')}>
                    <img className={cx('fr-img')} src={require(`../../../${mt_TourThemePath}`)} alt=""></img>
                    <div className={cx('fr-type')}>
                        <FontAwesomeIcon icon={faCoins} className={cx('fa-icon')} />
                        {mtt_TourTypeName}
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('tour-time')}>
                        {DateStart} - {mt_TourDayDuration}N{mt_TourNightDuration}Đ - Giờ đi: {GatherTime}
                    </div>
                    <div className={cx('tour-name')}>{mt_TourName}</div>
                    <div className={cx('tour-code')}>
                        <span>Mã tour:</span>
                        <span>
                            <FontAwesomeIcon icon={faTicket} className={cx('fa-icon')} />
                            {TourCode}-{IDNo}
                        </span>
                    </div>
                    <div className={cx('tour-depart')}>
                        Nơi khởi hành: <b>{mt_TourStartPoint}</b>
                    </div>
                    <div className={cx('tour-price')}>{formatMoney(mt_TourPrice, 0)}₫</div>
                    <div className={cx('function')}>
                        <button className={cx('btn', 'btn-order')} onClick={() => handleClickBook()}>
                            <FontAwesomeIcon icon={faCartShopping} className={cx('fa-icon')} />
                            Đặt ngay
                        </button>
                        <button className={cx('btn', 'btn-detail')} onClick={() => handleClickDetail()}>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
                <div className={cx('more')}>
                    <button className={cx('btn', 'btn-cart')} onClick={() => handleClickAddToCart(IDNo)}>
                        <FontAwesomeIcon icon={faCirclePlus} className={cx('fa-icon')} />
                        Thêm vào giỏ hàng
                    </button>
                    <div>
                        <span className={cx('more-info')}>Số chỗ còn nhận</span>
                        <span className={cx('more-number')}>{TouristNumberLeft}</span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default TourCard;
