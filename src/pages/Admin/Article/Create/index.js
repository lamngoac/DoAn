import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '~/components/Loader';

const cx = classNames.bind(styles);

var adminname = '';
var adminpassword = '';

if (localStorage.getItem('account') && JSON.parse(localStorage.getItem('account')).isAdmin === '1') {
    adminname = JSON.parse(localStorage.getItem('account')).username;
    adminpassword = JSON.parse(localStorage.getItem('account')).password;
} else {
    adminname = '';
    adminpassword = '';
}

function ArticleCreate() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [articleNo, setArticleNo] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [articleDetails, setArticleDetails] = useState([
        { ArticleNo: '', Idx: '', Title: '', ArticleContent: '', ArticleImagePath: '', ArticleImageName: '' },
    ]);

    const [articleTitle, setArticleTitle] = useState('');
    const [articleDesc, setArticleDesc] = useState('');
    const [articleThemePath, setArticleThemePath] = useState('');
    const [articleProvinceCode, setArticleProvinceCode] = useState('');

    const [count, setCount] = useState(1);

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

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw_provinces = JSON.stringify({
            Rt_Cols_Mst_Province: '*',
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: "Mst_Province.FlagActive = '1'",
            Ft_Cols_Upd: '',
        });

        var requestOptions_provinces = {
            method: 'POST',
            headers: myHeaders,
            body: raw_provinces,
            redirect: 'follow',
        };

        var raw_seq = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '123456',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Seq_Common: {
                SequenceType: 'ARTICLENO',
                Param_Prefix: '',
                Param_Postfix: '',
            },
        });

        var requestOptions_seq = {
            method: 'POST',
            headers: myHeaders,
            body: raw_seq,
            redirect: 'follow',
        };

        setLoading(true);
        fetch('/DASeq/WA_Seq_Common_Get', requestOptions_seq)
            .then((response) => response.json())
            .then((result) => {
                setArticleNo(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark);

                if (result.Success === true) {
                    fetch('/DAMstProvince/WA_Mst_Province_Get', requestOptions_provinces)
                        .then((response) => response.json())
                        .then((result) => {
                            setProvinces(result.Data.Lst_Mst_Province);
                            setLoading(false);
                        })
                        .catch((error) => console.log('error', error));
                }
            })
            .catch((error) => console.log('error', error));
    }, []);

    const handleAddDtlRow = () => {
        var newArticleDetails = [...articleDetails];
        newArticleDetails.push({
            ArticleNo: '',
            Idx: '',
            Title: '',
            ArticleContent: '',
            ArticleImagePath: '',
            ArticleImageName: '',
        });
        setArticleDetails(newArticleDetails);
        setCount(count + 1);
    };

    const handleRemoveDtlRow = () => {
        if (count > 1) {
            var newArticleDetails = [...articleDetails];
            newArticleDetails.pop();
            setArticleDetails(newArticleDetails);
            setCount(count - 1);
        } else {
            notify('Không thể xóa bớt chi tiết', 'error');
        }
    };

    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: adminname,
            WAUserPassword: adminpassword,
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '1000',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Mst_Article: {
                ArticleNo: articleNo,
                ArticleTitle: articleTitle,
                ArticleDesc: articleDesc,
                ArticleThemePath: articleThemePath,
                ProvinceCode: articleProvinceCode,
            },
            Lst_Mst_ArticleDetail: articleDetails,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('/DAMstArticle/WA_Mst_Article_Create', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.Success === true) {
                    notify('Tạo mới bài viết thành công', 'success');
                    setTimeout(() => {
                        navigate('/admin/articles');
                    }, 1000);
                }
            })
            .catch((error) => console.log('error', error));
    };

    if (!localStorage.getItem('account') || JSON.parse(localStorage.getItem('account')).isAdmin !== '1') {
        return <Navigate to="/" />;
    } else {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <h1 style={{ textAlign: 'center' }}>Tạo mới bài viết GT Điểm du lịch</h1>
                        <button className={cx('btn-return')} onClick={() => navigate('/admin/articles')}>
                            Danh sách bài viết
                        </button>
                        <section className={cx('tour-sec')}>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Mã bài viết tour</div>
                                    <input className={cx('std-input')} value={articleNo} readOnly></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Tỉnh thành liên quan</div>
                                    <select
                                        className={cx('cbb-tt')}
                                        onChange={(e) => setArticleProvinceCode(e.target.value)}
                                    >
                                        <option value="0">-- Chọn tỉnh / thành --</option>
                                        {provinces.map((item, index) => (
                                            <option key={index} value={item.ProvinceCode}>
                                                {item.ProvinceCode} - {item.ProvinceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item')}>
                                    <div>Tiêu đề bài viết</div>
                                    <input
                                        className={cx('std-input')}
                                        onChange={(e) => setArticleTitle(e.target.value)}
                                    ></input>
                                </div>
                                <div className={cx('row-item')}>
                                    <div>Ảnh chủ đề</div>
                                    <input
                                        type="file"
                                        className={cx('std-input')}
                                        onChange={
                                            (e) =>
                                                setArticleThemePath(
                                                    `assets/imglcstorage/article/${e.target.files[0].name}`,
                                                )
                                            //console.log(e.target.files[0].name)
                                        }
                                    ></input>
                                </div>
                            </div>
                            <div className={cx('row', 'dflex-sb')}>
                                <div className={cx('row-item', 'width100')}>
                                    <div>Mô tả bài viết</div>
                                    <textarea
                                        className={cx('std-input')}
                                        onChange={(e) => setArticleDesc(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <section className={cx('tour-sec')}>
                            <h3>Chi tiết bài viết</h3>
                            <div className={cx('function')}>
                                <button className={cx('btn-add')} onClick={() => handleAddDtlRow()}>
                                    Thêm dòng
                                </button>
                                <button className={cx('btn-remove')} onClick={() => handleRemoveDtlRow()}>
                                    Bớt dòng
                                </button>
                            </div>
                            {Array.from({ length: count }, (e, i) => {
                                return (
                                    <div className={cx('divider')} key={i}>
                                        <div className={cx('row', 'dflex-sb')}>
                                            <div className={cx('row-item', 'width10')}>
                                                <div>Chỉ mục</div>
                                                <input
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newArticleDetails = [...articleDetails];
                                                        newArticleDetails[i].ArticleNo = articleNo;
                                                        newArticleDetails[i].Idx = e.target.value;
                                                        setArticleDetails(newArticleDetails);
                                                    }}
                                                ></input>
                                            </div>
                                            <div className={cx('row-item', 'width80')}>
                                                <div>Tiêu đề</div>
                                                <input
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newArticleDetails = [...articleDetails];
                                                        newArticleDetails[i].Title = e.target.value;
                                                        setArticleDetails(newArticleDetails);
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className={cx('row', 'dflex-sb')}>
                                            <div className={cx('row-item')}>
                                                <div>Ảnh minh họa</div>
                                                <input
                                                    type="file"
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newArticleDetails = [...articleDetails];
                                                        newArticleDetails[
                                                            i
                                                        ].ArticleImagePath = `assets/imglcstorage/article/${e.target.files[0].name}`;
                                                        setArticleDetails(newArticleDetails);
                                                    }}
                                                ></input>
                                            </div>
                                            <div className={cx('row-item')}>
                                                <div>Tên ảnh</div>
                                                <input
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newArticleDetails = [...articleDetails];
                                                        newArticleDetails[i].ArticleImageName = e.target.value;
                                                        setArticleDetails(newArticleDetails);
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className={cx('row', 'dflex-sb')}>
                                            <div className={cx('row-item', 'width100')}>
                                                <div>Nội dung</div>
                                                <textarea
                                                    className={cx('std-input')}
                                                    onChange={(e) => {
                                                        var newArticleDetails = [...articleDetails];
                                                        newArticleDetails[i].ArticleContent = e.target.value;
                                                        setArticleDetails(newArticleDetails);
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                        <div className={cx('submit')}>
                            <button className={cx('btn-add')} onClick={() => handleSubmit()}>
                                Tạo mới tour
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            );
        }
    }
}

export default ArticleCreate;
