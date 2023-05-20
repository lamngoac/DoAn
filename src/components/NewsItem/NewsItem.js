import classNames from 'classnames/bind';
import styles from './NewsItem.module.scss';

const cx = classNames.bind(styles);

function NewsItem({ data = {}, ...passProps }) {
    const { Title, Content, ImagePath } = data;

    //console.log(data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>{Title}</div>
                <div className={cx('img')}>
                    <img className={cx('img-frame')} src={require(`../../${ImagePath}`)} alt="hamh" />
                </div>
                <div className={cx('content')}>{Content}</div>
            </div>
        </div>
    );
}

export default NewsItem;
