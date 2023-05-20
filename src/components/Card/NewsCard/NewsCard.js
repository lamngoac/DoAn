import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

function NewsCard({ to, data = {}, onClick, ...passProps }) {
    // Get attributes from data object to display on card
    const { NewsNo, Title, NewsType, ThemeImage, Content, Author, PostDTime } = data;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={`/news/${NewsNo}`} className={cx('img')}>
                    <img className={cx('img-frame')} src={require(`../../../${ThemeImage}`)} alt={Title} />
                </Link>
                <div className={cx('content')}>
                    <Link to={`/advertise/${NewsNo}`} className={cx('title')}>
                        {Title}
                    </Link>
                    <div className={cx('desc')}>
                        {NewsType === 'TINTUC' ? (
                            <div className={cx('desc-text')}>Tin tức du lịch</div>
                        ) : NewsType === 'CAMNANG' ? (
                            <div className={cx('desc-text')}>Cẩm nang du lịch</div>
                        ) : NewsType === 'KINHNGHIEM' ? (
                            <div className={cx('desc-text')}>Kinh nghiệm du lịch</div>
                        ) : (
                            <div className={cx('desc-text')}>Không xác định</div>
                        )}
                    </div>
                    <div className={cx('crdate')}>
                        {Author} &nbsp; {PostDTime}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
