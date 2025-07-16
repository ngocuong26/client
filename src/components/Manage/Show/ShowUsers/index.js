import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from "./ShowUsers.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import Announce from "../../../Announce";

function ShowUsers() {
    const [users, setUsers] = useState([]);
    const [cb, setCb] = useState(false)
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const id_user = params.get('editId');
    const location = useLocation();
    const [confirmDelete, setConfirmDelete] = useState({status: false, id_user: ''});
    console.log(id_user);
    const state = location.state;
    const [annoucne, setAnnounce] = useState(false);
    const apiURL = process.env.REACT_APP_API_URL;

    console.log('state: ', state);
    
    
    useEffect(() => {
        fetch(`${apiURL}/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [cb])

    const handleDelete = (id_user) => {
        setConfirmDelete({status: true, id_user: id_user});
    }
    
    const handleDeleteAgree = () => {
        console.log(confirmDelete.id_user)
        fetch(`${apiURL}/users/delete?Id=${confirmDelete.id_user}`)

        setTimeout(() => {     
            setConfirmDelete({status: false, id_user: ''});   
            setCb(prev => !prev);     
        }, 300)
    }

    const handleUnShowConfirm = () => {
        setConfirmDelete({status: false, id_user: ''});
    }

    const handleEdit = (id_user, name, phone, email, address) => {
        navigate(`/admin/edit?type=user&Id=${id_user}`, {
            state: {
                name, phone, email, address
            }
        })
    }

    useEffect(() => {
        setAnnounce(true);

        setTimeout(() => {
            setAnnounce(false);
        }, 2000)
    }, [])

    return (
        <>
            <div className={styles.title}>
                <h1>Danh sách khách hàng</h1>
                {/* <label>Tìm kiếm đơn hàng</label> */}
                <div>
                    <input type='text' placeholder='Nhập id user muốn tìm'></input>
                    <span>
                        <FontAwesomeIcon icon={faSearch} className={styles.icon_search}/>
                    </span>
                </div>
            </div>
            <div className={styles.container_showorder}>
                <table>
                    <thead>
                        <tr>
                            <th>Id_user</th>
                            <th>Tên khách hàng</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>

                    {users.map(user => (
                        <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className={styles.container_option}>
                                <button 
                                    className={styles.see}
                                    onClick={() => handleEdit(user._id, user.name, user.phone, user.email, user.address)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                    Sửa
                                </button>
                                <button 
                                    className={styles.edit}
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>

            {confirmDelete.id_user && (
                <>
                    <div 
                        className={styles.showDelete}
                        onClick={handleUnShowConfirm}
                    >
                        <FontAwesomeIcon icon={faXmark} className={styles.icon}/>
                    </div>
                    <div className={styles.delete}>
                        <h3>Bạn có chắc chắn muốn xóa User có id <span>{confirmDelete.id_user}</span> này không?</h3>

                        <div>
                            <button 
                                className={styles.agree}
                                onClick={handleDeleteAgree}
                            >
                                Đồng ý
                            </button>
                            <button 
                                className={styles.cancel}
                                onClick={handleUnShowConfirm}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </>
            )}

            {state && annoucne && (<Announce title='Cập nhật khách hàng thành công!!!' />)}

        </>
    );
}

export default ShowUsers;