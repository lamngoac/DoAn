import classNames from 'classnames/bind';
import styles from './Searchcbb.module.scss';
import { useState } from 'react';
import { Combobox } from '@headlessui/react';

const cx = classNames.bind(styles);

function Searchcbb({ list = [], defaultValue, onChange }) {
    const [query, setQuery] = useState('');

    const filteredList =
        query === ''
            ? list
            : list.filter((item) => {
                  return item.ProvinceName.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <Combobox by="id" onChange={onChange}>
            <Combobox.Input
                className={cx('cbx-input')}
                placeholder="Tìm kiếm tỉnh thành"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(item) => item.ProvinceName}
                defaultValue={defaultValue}
            />
            <Combobox.Options className={cx('cbx-options')}>
                {filteredList.map((item) => (
                    <Combobox.Option className={cx('cbx-option')} key={item.ProvinceCode} value={item}>
                        {item.ProvinceName}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
}

export default Searchcbb;
