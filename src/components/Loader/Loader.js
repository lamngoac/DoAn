import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

function Loader() {
    return (
        <div className={cx('loader-container')}>
            <div className={cx('spinner')}></div>
        </div>
    );
}

export default Loader;
