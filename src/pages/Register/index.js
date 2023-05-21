import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../../services/functionService';
import { Gender } from '~/services/variableService';

const cx = classNames.bind(styles);

function Register() {
    const [isChecked, setIsChecked] = useState(false);
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [idNo, setidNo] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

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
        var raw_seq = JSON.stringify({
            ServiceCode: 'WEBAPP',
            Tid: '20181020.143018.986818',
            TokenID: 'TOCKENID.IDOCNET',
            RefreshToken: '',
            UtcOffset: '7',
            GwUserCode: 'idocNet.idn.Skycic.Inventory.Sv',
            GwPassword: 'idocNet.idn.Skycic.Inventory.Sv',
            WAUserCode: '',
            WAUserPassword: '',
            FlagIsDelete: '0',
            FlagAppr: '0',
            FlagIsEndUser: '0',
            FuncType: null,
            Ft_RecordStart: '0',
            Ft_RecordCount: '123456',
            Ft_WhereClause: '',
            Ft_Cols_Upd: '',
            Seq_Common: {
                SequenceType: 'CUSTOMERCODE',
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

        fetch('http://localhost:3000/DASeq/WA_Seq_Common_Get', requestOptions_seq)
            .then((response) => response.json())
            .then((result) => setUserId(result.Data.c_K_DT_Sys.Lst_c_K_DT_SysInfo[0].Remark))
            .catch((error) => console.log('error', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickRegister = () => {
        if (!isChecked) {
            notify('Bạn chưa đồng ý với điều khoản', 'warning');
        } else if (
            !userName ||
            !fullName ||
            !birthday ||
            !gender ||
            !idNo ||
            !mobile ||
            !email ||
            !address ||
            !password ||
            !rePassword
        ) {
            notify('Bạn chưa nhập đầy đủ thông tin', 'warning');
        } else if (!validateEmail(email)) {
            notify('Email không hợp lệ', 'warning');
        } else if (password !== rePassword) {
            notify('Mật khẩu không trùng khớp', 'warning');
        } else {
            //notify('Đăng ký thành công', 'success');
            var raw_ctm = JSON.stringify({
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
                Ft_RecordCount: '123456',
                Ft_WhereClause: '',
                Ft_Cols_Upd: '',
                Sys_User: {
                    UserCode: userName,
                    UserName: fullName,
                    UserPassword: password,
                    UserPhoneNo: mobile,
                    UserEmail: email,
                    FlagSysAdmin: '0',
                    mctm_CustomerCode: userId,
                    mctm_CustomerGender: gender,
                    mctm_CustomerMobileNo: mobile,
                    mctm_CustomerAddress: address,
                    mctm_CustomerBOD: birthday,
                    mctm_CustomerAvatarPath: '',
                    mctm_CustomerIDCardNo: idNo,
                },
            });

            var requestOptions_ctm = {
                method: 'POST',
                headers: myHeaders,
                body: raw_ctm,
                redirect: 'follow',
            };

            fetch('http://localhost:3000/DASysUser/WA_Sys_User_Create', requestOptions_ctm)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.Success) {
                        notify('Đăng ký tài khoản thành công', 'success');
                        // wait 2s to redirect
                        setTimeout(() => {
                            navigate('/login');
                        }, 3000);
                    } else {
                        notify('Đăng ký tài khoản không thành công', 'error');
                    }
                })
                .catch((error) => console.log('error', error));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('title')}>ĐĂNG KÝ HỘI VIÊN</div>
                <div className={cx('intro')}>
                    <div>ĐĂNG KÝ HỘI VIÊN</div>
                    <div>
                        Để hoàn tất đăng ký Hội viên Vietravel, quý khách vui lòng điền đầy đủ thông tin vào mẫu dưới
                        đây và nhấn vào nút đăng ký. Xin chân thành cảm ơn quý khách hàng.
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Tên tài khoản</div>
                        <input type="text" onChange={(e) => setUserName(e.target.value)} id="username" />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Họ và tên</div>
                        <input type="text" onChange={(e) => setFullName(e.target.value)} id="fullname" />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Ngày sinh</div>
                        <input type="date" onChange={(e) => setBirthday(e.target.value)} id="bod" />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Giới tính</div>
                        <select type="text" onChange={(e) => setGender(e.target.value)} id="gender">
                            <option value="">-- Chọn giới tính --</option>
                            {Gender.map((item, index) => {
                                return (
                                    <option key={index} value={item.Gender}>
                                        {item.Gender}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Số CCCD</div>
                        <input type="text" onChange={(e) => setidNo(e.target.value)} id="idno" />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Di động</div>
                        <input type="text" onChange={(e) => setMobile(e.target.value)} id="mobile" />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Email</div>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} id="email" />
                    </div>
                    <div className={cx('form-item', 'width100')}>
                        <div className={cx('label')}>Địa chỉ</div>
                        <input type="text" onChange={(e) => setAddress(e.target.value)} id="address" />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Mật khẩu</div>
                        <input
                            type="password"
                            id="pass"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-item', 'width50')}>
                        <div className={cx('label')}>Nhập lại mật khẩu</div>
                        <input
                            type="password"
                            id="repass"
                            name="repassword"
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('check')}>
                    <input type="checkbox" id="check-agree" onChange={() => setIsChecked(!isChecked)} />
                    <p>Tôi đã đọc và đồng ý các điều khoản bên dưới</p>
                </div>
                <div className={cx('action')}>
                    <button className={cx('btn-register')} onClick={() => handleClickRegister()}>
                        Đăng ký
                    </button>
                </div>

                <div className={cx('note')}>
                    <div className={cx('intro')}>ĐIỀU KHOẢN ĐĂNG KÝ HỘI VIÊN</div>
                    <div>
                        - Hội viên đăng ký chương trình cung cấp đúng các thông tin về số điện thoại, địa chỉ liên hệ,
                        địa chỉ email của Hội viên. Khi có thay đổi, Hội viên có thể tự cập nhật vào tài khoản tại
                        VietravelPlus.com hoặc liên hệ thông báo trực tiếp với nhân viên Vietravel và yêu cầu cập nhật.
                    </div>
                    <div>
                        - Hội viên tham gia chương trình được cộng điểm Vàng và điểm Thưởng sau khi sử dụng dịch vụ tại
                        Vietravel theo hệ số cộng điểm và theo các quy định về điểm thưởng khác được công bố tại từng
                        thời điểm.
                    </div>
                    <div>
                        - Vietravel có quyền thay đổi các điều kiện và điều khoản của chương trình Khách hàng thân thiết
                        bất kỳ thời điểm nào có (hoặc không) báo trước và sẽ công bố chính thức trên VietravelPlus.com.
                    </div>
                    <div>
                        - Vietravel có quyền sửa đổi cách thức của chương trình hoặc những quyền lợi có được từ chương
                        trình tại bất kỳ thời điểm nào, có (hoặc không) báo trước và sẽ công bố chính thức trên
                        VietravelPlus.com.
                    </div>
                    <div>
                        - Vietravel có quyền tạm ngừng hoặc chấm dứt toàn bộ chương trình Khách hàng thân thiết tại bất
                        kỳ thời điểm nào, có (hoặc không) báo trước.
                    </div>
                    <div>
                        - Vietravel được miễn trừ chịu trách nhiệm nếu Hội viên không nhận được các ưu đãi và lợi ích từ
                        chương trình do số điện thoại, email Hội viên có thay đổi mà không cập nhật vào hồ sơ hội viên
                        hoặc do gửi ấn phẩm, thư tín qua đường bưu điện đến Hội viên bị thất lạc.
                    </div>
                    <div>
                        - Mọi khiếu nại, yêu cầu bồi thường của Hội viên liên quan đến chương trình sẽ do Vietravel giải
                        quyết. Sự giải quyết của Vietravel có giá trị áp dụng sau cùng.
                    </div>
                    <div>
                        - Vietravel được phép sử dụng những thông tin của Hội viên trong các trường hợp: phục vụ cho
                        việc nghiên cứu thị trường, lên kế hoạch kinh doanh nhằm phục vụ Hội viên tốt hơn của Vietravel
                        hoặc đối tác chương trình, gửi phần thưởng hay các ấn phẩm đến Hội viên mà không cần sự đồng ý
                        của Hội viên hoặc các trường hợp khác được Hội viên cho phép.
                    </div>
                    <div>
                        - Hội viên được khuyến khích đọc kỹ và được xem như chấp nhận nội dung chương trình Khách hàng
                        thân thiết VietravelPlus trước khi đăng ký trở thành Hội viên
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Register;
