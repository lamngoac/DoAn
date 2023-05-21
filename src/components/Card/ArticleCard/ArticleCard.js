import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.scss';
import { formatDate } from '~/services/functionService';

const cx = classNames.bind(styles);

function ArticleCard({ to, data = {}, onClick, ...passProps }) {
    // Get attributes from data object to display on card
    const { ArticleNo, ArticleTitle, ArticleDesc, ArticleThemePath, Author, PostDTime } = data;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={`/advertise/${ArticleNo}`} className={cx('img')}>
                    <img className={cx('img-frame')} src={require(`../../../${ArticleThemePath}`)} alt={ArticleTitle} />
                </Link>
                <div className={cx('content')}>
                    <Link to={`/advertise/${ArticleNo}`} className={cx('title')}>
                        {ArticleTitle}
                    </Link>
                    <div className={cx('desc')}>{ArticleDesc}</div>
                    <div className={cx('crdate')}>
                        {Author} &nbsp; {formatDate(PostDTime + '')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
