import { Link, useParams } from "react-router-dom";
import styles from "./Info.module.scss";
import { useEffect, useState } from "react";
import Announce from "../../../components/Announce";

function MyInfo() {
    const [userLogin, setUserLogin] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const { method } = useParams(); // Lấy 'edit' từ URL nếu có
    const [imgUrl, setImgUrl] = useState('');
    const [imgSelected, setImgSelected] = useState(null);
    const [annoucne, setAnnounce] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;

    const handleImg = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (!file) return;

        setImgSelected(file)      
    }

    useEffect(() => {
        fetch(`${apiURL}/users/me`, {
            method: "GET",
            credentials: "include" // để gửi cookie chứa session ID
        })
        .then(res => {
            if (!res.ok) throw new Error("Chưa đăng nhập");
            return res.json();
        })
        .then(data => {
            console.log(data);
            
            setUserLogin(data);
            // Gán giá trị cho input nếu đang ở trang chỉnh sửa
            setName(data.name || '');
            setPhone(data.phone || '');
            setEmail(data.email || '');
            setAddress(data.address || '');
            setImgUrl(data.img);
        })
        .catch(err => {
            console.error("Lỗi lấy user:", err);
        });
    }, []);

    const handleUpdate = () => {
        fetch(`${apiURL}/users/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                name,
                phone,
                email,
                address
            })
        })

        setAnnounce(true);


        setTimeout(() => {
            setAnnounce(false);
            window.location.href = "/my/info";
        }, 1000);
    };

    const handleAddAvatar = async () => {
        window.confirm('Bạn có muốn thay avata không?');

        const formData = new FormData();
        formData.append("file", imgSelected);

        const res = await fetch(`${apiURL}/users/upload`, {
            credentials: 'include',
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setImgUrl(data.filename)
    }

    // useEffect(() => {
    //     fetch('')
    // })

    return (
        <div className={styles.grid}>
            <div className={styles.row}>
                <div className={styles.col_5}>
                    <div className={styles.info}>
                        <div className={styles.avata}>
                            <img src={`${apiURL}/uploads/${imgUrl}`}></img>
                        </div>

                        <Link to='/my/info/avata'>
                            <span className={styles.avata}>Avata</span>
                        </Link>
                        <Link to='/my/info'>
                            <span>Thông tin khách hàng</span>
                        </Link>
                        <Link to='/my/info/edit'>
                            <span>Chỉnh sửa thông tin</span>
                        </Link>
                    </div>
                </div>

                <div className={styles.col_8}>
                    {userLogin ? (
                        method === 'edit' ? (
                            <div className={styles.update_info}>
                                <div>
                                    <label>Họ tên:</label>
                                    <input value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label>Số điện thoại:</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label>Địa chỉ:</label>
                                    <input value={address} onChange={e => setAddress(e.target.value)} />
                                </div>
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                        ) : (
                            method === 'avata' ? (
                                <div>
                                    <h2>Xử lý ảnh</h2>
                                    <label>Chon anh:</label>
                                    <input type="file" placeholder="" onChange={handleImg}></input>

                                    <button onClick={handleAddAvatar} className={styles.btn_addavatar}>Add</button>
                                </div>
                            ) : (
                                <div className={styles.detai_info}>
                                    <div>
                                        <label>Họ tên:</label>
                                        <input value={userLogin.name} readOnly />
                                    </div>
                                    <div>
                                        <label>Số điện thoại:</label>
                                        <input value={userLogin.phone} readOnly />
                                    </div>
                                    <div>
                                        <label>Email:</label>
                                        <input value={userLogin.email} readOnly />
                                    </div>
                                    <div>
                                        <label>Địa chỉ:</label>
                                        <input value={userLogin.address} readOnly />
                                    </div>

                                </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>

            {annoucne && <Announce title='Cập nhật thông tin thành công!!!' />}

        </div>
    );
}

export default MyInfo;
