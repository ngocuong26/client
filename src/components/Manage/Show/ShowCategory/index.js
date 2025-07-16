import { useEffect, useState } from "react";
import styles from "./ShowCategory.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Announce from "../../../Announce";
import { useNavigate } from "react-router-dom";

function ShowCategory() {
    const [cate, setCate] = useState([]);
    const [child, setChild] = useState([]);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(false);
    const [addChild, setAddChild] = useState('');
    const [parent, setParent] = useState('');
    const [annoucne, setAnnounce] = useState(false);
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;
    const cate_announce = JSON.parse(localStorage.getItem('cate_announce')) || false;
    
    useEffect(() => {
        fetch(`${apiURL}/category`)
            .then(res => res.json())
            .then(data => setCate(data))
    }, [])

    const handleCate = (parent) => {
        const child = cate.filter(item => item.parent === parent);
        setShow(true);
        setChild(child[0].child);
        setEdit(false);
        setInput(false);
        setParent(parent);
    }

    const handleEdit = () => {
        setShow(false);
        setEdit(prev => !prev);
    }

    const handleConfirm = () => {
        fetch(`${apiURL}/category/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({child: addChild, parent: parent})
        })
        localStorage.setItem('cate_announce', true)
        setEdit(false);
        setInput(false);
        window.location.href = '/admin/cate?page=1';
    }
    
    const handleCancel = () => {
        setEdit(false);
        setInput(false)
    }

    useEffect(() => {
        if (cate_announce) {
            setAnnounce(true);
            localStorage.removeItem('cate_announce');
            setTimeout(() => {
                setAnnounce(false);
            }, 2000);
            return;
        }
    }, [])

    const handleAddCate = () => {
        navigate('/admin/add/category')
    }

    return (
        <div>
            <h1>Danh mục sản phẩm</h1>
            <button className={styles.btn_add} onClick={handleAddCate}>Thêm danh mục</button>
            <div className={styles.container_cate}>
                {cate.map(cate => (
                    <button key={cate._id} className={styles.cate_btn} onClick={() => handleCate(cate.parent)}>{cate.parent}</button>
                
                ))}
                {show && (
                    <div className={styles.container_child}>
                        {child.map((child, index) => (
                            <p key={index} className={styles.items}>{child}</p>
                        ))}

                        <button onClick={handleEdit}>Sửa</button>
                    </div>
                )}

                {edit && (
                    <div className={styles.container_child_edit}>
                        {child.map((child, index) => (
                            <div className={styles.container_items}>
                                <p key={index}>{child}</p>
                            </div>
                        ))}

                        {!input ? 
                            <p className={styles.add} onClick={() => setInput(prev => !prev)}>+</p>
                            : 
                            <div>
                                <input placeholder="Thêm danh mục con" onChange={e => setAddChild(e.target.value)}></input>
                                <button onClick={handleConfirm} className={styles.save}>Lưu</button>
                                <button onClick={handleCancel} className={styles.cancel}>Hủy</button>
                            </div>
                        }

                    </div>
                )}

            </div>

            {annoucne && (<Announce title='Thêm danh mục chính thành công!!!' />)}

        </div>
    )
}

export default ShowCategory;