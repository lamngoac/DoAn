import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
//import axios from 'axios';
import styles from './index.module.scss';
import images from '~/assets/images';
//import * as searchServices from '~/services/searchService';

const cx = classNames.bind(styles);

function About() {
    const [title, setTitle] = useState('');
    const [videoURL, setVideoURL] = useState('');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        Rt_Cols_POW_AboutUs: '*',
        ServiceCode: 'WEBAPP',
        Tid: '20181020.143018.986818',
        TokenID: 'TOCKENID.IDOCNET',
        RefreshToken: '',
        UtcOffset: '7',
        GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
        GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
        WAUserCode: 'SYSADMIN',
        WAUserPassword: '123456',
        FlagIsDelete: '0',
        FlagAppr: '0',
        FlagIsEndUser: '0',
        FuncType: null,
        Ft_RecordStart: '0',
        Ft_RecordCount: '1000',
        Ft_WhereClause: "POW_AboutUs.FlagActive = '1'",
        Ft_Cols_Upd: '',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    // Request API when init page
    useEffect(() => {
        fetch('DAPAboutUs/WA_POW_AboutUs_Get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTitle(result.Data.Lst_POW_AboutUs[0].Title);
                setVideoURL(result.Data.Lst_POW_AboutUs[0].VideoURL);
            })
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var URLstring = `${videoURL}?autoplay=0&mute=1`;

    //console.log(title);
    //console.log(videoURL);

    // Use httpRequest to call API http://localhost:8080/api/DAPAboutUs/WA_POW_AboutUs_Get with raw is body
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await searchServices.search(raw);
    //         setData(result);
    //     };
    //     fetchData();
    // });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h3 className={cx('title')}>{title}</h3>
                <iframe
                    width="1150"
                    height="480"
                    src={URLstring}
                    title='Vietravel chặng đường "Hình thành - Phát triển - Tiên phong" | Vietravel'
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <h3 className={cx('title', 'mt-40')}>Cơ cấu tổ chức</h3>
                <img className={cx('image')} src={images.cctc} alt="Cơ cấu tổ chức"></img>
            </div>
        </div>
    );
}

export default About;
