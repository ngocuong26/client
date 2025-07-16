import { useNavigate } from "react-router-dom";
import styles from "../../ShowAdd/ShowAdd.module.scss";
import { useState } from "react";

function ShowAddCate() {
    const navigate = useNavigate(); 
    const [parent, setParent] = useState('');
    const [child, setChild] = useState('');
    const [err, setErr] = useState('');
    const apiURL = process.env.REACT_APP_API_URL;

    const handleCancel = () => {
        navigate('/admin/cate?page=1')
    }

    const hadleAddCate = () => {
        if (parent === '' && child === '') {
            setErr('* Vui lòng điền đầy đủ thông tin!!!');
            return;
        }

        fetch(`${apiURL}/category/update`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cateParent: parent, cateChild: child})
        })

        localStorage.setItem('cate_announce', true);
        navigate('/admin/cate?page=1');
    }

    return (
        <div className={styles.container_cate}>
            <h2>Thêm danh mục</h2>
            <label>Danh mục cha:</label>
            <input 
                placeholder="Nhập danh mục cha" 
                onChange={e => setParent(e.target.value)}
                onFocus={() => setErr('')}
            ></input>
            <label>Danh mục con:</label>
            <input 
                placeholder="Nhập danh mục con"
                onChange={e => setChild(e.target.value)}
                onFocus={() => setErr('')}
            ></input>

            <span style={{color: 'red'}}>{err}</span>

            <div>
                <button className={styles.add} onClick={hadleAddCate}>Thêm</button>
                <button className={styles.cancel} onClick={handleCancel}>Hủy</button>
            </div>
        </div>
    );
}

export default ShowAddCate;