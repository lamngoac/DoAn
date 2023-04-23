import classNames from 'classnames/bind';
import styles from './MiniItem.module.scss';

const cx = classNames.bind(styles);

function MiniItem({ data = {}, ...passProps }) {
    const { Idx, ArticleContent, ArticleImageName, ArticleImagePath, Title } = data;

    //console.log(data);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>
                    {Idx}. {Title}
                </div>
                <div className={cx('img')}>
                    <img
                        className={cx('img-frame')}
                        src={require(`../../${ArticleImagePath}`)}
                        alt={ArticleImageName}
                    />
                </div>
                <div className={cx('content')}>{ArticleContent}</div>
            </div>
        </div>
    );
}

export default MiniItem;
