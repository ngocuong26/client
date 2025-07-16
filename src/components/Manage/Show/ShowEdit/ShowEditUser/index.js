import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ShowEditUser.module.scss"
import { useState } from "react";

function ShowEditUser({id_user}) {
    const location = useLocation();
    const state = location.state;
    const [username, setUsername] = useState(state?.name);
    const [phone, setPhone] = useState(state?.phone);
    const [email, setEmail] = useState(state?.email);
    const [address, setAddress] = useState(state?.address);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;
    
    const handleName = (e) => {
        setUsername(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }

    const handleUpdate = () => {
        console.log({id_user: id_user, name: username, phone, email, address});
        
        fetch(`${apiURL}/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_user: id_user, name: username, phone, email, address})
        })

        navigate('/admin/users?page=1', {
            state: true
        })
    }

    const handleCancel = () => {
        navigate('/admin/users?page=1')
    }

    return (
        <div className={styles.container_edit}>
            <h2>Cập nhật thông tin khách hàng</h2>
            <label>Tên khách hàng:</label>
            <input value={username} onChange={handleName}></input>
            <label>SĐT khách hàng:</label>
            <input value={phone} onChange={handlePhone}></input>
            <label>Email khách hàng:</label>
            <input value={email} onChange={handleEmail}></input>
            <label>Địa chỉ khách hàng:</label>
            <input value={address} onChange={handleAddress}></input>

            <div>
                <button
                    className={styles.update}
                    onClick={handleUpdate}
                >
                    Cập nhật
                </button>
                <button 
                    className={styles.cancel}
                    onClick={handleCancel}
                >
                    Hủy
                </button>
            </div>
        </div>
    )
}

export default ShowEditUser;