import classNames from 'classnames/bind';
import styles from './FAQCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FAQCard({ data = {} }) {
    const [isExpand, setIsExpand] = useState(false);

    const handleClickExpand = () => {
        setIsExpand(!isExpand);
    };

    const { Question, Answer } = data;

    if (isExpand) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>{Question}</div>
                    <button className={cx('btn-expand')} onClick={() => handleClickExpand()}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                </div>
                <div className={cx('content')}>{Answer}</div>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('title')}>{Question}</div>
                    <button className={cx('btn-expand')} onClick={() => handleClickExpand()}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>
        );
    }
}

export default FAQCard;
