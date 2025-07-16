import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ShowEditPro.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";


function ShowEditPro({id_pro}) {
    const location = useLocation();
    const state = location.state;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [parent, setParent] = useState('');
    const [child, setChild] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [cate, setCate] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;

    console.log(id_pro);

    useEffect(() => {
        fetch(`${apiURL}/category`)
            .then(res => res.json())
            .then(data => setCate(data))
    }, [])
    
    useEffect(() => {
        setName(state.name);
        setPrice(state.price);
        setQuantity(state.quantity);
        setParent(state.parent);
        setChild(state.child);
        setDescription(state.description);
    }, []);

    const handleEdit = () => {
        setShow(prev => !prev);
        console.log(quantity);
        

        fetch(`${apiURL}/products/edit?Id=${id_pro}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, price, quantity, parent, child, description
            })
        })

        setTimeout(() => {
            setShow(false);
        }, 2000);
        setTimeout(() => {
            navigate('/admin/products?page=1');
        }, 1000)
        
    };

    const handleCancel = () => {
        navigate('/admin/products?page=1')
    }

    return (
        <div className={styles.container_edit_pro}>
            <h2>Chỉnh sửa sản phẩm</h2>

            <label>Tên sản phẩm:</label>
            <input value={name} onChange={e => setName(e.target.value)}></input>

            <div className={styles.container_p_q}>
                <div>
                    <label>Giá sản phẩm:</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)}></input>
                </div>

                <div>
                    <label>Số lượng sản phẩm:</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                </div>
            </div>

            <div className={styles.container_p_q}>
                <div>
                    <label>Danh mục cha:</label>
                    <select value={parent} onChange={e => setParent(e.target.value)}>
                        <option>Chọn danh mục cha</option>
                        {cate.map(cate => (
                            <option key={cate._id} value={cate.parent}>{cate.parent}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Danh mục chính:</label>
                    <select value={child} onChange={e => setChild(e.target.value)}>
                        <option>Chọn danh mục chính</option>
                        {cate.find(item => item.parent === parent)?.child.map(child => (
                            <option value={child}>{child}</option>
                        ))}
                    </select>
                </div>
            </div>

            <label>Mô tả sản phẩm:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>

            <div className={styles.container_btn}>
                <button onClick={handleEdit} className={styles.edit}>Sửa</button>
                <button onClick={handleCancel} className={styles.cancel}>Hủy</button>
            </div>

            {show && (
                <div className={styles.announce}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
                    <span>Đã sửa thành công!!!</span>
                </div>
            )}

        </div>
    );
}

export default ShowEditPro;