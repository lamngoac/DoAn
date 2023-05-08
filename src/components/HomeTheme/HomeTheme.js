import classNames from 'classnames/bind';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './HomeTheme.module.scss';

const cx = classNames.bind(styles);

function HomeTheme() {
    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        opacity: '0.3',
        color: '#000000',
    };

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px',
    };

    const buttonStyle = {
        width: '30px',
        background: 'none',
        border: '0px',
        opacity: '0.1',
    };

    const properties = {
        prevArrow: (
            <button style={{ ...buttonStyle }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                    <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
                </svg>
            </button>
        ),
        nextArrow: (
            <button style={{ ...buttonStyle }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                    <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
                </svg>
            </button>
        ),
    };

    const slideImages = [
        {
            url: 'http://localhost:3000/static/media/derek-thomson-TWoL-QCZubY-unsplash.a62c22bde87e17da9f95.jpg',
            caption: 'Vietravel',
        },
        {
            url: 'http://localhost:3000/static/media/dharmendra-sahu-Ia2Kjtrx8y4-unsplash.62cb24cc1518e6659d29.jpg',
            caption: 'Vietravel',
        },
        {
            url: 'http://localhost:3000/static/media/khachik-simonian-nXOB-wh4Oyc-unsplash.858279ac15145b5cece3.jpg',
            caption: 'Vietravel',
        },
        {
            url: 'http://localhost:3000/static/media/noam-almosnino-mlD9zI7FIhk-unsplash.a9e0a36d6cc9afdb77f3.jpg',
            caption: 'Vietravel',
        },
        {
            url: 'http://localhost:3000/static/media/shifaaz-shamoon-Rl9l9mL6Pvs-unsplash.79f83867632fe1d836f2.jpg',
            caption: 'Vietravel',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Slide {...properties}>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
}

export default HomeTheme;
